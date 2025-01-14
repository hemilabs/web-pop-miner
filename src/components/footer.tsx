import { useWasmVersion } from '../hooks/useWasmVersion';

function WasmVersion() {
  const { data, isLoading } = useWasmVersion();

  if (isLoading || !data) {
    return <span>Loading WASM...</span>;
  }

  return (
    <span>
      WASM v{data.version}{' '}
      <a
        href={`https://github.com/hemilabs/heminetwork/commit/${data.gitCommit}`}
        target="_blank"
        rel="noopener external"
      >
        ({data.gitCommit.substring(0, 7)})
      </a>
    </span>
  );
}

export const Footer = () => (
  <footer className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-zinc-500">
    <span className="ml-4 md:ml-16">
      © {new Date().getFullYear()} Hemi Labs, Inc.
    </span>
    <div className="mr-4 flex flex-col text-right md:mr-16">
      <span>PoP Miner v{APP_VERSION}</span>
      <small>
        <WasmVersion />
      </small>
    </div>
  </footer>
);
