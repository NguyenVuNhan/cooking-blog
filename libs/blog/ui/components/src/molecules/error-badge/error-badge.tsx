import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { ErrorRes } from '@cookingblog/api-interfaces';

/* eslint-disable-next-line */
export interface ErrorBadgeProps {
  errors?: ErrorRes['data']['errors'];
}

export function ErrorBadge(props: ErrorBadgeProps) {
  const { errors } = props;

  return (
    errors &&
    errors.map((e, index) => (
      <Alert
        key={index}
        severity="error"
        className="mb-1"
        style={{ width: '100%' }}
      >
        {e.msg}
      </Alert>
    ))
  );
}

export default ErrorBadge;
