import { useCallback } from 'react'

export interface BitcoinKey {
  address: string
  privateKey: string
}

export const useBitcoinTestnetKey = (): {
  generateKey: () => BitcoinKey
  checkPrivateKey: (privateKey: string) => {
    isValid: boolean
    result: BitcoinKey
  }
} => {
  const generateKey = useCallback(() => {
    // TO-DO - Implement the generation of a Bitcoin Testnet key using Joshua package
    // For now, we will return a dummy key
    // Issue #4: Connect simplified manage page to WASM Go library
    const address = 'n2eMqTT929pb1RDNuqEnxdaLau1rxy3efi'
    const privateKey = 'n2eMqTT929pb1RDNuqEnxdaLau1rxy3efi'

    return { address, privateKey }
  }, [])

  const checkPrivateKey = useCallback((privateKey: string) => {
    // TO-DO - Implement the validation of a Bitcoin Testnet private key and return the public address
    // For now, we will use dummy data
    // Issue #4: Connect simplified manage page to WASM Go library
    const isValid = privateKey === 'n2eMqTT929pb1RDNuqEnxdaLau1rxy3efi'
    const address = isValid ? 'n2eMqTT929pb1RDNuqEnxdaLau1rxy3efi' : ''

    return { isValid, result: { address, privateKey } }
  }, [])

  return { generateKey, checkPrivateKey }
}
