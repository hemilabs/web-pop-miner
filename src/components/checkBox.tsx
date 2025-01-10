import React from 'react';

interface Props {
  label: string;
  isChecked: boolean;
  onChange: () => void;
}

export const CheckBox = ({ label, isChecked, onChange }: Props) => (
  <label className="inline-flex cursor-pointer items-center" onClick={onChange}>
    <div
      className={`flex h-6 w-6 items-center justify-center rounded-md border transition-colors ${
        isChecked
          ? 'border-orange-970 bg-orange-500'
          : 'border-neutral-300 bg-white'
      }`}
    >
      {isChecked && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 00-1.414-1.414L7 12.172 4.707 9.879a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l8-8z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
    <span className="ml-2 py-2 text-base text-neutral-500">{label}</span>
  </label>
);
