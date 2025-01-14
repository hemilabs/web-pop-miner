import React from 'react';

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="none">
    <path
      fill="#fff"
      stroke="#fff"
      strokeLinejoin="round"
      strokeWidth={0.667}
      d="M6.866 3.715 2.506 1.06A.333.333 0 0 0 2 1.343v5.314c0 .26.285.42.507.284l4.36-2.656a.333.333 0 0 0 0-.57Z"
    />
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="none">
    <path
      fill="#fff"
      d="M1.666 1.667c0-.184.15-.334.333-.334h.667c.184 0 .333.15.333.334v4.666c0 .184-.149.334-.333.334h-.667a.333.333 0 0 1-.333-.334V1.667ZM5 1.667c0-.184.149-.334.333-.334h.666c.184 0 .334.15.334.334v4.666c0 .184-.15.334-.334.334h-.666a.333.333 0 0 1-.334-.334V1.667Z"
    />
    <path
      stroke="#fff"
      strokeWidth={0.667}
      d="M1.666 1.667c0-.184.15-.334.333-.334h.667c.184 0 .333.15.333.334v4.666c0 .184-.149.334-.333.334h-.667a.333.333 0 0 1-.333-.334V1.667ZM5 1.667c0-.184.149-.334.333-.334h.666c.184 0 .334.15.334.334v4.666c0 .184-.15.334-.334.334h-.666a.333.333 0 0 1-.334-.334V1.667Z"
    />
  </svg>
);

interface Props {
  isDisabled?: boolean;
  isPlaying?: boolean;
  onClick: () => void;
}

export const PlayButton = ({
  isDisabled = false,
  isPlaying = false,
  onClick,
}: Props) => (
  <button
    onClick={onClick}
    disabled={isDisabled}
    className={`flex min-w-28 items-center rounded-lg px-4 py-2 text-base font-normal text-white
      ${
        isDisabled
          ? 'bg-orange-200'
          : 'bg-orange-950 transition-colors duration-300 hover:bg-orange-600'
      }`}
  >
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white-opacity-24 shadow-custom-inset">
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </span>
    <span className="ml-2">{isPlaying ? 'Pause' : 'Play'}</span>
  </button>
);
