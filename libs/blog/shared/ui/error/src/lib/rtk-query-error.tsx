import { ErrorRes } from '@cookingblog/api/interfaces';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import React from 'react';

export interface RTKQueryErrorProps {
  error: FetchBaseQueryError | SerializedError;
  type?: 'rtk' | 'api';
  className?: string;
}

function BaseError(props: { message: string; className?: string }) {
  const { message, className } = props;

  return (
    <div
      className={`w-full h-full flex align-center justify-center ${className}`}
    >
      <h1 className="text-2xl font-semibold">{message}</h1>
    </div>
  );
}

export function RTKQueryError(props: RTKQueryErrorProps) {
  const { error, type, className } = props;

  switch (type) {
    case 'rtk': {
      const data = error as FetchBaseQueryError;
      const message = `${data.status} Error`;
      return <BaseError message={message} className={className} />;
    }
    case 'api': {
      const data = (error as FetchBaseQueryError).data as ErrorRes;
      return <BaseError message={data.message} className={className} />;
    }
    default:
      return <BaseError message="An error occurred :(" className={className} />;
  }
}

export default RTKQueryError;
