import React from "react";
import styles from "./navbar.module.scss";

function Navbar() {
  return (
    <div className={styles.container}>
      <p className={styles.logo}>LOGO SAVANT</p>
      <div className={styles.nav}>
        <p>Inicio</p>
        <p>Sobre Nosotros</p>
        <p>Precios</p>
        <p>Ubicacion</p>
      </div>
    </div>
  );
}

export default Navbar;
