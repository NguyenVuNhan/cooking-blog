import { Theme } from '@mui/material/styles';
import withStyles from '@mui/styles/withStyles';
import { FC } from 'react';

const styles = (theme: Theme) => ({
  '@global': {
    // Background colors
    '.bg-primary': {
      backgroundColor: theme.palette.primary.main,
    },

    // Styling
    '.noScrollBar': {
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    '.bg-white': {
      backgroundColor: theme.palette.common.white,
    },
    '.rounded': {
      borderRadius: '.25rem',
    },
    '.border': {
      border: `1px solid ${theme.palette.grey[300]}`,
    },

    //Positioning
    '.relative': {
      position: 'relative',
    },

    // Text
    '.font-weight-bold': {
      fontWeight: '500 !important',
    },
    '.text-muted': {
      color: `${theme.palette.text.disabled} !important`,
    },
    '.text-danger': {
      color: `${theme.palette.error.main} !important`,
    },
    '.text-success': {
      color: `${theme.palette.success.main} !important`,
    },
    '.text-center': {
      textAlign: 'center',
    },
    '.normal-case': {
      textTransform: 'none',
    },

    // Flex
    '.d-flex': {
      display: 'flex !important',
    },
    '.flex-column': {
      flexDirection: 'column',
    },
    '.align-items-center': {
      alignItems: 'center',
    },
    '.justify-content-center': {
      justifyContent: 'center',
    },
    '.flex-grow-0': {
      '-ms-flex-positive': '0 !important',
      flexGrow: '0 !important',
    },
    '.flex-grow-1': {
      '-ms-flex-positive': '1 !important',
      flexGrow: '1 !important',
    },
    '.flex-shrink-0': {
      '-ms-flex-negative': '0 !important',
      flexShrink: '0 !important',
    },
    '.flex-shrink-1': {
      '-ms-flex-negative': '1 !important',
      flexShrink: '1 !important',
    },

    // Sizing
    '.w-auto': { width: 'auto' },
    ...[0, 25, 50, 75, 100].reduce(function (obj: Record<string, unknown>, i) {
      obj[`.w-${i}`] = { width: `${i}%` };
      return obj;
    }, {}),
    ...[0, 25, 50, 75, 100].reduce(function (obj: Record<string, unknown>, i) {
      obj[`.h-${i}`] = { height: `${i}%` };
      return obj;
    }, {}),
    ...[0, 25, 50, 75, 100].reduce(function (obj: Record<string, unknown>, i) {
      obj[`.vw-${i}`] = { width: `${i}vw` };
      return obj;
    }, {}),
    ...[0, 25, 50, 75, 100].reduce(function (obj: Record<string, unknown>, i) {
      obj[`.vh-${i}`] = { height: `${i}vh` };
      return obj;
    }, {}),

    // Padding
    '.p-auto': { padding: 'auto' },
    ...[0, 1, 2, 3, 4, 5].reduce(function (obj: Record<string, unknown>, i) {
      obj[`.p-${i}`] = { padding: theme.spacing(i) };
      return obj;
    }, {}),
    ...[0, 1, 2, 3, 4, 5].reduce(function (obj: Record<string, unknown>, i) {
      obj[`.pl-${i}`] = { paddingLeft: theme.spacing(i) };
      return obj;
    }, {}),
    ...[0, 1, 2, 3, 4, 5].reduce(function (obj: Record<string, unknown>, i) {
      obj[`.pr-${i}`] = { paddingRight: theme.spacing(i) };
      return obj;
    }, {}),
    ...[0, 1, 2, 3, 4, 5].reduce(function (obj: Record<string, unknown>, i) {
      obj[`.px-${i}`] = {
        paddingLeft: theme.spacing(i),
        paddingRight: theme.spacing(i),
      };
      return obj;
    }, {}),
    // Margin
    ...[0, 1, 2, 3, 4, 5].reduce(function (obj: Record<string, unknown>, i) {
      obj[`.m-${i}`] = { margin: theme.spacing(i) };
      return obj;
    }, {}),
    ...[0, 1, 2, 3, 4, 5].reduce(function (obj: Record<string, unknown>, i) {
      obj[`.ml-${i}`] = { marginLeft: theme.spacing(i) };
      return obj;
    }, {}),
    ...[0, 1, 2, 3, 4, 5].reduce(function (obj: Record<string, unknown>, i) {
      obj[`.mr-${i}`] = { marginRight: theme.spacing(i) };
      return obj;
    }, {}),
    ...[0, 1, 2, 3, 4, 5].reduce(function (obj: Record<string, unknown>, i) {
      obj[`.mt-${i}`] = { marginTop: theme.spacing(i) };
      return obj;
    }, {}),
    ...[0, 1, 2, 3, 4, 5].reduce(function (obj: Record<string, unknown>, i) {
      obj[`.mb-${i}`] = { marginBottom: theme.spacing(i) };
      return obj;
    }, {}),
    ...[0, 1, 2, 3, 4, 5].reduce(function (obj: Record<string, unknown>, i) {
      obj[`.mx-${i}`] = {
        marginLeft: theme.spacing(i),
        marginRight: theme.spacing(i),
      };
      return obj;
    }, {}),
    ...[0, 1, 2, 3, 4, 5].reduce(function (obj: Record<string, unknown>, i) {
      obj[`.my-${i}`] = {
        marginTop: theme.spacing(i),
        marginBottom: theme.spacing(i),
      };
      return obj;
    }, {}),
  },
});

const GlobalStyles: FC = () => null;

export default withStyles(styles, { withTheme: true })(GlobalStyles);
