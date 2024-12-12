import Page from "./components/UI/Page";
import "./App.css";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import SendMoney from "./components/SendMoney/SendMoney";



function App() {
  return (
    <Page>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />        
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginSignUp isLogin={true} />} />
          <Route path="/signUp" element={<LoginSignUp isLogin={false} />} />
          <Route path="/sendmoney" element={<SendMoney send={true}/>} />
          <Route path="/depositmoney" element={<SendMoney send={false}/>} />

        </Routes>
      </Router>
    </Page>
  );
}

export default App;
