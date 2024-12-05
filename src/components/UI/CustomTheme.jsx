import { createTheme } from "@mui/material";

export const CustomTheme = createTheme({
  palette: {
    mode: "light",
  },
  typography:{
    fontFamily: "Cabin"
  },
  components: { 
    MuiCssBaseline: { 
      styleOverrides: { 
        body: { 
          margin: 0, 
          padding: 0, 
          minheight: "100vh"
        },
        html: { 
          height: '100%', 
        },
        '#root': { 
          height: '100%'
        },
      }
    }
  }
});
