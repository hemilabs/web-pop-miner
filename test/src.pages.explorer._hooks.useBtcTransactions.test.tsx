import { describe, expect, test } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';

import { useGetBtcBlockByTransaction } from '../src/pages/explorer/_hooks/useBtcTransactions.ts';

function createWrapper() {
  const queryClient = new QueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useGetBtcBlockByTransaction hook', function () {
  test('get the BTC transactions', async function () {
    const txid =
      '0aa42bf0264a48c6eebd86504796eee1d8100dc392ba5e8c88cc0f42616e03c2';
    const { result } = renderHook(
      () => useGetBtcBlockByTransaction(true, [txid]),
      { wrapper: createWrapper() },
    );
    expect(result.current.isLoading).toEqual(true);
    await waitFor(() => expect(result.current.isLoading).toEqual(false), {
      timeout: 10000,
    });
    expect(result.current.transactions).to.have.lengthOf(1);
    expect(result.current.transactions[0].txid).toEqual(txid);
  });
});
