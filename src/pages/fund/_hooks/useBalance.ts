import { useQuery } from '@tanstack/react-query'

type BalanceType = {
  confirmedBalance: number
  unconfirmedBalance: number
}

/**
 * Fetches the balance asynchronously.
 * This is a mock function that simulates a balance fetch.
 * It will be replaced with a real function that fetches the balance from the blockchain.
 * @returns A promise that resolves to the balance.
 */
const mockFetchBalance = async (): Promise<BalanceType> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ confirmedBalance: 200000, unconfirmedBalance: 0 })
    }, 2000)
  })
}

export const useBalance = (
  publicAddress: string | undefined,
  minSatoshis: number,
) => {
  return useQuery<BalanceType>({
    enabled: !!publicAddress,
    initialData: { confirmedBalance: 0, unconfirmedBalance: 0 },
    queryFn: mockFetchBalance,
    queryKey: ['tbtcBalance', publicAddress],
    refetchInterval(query) {
      if ((query.state.data?.confirmedBalance ?? 0) >= minSatoshis) {
        return false
      }
      return 30 * 1000
    },
    refetchIntervalInBackground: true,
    meta: {
      errorMessage: 'Failed to fetch balance',
    },
  })
}
