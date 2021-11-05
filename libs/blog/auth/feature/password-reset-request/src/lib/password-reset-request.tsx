import { ResetRequestDTO } from '@cookingblog/api/auth/dto';
import { ErrorRes } from '@cookingblog/api/interfaces';
import { useLazyPasswordResetRequestQuery } from '@cookingblog/blog/auth/data-access';
import { AuthTemplate } from '@cookingblog/blog/auth/ui/template';
import { TextField } from '@cookingblog/blog/shared/ui/components/atoms';
import { ErrorBadge } from '@cookingblog/blog/shared/ui/components/molecules';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import EmailIcon from '@mui/icons-material/Email';
import { Button, Grid, InputAdornment } from '@mui/material';
import Alert from '@mui/material/Alert';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export function PasswordResetRequest() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetRequestDTO>({
    resolver: classValidatorResolver(ResetRequestDTO),
  });

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

export default PasswordResetRequest;
