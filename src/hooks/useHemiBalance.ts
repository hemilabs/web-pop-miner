import { useQuery } from '@tanstack/react-query';
import fetch from 'fetch-plus-plus';

type BalanceType = {
  tokenBalanceHex: string;
  tokenBalance: number;
};

const getTokenBalance = async function (address: string): Promise<BalanceType> {
  const hemiExplorerUrl = import.meta.env.VITE_HEMI_EXPLORER_URL;
  const hemiContractAddress = import.meta.env.VITE_HEMI_CONTRACT_ADDRESS;
  const balanceOfFunctionSelector = '0x70a08231';

  if (!hemiExplorerUrl) {
    throw new Error('VITE_HEMI_EXPLORER_URL is not defined');
  }
  if (!hemiContractAddress) {
    throw new Error('VITE_HEMI_CONTRACT_ADDRESS is not defined');
  }

  const data = {
    id: 1,
    jsonrpc: '2.0',
    method: 'eth_call',
    params: [
      {
        data: `${balanceOfFunctionSelector}${address
          .substring(2)
          .padStart(64, '0')}`,
        to: hemiContractAddress,
      },
      'latest',
    ],
  };

  const response = await fetch(`${hemiExplorerUrl}/api/eth-rpc`, {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    ignoreError: true,
    method: 'POST',
  });

  const tokenBalanceHex: string = response.result;

  // Convert hex to decimal
  const tokenBalanceDecimal: bigint = BigInt(tokenBalanceHex || 0);
  const tokenBalance: number = Number(tokenBalanceDecimal) / 10 ** 18;

  return { tokenBalance, tokenBalanceHex };
};

export function useHemiBalance(
  publicAddress: string,
  forceRefreshIntervalms: number,
) {
  const { data, isLoading, error, ...rest } = useQuery<BalanceType>({
    enabled: !!publicAddress,
    meta: {
      errorMessage: 'Failed to fetch hemi balance',
    },
    queryFn: () => getTokenBalance(publicAddress),
    queryKey: ['hemiBalance', publicAddress],
    refetchInterval() {
      if (forceRefreshIntervalms > 0) return forceRefreshIntervalms;
      return false;
    },
    refetchIntervalInBackground: true,
  });
  return {
    data,
    error,
    isLoading,
    totalLabelBalance: data?.tokenBalance.toFixed(4),
    ...rest,
  };
}
