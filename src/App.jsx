import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { CustomTheme } from './components/UI/CustomTheme';
import NavBar from "./components/UI/NavBar";
import Login from "./components/Login/Login";

function App() {

  return (
    <>
    <NavBar/>
    <ThemeProvider theme={CustomTheme}>
      <CssBaseline />
      <>
        <Login/>
      </>
    </ThemeProvider>
    </>
    
  )
}

export default App
