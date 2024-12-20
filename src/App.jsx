import Page from "./components/UI/Page";
import "./App.css";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import { BrowserRouter as Router, Routes, Route,Navigate  } from "react-router-dom";
import Home from "./components/Home/Home";
import SendMoney from "./components/SendMoney/SendMoney"
import Transactions from "./components/Transactions/Transactions";
import PaymentsServices from "./components/Payment/PaymentsServices";
import Prestamos from "./components/Prestamos/Prestamos"
import PlazosFijos from "./components/PlazosFijos/PlazosFijos"
import Favoritos from "./components/Favoritos/Favoritos";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import TokenExpiradoDialog from "./components/UI/Dialogs/TokenExpiradoDialog";
import MyAccount from "./components/MyAccount/MyAccount";
import GestionUsuarios from "./components/GestionUsuarios/AdminGestionUsuarios";


function App() {
  
  const [alertaTokenExpirado, setAlertaTokenExpirado] = useState (false);
  
  const [token, setToken] = useState("");

  const cerrarAlerta = () => {
    setAlertaTokenExpirado(false);
  }

  useEffect(() => {
    const verificarToken = () => {
      setToken(localStorage.getItem("token"));
      if (token) {
        const decodedToken = jwtDecode(token);
        const tiempoActual = Math.floor(Date.now() / 1000);
        const tokenExpirado =  decodedToken.exp <= tiempoActual; 
        if (tokenExpirado) {
            localStorage.removeItem("token");
            setAlertaTokenExpirado(true);
            setToken("");
        }
      }
    }
    verificarToken();
    const intervalId = setInterval(verificarToken, 3000);
    return () => clearInterval(intervalId);
  }, [token]);

  return (
    <Router>
    <Page>
        <Routes>
          <Route path="/" element={<LoginSignUp isLogin={true} />} />
          <Route path="/reactivate" element={<LoginSignUp isLogin={"reactivate"}/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/signUp" element={<LoginSignUp isLogin={false} />} />
          <Route path="/sendmoney/:cbuParam/:tipoCuentaParam" element={<SendMoney send={true}/>} />
          <Route path="/depositmoney" element={<SendMoney send={false}/>} />
          <Route path="/transactions" element={<Transactions/>} />
          <Route path="/payment" element={<PaymentsServices />} /> 
          <Route path="/prestamos" element={<Prestamos />} />
          <Route path="/plazosFijos" element={<PlazosFijos />} />
          <Route path="/favoritos" element={<Favoritos/>}></Route>
          <Route path="/userProfile" element={<MyAccount/>}></Route>
          <Route path="/gestionUsuarios" element={<GestionUsuarios/>}></Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {alertaTokenExpirado && (
          <TokenExpiradoDialog
              mostrarAlerta={alertaTokenExpirado} 
              cerrarAlerta={cerrarAlerta}         
          />
        )}
    </Page>
    </Router>
  );
}

export default App;