import { LoadingSpinner } from 'components/loadingSpinner'

export const WaitingAddress = () => (
  <div className="flex items-center justify-center">
    <LoadingSpinner />
    <p className="ml-4 text-base leading-normal text-neutral-500">
      Waiting for this address to get enough funds...
    </p>
  </div>
)
