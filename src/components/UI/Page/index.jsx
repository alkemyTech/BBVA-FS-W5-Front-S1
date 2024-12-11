import { useState } from "react";
import PropTypes from "prop-types";
import Header from "../Header";
import Footer from "../Footer"

export default function Page({ children }) {
  const [juan, setJuan] = useState(false);

  return (
    <div>
      <Header />
      <main style={{ minHeight: juan ? "90vh" : "100vh" }}>{children}</main>
      <Footer/>
    </div>
  );
}

Page.propTypes = {
    children: PropTypes.node.isRequired,  // 'children' debe ser un nodo válido de React y es obligatorio
};
