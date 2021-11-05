import { RegisterDTO } from '@cookingblog/api/auth/dto';
import { ErrorRes } from '@cookingblog/api/interfaces';
import { useRegisterMutation } from '@cookingblog/blog/auth/data-access';
import { PasswordField } from '@cookingblog/blog/auth/ui/components';
import { AuthTemplate } from '@cookingblog/blog/auth/ui/template';
import { TextField } from '@cookingblog/blog/shared/ui/components/atoms';
import { ErrorBadge } from '@cookingblog/blog/shared/ui/components/molecules';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import { Alert, Button, Grid, InputAdornment } from '@mui/material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterDTO>({ resolver: classValidatorResolver(RegisterDTO) });
  const [trigger, { error, data, isSuccess }] = useRegisterMutation();

  return (
    <AuthTemplate
      onSubmit={handleSubmit(trigger)}
      title="Register"
      subTitle="Create new Cooking Blog account"
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
          fullWidth
          {...register('name', { required: 'User name is required' })}
          error={!!errors.name}
          helperText={errors.name?.message}
          label="User Name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          {...register('email', { required: 'Email is required' })}
          error={!!errors.email}
          helperText={errors.email?.message}
          label="Email Address"
          type="email"
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
          fullWidth
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          label="Password"
        />
      </Grid>

      <Grid item xs={12}>
        <PasswordField
          fullWidth
          {...register('cpassword')}
          error={!!errors.cpassword}
          helperText={errors.cpassword?.message}
          label="Confirm Password"
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
          Register
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
        <Button color="primary" onClick={() => navigate('/auth/login')}>
          Login
        </Button>
      </Grid>
    </AuthTemplate>
  );
}

export default Register;
