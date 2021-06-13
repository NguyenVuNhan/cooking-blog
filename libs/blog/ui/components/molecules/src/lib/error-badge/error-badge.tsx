import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { ErrorRes } from '@cookingblog/api/interfaces';

export type ErrorBadgeProps = ErrorRes;

export function ErrorBadge(props: ErrorBadgeProps) {
  const { success, message } = props;

  return success === false ? (
    <>
      {message.split(', ').map((e, index) => (
        <Alert
          key={index}
          severity="error"
          className="mb-1"
          style={{ width: '100%' }}
        >
          {e}
        </Alert>
      ))}
    </>
  ) : null;
}

export default ErrorBadge;
