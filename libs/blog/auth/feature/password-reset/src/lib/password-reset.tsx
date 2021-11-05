import { ResetDTO } from '@cookingblog/api/auth/dto';
import { ErrorRes } from '@cookingblog/api/interfaces';
import { usePasswordResetMutation } from '@cookingblog/blog/auth/data-access';
import { PasswordField } from '@cookingblog/blog/auth/ui/components';
import { AuthTemplate } from '@cookingblog/blog/auth/ui/template';
import { ErrorBadge } from '@cookingblog/blog/shared/ui/components/molecules';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Alert, Button, Grid } from '@mui/material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export function PasswordReset() {
  const { token } = useParams<'token'>();
  const { id } = useParams<'id'>();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetDTO>({
    defaultValues: { user: id, token },
    resolver: classValidatorResolver(ResetDTO, { whitelist: true }),
  });

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
        justifyContent="space-between"
        alignItems="center"
      >
        <Button color="primary" onClick={() => navigate('/auth/login')}>
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
