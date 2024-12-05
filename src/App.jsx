import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { CustomTheme } from './components/UI/CustomTheme';
import Login from "./components/Login/Login";

function App() {

  return (
    <ThemeProvider theme={CustomTheme}>
      <CssBaseline />
      <>
        <Login/>
      </>
    </ThemeProvider>
  )
}

export default App
