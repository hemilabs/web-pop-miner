import { useQueries, UseQueryOptions } from '@tanstack/react-query'
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
  confirmed: boolean
  block_height: number
  block_hash: string
  block_time: number
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

const fetchTransaction = async (hash: string): Promise<Transaction> => {
  const response = await fetch(
    `${import.meta.env.VITE_PUBLIC_MEMPOOL_API_URL}/api/tx/${hash}`,
  )
  const data = (await response) as Omit<Transaction, 'cost'>

  // Calculate total output value from original vout array
  const totalOutSatoshi = data.vout.reduce((acc, vout) => acc + vout.value, 0)
  // Calculate total input value from vin array
  const totalInSatoshi = data.vin.reduce(
    (acc, vin) => acc + vin.prevout.value,
    0,
  )

  const cost = ((totalInSatoshi - totalOutSatoshi) / 100000000).toFixed(8)

  return { ...data, cost: parseFloat(cost) }
}

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
  const sortedTransactions = transactions.sort((a, b) =>
    a.status.confirmed === b.status.confirmed
      ? b.status.block_time - a.status.block_time
      : a.status.confirmed
        ? 1
        : -1,
  )

  return { transactions: sortedTransactions, isLoading, error }
}
