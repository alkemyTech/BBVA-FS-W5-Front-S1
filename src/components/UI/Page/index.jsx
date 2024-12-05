import { useState } from "react";
import PropTypes from "prop-types";

export default function Page({ children }) {
  const [juan, setJuan] = useState(false);

  return (
    <div>
      <header />
      <main style={{ minHeight: juan ? "90vh" : "100vh" }}>{children}</main>
      <footer/>
    </div>
  );
}

Page.propTypes = {
    children: PropTypes.node.isRequired,  // 'children' debe ser un nodo válido de React y es obligatorio
};
