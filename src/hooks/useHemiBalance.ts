import { useQuery } from '@tanstack/react-query'
import fetch from 'fetch-plus-plus'

type BalanceType = {
  tokenBalanceHex: string
  tokenBalance: number
}

const getTokenBalance = async (address: string): Promise<BalanceType> => {
  const hemiExplorerUrl = import.meta.env.VITE_HEMI_EXPLORER_URL
  const hemiContractAddress = import.meta.env.VITE_HEMI_CONTRACT_ADDRESS
  const balanceOfFunctionSelector = '0x70a08231'

  if (!hemiExplorerUrl) {
    throw new Error('VITE_HEMI_EXPLORER_URL is not defined')
  }
  if (!hemiContractAddress) {
    throw new Error('VITE_HEMI_CONTRACT_ADDRESS is not defined')
  }

  const data = {
    id: 1,
    jsonrpc: '2.0',
    method: 'eth_call',
    params: [
      {
        to: hemiContractAddress,
        data: `${balanceOfFunctionSelector}${address
          .substring(2)
          .padStart(64, '0')}`,
      },
      'latest',
    ],
  }

  const response = await fetch(`${hemiExplorerUrl}/api/eth-rpc`, {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    ignoreError: true,
    method: 'POST',
  })

  const tokenBalanceHex: string = response.result

  // Convert hex to decimal
  const tokenBalanceDecimal: bigint = BigInt(tokenBalanceHex || 0)
  const tokenBalance: number = Number(tokenBalanceDecimal) / 10 ** 18

  return { tokenBalanceHex, tokenBalance }
}

export const useHemiBalance = (
  publicAddress: string,
  forceRefreshIntervalms: number,
) => {
  const { data, isLoading, error, ...rest } = useQuery<BalanceType>({
    queryKey: ['hemiBalance', publicAddress],
    queryFn: () => getTokenBalance(publicAddress),
    enabled: !!publicAddress,
    refetchInterval() {
      if (forceRefreshIntervalms > 0) return forceRefreshIntervalms
      return false
    },
    refetchIntervalInBackground: true,
    meta: {
      errorMessage: 'Failed to fetch hemi balance',
    },
  })
  return {
    data,
    isLoading,
    totalLabelBalance: data?.tokenBalance.toFixed(4),
    error,
    ...rest,
  }
}
