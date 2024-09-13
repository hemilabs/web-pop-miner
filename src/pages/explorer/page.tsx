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
import { InfoIcon } from 'icons/infoIcon'
import { Tooltip } from 'components/tooltip'

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
          automaticFees: 'fastest',
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
          .then(() => {
            checkIfMinerIsRunning().then(isRunning => {
              if (isRunning) {
                stopPoPMiner()
                  .then(() => {
                    setState(prevState => ({ ...prevState, active: false }))
                    Toast({
                      message: 'PoP miner inactive',
                      type: ToastType.Warning,
                    })
                  })
                  .catch(err => handleError('Error stopping PoP miner', err))
              }
            })
          })
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

  const renderHemiIcon = () => {
    return (
      <Tooltip
        id="themi-tooltip"
        overlayInnerStyle={{
          background: 'black',
          border: '0',
          borderRadius: '12px',
          maxWidth: '390px',
          animation: 'fadeIn 0.5s ease-in-out forwards',
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
    )
  }

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
          explorerUrl={import.meta.env.VITE_PUBLIC_BLOCKSTREAM_API_URL}
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
