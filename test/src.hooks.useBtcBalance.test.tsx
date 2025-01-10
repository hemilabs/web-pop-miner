import { describe, expect, test } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';

import { useBtcBalance } from '../src/hooks/useBtcBalance.ts';

function createWrapper() {
  const queryClient = new QueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useBtcBalance hook', function () {
  test('get the BTC balance', async function () {
    const address = 'mirbhKyTyXmesgS8xXqhZJqvkKphA1j2uv';
    const { result } = renderHook(
      () => useBtcBalance(address, '200000', 5000),
      { wrapper: createWrapper() },
    );
    expect(result.current.isLoading).toEqual(true);
    await waitFor(() => expect(result.current.isLoading).toEqual(false), {
      timeout: 10000,
    });
    expect(result.current.data?.address).toEqual(address);
    expect(result.current.totalBalance).to.be.a('number');
  });
});
