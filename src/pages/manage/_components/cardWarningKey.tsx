import { WarningIcon } from 'icons/warningIcon'
import React from 'react'

export const CardWarningKey = () => {
  return (
    <div className="rounded-3xl border border-solid border-slate-100 bg-white p-2">
      <div className="rounded-xl bg-red-50 px-7 py-6">
        <div className="flex items-center space-x-2">
          <WarningIcon />
          <h3 className="font-medium text-red-warning">
            Make sure to save your private key to continue mining.
          </h3>
        </div>
        <div className="mt-3">
          <span className="text-base font-medium text-neutral-600">
            Your private key provides full access to your wallet and funds.
          </span>
        </div>
        <ul className="mt-3 list-disc pl-6 font-semibold text-neutral-950">
          <li>Hemi team members will never ask you for private keys.</li>
          <li>Do not share it with anyone.</li>
        </ul>
      </div>
    </div>
  )
}
