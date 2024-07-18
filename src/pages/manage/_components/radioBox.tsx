import { ReactNode } from 'react'
import { SourceOfPrivateKeyType } from 'types/sourceOfPrivateKeyType'

type RadioBoxProps = {
  checked: boolean
  disabled?: boolean
  icon: ReactNode
  id: SourceOfPrivateKeyType
  label: string
  onChange: () => void
}
export const RadioBox = ({
  checked,
  disabled = false,
  icon,
  id,
  label,
  onChange,
}: RadioBoxProps) => (
  <div
    className={`min-h-24 w-full min-w-72 rounded-lg border border-solid p-3 hover:cursor-pointer ${
      checked ? 'border-orange-950' : 'border-zinc-300/55'
    } ${disabled ? 'pointer-events-none opacity-50' : 'hover:cursor-pointer'}`}
    onClick={onChange}
  >
    {icon}
    <div className="pointer-events-none mt-2 flex items-center justify-between pr-3">
      <label htmlFor={id} className="max-w-40 break-words text-sm">
        {label}
      </label>
      <input
        className="orange-radio h-4 w-4"
        checked={checked}
        id={id}
        name="source-private-key"
        readOnly
        type="radio"
      />
    </div>
  </div>
)
