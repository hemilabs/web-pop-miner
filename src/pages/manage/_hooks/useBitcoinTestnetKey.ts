/* eslint-disable arrow-body-style */
import { useCallback } from 'react';

export interface BitcoinKey {
  address: string;
  privateKey: string;
}

export const useBitcoinTestnetKey = (): {
  generateKey: () => BitcoinKey;
  checkPrivateKey: (privateKey: string) => {
    isValid: boolean;
    result: BitcoinKey | null;
  };
} => {
  const generateKey = useCallback((): BitcoinKey => {
    const address = 'n2eMqTT929pb1RDNuqEnxdaLau1rxy3efi';
    const privateKey = 'cTmZm6UtR4Sio3cW7WZj9usHTziDLJpYhuePMtB3RLUnxKX6QDPZ';

    return { address, privateKey };
  }, []);

  const checkPrivateKey = useCallback(
    (privateKey: string): { isValid: boolean; result: BitcoinKey | null } => {
      const isValid =
        privateKey === 'cTmZm6UtR4Sio3cW7WZj9usHTziDLJpYhuePMtB3RLUnxKX6QDPZ';
      const address = isValid ? 'n2eMqTT929pb1RDNuqEnxdaLau1rxy3efi' : null;

      return {
        isValid,
        result: isValid && address ? { address, privateKey } : null,
      };
    },
    [],
  );

  return { checkPrivateKey, generateKey };
};
