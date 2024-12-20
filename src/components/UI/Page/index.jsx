import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../Header";
import Footer from "../Footer"

export default function Page({ children }) {
  
  const location = useLocation();

  const ocultarHeader = ["/", "/signUp", "/reactivate"].includes(location.pathname);

  return (
    <div >
      {!ocultarHeader && <Header />}
      <main style={{ minHeight: "71.9vh", background:"#eee"}}>{children}</main>
      {!ocultarHeader && <Footer />}
    </div>
  );
}

Page.propTypes = {
    children: PropTypes.node.isRequired,  
};
