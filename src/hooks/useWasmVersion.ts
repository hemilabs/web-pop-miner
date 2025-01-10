import { usePopminerContext } from '../context/popminerContext';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { version, VersionResult } from '@hemilabs/pop-miner';

export function useWasmVersion(): UseQueryResult<VersionResult> {
  const { state } = usePopminerContext();
  return useQuery<VersionResult>({
    enabled: state.wasmInitialized,
    meta: {
      errorMessage: 'Failed to fetch WASM version',
    },
    queryFn: () => version(),
    queryKey: ['wasmVersion'],
  });
}
