import { Chain } from 'enums/chain';
import { CopyIcon } from 'icons/copyIcon';
import { OpenLinkIcon } from 'icons/openLinkIcon';
import React, { ReactNode } from 'react';
import Skeleton from 'react-loading-skeleton';
import { toastNotify, ToastType } from 'utils/toast';

/**
 * Props for the ChainBalance component.
 * @interface
 * @property {string} title - The title of the balance.
 * @property {Chain} chain - The chain.
 * @property {ReactNode} chainIcon - The chain icon.
 * @property {string} address - The address.
 * @property {string} explorerUrl - The url of the explorer.
 * @property {void} useBalance - The useBalance function.
 */
interface Props {
  title: string;
  chain: Chain;
  chainIcon?: ReactNode;
  address: string;
  explorerUrl: string;
  useBalance: () => { totalLabelBalance?: string; isLoading: boolean };
}

const handleCopyToClipboard = async function (text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toastNotify({ message: 'Copied to clipboard', type: ToastType.Success });
  } catch (err) {
    toastNotify({ message: `Failed to copy: ${err}`, type: ToastType.Error });
  }
};

export function ChainBalance({
  title,
  chain,
  chainIcon,
  address,
  explorerUrl,
  useBalance,
}: Props) {
  const { totalLabelBalance, isLoading } = useBalance();

  return (
    <div className="min-w-80 flex-1 rounded-xl border border-solid border-slate-100 bg-white p-4">
      <div className="text-sm font-medium text-neutral-500">{title}</div>
      <div className="mt-2 flex items-center text-2xl text-neutral-950">
        <div className="mr-2 h-6 w-[2px] bg-neutral-200" />
        {isLoading ? (
          <Skeleton width={100} height={24} />
        ) : (
          <span>{totalLabelBalance}</span>
        )}
        <span className="ml-2 mr-1 text-base text-neutral-500">{chain}</span>
        {chainIcon}
      </div>
      <div className="mt-4 flex items-center justify-between break-all rounded border border-solid border-slate-100 bg-neutral-50 p-2 text-sm text-neutral-600">
        <span>{address}</span>
        <div className="flex items-center space-x-2">
          <div
            onClick={() => handleCopyToClipboard(address)}
            className="cursor-pointer"
          >
            <CopyIcon />
          </div>
          <div className="ml-1 cursor-pointer">
            <a
              href={`${explorerUrl}/address/${address}?tab=tokens`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <OpenLinkIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
