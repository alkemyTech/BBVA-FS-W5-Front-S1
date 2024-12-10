import Page from "./components/UI/Page";
import "./App.css";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import NavBar from "./components/UI/NavBar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/home";

function App() {
  return (
    <Page>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/navBar" element={<NavBar/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<LoginSignUp isLogin={true} />} />
          <Route path="/signUp" element={<LoginSignUp isLogin={false}  />} />
        </Routes>
      </Router>
    </Page>
  );
}

export default App;
