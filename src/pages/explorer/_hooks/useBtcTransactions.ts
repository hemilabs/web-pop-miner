import { useQueries, UseQueryOptions } from '@tanstack/react-query'
import camelcaseKeys from 'camelcase-keys'
// @ts-ignore ts(7016) - Remove once types are included in the package.
import { esploraClient } from 'esplora-client'
import { Satoshi } from 'types/Satoshi'

type Vin = {
  prevout: {
    value: Satoshi
  }
}

type Vout = {
  value: Satoshi
}

type Status = {
  blockHeight?: number
  blockTime?: number
  blockHash?: number
  confirmed: boolean
}

export type Transaction = {
  txid: string
  version: number
  locktime: number
  vin: Vin[]
  vout: Vout[]
  size: number
  weight: number
  sigops: number
  fee: number
  status: Status
  cost: number
}

const toCamelCase = <T extends Record<string, any> | readonly any[]>(obj: T) =>
  camelcaseKeys(obj, { deep: true })

const network = import.meta.env.VITE_PUBLIC_BITCOIN_NETWORK
const { bitcoin } = esploraClient({ network })

const fetchTransaction = (hash: string): Promise<Transaction | null> =>
  bitcoin.transactions
    .getTx({ txid: hash })
    .catch(function (err: Error) {
      if (err?.message.includes('not found')) {
        // It seems it takes a couple of seconds for the Tx for being picked up
        // Once it appears in the mempool, it will return the full object
        return null
      }
      throw err
    })
    .then(toCamelCase)
    .then((data: Transaction) => {
      if (!data) return null
      // Calculate total output value from original vout array
      const totalOutSatoshi = data.vout.reduce(
        (acc, vout) => acc + vout.value,
        0,
      )
      // Calculate total input value from vin array
      const totalInSatoshi = data.vin.reduce(
        (acc, vin) => acc + vin.prevout.value,
        0,
      )
      const cost = ((totalInSatoshi - totalOutSatoshi) / 100000000).toFixed(8)
      return { ...data, cost: parseFloat(cost) }
    })

export const useGetBtcBlockByTransaction = function (
  active: boolean,
  txHashes: string[],
) {
  const twoHoursInMilliseconds = 2 * 60 * 60 * 1000

  const queries = useQueries({
    queries: txHashes.map(
      txHash =>
        ({
          enabled: active,
          queryFn: () => fetchTransaction(txHash),
          queryKey: ['btc-block-transaction', txHash],
          refetchOnWindowFocus: false,
          refetchInterval(query) {
            const currentTime = new Date().getTime()
            if (query.state.data?.status.confirmed) return false

            // Check if the transaction has exceeded 2 hours
            const queryStartTime: number =
              typeof query.meta?.startTime === 'number'
                ? query.meta.startTime
                : 0
            if (currentTime - queryStartTime > twoHoursInMilliseconds) {
              return false
            }
            return 120 * 1000
          },
          refetchIntervalInBackground: true,
          meta: {
            startTime: new Date().getTime(),
            errorMessage: 'Failed to fetch transaction',
          },
        }) as UseQueryOptions<Transaction>,
    ),
  })

  const isLoading = queries.some(query => query.isLoading)
  const error = queries.find(query => query.error)?.error ?? null

  const transactions = queries
    .map(query => query.data)
    .filter(data => data) as Transaction[]
  const sortedTransactions = transactions.sort((a, b) => {
    if (a.status.confirmed === b.status.confirmed) {
      return (b.status.blockTime ?? 0) - (a.status.blockTime ?? 0)
    }
    return a.status.confirmed ? 1 : -1
  })

  return { transactions: sortedTransactions, isLoading, error }
}
