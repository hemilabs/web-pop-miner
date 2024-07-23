import { StringViewer } from 'components/stringViewer'
import { useEffect, useState } from 'react'
import { SourceOfPrivateKeyType } from 'types/sourceOfPrivateKeyType'
import { RadioBox } from './_components/radioBox'
import { GeneratePkIcon } from 'icons/generatePkIcon'
import { ImportPkIcon } from 'icons/importPkIcon'
import { KeyResult, generateKey, parseKey } from '@hemilabs/pop-miner'
import { usePopminerContext } from 'context/popminerContext'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import { handleError } from 'utils/handleError'

interface PrivateKeyProps {
  source: SourceOfPrivateKeyType
  handleChange?: (text: string) => void
  privateKey: string
}

const PrivateKey = ({ source, handleChange, privateKey }: PrivateKeyProps) =>
  source === 'generate' ? (
    <StringViewer
      enableCopyToClipboard={true}
      text={privateKey}
      title="Private Key"
    />
  ) : (
    <StringViewer
      enableEditing={true}
      onTextChange={handleChange}
      placeholder="Paste your Private Key here.."
      text={privateKey}
      title="Private Key"
    />
  )

const initAndExtractKeyData = (keyAction: () => Promise<KeyResult>) => {
  return keyAction()
}

const generateNewKey = async () => {
  return initAndExtractKeyData(() => generateKey({ network: 'testnet3' }))
}

const parseNewKey = async (key: string) => {
  return initAndExtractKeyData(() =>
    parseKey({ network: 'testnet3', privateKey: key }),
  )
}

export const ManagePage = function () {
  const navigate = useNavigate()
  const { state, setState } = usePopminerContext()
  const [sourceOfPrivateKey, setSourceOfPrivateKey] =
    useState<SourceOfPrivateKeyType>('generate')
  const [debouncedPrivateKey] = useDebounce(state.privateKey, 400)

  const updateValidPrivateKeyState = (valid: boolean) => {
    setState(prevState => ({
      ...prevState,
      validPrivateKey: valid,
    }))
  }

  const updateKeyState = async (keyPromise: Promise<any>) => {
    try {
      const keyData = await keyPromise
      setState(prevState => ({
        ...prevState,
        ...keyData,
      }))
      updateValidPrivateKeyState(true)
    } catch (error) {
      handleError('Error', error as Error)
      updateValidPrivateKeyState(false)
    }
  }

  const migrateKeyData = (keyData: any) => {
    return {
      ...keyData,
      privateKey: keyData.bitcoinPrivateKey || keyData.privateKey,
      publicKey: keyData.bitcoinPublicKey || keyData.publicKey,
      bitcoinPubKeyHash:
        keyData.bitcoinPublicKeyHash || keyData.bitcoinPubKeyHash,
    }
  }

  const cleanOldKeyData = (keyData: any) => {
    const {
      bitcoinPrivateKey,
      bitcoinPublicKey,
      bitcoinPublicKeyHash,
      ...cleanedKeyData
    } = keyData
    return cleanedKeyData
  }

  useEffect(() => {
    if (state.wasmInitialized) {
      const savedKeyData = localStorage.getItem('keyData')
      if (savedKeyData) {
        let parsedKeyData = JSON.parse(savedKeyData)

        // Migrate and clean the key data
        parsedKeyData = migrateKeyData(parsedKeyData)
        parsedKeyData = cleanOldKeyData(parsedKeyData)

        setState(prevState => ({
          ...prevState,
          ...parsedKeyData,
        }))
      } else {
        updateKeyState(generateNewKey())
      }
    }
  }, [state.wasmInitialized])

  useEffect(() => {
    if (debouncedPrivateKey && !state.validPrivateKey) {
      if (sourceOfPrivateKey === 'generate') {
        updateKeyState(generateNewKey())
      } else {
        updateKeyState(parseNewKey(state.privateKey))
      }
    }
  }, [debouncedPrivateKey, sourceOfPrivateKey])

  const handleSourceChange = async (source: SourceOfPrivateKeyType) => {
    setSourceOfPrivateKey(source)

    if (source === 'generate') {
      updateKeyState(generateNewKey())
    } else {
      setState(prevState => ({
        ...prevState,
        privateKey: '',
      }))
    }
  }

  const handlePrivateKeyChange = (text: string) => {
    setState(prevState => ({
      ...prevState,
      privateKey: text,
    }))
    updateValidPrivateKeyState(false)
  }

  const handleContinue = () => {
    if (state.privateKey && state.validPrivateKey) {
      localStorage.setItem('keyData', JSON.stringify(state))
      navigate('/fund')
    }
  }

  return (
    <div className="grid w-full grid-cols-3-column-layout">
      <div className="col-start-2 mx-auto">
        <div className="rounded-3xl border border-solid border-slate-100 bg-white p-6 md:p-9">
          <div className="flex w-full flex-col gap-y-4 bg-white">
            <h2 className="text-2xl font-medium leading-tight text-neutral-950">
              Input or generate your private key
            </h2>
            <p className="text-base leading-normal text-neutral-500">
              Generate a new private key or select to input an existing one.
            </p>
            <div className="flex items-center justify-center gap-x-5">
              <RadioBox
                checked={sourceOfPrivateKey === 'generate'}
                icon={<GeneratePkIcon />}
                id="generate"
                label="Generate a private key"
                onChange={() => handleSourceChange('generate')}
              />
              <RadioBox
                checked={sourceOfPrivateKey === 'import'}
                icon={<ImportPkIcon />}
                id="import"
                label="Input your own private key"
                onChange={() => handleSourceChange('import')}
              />
            </div>
            <div className="h-px w-full border border-solid border-zinc-300/55" />
            <PrivateKey
              handleChange={handlePrivateKeyChange}
              source={sourceOfPrivateKey}
              privateKey={state.privateKey}
            />
            <div className="mt-12">
              <button
                onClick={handleContinue}
                className={`h-14 w-full rounded-xl bg-orange-950 text-lg text-white 
              ${
                state.validPrivateKey && state.privateKey
                  ? 'cursor-pointer bg-opacity-90 hover:bg-opacity-100'
                  : 'cursor-default bg-opacity-40'
              }`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
