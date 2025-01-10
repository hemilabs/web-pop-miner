import { init } from '@hemilabs/pop-miner';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import wasmURL from '../assets/popminer.wasm?url';
import { handleError } from 'utils/handleError';

/**
 * Represents the interface for the Popminer context state.
 */
interface PopminerContextState {
  active: boolean;
  network: string;
  privateKey: string;
  publicKey: string;
  bitcoinPubKeyHash: string;
  bitcoinScriptHash: string;
  hemiAddress: string;
  validPrivateKey: boolean;
  wasmInitialized: boolean;
  rightPanel: ReactNode;
}

// Default state for the context
const defaultValue: PopminerContextState = {
  active: false,
  bitcoinPubKeyHash: '',
  bitcoinScriptHash: '',
  hemiAddress: '',
  network: '',
  privateKey: '',
  publicKey: '',
  rightPanel: null,
  validPrivateKey: false,
  wasmInitialized: false,
};

// Creating the context with a default value
export const PopminerContext = createContext<{
  state: PopminerContextState;
  setState: React.Dispatch<React.SetStateAction<PopminerContextState>>;
}>({
  setState: () => undefined,
  state: defaultValue,
});

interface PopminerProviderProps {
  children: ReactNode;
}

// Implementing the Provider
export function PopminerProvider({ children }: PopminerProviderProps) {
  const [state, setState] = useState<PopminerContextState>(defaultValue);

  useEffect(function () {
    init({ wasmURL })
      .then(function () {
        setState(prev => ({ ...prev, wasmInitialized: true }));
      })
      .catch(error => handleError('Failed to initialize PoP miner:', error));
  }, []);

  return (
    <PopminerContext.Provider value={{ setState, state }}>
      {children}
    </PopminerContext.Provider>
  );
}

// Custom hook to use the PopminerContext
export const usePopminerContext = () => useContext(PopminerContext);
