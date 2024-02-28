function createTheme(options) {
  const { primary, secondary, error, warning, info } = options;
  
  const theme = `
// Welcome to the Material-UI theming template!
// This is the starting point for defining your application's unique style.
// Feel free to adjust the color palette, typography, and layout to suit your needs.
// Need inspiration or guidance? Dive into the Material-UI theming documentation to explore all the powerful features:
// https://mui.com/material-ui/customization/theming/
// Happy theming!  

const themeConfig = (mode= 'dark') => (
  {
    palette: {
      mode,
      primary: {
        main: "${primary}",
        // light: will be calculated from palette.primary.main if note added,
        // dark: will be calculated from palette.primary.main if not added,
        // contrastText: will be calculated to contrast with palette.primary.main if note added
      },
      secondary: {
        main: "${secondary}",
        // light: will be calculated from palette.secondary.main if note added,
        // dark: will be calculated from palette.secondary.main if not added,
        // contrastText: will be calculated to contrast with palette.secondary.main if note added
      },
      error: {
        main: "${error}",
        // light: will be calculated from palette.error.main if note added,
        // dark: will be calculated from palette.error.main if not added,
        // contrastText: will be calculated to contrast with palette.error.main if note added
      },
      warning: {
        main: "${warning}",
        // light: will be calculated from palette.warning.main if note added,
        // dark: will be calculated from palette.warning.main if not added,
        // contrastText: will be calculated to contrast with palette.warning.main if note added
      },
      info: {
        main: "${info}",
        // light: will be calculated from palette.info.main if note added,
        // dark: will be calculated from palette.info.main if not added,
        // contrastText: will be calculated to contrast with palette.info.main if note added
      },
    },
    typography: {
      fontFamily: [].join(','),
      fontSize: 16,
      h4: {
        fontWeight: 700
      }
    },
    components: {
      // Example customization for the MUI Button base styling
      MuiButtonBase: {
        defaultProps: {
          // Uncomment and set these to change the default button properties
          // disableRipple: true, // No ripple effect
        }
      }
    },
    //other theme properties;
  }
)

export default themeConfig
`
  return theme
}

module.exports = createTheme;