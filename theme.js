
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
        main: "#90caf9",
        // light: will be calculated from palette.primary.main if note added,
        // dark: will be calculated from palette.primary.main if not added,
        // contrastText: will be calculated to contrast with palette.primary.main if note added
      },
      secondary: {
        main: "#ce93d8",
        // light: will be calculated from palette.secondary.main if note added,
        // dark: will be calculated from palette.secondary.main if not added,
        // contrastText: will be calculated to contrast with palette.secondary.main if note added
      },
      error: {
        main: "#f44336",
        // light: will be calculated from palette.error.main if note added,
        // dark: will be calculated from palette.error.main if not added,
        // contrastText: will be calculated to contrast with palette.error.main if note added
      },
      warning: {
        main: "#ffa726",
        // light: will be calculated from palette.warning.main if note added,
        // dark: will be calculated from palette.warning.main if not added,
        // contrastText: will be calculated to contrast with palette.warning.main if note added
      },
      info: {
        main: "#29b6f6",
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
