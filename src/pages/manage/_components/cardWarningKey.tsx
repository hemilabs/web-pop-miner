import { WarningIcon } from 'icons/warningIcon'
import React from 'react'
import privateKeyLockedIcon from '/images/privateKeyLockedIcon.png'

export const CardWarningKey = () => {
  return (
    <div className="flex max-w-2xl flex-col p-8">
      <img
        src={privateKeyLockedIcon}
        alt="PrivateKeyLock"
        className="h-12 w-12"
      />
      <h1 className="mt-3 text-2xl font-normal text-neutral-950">
        Keep your secret private key safe
      </h1>
      <h2 className="mt-4 text-base font-normal text-slate-600">
        Practice caution whenever you need to use your Private Key and always
        verify the legitimacy of the application where you plan to enter your
        Private Key! If anyone gains access to your Private Key, your wallet
        will be compromised and you will not be able to prevent them from
        accessing your funds.
      </h2>
      <div className="mt-8 rounded-2xl border border-solid border-slate-100 bg-gray-100 p-2">
        <div className="rounded-xl bg-rose-100 px-7 py-6">
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
    </div>
  )
}
