export const LoadingSpinner = () => (
  <div className="relative flex items-center justify-center">
    <div className="h-8 w-8 rounded-full border-2 border-gray-200" />
    <div className="absolute inset-0 m-auto h-4 w-4 animate-spin rounded-full border-2 border-b-transparent border-l-transparent border-r-orange-500 border-t-orange-500" />
  </div>
);
