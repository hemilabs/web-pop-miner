import { StringViewer } from 'components/stringViewer';
import { useEffect, useState } from 'react';
import { SourceOfPrivateKeyType } from 'types/sourceOfPrivateKeyType';
import { RadioBox } from './_components/radioBox';
import { GeneratePkIcon } from 'icons/generatePkIcon';
import { ImportPkIcon } from 'icons/importPkIcon';
import { KeyResult, generateKey, parseKey } from '@hemilabs/pop-miner';
import { usePopminerContext } from 'context/popminerContext';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { handleError } from 'utils/handleError';
import Skeleton from 'react-loading-skeleton';
import { CardWarningKey } from './_components/cardWarningKey';
import { CheckBox } from 'components/checkBox';
import { PageWithRightpanel } from 'components/pageWithRightpanel';

interface PrivateKeyProps {
  source: SourceOfPrivateKeyType;
  handleChange?: (text: string) => void;
  privateKey: string;
}

const PrivateKey = ({ source, handleChange, privateKey }: PrivateKeyProps) =>
  source === 'generate' ? (
    <StringViewer
      defaultIsVisible={false}
      enableCopyToClipboard={true}
      text={privateKey}
      title="Private Key"
    />
  ) : (
    <StringViewer
      defaultIsVisible={false}
      enableEditing={true}
      onTextChange={handleChange}
      placeholder="Paste your Private Key here.."
      text={privateKey}
      title="Private Key"
    />
  );

const initAndExtractKeyData = (keyAction: () => Promise<KeyResult>) =>
  keyAction();

const generateNewKey = async () =>
  initAndExtractKeyData(() => generateKey({ network: 'testnet3' }));

const parseNewKey = async (key: string) =>
  initAndExtractKeyData(() =>
    parseKey({ network: 'testnet3', privateKey: key }),
  );

export const ManagePage = function () {
  const navigate = useNavigate();
  const { state, setState } = usePopminerContext();
  const [savedMyPrivateKey, setSavedMyPrivateKey] = useState(false);
  const [sourceOfPrivateKey, setSourceOfPrivateKey] =
    useState<SourceOfPrivateKeyType>('generate');
  const [debouncedPrivateKey] = useDebounce(state.privateKey, 400);

  const isValidPrivateKey =
    state.validPrivateKey && state.privateKey && savedMyPrivateKey;

  function updateValidPrivateKeyState(valid: boolean) {
    setState(prevState => ({
      ...prevState,
      validPrivateKey: valid,
    }));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function updateKeyState(keyPromise: Promise<any>) {
    try {
      const keyData = await keyPromise;
      setState(prevState => ({
        ...prevState,
        ...keyData,
      }));
      updateValidPrivateKeyState(true);
    } catch (error) {
      handleError('Error', error as Error);
      updateValidPrivateKeyState(false);
    }
  }

  useEffect(
    function () {
      if (state.wasmInitialized) {
        updateKeyState(generateNewKey());
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.wasmInitialized],
  );

  useEffect(
    function () {
      if (debouncedPrivateKey && !state.validPrivateKey) {
        if (sourceOfPrivateKey === 'generate') {
          updateKeyState(generateNewKey());
        } else {
          updateKeyState(parseNewKey(state.privateKey));
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedPrivateKey, sourceOfPrivateKey],
  );

  async function handleSourceChange(source: SourceOfPrivateKeyType) {
    setSourceOfPrivateKey(source);

    if (source === 'generate') {
      updateKeyState(generateNewKey());
    } else {
      setState(prevState => ({
        ...prevState,
        privateKey: '',
      }));
    }
  }

  function handlePrivateKeyChange(text: string) {
    setState(prevState => ({
      ...prevState,
      privateKey: text,
    }));
    updateValidPrivateKeyState(false);
  }

  function handleContinue() {
    if (isValidPrivateKey) {
      navigate('/fund');
    }
  }

  const renderInitializedContent = () => (
    <>
      <h2 className="text-2xl font-medium leading-tight text-neutral-950">
        Input or generate a private key
      </h2>
      <p className="max-w-md text-base text-neutral-500">
        Choose between generating a new private key or inputting an existing
        one.
      </p>
      <div className="flex items-center justify-center gap-x-5">
        <RadioBox
          checked={sourceOfPrivateKey === 'generate'}
          icon={<GeneratePkIcon />}
          id="generate"
          title="Start new mining session"
          subtitle="By generating a new private key"
          onChange={() => handleSourceChange('generate')}
        />
        <RadioBox
          checked={sourceOfPrivateKey === 'import'}
          icon={<ImportPkIcon />}
          id="import"
          title="Continue a mining session"
          subtitle="By Inputing an existing private key"
          onChange={() => handleSourceChange('import')}
        />
      </div>
      <div className="h-px w-full border border-solid border-zinc-300/55" />
      <PrivateKey
        handleChange={handlePrivateKeyChange}
        source={sourceOfPrivateKey}
        privateKey={state.privateKey}
      />
      <div className="mt-10">
        <div className="ml-3">
          <CheckBox
            label="I saved my private key"
            isChecked={savedMyPrivateKey}
            onChange={() => setSavedMyPrivateKey(prevState => !prevState)}
          />
        </div>
        <button
          onClick={handleContinue}
          className={`mt-3 h-14 w-full rounded-xl border bg-orange-950 text-lg text-white transition-colors
        ${
          isValidPrivateKey
            ? 'cursor-pointer border-orange-970 bg-opacity-90 hover:bg-opacity-100'
            : 'cursor-default border-neutral-300 bg-opacity-40'
        }`}
        >
          Continue
        </button>
      </div>
    </>
  );

  const renderLoadingContent = () => (
    <div className="flex w-540 flex-col gap-y-2">
      <div className="w-full">
        <Skeleton height={40} />
        <Skeleton height={20} className="mt-8" />
      </div>
      <div className="mt-2 flex items-center justify-around gap-x-5">
        <div className="flex-1">
          <Skeleton height={80} />
        </div>
        <div className="flex-1">
          <Skeleton height={80} />
        </div>
      </div>
      <div className="mt-2 h-px w-full border border-solid border-zinc-300/55" />
      <div className="flex items-center justify-around gap-x-5">
        <div className="w-full">
          <Skeleton height={60} />
        </div>
      </div>
      <div className="mt-12 w-full">
        <Skeleton height={60} />
      </div>
    </div>
  );

  return (
    <PageWithRightpanel rightPanel={<CardWarningKey />}>
      <div className="grid w-full grid-cols-3-column-layout">
        <div className="col-start-2 mx-auto">
          <div className="rounded-2xl border border-solid border-slate-100 bg-white p-6 md:p-9">
            <div className="flex w-full flex-col gap-y-4 bg-white">
              {state.wasmInitialized
                ? renderInitializedContent()
                : renderLoadingContent()}
            </div>
          </div>
        </div>
      </div>
    </PageWithRightpanel>
  );
};
