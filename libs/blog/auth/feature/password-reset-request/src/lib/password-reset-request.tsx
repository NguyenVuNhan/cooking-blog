import { ResetRequestDTO } from '@cookingblog/api/auth/dto';
import { ErrorRes } from '@cookingblog/api/interfaces';
import { useLazyPasswordResetRequestQuery } from '@cookingblog/blog/auth/data-access';
import { AuthTemplate } from '@cookingblog/blog/auth/ui/template';
import { TextField } from '@cookingblog/blog/shared/ui/components/atoms';
import { ErrorBadge } from '@cookingblog/blog/shared/ui/components/molecules';
import { forwardTo } from '@cookingblog/blog/shared/utils';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Button, Grid, InputAdornment } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import Alert from '@material-ui/lab/Alert';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React from 'react';
import { useForm } from 'react-hook-form';

export function PasswordResetRequest() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetRequestDTO>({
    resolver: classValidatorResolver(ResetRequestDTO),
  });

  const toLogin = () => forwardTo('/auth/login');

  const [trigger, { data, error, isSuccess }] =
    useLazyPasswordResetRequestQuery();

  const onSubmit = ({ mail }: ResetRequestDTO) => {
    trigger(mail);
  };

  return (
    <AuthTemplate
      onSubmit={handleSubmit(onSubmit)}
      title="Password"
      subTitle="Reset your password"
    >
      <Grid item sm={12}>
        <ErrorBadge
          {...((error as FetchBaseQueryError)?.data as ErrorRes)?.data}
        />
      </Grid>

      {isSuccess && data && (
        <Grid item xs={12}>
          <Alert severity="info">{data.message}</Alert>
        </Grid>
      )}

      <Grid item xs={12}>
        <TextField
          label="Email Address"
          {...register('mail')}
          error={Boolean(errors.mail)}
          helperText={errors.mail?.message}
          type="email"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid
        className="p-2"
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Button color="primary" onClick={toLogin}>
          Login
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
    </AuthTemplate>
  );
}

export default PasswordResetRequest;
