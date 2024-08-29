import { CopyIcon } from 'icons/copyIcon'
import { useState } from 'react'
import { Toast, ToastType } from 'utils/toast'

const ViewTextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
    <path
      stroke="#525252"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.33}
      d="M2.653 5.482A6.985 6.985 0 0 0 1.29 8a7.004 7.004 0 0 0 8.62 4.737M4.151 4.152A7.004 7.004 0 0 1 14.71 7.999a7.014 7.014 0 0 1-2.862 3.849M4.152 4.152 2 2m2.152 2.152 2.433 2.433m5.263 5.263L14 14m-2.152-2.152L9.414 9.415a2 2 0 0 0-2.828-2.829m2.828 2.828L6.586 6.587"
    />
  </svg>
)

type Props = {
  defaultIsVisible?: boolean
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
  defaultIsVisible = true,
  enableCopyToClipboard = false,
  enableEditing = false,
  onTextChange,
}: Props) {
  const [isVisible, setIsVisible] = useState(defaultIsVisible)

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
    <div className="flex w-full flex-col gap-y-1 rounded-lg bg-neutral-100 px-1 pb-1 pt-2">
      <div className="mx-2 flex items-center justify-between">
        <h1 className="text-base text-neutral-600">{title}</h1>
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
      </div>
    </div>
  )
}
