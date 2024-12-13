import Page from "./components/UI/Page";
import "./App.css";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/home";
import SendMoney from "./components/SendMoney/SendMoney"
import PaymentsServices from "./components/Payment/PaymentsServices";


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

          <Route path="/payment" element={<PaymentsServices />} /> 
        </Routes>
    </Page>
    </Router>
  );
}

export default App;
