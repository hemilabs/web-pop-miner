import { ReactNode } from 'react'
import { SourceOfPrivateKeyType } from 'types/sourceOfPrivateKeyType'

type RadioBoxProps = {
  checked: boolean
  disabled?: boolean
  icon: ReactNode
  id: SourceOfPrivateKeyType
  title: string
  subtitle: string
  onChange: () => void
}
export const RadioBox = ({
  checked,
  disabled = false,
  icon,
  id,
  title,
  subtitle,
  onChange,
}: RadioBoxProps) => (
  <div
    className={`min-h-24 w-full min-w-[270px] rounded-lg border border-solid p-3 hover:cursor-pointer ${
      checked ? 'border-orange-950' : 'border-zinc-300/55'
    } ${disabled ? 'pointer-events-none opacity-50' : 'hover:cursor-pointer'}`}
    onClick={onChange}
  >
    <div className="item-center flex justify-between">
      {icon}
      <input
        className="orange-radio h-4 w-4"
        checked={checked}
        id={id}
        name="source-private-key"
        readOnly
        type="radio"
      />
    </div>
    <div className="pointer-events-none mt-2 flex items-start justify-between pr-3">
      <div className="flex max-w-48 flex-col break-words text-sm">
        <h1 className="text-neutral-950">{title}</h1>
        <h2 className="mt-2 text-neutral-500">{subtitle}</h2>
      </div>
    </div>
  </div>
)
