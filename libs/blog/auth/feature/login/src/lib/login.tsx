import { LoginDTO } from '@cookingblog/api/auth/dto';
import { authActions, getErrors } from '@cookingblog/blog/auth/data-access';
import { AuthTemplate } from '@cookingblog/blog/auth/ui/template';
import { PasswordField } from '@cookingblog/blog/auth/ui/components';
import { TextField } from '@cookingblog/blog/shared/ui/components/atoms';
import { ErrorBadge } from '@cookingblog/blog/shared/ui/components/molecules';
import { forwardTo } from '@cookingblog/blog/shared/utils';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
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

  const toRegister = () => forwardTo('/auth/register');
  const toPasswordReset = () => forwardTo('/auth/password-reset');

  const onSubmit = (data: LoginDTO) => {
    dispatch(authActions.login(data));
  };

  return (
    <AuthTemplate
      onSubmit={handleSubmit(onSubmit)}
      title="Login"
      subTitle="Login to your Cooking Blog account"
    >
      <Grid item xs={12}>
        <ErrorBadge {...loginErrors} />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email Or User name"
          {...register('emailOrName')}
          error={!!errors.emailOrName}
          helperText={errors.emailOrName?.message}
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

      <Grid item xs={12}>
        <PasswordField
          label="Password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} className="flex justify-center">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          fullWidth
        >
          Login
        </Button>
      </Grid>

      <Grid
        className="p-2"
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Button color="primary" onClick={toPasswordReset}>
          Forgot password?
        </Button>
        <Button color="primary" onClick={toRegister}>
          Create Account
        </Button>
      </Grid>
    </AuthTemplate>
  );
}

export default Login;
