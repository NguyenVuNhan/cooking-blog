import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import type {} from '@material-ui/lab/themeAugmentation';

const theme = responsiveFontSizes(
  createMuiTheme({
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
