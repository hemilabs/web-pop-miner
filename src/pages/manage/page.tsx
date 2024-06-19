import { StringViewer } from 'components/stringViewer'
import { useState } from 'react'
import { SourceOfPrivateKeyType } from 'types/sourceOfPrivateKeyType'
import { RadioBox } from './_components/radioBox'
import { GeneratePkIcon } from 'icons/generatePkIcon'
import { ImportPkIcon } from 'icons/importPkIcon'
import { useBitcoinTestnetKey } from './_hooks/useBitcoinTestnetKey'

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

export const ManagePage = function () {
  const { generateKey } = useBitcoinTestnetKey()
  const [bitcoinKey, setBitcoinKey] = useState(generateKey)
  const [sourceOfPrivateKey, setSourceOfPrivateKey] =
    useState<SourceOfPrivateKeyType>('generate')

  const handleSourceChange = (source: SourceOfPrivateKeyType) => {
    setSourceOfPrivateKey(source)
    if (source === 'generate') {
      const key = generateKey()
      setBitcoinKey(key)
    } else {
      setBitcoinKey({ address: '', privateKey: '' })
    }
  }

  const handlePrivateKeyChange = (text: string) => {
    setBitcoinKey({ address: '', privateKey: text })
  }

  return (
    <div className="grid w-full grid-cols-3-column-layout">
      <div className="col-start-2 mx-auto max-w-lg">
        <div className="rounded-3xl border border-solid border-slate-100 bg-white p-6 md:p-9">
          <div className="flex w-full flex-col gap-y-4 bg-white">
            <h2 className="text-2xl font-medium leading-tight text-neutral-950">
              Input or generate your Private Key...
            </h2>
            <p className="text-base leading-normal text-neutral-500">
              Choose between generating a new Private Key or inputting an
              existing one.
            </p>
            <div className="flex items-center gap-x-5">
              <RadioBox
                checked={sourceOfPrivateKey === 'generate'}
                icon={<GeneratePkIcon />}
                id="generate"
                label="Generate a Private Key"
                onChange={() => handleSourceChange('generate')}
              />
              <RadioBox
                checked={sourceOfPrivateKey === 'import'}
                icon={<ImportPkIcon />}
                id="import"
                label="Input your own Private Key"
                onChange={() => handleSourceChange('import')}
              />
            </div>
            <div className="h-px w-full border border-solid border-zinc-300/55" />
            <PrivateKey
              handleChange={handlePrivateKeyChange}
              source={sourceOfPrivateKey}
              privateKey={bitcoinKey.privateKey}
            />
            <div className="mt-12">
              <button className="h-14 w-full cursor-pointer rounded-xl bg-orange-950 text-lg text-white hover:bg-opacity-80">
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
