import { LoginReq } from '@cookingblog/api-interfaces';
import { authActions, authSelector } from '@cookingblog/blog/data-access/store';
import { ErrorBadge, TextField } from '@cookingblog/blog/ui/components';
import { AuthTemplate } from '@cookingblog/blog/ui/templates';
import { forwardTo } from '@cookingblog/blog/utils';
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
  } = useForm<LoginReq>();
  const loginErrors = useSelector(authSelector.errors);
  const dispatch = useDispatch();

  const toRegister = () => forwardTo('/register');

  const onSubmit = (data: LoginReq) => {
    dispatch(authActions.login(data));
  };

  return (
    <AuthTemplate
      onSubmit={handleSubmit(onSubmit)}
      title="Login"
      subTitle="Login to your Cooking Blog account"
    >
      <Grid item sm={12}>
        <ErrorBadge errors={loginErrors} />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email Address"
          variant="outlined"
          {...register('email', { required: 'Email is required' })}
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
          {...register('password', { required: 'Password is required' })}
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
