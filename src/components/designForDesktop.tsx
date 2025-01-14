const DesktopFrameIcon = () => (
  <div className="relative">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={120}
      fill="none"
      className="relative"
    >
      <g opacity={0.48}>
        <rect width={200} height={120} fill="#E5E5E5" rx={8} />
        <rect width={4} height={4} x={8} y={4} fill="#A3A3A3" rx={2} />
        <rect width={4} height={4} x={14} y={4} fill="#A3A3A3" rx={2} />
        <rect width={4} height={4} x={20} y={4} fill="#A3A3A3" rx={2} />
      </g>
    </svg>
    <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-neutral-50"></div>
  </div>
);

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="relative z-10"
  >
    <path
      stroke="#525252"
      strokeLinecap="square"
      strokeWidth={2}
      d="M11 11h1v5m9-4a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
    <path
      fill="#525252"
      stroke="#525252"
      strokeWidth={0.5}
      d="M11.25 7.25h1.5v1.5h-1.5z"
    />
  </svg>
);

export const DesignForDesktop = () => (
  <div className="flex flex-col items-center justify-center p-4">
    <div className="relative">
      <DesktopFrameIcon />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="absolute h-24 w-48 rounded-t-lg border border-neutral-200 bg-neutral-50"
          style={{
            borderImage: 'linear-gradient(to bottom, #E5E7EB, transparent) 1',
          }}
        />
        <div className="absolute h-8 w-8 rounded-full border border-neutral-200 bg-neutral-100" />
        <InfoIcon />
      </div>
    </div>
    <div className="text-center">
      <h1 className="text-2xl font-medium text-neutral-950">
        Designed for Desktop
      </h1>
      <p className="mt-2 text-lg font-normal text-neutral-500">
        Please switch to a computer to begin PoP Mining
      </p>
    </div>
  </div>
);
