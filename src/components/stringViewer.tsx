import { CopyIcon } from 'icons/copyIcon'
import { useState } from 'react'
import { Toast, ToastType } from 'utils/toast'

const ViewTextIcon = () => (
  <svg fill="none" height={16} width={16} xmlns="http://www.w3.org/2000/svg">
    <path
      d="m1.334 8-.592-.306L.583 8l.159.306L1.334 8Zm13.333 0 .592.306.159-.306-.159-.306-.592.306Zm-12.74.306C3.444 5.37 5.768 4 8 4c2.231 0 4.556 1.37 6.074 4.306l1.184-.612c-1.7-3.287-4.432-5.027-7.258-5.027-2.826 0-5.56 1.74-7.26 5.027l1.185.612Zm-1.185 0c1.7 3.287 4.433 5.027 7.259 5.027 2.826 0 5.559-1.74 7.258-5.027l-1.184-.612C12.557 10.63 10.232 12 8.001 12c-2.232 0-4.556-1.37-6.075-4.306l-1.184.612ZM9.334 8c0 .736-.597 1.333-1.333 1.333v1.334A2.667 2.667 0 0 0 10.667 8H9.334ZM8.001 9.333A1.333 1.333 0 0 1 6.667 8H5.334a2.667 2.667 0 0 0 2.667 2.667V9.333ZM6.667 8c0-.736.597-1.333 1.334-1.333V5.333A2.667 2.667 0 0 0 5.334 8h1.333Zm1.334-1.333c.736 0 1.333.597 1.333 1.333h1.333a2.667 2.667 0 0 0-2.666-2.667v1.334Z"
      fill="#737373"
    />
  </svg>
)

type Props = {
  enableCopyToClipboard?: boolean
  enableEditing?: boolean
  placeholder?: string
  text: string
  title: string
  onTextChange?: (text: string) => void
}

export const StringViewer = function ({
  text,
  title,
  placeholder,
  enableCopyToClipboard = false,
  enableEditing = false,
  onTextChange,
}: Props) {
  const [isVisible, setIsVisible] = useState(true)

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      Toast({ message: 'Copied to clipboard', type: ToastType.Success })
    } catch (err) {
      Toast({ message: `Failed to copy: ${err}`, type: ToastType.Error })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onTextChange) {
      onTextChange(e.target.value)
    }
  }

  return (
    <div className="flex w-full flex-col gap-y-1 rounded-lg bg-neutral-100 p-2">
      <span className="text-base text-neutral-600">{title}</span>
      <div className="flex min-h-10 w-full flex-shrink items-center justify-between gap-x-3 rounded-lg border border-solid bg-white p-2 text-sm font-medium leading-normal">
        {enableEditing ? (
          <input
            type={isVisible ? 'text' : 'password'}
            value={text}
            onChange={handleChange}
            placeholder={placeholder}
            className="flex-grow border-none text-xs text-neutral-950 outline-none"
          />
        ) : (
          <span
            className={`text-xs ${
              !text ? 'text-neutral-500' : 'text-neutral-950'
            } flex-grow`}
          >
            {!text ? placeholder : isVisible ? text : '•'.repeat(text.length)}
          </span>
        )}
        <div className="flex items-center gap-x-3">
          <div onClick={handleToggleVisibility} className="cursor-pointer">
            <ViewTextIcon />
          </div>
          {enableCopyToClipboard && (
            <div onClick={handleCopyToClipboard} className="cursor-pointer">
              <CopyIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
