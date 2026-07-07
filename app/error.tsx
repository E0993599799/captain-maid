'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Application Error</h1>
        <p className="text-lg text-gray-600 mb-6">
          {error.message || 'An unexpected error occurred'}
        </p>
        {error.digest && (
          <p className="text-sm text-gray-500 mb-6">
            Error ID: {error.digest}
          </p>
        )}
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
