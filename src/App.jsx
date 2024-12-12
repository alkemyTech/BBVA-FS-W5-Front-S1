import Page from "./components/UI/Page";
import "./App.css";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/home";
import PaymentsServices from "./components/Payment/PaymentsServices";



function App() {
  return (
    <Page>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />       
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginSignUp isLogin={true} />} />
          <Route path="/signUp" element={<LoginSignUp isLogin={false} />} />
          <Route path="/payment" element={<PaymentsServices />} /> 
        </Routes>
      </Router>
    </Page>
  );
}

export default App;
