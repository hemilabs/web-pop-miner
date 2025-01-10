import React from 'react';
import { BlockMarker } from './blockMarker';
import { Transaction } from '../_hooks/useBtcTransactions';
import Skeleton from 'react-loading-skeleton';
import { usePopminerContext } from 'context/popminerContext';

type DateTime = {
  date: string;
  time: string;
};

function convertTimestampToDateTime(timestamp: number | undefined): DateTime {
  const date = new Date((timestamp ?? 0) * 1000);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  const dateString = date.toLocaleDateString('en-US', options);

  const timeString = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    hour12: true,
    minute: '2-digit',
  });

  return {
    date: dateString,
    time: timeString,
  };
}

function abbreviateHash(
  hash: string,
  startLength: number = 9,
  endLength: number = 9,
): string {
  if (hash.length <= startLength + endLength) {
    return hash;
  }
  const start = hash.substring(0, startLength);
  const end = hash.substring(hash.length - endLength);
  return `${start}...${end}`;
}

interface Props {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: Props) {
  const { state } = usePopminerContext();
  return (
    <>
      <div className="relative max-h-[calc(100vh-25rem)] flex-grow overflow-y-auto rounded-t-xl border-l border-r border-t bg-neutral-50 pt-3">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-neutral-50 text-left text-sm text-neutral-600">
              <th className="px-8 py-2 pb-4 font-medium">Transaction</th>
              <th className="px-8 py-2 pb-4 font-medium">Status</th>
              <th className="px-8 py-2 pb-4 font-medium">Cost</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map(function ({ txid, status, cost }) {
              const { date, time } = convertTimestampToDateTime(
                status.confirmed ? status.blockTime : Date.now(),
              );
              const txLink = `${
                import.meta.env.VITE_PUBLIC_MEMPOOL_API_URL
              }/tx/${txid}`;
              return (
                <tr key={txid} className="border-t bg-white">
                  <td className="px-8 pb-3 pt-4">
                    <div className="flex items-center">
                      <BlockMarker />
                      <div className="ml-3 flex flex-col">
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-neutral-950">Block</span>
                          {!status.confirmed ? (
                            <Skeleton width={70} height={20} />
                          ) : (
                            <span className="text-neutral-500">
                              {status.blockHeight}
                            </span>
                          )}
                          <span className="text-neutral-950">-</span>
                          <a
                            href={txLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-950"
                          >
                            <span className="text-orange-950">
                              {abbreviateHash(txid)}
                            </span>
                          </a>
                        </div>
                        {!status.confirmed ? (
                          <Skeleton width={175} height={20} />
                        ) : (
                          <div className="text-sm text-neutral-500">
                            {date} • {time}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-2">
                    <div className="flex items-center gap-x-1">
                      <div
                        className={`h-2 w-2 rounded-full border ${
                          status.confirmed
                            ? 'border-emerald-400 bg-emerald-500'
                            : 'animate-blink border-amber-400 bg-amber-500'
                        }`}
                      />
                      <div
                        className={`text-sm ${
                          status.confirmed
                            ? 'text-emerald-600'
                            : 'text-amber-600'
                        }`}
                      >
                        {status.confirmed ? 'Completed' : 'In Progress'}
                      </div>
                    </div>
                    <div className="text-sm text-neutral-500">
                      {status.confirmed
                        ? 'Transaction Confirmed'
                        : 'Transaction sent'}
                    </div>
                  </td>
                  <td className="px-8 py-2 text-sm text-neutral-500">
                    <span className="rounded-full bg-neutral-50 p-2">
                      <span className="text-sm">-{cost}</span>
                    </span>
                    <span className="ml-1 text-sm text-neutral-500">tBTC</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {transactions.length === 0 ? (
        <div className="rounded-b-xl border-b border-l border-r bg-white">
          <div className="flex h-24 items-center justify-center text-base text-neutral-500">
            {state.active
              ? 'Waiting for incoming transactions'
              : 'There are no transactions'}
          </div>
        </div>
      ) : (
        <div className="h-3 rounded-b-xl border-b border-l border-r bg-white" />
      )}
    </>
  );
}
