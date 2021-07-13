import { ResetDTO } from '@cookingblog/api/auth/dto';
import { ErrorRes } from '@cookingblog/api/interfaces';
import { usePasswordResetMutation } from '@cookingblog/blog/auth/data-access';
import { PasswordField } from '@cookingblog/blog/auth/ui/components';
import { AuthTemplate } from '@cookingblog/blog/auth/ui/template';
import { ErrorBadge } from '@cookingblog/blog/shared/ui/components/molecules';
import { forwardTo } from '@cookingblog/blog/shared/utils';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Button, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export function PasswordReset() {
  const { id, token } = useParams<{ id: string; token: string }>();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetDTO>({
    defaultValues: { user: id, token },
    resolver: classValidatorResolver(ResetDTO, { whitelist: true }),
  });

  const toLogin = () => forwardTo('/auth/login');

  const [trigger, { data, error, isSuccess }] = usePasswordResetMutation();

  const onSubmit = (data: ResetDTO) => {
    trigger({
      ...data,
    });
  };

  return (
    <AuthTemplate
      onSubmit={handleSubmit(onSubmit)}
      title="Password"
      subTitle="Change your password"
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
        <PasswordField
          fullWidth
          {...register('password')}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          label="Password"
        />
      </Grid>
      <Grid item xs={12}>
        <PasswordField
          fullWidth
          {...register('cpassword')}
          error={Boolean(errors.cpassword)}
          helperText={errors.cpassword?.message}
          label="Confirm Password"
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

export default PasswordReset;
