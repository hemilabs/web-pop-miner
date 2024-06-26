import { ReactNode, createContext, useContext, useState } from 'react'

/**
 * Represents the interface for the Popminer context state.
 * - active: boolean
 * - publicAddress: string
 */
interface PopminerContextState {
  active: boolean
  publicAddress: string
}

// Default state for the context
const defaultValue: PopminerContextState = {
  active: false,
  publicAddress: 'mfzM4ZknpUzsrgYTgR48Wqo6PD34ChsBR4',
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
