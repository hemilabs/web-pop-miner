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

const blockstreamApiUrl = import.meta.env.VITE_PUBLIC_BLOCKSTREAM_API_URL
const mempoolApiUrl = import.meta.env.VITE_PUBLIC_MEMPOOL_API_URL

const fetchBalanceFromApi = async (
  url: string,
  publicAddress: string,
): Promise<ChainBalance> => {
  const response = await fetch(`${url}/api/address/${publicAddress}`)
  if (!response) {
    throw new Error('Failed to fetch balance')
  }
  response.total =
    response.chain_stats.funded_txo_sum - response.chain_stats.spent_txo_sum
  return response
}

const getRandomApiUrl = () => {
  return Math.random() < 0.5 ? blockstreamApiUrl : mempoolApiUrl
}

const fetchWithRedundancy = (publicAddress: string): Promise<ChainBalance> => {
  const primaryApiUrl = getRandomApiUrl()
  const secondaryApiUrl =
    primaryApiUrl === blockstreamApiUrl ? mempoolApiUrl : blockstreamApiUrl

  return fetchBalanceFromApi(primaryApiUrl, publicAddress).catch(
    function (error) {
      console.warn(`Primary API failed: ${primaryApiUrl}. Error: ${error}`)

      return fetchBalanceFromApi(secondaryApiUrl, publicAddress).catch(
        function (secondaryError) {
          console.error(
            `Secondary API also failed: ${secondaryApiUrl}. Error: ${secondaryError}`,
          )
          throw new Error('Both APIs failed to fetch balance')
        },
      )
    },
  )
}

export const useBtcBalance = (
  publicAddress: string | undefined,
  minSatoshis: Satoshi,
  forceRefreshIntervalms: number,
) => {
  const { data, isLoading, error, ...rest } = useQuery<ChainBalance>({
    enabled: !!publicAddress,
    queryFn: () => fetchWithRedundancy(publicAddress!),
    queryKey: ['tbtcBalance', publicAddress],
    refetchInterval(query) {
      if (forceRefreshIntervalms > 0) return forceRefreshIntervalms
      const totalSatoshis = query.state.data?.total ?? 0
      if (totalSatoshis >= minSatoshis) {
        return false
      }
      return 120 * 1000
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
