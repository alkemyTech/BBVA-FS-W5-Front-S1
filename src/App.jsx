import Page from "./components/UI/Page";
import "./App.css";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/home";
import Transactions from "./components/Transactions/Transactions";



function App() {
  return (
    <Router>
    <Page>
        <Routes>
          <Route path="/" element={<LoginSignUp isLogin={true} />} />        
          <Route path="/home" element={<Home />} />
          <Route path="/signUp" element={<LoginSignUp isLogin={false} />} />
          <Route path="/Transactions" element={<Transactions/>} />
        </Routes>
    </Page>
    </Router>
  );
}

export default App;
