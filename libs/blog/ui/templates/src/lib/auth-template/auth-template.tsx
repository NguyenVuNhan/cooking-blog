import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { FormEventHandler, ReactNode } from 'react';

export interface AuthTemplateProps {
  children?: ReactNode;
  onSubmit?: FormEventHandler;
  title: string;
  subTitle: string;
}

export function AuthTemplate(props: AuthTemplateProps) {
  const { children, onSubmit, title, subTitle } = props;
  const classes = useStyle();

  const _onSubmit: FormEventHandler = (...args) => {
    onSubmit(...args);
  };

  return (
    <Container
      className={`${classes.container} d-flex align-items-center justify-content-center`}
      maxWidth={false}
      component="form"
      noValidate
      onSubmit={_onSubmit}
      data-testid="form"
    >
      <Paper elevation={24}>
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2" align="center" noWrap>
              {title}
            </Typography>
            <Typography variant="subtitle1" align="center" noWrap>
              {subTitle}
            </Typography>
          </Grid>
          {children}
        </Grid>
      </Paper>
    </Container>
  );
}

const useStyle = makeStyles({
  container: {
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(/assets/landing.jpg)`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    alignItems: 'center',
    '& .MuiPaper-root': {
      padding: 16,
      width: 500,
    },
  },
});

export default AuthTemplate;
