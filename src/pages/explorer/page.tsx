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
import {
  Event,
  addEventListener,
  minerStatus,
  removeEventListener,
  startPoPMiner,
  stopPoPMiner,
} from '@hemilabs/pop-miner'
import { Toast, ToastType } from 'utils/toast'
import { handleError } from 'utils/handleError'

type TransactionEvent = Event & {
  txHash: string
}

const checkIfMinerIsRunning = function (): Promise<boolean> {
  return minerStatus()
    .then(status => {
      return status.running
    })
    .catch(error => {
      handleError('Error fetching miner status', error)
      return false
    })
}

export const ExplorerPage = () => {
  const navigate = useNavigate()
  const { state, setState } = usePopminerContext()
  const [hashes, setHashes] = useState<string[]>([])
  const balanceFetchIntervelms = 3 * 60 * 1000
  const minSatoshis: Satoshi = import.meta.env.VITE_MIN_SATOSHIS || 200000 // 0.002 tBTC -> 200,000 Satoshis
  const hemiBalance = () =>
    useHemiBalance(state.hemiAddress, balanceFetchIntervelms)
  const btcBalance = () =>
    useBtcBalance(state.bitcoinPubKeyHash, minSatoshis, balanceFetchIntervelms)
  const { transactions } = useGetBtcBlockByTransaction(true, hashes)

  useEffect(() => {
    if (!state.wasmInitialized) return

    checkIfMinerIsRunning().then(isRunning => {
      if (state.active && !isRunning) {
        startPoPMiner({
          network: 'testnet',
          privateKey: state.privateKey,
          staticFee: 50,
          logLevel: 'info',
        })
          .then(() =>
            Toast({ message: 'PoP miner active', type: ToastType.Success }),
          )
          .catch(err => handleError('Error starting PoP miner', err))
      }
      if (!state.active && isRunning) {
        stopPoPMiner()
          .then(() =>
            Toast({ message: 'PoP miner inactive', type: ToastType.Warning }),
          )
          .catch(err => handleError('Error stopping PoP miner', err))
      }
    })
  }, [state.active])

  useEffect(() => {
    const handleEvent = (event: Event) => {
      const { txHash } = event as TransactionEvent
      setHashes(prevHashes => {
        if (!prevHashes.includes(txHash)) {
          return [...prevHashes, txHash]
        }
        return prevHashes
      })
    }

    if (state.wasmInitialized) {
      addEventListener('transactionBroadcast', handleEvent)
        .then(() => console.log('transactionBroadcast event added'))
        .then(() => setState(prevState => ({ ...prevState, active: true })))
        .catch(err =>
          handleError('Error adding transactionBroadcast event', err),
        )
    }
    return () => {
      if (state.wasmInitialized) {
        removeEventListener('transactionBroadcast', handleEvent)
          .then(() => console.log('transactionBroadcast event removed'))
          .catch(err =>
            handleError('Error removing transactionBroadcast event', err),
          )
      }
    }
  }, [])

  useEffect(() => {
    if (!state.bitcoinPubKeyHash || !state.hemiAddress) {
      navigate('/manage')
    }
  }, [state.bitcoinPubKeyHash, state.hemiAddress])

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4">
      <div className="flex w-full max-w-7xl space-x-4 px-4">
        <ChainBalance
          title="Hemi Balance"
          chain={Chain.HemiTestnet}
          address={state.hemiAddress}
          explorerUrl={import.meta.env.VITE_HEMI_EXPLORER_URL}
          useBalance={hemiBalance}
        />
        <ChainBalance
          title="Bitcoin Balance"
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
  )
}
