import { LoginDTO } from '@cookingblog/api/auth/dto';
import { authActions, getErrors } from '@cookingblog/blog/auth/data-access';
import { AuthTemplate } from '@cookingblog/blog/auth/feature/template';
import { TextField } from '@cookingblog/blog/ui/components/atoms';
import { ErrorBadge } from '@cookingblog/blog/ui/components/molecules';
import { forwardTo } from '@cookingblog/blog/utils';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

export function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginDTO>({ resolver: classValidatorResolver(LoginDTO) });
  const loginErrors = useSelector(getErrors);
  const dispatch = useDispatch();

  const toRegister = () => forwardTo('/register');

  const onSubmit = (data: LoginDTO) => {
    dispatch(authActions.login(data));
  };

  return (
    <AuthTemplate
      onSubmit={handleSubmit(onSubmit)}
      title="Login"
      subTitle="Login to your Cooking Blog account"
    >
      <Grid item sm={12}>
        <ErrorBadge {...loginErrors} />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email Address"
          variant="outlined"
          {...register('email')}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          type="email"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          variant="outlined"
          {...register('password')}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          type="password"
          fullWidth
        />
      </Grid>
      <Grid
        className="p-2"
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Button color="primary" onClick={toRegister}>
          Create Account
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
    </AuthTemplate>
  );
}

export default Login;
