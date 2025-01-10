/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { ChainBalance } from './_components/chainBalance';
import { TransactionTable } from './_components/transactions';
import { useHemiBalance } from 'hooks/useHemiBalance';
import { Chain } from 'enums/chain';
import { usePopminerContext } from 'context/popminerContext';
import { useBtcBalance } from 'hooks/useBtcBalance';
import { Satoshi } from 'types/Satoshi';
import { useGetBtcBlockByTransaction } from './_hooks/useBtcTransactions';
import { useNavigate } from 'react-router-dom';
import {
  Event,
  addEventListener,
  minerStatus,
  removeEventListener,
  startPoPMiner,
  stopPoPMiner,
} from '@hemilabs/pop-miner';
import { toastNotify, ToastType } from 'utils/toast';
import { handleError } from 'utils/handleError';
import { InfoIcon } from 'icons/infoIcon';
import { Tooltip } from 'components/tooltip';

type TransactionEvent = Event & {
  txHash: string;
};

const checkIfMinerIsRunning = (): Promise<boolean> =>
  minerStatus()
    .then(status => status.running)
    .catch(function (error) {
      handleError('Error fetching miner status', error);
      return false;
    });

export function ExplorerPage() {
  const navigate = useNavigate();
  const { state, setState } = usePopminerContext();
  const [hashes, setHashes] = useState<string[]>([]);
  const balanceFetchIntervelms = 3 * 60 * 1000;
  const minSatoshis: Satoshi = import.meta.env.VITE_MIN_SATOSHIS || 200000; // 0.002 tBTC -> 200,000 Satoshis
  const hemiBalance = () =>
    useHemiBalance(state.hemiAddress, balanceFetchIntervelms);
  const btcBalance = () =>
    useBtcBalance(state.bitcoinPubKeyHash, minSatoshis, balanceFetchIntervelms);
  const { transactions } = useGetBtcBlockByTransaction(true, hashes);

  useEffect(
    function () {
      if (!state.wasmInitialized) return;

      // eslint-disable-next-line promise/catch-or-return
      checkIfMinerIsRunning().then(function (isRunning) {
        if (state.active && !isRunning) {
          startPoPMiner({
            automaticFees: 'fastest',
            logLevel: 'info',
            network: 'testnet',
            privateKey: state.privateKey,
            staticFee: 50,
          })
            .then(() =>
              toastNotify({
                message: 'PoP miner active',
                type: ToastType.Success,
              }),
            )
            .catch(err => handleError('Error starting PoP miner', err));
        }
        if (!state.active && isRunning) {
          stopPoPMiner()
            .then(() =>
              toastNotify({
                message: 'PoP miner inactive',
                type: ToastType.Warning,
              }),
            )
            .catch(err => handleError('Error stopping PoP miner', err));
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.active],
  );

  useEffect(function () {
    const handleEvent = function (event: Event) {
      const { txHash } = event as TransactionEvent;
      setHashes(function (prevHashes) {
        if (!prevHashes.includes(txHash)) {
          return [...prevHashes, txHash];
        }
        return prevHashes;
      });
    };

    if (state.wasmInitialized) {
      addEventListener('transactionBroadcast', handleEvent)
        .then(() => setState(prevState => ({ ...prevState, active: true })))
        .catch(err =>
          handleError('Error adding transactionBroadcast event', err),
        );
    }
    return function () {
      if (state.wasmInitialized) {
        removeEventListener('transactionBroadcast', handleEvent)
          // eslint-disable-next-line arrow-body-style
          .then(() => {
            // eslint-disable-next-line promise/catch-or-return
            checkIfMinerIsRunning().then(function (isRunning) {
              if (isRunning) {
                stopPoPMiner()
                  .then(function () {
                    setState(prevState => ({ ...prevState, active: false }));
                    toastNotify({
                      message: 'PoP miner inactive',
                      type: ToastType.Warning,
                    });
                  })
                  .catch(function (err) {
                    handleError('Error stopping PoP miner', err);
                  });
              }
            });
          })
          .catch(err =>
            handleError('Error removing transactionBroadcast event', err),
          );
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    function () {
      if (!state.bitcoinPubKeyHash || !state.hemiAddress) {
        navigate('/manage');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.bitcoinPubKeyHash, state.hemiAddress],
  );

  const renderHemiIcon = () => (
    <Tooltip
      id="themi-tooltip"
      overlayInnerStyle={{
        animation: 'fadeIn 0.5s ease-in-out forwards',
        background: 'black',
        border: '0',
        borderRadius: '12px',
        maxWidth: '390px',
      }}
      overlay={
        <div className="flex flex-col items-start gap-y-2 p-1">
          <h1 className="text-lg font-normal text-white">
            Add the HEMI contract to your wallet
          </h1>
          <h2 className="text-base font-normal text-neutral-400">
            If you can't see the HEMI balance in your wallet, try adding the
            contract.
          </h2>
          <a
            href={`${
              import.meta.env.VITE_HEMI_DOCS_URL
            }/how-to-tutorials/pop-mining/add-themi-to-metamask`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="mt-2 text-base font-normal text-white underline">
              Add contract
            </span>
          </a>
        </div>
      }
    >
      <InfoIcon />
    </Tooltip>
  );

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4">
      <div className="flex w-full max-w-7xl space-x-4 px-4">
        <ChainBalance
          title="Testnet HEMI balance"
          chain={Chain.HemiTestnet}
          chainIcon={renderHemiIcon()}
          address={state.hemiAddress}
          explorerUrl={import.meta.env.VITE_HEMI_EXPLORER_URL}
          useBalance={hemiBalance}
        />
        <ChainBalance
          title="Testnet Bitcoin balance"
          chain={Chain.BitcoinTestnet}
          address={state.bitcoinPubKeyHash}
          explorerUrl={import.meta.env.VITE_PUBLIC_MEMPOOL_API_URL}
          useBalance={btcBalance}
        />
      </div>
      <div className="w-full max-w-7xl px-4 pt-4">
        <span className="text-xl font-normal text-neutral-950">
          Latest Transactions
        </span>
      </div>
      <div className="w-full max-w-7xl px-4">
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
}
