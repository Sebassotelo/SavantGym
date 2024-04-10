import React, { useContext } from "react";
import styles from "./navbar.module.scss";
import { push } from "next/router";

import ContextGeneral from "../../servicios/contextPrincipal";

import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

import { useRouter } from "next/router";

function Navbar({}) {
  const context = useContext(ContextGeneral);

  const googleProvider = new GoogleAuthProvider();

  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <div className={styles.container}>
      <img
        className={styles.logo}
        src={context.urlLogo}
        alt=""
        onClick={() => push("/")}
      />
      <div className={styles.nav}>
        <p onClick={() => push("/")}>Inicio</p>

        {context.estadoUsuario == 0 && (
          <p onClick={() => signInWithPopup(context.auth, googleProvider)}>
            Iniciar Sesion
          </p>
        )}
        {context.estadoUsuario == 1 && (
          <p
            onClick={() => {
              push(`/cuenta`);
            }}
          >
            Mi Cuenta
          </p>
        )}
        {context.estadoUsuario == 1 && (
          <p
            onClick={() => {
              signOut(context.auth);
              push(`/`);
            }}
          >
            Cerrar Sesion
          </p>
        )}
      </div>
    </div>
  );
}

export default Navbar;
