import { useQuery } from '@tanstack/react-query';

export type CostsRewardsType = {
  bitcoinCost: number;
  hemiReward: number;
};

/**
 * Fetches costs and rewards asynchronously.
 * This is a mock function that simulates a costs and rewards fetch.
 * It will be replaced with a real function that fetches the
 *  costs and rewards from the blockchain.
 * @returns A promise that resolves to the CostsRewards.
 */
const mockFetchCostsRewards = async (): Promise<CostsRewardsType> =>
  new Promise(function (resolve) {
    setTimeout(function () {
      resolve({ bitcoinCost: -0.00015, hemiReward: 1 });
    }, 2000);
  });

export const useCostsRewards = () =>
  useQuery<CostsRewardsType>({
    enabled: true,
    meta: {
      errorMessage: 'Failed to fetch costs and rewards',
    },
    queryFn: mockFetchCostsRewards,
    queryKey: ['popCostsRewards'],
  });

export const calculateCostsRewards = (baseData: CostsRewardsType) => [
  {
    cost: baseData.bitcoinCost.toFixed(5),
    id: 0,
    reward: `+${baseData.hemiReward}`,
    time: '1 Hr',
    unit: 'HEMI',
  },
  {
    cost: (baseData.bitcoinCost * 12).toFixed(5),
    id: 1,
    reward: `+${baseData.hemiReward * 12}`,
    time: '12 Hrs',
    unit: 'HEMI',
  },
  {
    cost: (baseData.bitcoinCost * 24).toFixed(5),
    id: 2,
    reward: `+${baseData.hemiReward * 24}`,
    time: '24 Hrs',
    unit: 'HEMI',
  },
];
