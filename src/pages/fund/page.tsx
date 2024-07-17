import { StringViewer } from 'components/stringViewer'
import { WaitingAddress } from './_components/waitingAddress'
import { AddressFunded } from './_components/addressFunded'
import { usePopminerContext } from 'context/popminerContext'
import { useNavigate } from 'react-router-dom'
import { useBtcBalance } from 'hooks/useBtcBalance'
import { Satoshi } from 'types/Satoshi'
import { useEffect } from 'react'

const minSatoshis: Satoshi = import.meta.env.VITE_MIN_SATOSHIS || 200000 // 0.002 tBTC -> 200,000 Satoshis

export const FundPage = function () {
  const { state } = usePopminerContext()
  const navigate = useNavigate()

  const { totalBalance, isLoading } = useBtcBalance(
    state.bitcoinPublicKeyHash,
    minSatoshis,
    0,
  )

  const isAddressFunded = !isLoading && (totalBalance ?? 0) >= minSatoshis
  const isAddressPending = isLoading || (totalBalance ?? 0) < minSatoshis

  const handleContinue = () => {
    if (isAddressFunded) {
      navigate('/explorer')
    }
  }

  useEffect(() => {
    if (!state.bitcoinPublicKeyHash) {
      navigate('/manage')
    }
  }, [state.bitcoinPublicKeyHash])

  return (
    <div className="flex flex-col pt-8">
      <div className="grid w-full grid-cols-3-column-layout">
        <div className="col-start-2 mx-auto max-w-lg">
          <div className="rounded-3xl border border-solid border-slate-100 bg-white p-9">
            <div className="flex w-full flex-col gap-y-3">
              <div className="flex flex-wrap items-center text-2xl font-medium leading-tight text-neutral-950">
                <h2 className="flex w-full flex-wrap items-center">
                  <span className="mr-2">Send at least</span>
                  <span className="mx-2 flex items-center whitespace-nowrap rounded-full bg-neutral-100 px-2 py-1">
                    <span className="mr-1 text-xl">0.002</span>
                    <span className="text-xl text-neutral-500">tBTC</span>
                  </span>
                  <span>to this address to start mining</span>
                </h2>
              </div>
              <p className="text-base leading-normal text-neutral-500">
                This amount of tBTC will pay for the transaction fees once the
                PoP miner starts mining.
              </p>
              <div className="mt-4">
                <StringViewer
                  text={state.bitcoinPublicKeyHash}
                  title="Bitcoin Address"
                  enableCopyToClipboard={true}
                />
              </div>
              {isAddressPending && <WaitingAddress />}
              {isAddressFunded && <AddressFunded />}
              <div className="mt-4">
                <button
                  onClick={handleContinue}
                  className={`h-14 w-full rounded-xl bg-orange-950 text-lg text-white 
                ${
                  isAddressFunded
                    ? 'cursor-pointer bg-opacity-90 hover:bg-opacity-100'
                    : 'cursor-default bg-opacity-40'
                }`}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
