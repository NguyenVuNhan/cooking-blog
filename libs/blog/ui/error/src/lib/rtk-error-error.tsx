import React from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit';
import { ErrorRes } from '@cookingblog/api/interfaces';

export interface RTKQueryErrorProps {
  error: FetchBaseQueryError | SerializedError;
  apiError?: boolean;
  className?: string;
}

export function RTKQueryError(props: RTKQueryErrorProps) {
  const { error, apiError: baseError = false, className } = props;

  if (baseError) {
    const data = (error as FetchBaseQueryError).data as ErrorRes;

    return (
      <div
        className={`w-full h-full flex align-center justify-center ${className}`}
      >
        <h1 className="text-2xl font-semibold">{data.message}</h1>
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full flex align-center justify-center ${className}`}
    >
      <h1 className="text-2xl font-semibold">An error occurred :(</h1>
    </div>
  );
}

export default RTKQueryError;
