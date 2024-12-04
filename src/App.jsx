import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { CustomTheme } from './components/UI/CustomTheme';

function App() {

  return (
    <ThemeProvider theme={CustomTheme}>
      <CssBaseline />
      
    </ThemeProvider>
  )
}

export default App
