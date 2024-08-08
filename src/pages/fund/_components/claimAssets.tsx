import React from 'react'
import { ClaimDiscordIcon } from 'icons/claimDiscordIcon'

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
    <div className="flex-1 rounded-3xl border border-solid border-slate-100 bg-gray-50 p-4 shadow-custom-claim-assets">
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
  )
}
