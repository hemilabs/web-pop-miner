import { useQuery } from '@tanstack/react-query'

export type CostsRewardsType = {
  bitcoinCost: number
  hemiReward: number
}

/**
 * Fetches costs and rewards asynchronously.
 * This is a mock function that simulates a costs and rewards fetch.
 * It will be replaced with a real function that fetches the
 *  costs and rewards from the blockchain.
 * @returns A promise that resolves to the CostsRewards.
 */
const mockFetchCostsRewards = async (): Promise<CostsRewardsType> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ bitcoinCost: -0.00015, hemiReward: 1 })
    }, 2000)
  })
}

export const useCostsRewards = () => {
  return useQuery<CostsRewardsType>({
    enabled: true,
    queryFn: mockFetchCostsRewards,
    queryKey: ['popCostsRewards'],
    meta: {
      errorMessage: 'Failed to fetch costs and rewards',
    },
  })
}

export const calculateCostsRewards = (baseData: CostsRewardsType) => {
  return [
    {
      id: 0,
      time: '1 Hr',
      cost: baseData.bitcoinCost.toFixed(5),
      reward: `+${baseData.hemiReward}`,
      unit: 'HEMI',
    },
    {
      id: 1,
      time: '12 Hrs',
      cost: (baseData.bitcoinCost * 12).toFixed(5),
      reward: `+${baseData.hemiReward * 12}`,
      unit: 'HEMI',
    },
    {
      id: 2,
      time: '24 Hrs',
      cost: (baseData.bitcoinCost * 24).toFixed(5),
      reward: `+${baseData.hemiReward * 24}`,
      unit: 'HEMI',
    },
  ]
}
