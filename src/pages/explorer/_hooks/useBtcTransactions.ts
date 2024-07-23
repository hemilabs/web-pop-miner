import { useQueries, UseQueryOptions } from '@tanstack/react-query'
import camelcaseKeys from 'camelcase-keys'
import fetch from 'fetch-plus-plus'
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

const fetchTransaction = (hash: string): Promise<Transaction | null> =>
  fetch(`${import.meta.env.VITE_PUBLIC_MEMPOOL_API_URL}/api/tx/${hash}`)
    .catch(function (err) {
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
  const queries = useQueries({
    queries: txHashes.map(
      txHash =>
        ({
          enabled: active,
          queryFn: () => fetchTransaction(txHash),
          queryKey: ['btc-block-transaction', txHash],
          refetchInterval(query) {
            if (query.state.data?.status.confirmed) return false
            return 60 * 1000
          },
          refetchIntervalInBackground: true,
          meta: {
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
