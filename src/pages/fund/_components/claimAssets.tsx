import React from 'react'
import { ClaimDiscordIcon } from 'icons/claimDiscordIcon'
import bitcoinWalletIcon from '/images/bitcoinWalletIcon.png'

type ClaimCardProps = {
  iconText: string
  title: string
  subtitle: string
  additionalText: string
  finalText?: string
}

const ClaimCard = ({
  iconText,
  title,
  subtitle,
  additionalText,
  finalText,
}: ClaimCardProps) => {
  return (
    <a
      href={import.meta.env.VITE_HEMI_DISCORD_URL}
      rel="noopener noreferrer"
      target="_blank"
      className="flex flex-1 cursor-pointer flex-col"
    >
      <div className="rounded border border-solid border-slate-100 bg-white p-4 text-sm text-neutral-600 shadow-custom-claim-assets">
        <div className="inline-flex w-auto items-center rounded bg-orange-50 p-1 px-2">
          <ClaimDiscordIcon />
          <span className="ml-2 text-base font-medium text-orange-500">
            {iconText}
          </span>
        </div>
        <div className="mt-5 flex flex-col space-y-1 text-base">
          <span className="text-neutral-950">{title}</span>
          <div className="flex space-x-1 text-sm">
            <span className="text-neutral-500">{subtitle}</span>
            <span className="text-neutral-950">{additionalText}</span>
            <span className="text-neutral-500">{finalText}</span>
          </div>
        </div>
      </div>
    </a>
  )
}

export const ClaimAssets = () => {
  return (
    <div className="flex max-w-2xl flex-col p-8">
      <img src={bitcoinWalletIcon} alt="PrivateKeyLock" className="h-12 w-12" />
      <h1 className="mt-3 text-2xl font-normal text-neutral-950">
        Why do I need to send {import.meta.env.VITE_MIN_SATOSHIS / 100000000}{' '}
        tBTC to the provided address?
      </h1>
      <h2 className="mt-4 text-base font-normal text-slate-600">
        That amount of testnet Bitcoin (tBTC) will cover the gas fee for the PoP
        miner to start mining.
      </h2>
      <div className="mt-4 flex-1 rounded-2xl border border-solid border-slate-100 bg-neutral-100 p-4 shadow-custom-claim-assets">
        <div className="text-base font-medium text-neutral-500">
          Need testnet Bitcoin?
          <span className="ml-1 text-neutral-950">Join our Discord!</span>
        </div>
        <div className="mt-4 flex space-x-4">
          <ClaimCard
            iconText="#claim-capsule"
            title="Claim a Capsule"
            subtitle="And earn"
            additionalText="0.1 tBTC"
            finalText="and more..."
          />
          <ClaimCard
            iconText="#faucet"
            title="Try our Discord faucet"
            subtitle="And earn"
            additionalText="0.1 tBTC"
          />
        </div>
      </div>
    </div>
  )
}
