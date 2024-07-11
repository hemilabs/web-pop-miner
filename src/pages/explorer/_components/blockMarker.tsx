import React from 'react'

export const BlockMarker = () => {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center bg-transparent">
      <div className="absolute z-10 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
        >
          <path
            stroke="#737373"
            strokeLinejoin="round"
            strokeWidth={1.333}
            d="M8 8v6m0-6 5.333-3M7.999 8 2.666 5m5.007-2.816L3.006 4.809a.667.667 0 0 0-.34.58v5.221c0 .241.13.463.34.581l4.667 2.625c.202.114.45.114.653 0l4.667-2.625c.21-.118.34-.34.34-.58V5.39c0-.24-.13-.463-.34-.581L8.326 2.184a.667.667 0 0 0-.653 0Z"
          />
        </svg>
      </div>
      <div className="absolute inset-0 rounded-full border border-neutral-300 shadow-custom-inset" />
      <div className="absolute inset-1 scale-110 transform rounded-full border border-neutral-300 bg-neutral-50" />
    </div>
  )
}
