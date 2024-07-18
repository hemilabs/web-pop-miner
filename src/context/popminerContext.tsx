import { init } from '@hemilabs/pop-miner'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import wasmURL from '../assets/popminer.wasm?url'
import { Toast, ToastType } from 'utils/toast'

/**
 * Represents the interface for the Popminer context state.
 */
interface PopminerContextState {
  active: boolean
  network: string
  privateKey: string
  publicKey: string
  bitcoinPubKeyHash: string
  bitcoinScriptHash: string
  hemiAddress: string
  validPrivateKey: boolean
  wasmInitialized: boolean
}

// Default state for the context
const defaultValue: PopminerContextState = {
  active: false,
  network: '',
  privateKey: '',
  publicKey: '',
  bitcoinPubKeyHash: '',
  bitcoinScriptHash: '',
  hemiAddress: '',
  validPrivateKey: false,
  wasmInitialized: false,
}

// Creating the context with a default value
export const PopminerContext = createContext<{
  state: PopminerContextState
  setState: React.Dispatch<React.SetStateAction<PopminerContextState>>
}>({
  state: defaultValue,
  setState: () => {},
})

interface PopminerProviderProps {
  children: ReactNode
}

// Implementing the Provider
export const PopminerProvider = ({ children }: PopminerProviderProps) => {
  const [state, setState] = useState<PopminerContextState>(defaultValue)

  useEffect(() => {
    init({ wasmURL })
      .then(() => {
        console.log('Wasm initialized')
        setState(prev => ({ ...prev, wasmInitialized: true }))
      })
      .catch(error => {
        console.error('Error initializing Wasm', error)
        Toast({
          message: `Failed to initialise PoP miner: ${error.message}`,
          type: ToastType.Error,
        })
      })
  }, [])

  return (
    <PopminerContext.Provider value={{ state, setState }}>
      {children}
    </PopminerContext.Provider>
  )
}

// Custom hook to use the PopminerContext
export const usePopminerContext = () => {
  return useContext(PopminerContext)
}
