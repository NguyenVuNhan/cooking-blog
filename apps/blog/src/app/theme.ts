import { deepOrange, lightBlue } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = responsiveFontSizes(
  createTheme({
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
    components: {
      MuiSpeedDialAction: {
        styleOverrides: {
          staticTooltipLabel: {
            whiteSpace: 'nowrap',
          },
        },
      },
    },
  })
);

export default theme;
