import React, { useEffect, useState } from 'react'
import { ChainBalance } from './_components/chainBalance'
import { TransactionTable } from './_components/transactions'
import { useHemiBalance } from 'hooks/useHemiBalance'
import { Chain } from 'enums/chain'
import { usePopminerContext } from 'context/popminerContext'
import { useBtcBalance } from 'hooks/useBtcBalance'
import { Satoshi } from 'types/Satoshi'
import { useGetBtcBlockByTransaction } from './_hooks/useBtcTransactions'
import { useNavigate } from 'react-router-dom'
import { startPoPMiner, stopPoPMiner } from '@hemilabs/pop-miner'
import { Toast, ToastType } from 'utils/toast'

export const ExplorerPage = () => {
  const navigate = useNavigate()
  const { state } = usePopminerContext()
  const [hashes, setHashes] = useState<string[]>([])
  const balanceFetchIntervelms = 3 * 60 * 1000
  const minSatoshis: Satoshi = import.meta.env.VITE_MIN_SATOSHIS || 200000 // 0.002 tBTC -> 200,000 Satoshis
  const hemiBalance = () =>
    useHemiBalance(state.hemiAddress, balanceFetchIntervelms)
  const btcBalance = () =>
    useBtcBalance(
      state.bitcoinPublicKeyHash,
      minSatoshis,
      balanceFetchIntervelms,
    )
  const { transactions } = useGetBtcBlockByTransaction(true, hashes)

  /**
   * We will need to improve this part of the code.
   * Basically we need to know if the PoP miner is not running
   * to avoid starting or stopping it when it is not necessary.
   * This is temporary until we have the issue below done
   * https://github.com/hemilabs/heminetwork/issues/171
   */
  useEffect(() => {
    if (state.active && state.wasmInitialized) {
      startPoPMiner({
        network: 'testnet',
        privateKey: state.bitcoinPrivateKey,
        staticFee: 50,
        logLevel: 'info',
      })
        .then(() =>
          Toast({ message: 'PoP miner active', type: ToastType.Success }),
        )
        .catch(err => {
          console.log('Error starting PoP miner', err.message, err.code)
          Toast({ message: `Error: ${err.message}`, type: ToastType.Error })
        })
    }
    if (!state.active && state.wasmInitialized) {
      stopPoPMiner()
        .then(() =>
          Toast({ message: 'PoP miner inactive', type: ToastType.Success }),
        )
        .catch(err => {
          /**
           * It is ignoring the stopPoPMiner error for now (no toast).
           * Because on the component mount the PoP miner is not running.
           * and the stopPoPMiner will return an error.
           * we can ignore it safely.
           * This is temporary until we have the issue below done
           * https://github.com/hemilabs/heminetwork/issues/171
           */
          console.log('Error stopping PoP miner', err.message, err.code)
        })
    }
  }, [state.active])

  useEffect(() => {
    /**
     * Handles the log event and extracts the transaction hash from the log message.
     * If a valid transaction hash is found, it is added to the list of hashes.
     * This is temporary until we have the issue below done
     * https://github.com/hemilabs/heminetwork/issues/150
     * @param event - The custom event containing the log message.
     */
    const handleLogEvent = (event: CustomEvent) => {
      const logMessage = event.detail as string
      const txHashRegex =
        /Successfully broadcast PoP transaction to Bitcoin with TX hash (\b[0-9a-f]{64}\b)/
      const match = logMessage.match(txHashRegex)

      if (match) {
        const txHash = match[1]
        console.log('txHash by event listener', txHash)
        // Delay the execution of setHashes by 5 seconds
        setTimeout(() => {
          setHashes(prevHashes => {
            if (!prevHashes.includes(txHash)) {
              return [...prevHashes, txHash]
            }
            return prevHashes
          })
        }, 5 * 1000)
      }
    }

    document.addEventListener('logEvent', handleLogEvent as EventListener)
    return () => {
      document.removeEventListener('logEvent', handleLogEvent as EventListener)
    }
  }, [])

  useEffect(() => {
    if (!state.bitcoinPublicKeyHash || !state.hemiAddress) {
      navigate('/manage')
    }
  }, [state.bitcoinPublicKeyHash, state.hemiAddress])

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4">
      <div className="flex w-full max-w-7xl space-x-4 px-4">
        <ChainBalance
          title="HEMI Balance"
          chain={Chain.HemiTestnet}
          address={state.hemiAddress}
          explorerUrl={import.meta.env.VITE_HEMI_EXPLORER_URL}
          useBalance={hemiBalance}
        />
        <ChainBalance
          title="Bitcoin Balance"
          chain={Chain.BitcoinTestnet}
          address={state.bitcoinPublicKeyHash}
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
  )
}
