import { LoginDTO } from '@cookingblog/api/auth/dto';
import { authActions, getErrors } from '@cookingblog/blog/auth/data-access';
import { PasswordField } from '@cookingblog/blog/auth/ui/components';
import { AuthTemplate } from '@cookingblog/blog/auth/ui/template';
import { TextField } from '@cookingblog/blog/shared/ui/components/atoms';
import { ErrorBadge } from '@cookingblog/blog/shared/ui/components/molecules';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import EmailIcon from '@mui/icons-material/Email';
import { Button, Grid, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginDTO>({ resolver: classValidatorResolver(LoginDTO) });
  const loginErrors = useSelector(getErrors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          color="primary"
          onClick={() => navigate('/auth/password-reset')}
        >
          Forgot password?
        </Button>
        <Button color="primary" onClick={() => navigate('/auth/register')}>
          Create Account
        </Button>
      </Grid>
    </AuthTemplate>
  );
}

export default Login;
