import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { ErrorRes } from '@cookingblog/api/interfaces';

export type ErrorBadgeProps = Partial<ErrorRes>;

export function ErrorBadge(props: ErrorBadgeProps) {
  const { success, message } = props;

  return !success && !!message ? (
    <>
      {message.split(',').map((msg, index) => (
        <Alert
          key={index}
          severity="error"
          className="mb-1"
          style={{ width: '100%' }}
        >
          {msg.trim()}
        </Alert>
      ))}
    </>
  ) : null;
}

export default ErrorBadge;
