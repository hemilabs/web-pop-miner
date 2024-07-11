import { useQuery } from '@tanstack/react-query'
import fetch from 'fetch-plus-plus'
import { Satoshi } from 'types/Satoshi'

type ChainBalance = {
  chain_stats: {
    funded_txo_sum: number
    spent_txo_sum: number
  }
  total: number
}

export const useBtcBalance = (
  publicAddress: string | undefined,
  minSatoshis: Satoshi,
  forceRefreshIntervalms: number,
) => {
  const { data, isLoading, error, ...rest } = useQuery<ChainBalance>({
    enabled: !!publicAddress,
    queryFn: async () => {
      const response = await fetch(
        `${
          import.meta.env.VITE_PUBLIC_MEMPOOL_API_URL
        }/api/address/${publicAddress}`,
      )
      if (!response) {
        throw new Error('Failed to fetch balance')
      }
      response.total =
        response.chain_stats.funded_txo_sum - response.chain_stats.spent_txo_sum
      return response
    },
    queryKey: ['tbtcBalance', publicAddress],
    refetchInterval(query) {
      if (forceRefreshIntervalms > 0) return forceRefreshIntervalms
      const totalSatoshis = query.state.data?.total ?? 0
      if (totalSatoshis >= minSatoshis) {
        return false
      }
      return 30 * 1000
    },
    refetchIntervalInBackground: true,
    meta: {
      errorMessage: 'Failed to fetch balance',
    },
  })

  const totalBalance = data?.total ?? 0
  const totalLabelBalance = (totalBalance / 100000000).toFixed(8) || undefined

  return {
    data,
    isLoading,
    totalBalance,
    totalLabelBalance,
    error,
    ...rest,
  }
}
