import { usePopminerContext } from '../context/popminerContext'
import { useEffect, useState } from 'react'
import { version, VersionResult } from '@hemilabs/pop-miner'

export const Footer = () => (
  <footer className="flex w-full items-center justify-between p-4 text-sm font-medium text-zinc-500">
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
)

const WasmVersion = () => {
  const { state } = usePopminerContext()
  const [wasmVersion, setWasmVersion] = useState<VersionResult>()

  useEffect(() => {
    if (state.wasmInitialized) {
      version().then(setWasmVersion)
    }
  }, [state.wasmInitialized])

  if (!wasmVersion) {
    return null
  }

  return (
    <span>
      WASM v{wasmVersion.version}
      <a
        href={`https://github.com/hemilabs/heminetwork/commit/${wasmVersion.gitCommit}`}
        target="_blank"
        rel="noopener external"
      >
        ({wasmVersion.gitCommit})
      </a>
    </span>
  )
}
