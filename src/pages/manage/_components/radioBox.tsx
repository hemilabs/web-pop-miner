import { ReactNode } from 'react'
import { SourceOfPrivateKeyType } from 'types/sourceOfPrivateKeyType'

type RadioBoxProps = {
  checked: boolean
  icon: ReactNode
  id: SourceOfPrivateKeyType
  label: string
  onChange: () => void
}
export const RadioBox = ({
  checked,
  icon,
  id,
  label,
  onChange,
}: RadioBoxProps) => (
  <div
    className={`min-h-24 min-w-52 rounded-lg border border-solid p-3 hover:cursor-pointer ${
      checked ? 'border-orange-950' : 'border-zinc-300/55'
    }`}
    onClick={onChange}
  >
    {icon}
    <div className="pointer-events-none mt-2 flex items-center gap-x-3">
      <label htmlFor={id} className="max-w-36 break-words text-sm">
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
