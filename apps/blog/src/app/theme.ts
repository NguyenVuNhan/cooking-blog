import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import type {} from '@material-ui/lab/themeAugmentation';
import deepOrange from '@material-ui/core/colors/deepOrange';
import lightBlue from '@material-ui/core/colors/lightBlue';

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: deepOrange[900],
      },
      secondary: {
        main: lightBlue['A700'],
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
      },
    },
    overrides: {
      MuiSpeedDialAction: {
        staticTooltipLabel: {
          whiteSpace: 'nowrap',
        },
      },
    },
  })
);

export default theme;
