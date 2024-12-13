import Page from "./components/UI/Page";
import "./App.css";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import SendMoney from "./components/SendMoney/SendMoney"
import Prestamos from "./components/Prestamos/Prestamos"
import PlazosFijos from "./components/PlazosFijos/PlazosFijos"


function App() {
  return (
    <Router>
    <Page>
        <Routes>
          <Route path="/" element={<LoginSignUp isLogin={true} />} />        
          <Route path="/home" element={<Home />} />
          <Route path="/signUp" element={<LoginSignUp isLogin={false} />} />
          <Route path="/sendmoney" element={<SendMoney send={true}/>} />
          <Route path="/depositmoney" element={<SendMoney send={false}/>} />
          <Route path="/prestamos" element={<Prestamos />} />
          <Route path="/plazosFijos" element={<PlazosFijos />} />

        </Routes>
    </Page>
    </Router>
  );
}

export default App;
