import { CheckIcon } from 'icons/checkIcon';

export const AddressFunded = () => (
  <div className="flex items-center justify-center">
    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-emerald-200 bg-emerald-100 text-base font-medium text-emerald-500">
      <CheckIcon />
    </div>
    <p className="ml-2 text-base leading-normal text-emerald-600">
      Your address is funded
    </p>
  </div>
);
