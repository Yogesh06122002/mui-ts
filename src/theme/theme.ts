import { createTheme } from "@mui/material";

const getTheme = (mode : "light" | "dark") => 
  createTheme({
  palette: {
    mode,
    primary: {
      main: "#2029A1",
    },
    secondary: {
      main: "#2029A1",
    },
    background: {
      default: mode === "light" ? "#f5f5f5" : "#121212",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode ==="light" ? "2029A1" : "#1E1E2F",
          height: "40px",
        },
      },
    },
    MuiFormControl: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiToolbar: {
      defaultProps: {},
      styleOverrides: {
        root: {
          minHeight: "40px",
        },
      },
    },
    MuiListItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiList: {
      defaultProps: {
        dense: true,
      },
    },
    MuiListItemButton: {
      defaultProps: {
        dense: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {},
        dense: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: 2,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: 2,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        margin: "dense",
      },
    },
  },
  spacing: 2,

  typography: {
    htmlFontSize: 25,
    fontSize: 20,
  },
});

export default getTheme;
