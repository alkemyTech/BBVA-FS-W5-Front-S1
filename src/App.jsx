import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { CustomTheme } from './components/UI/CustomTheme';
<<<<<<< HEAD
import NavBar from "./components/UI/NavBar";
import Header from "./components/UI/Header";
=======
import Login from "./components/Login/Login";
>>>>>>> 04de4dc5e677064e527837fc172f7423235d57f9

function App() {

  return (
    <>
    <Header/>
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
