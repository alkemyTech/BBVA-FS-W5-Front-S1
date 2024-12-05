import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { CustomTheme } from './components/UI/CustomTheme';
import NavBar from "./components/UI/NavBar";
import Header from "./components/UI/Header";

function App() {

  return (
    <>
    <Header/>
    <NavBar/>
    <ThemeProvider theme={CustomTheme}>
      <CssBaseline />
      
    </ThemeProvider>
    </>
    
  )
}

export default App
