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
  <div className="rounded-lg border border-solid border-zinc-300/55 p-3 ">
    {icon}
    <div className="mt-2 flex items-center gap-x-3">
      <label htmlFor={id}>{label}</label>
      <input
        checked={checked}
        id={id}
        name="source-private-key"
        type="radio"
        onChange={onChange}
      />
    </div>
  </div>
)
