import Page from "./components/UI/Page";
import "./App.css";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import SendMoney from "./components/SendMoney/SendMoney"
import Transactions from "./components/Transactions/Transactions";
import PaymentsServices from "./components/Payment/PaymentsServices";
import Prestamos from "./components/Prestamos/Prestamos"
import PlazosFijos from "./components/PlazosFijos/PlazosFijos"
import MiCuenta from "./components/MiCuenta/MiCuenta";
import Favoritos from "./components/Favoritos/Favoritos";


function App() {
  return (
    <Router>
    <Page>
        <Routes>
          <Route path="/" element={<LoginSignUp isLogin={true} />} />        
          <Route path="/home" element={<Home />} />
          <Route path="/signUp" element={<LoginSignUp isLogin={false} />} />
          <Route path="/sendmoney/:cbu" element={<SendMoney send={true}/>} />
          <Route path="/depositmoney" element={<SendMoney send={false}/>} />
          <Route path="/transactions" element={<Transactions/>} />
          <Route path="/payment" element={<PaymentsServices />} /> 
          <Route path="/prestamos" element={<Prestamos />} />
          <Route path="/plazosFijos" element={<PlazosFijos />} />
          <Route path="/accounts/" element={<MiCuenta/>}></Route>
          <Route path="/favoritos" element={<Favoritos/>}></Route>
        </Routes>
    </Page>
    </Router>
  );
}

export default App;