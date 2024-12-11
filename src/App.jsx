import Page from "./components/UI/Page";
import "./App.css";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";



function App() {
  return (
    <Page>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          
          <Route path="/login" element={<LoginSignUp isLogin={true} />} />
          <Route path="/signUp" element={<LoginSignUp isLogin={false}  />} />
        </Routes>
      </Router>
    </Page>
  );
}

export default App;
