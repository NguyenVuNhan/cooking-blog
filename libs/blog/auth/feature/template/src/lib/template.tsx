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
    <div
      className={`${classes.background} w-screen h-screen d-flex items-center justify-center`}
    >
      <Container
        className={`bg-transparent rounded-2xl`}
        maxWidth="sm"
        component="form"
        noValidate
        onSubmit={_onSubmit}
        data-testid="form"
      >
        <Paper elevation={24} className="sm:min-w-min px-2">
          <Grid container spacing={3} className="px-2">
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
    </div>
  );
}

const useStyle = makeStyles({
  background: {
    backgroundImage: `url(/assets/landing.jpg)`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  container: {
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    '& .MuiPaper-root': {
      padding: 16,
      width: 500,
    },
  },
});

export default AuthTemplate;
