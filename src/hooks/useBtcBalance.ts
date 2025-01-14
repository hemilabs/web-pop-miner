import { useQuery } from '@tanstack/react-query';
// @ts-expect-error ts(7016) - Remove once types are included in the package.
import { esploraClient } from 'esplora-client';
import { Satoshi } from 'types/Satoshi';

type ChainBalance = {
  address: string;
  chain_stats: {
    funded_txo_sum: number;
    spent_txo_sum: number;
  };
  total: number;
};

const network = import.meta.env.VITE_PUBLIC_BITCOIN_NETWORK;
const { bitcoin } = esploraClient({ network });

export function useBtcBalance(
  publicAddress: string | undefined,
  minSatoshis: Satoshi,
  forceRefreshIntervalms: number,
) {
  const { data, isLoading, error, ...rest } = useQuery<ChainBalance>({
    enabled: !!publicAddress,
    meta: {
      errorMessage: 'Failed to fetch balance',
    },
    async queryFn() {
      const response = await bitcoin.addresses.getAddress({
        address: publicAddress,
      });
      if (!response) {
        throw new Error('Failed to fetch balance');
      }
      response.total =
        response.chain_stats.funded_txo_sum -
        response.chain_stats.spent_txo_sum;
      return response;
    },
    queryKey: ['tbtcBalance', publicAddress],
    refetchInterval(query) {
      if (forceRefreshIntervalms > 0) return forceRefreshIntervalms;
      const totalSatoshis = query.state.data?.total ?? 0;
      if (totalSatoshis >= minSatoshis) {
        return false;
      }
      return 120 * 1000;
    },
    refetchIntervalInBackground: true,
  });

  const totalBalance = data?.total ?? 0;
  const totalLabelBalance = (totalBalance / 100000000).toFixed(8) || undefined;

  return {
    data,
    error,
    isLoading,
    totalBalance,
    totalLabelBalance,
    ...rest,
  };
}
