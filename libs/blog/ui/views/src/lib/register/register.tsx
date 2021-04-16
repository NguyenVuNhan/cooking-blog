import { LoginReq, RegisterReq } from '@cookingblog/api-interfaces';
import { authActions, authSelector } from '@cookingblog/blog/data-access/store';
import { ErrorBadge, TextField } from '@cookingblog/blog/ui/components';
import { AuthTemplate } from '@cookingblog/blog/ui/templates';
import { forwardTo } from '@cookingblog/blog/utils';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

export function Register() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<RegisterReq>();
  const registerErrors = useSelector(authSelector.errors);
  const dispatch = useDispatch();

  const toLogin = () => forwardTo('/login');

  const onSubmit = (data: RegisterReq) => {
    dispatch(authActions.register(data));
  };

  return (
    <AuthTemplate
      onSubmit={handleSubmit(onSubmit)}
      title="Register"
      subTitle="Create new Cooking Blog account"
    >
      <Grid item sm={12}>
        <ErrorBadge errors={registerErrors} />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          {...register('name', { required: 'User name is required' })}
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          label="User Name"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          {...register('email', { required: 'Email is required' })}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          label="Email Address"
          type="email"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          {...register('password', {
            required: 'You must specify a password',
            minLength: {
              value: 6,
              message: 'Password must have at least 6 characters',
            },
          })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          label="Password"
          variant="outlined"
          type="password"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          {...register('cpassword', {
            validate: (value) =>
              value === watch('password') || 'The passwords do not match',
          })}
          error={Boolean(errors.cpassword)}
          helperText={errors.cpassword?.message}
          label="Confirm Password"
          variant="outlined"
          type="password"
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

export default Register;
