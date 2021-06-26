import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import type {} from '@material-ui/lab/themeAugmentation';

const theme = responsiveFontSizes(
  createMuiTheme({
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
