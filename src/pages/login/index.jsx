import React from "react";
import { useContext, useEffect } from "react";
import ContextGeneral from "@/servicios/contextPrincipal";
import { useRouter } from "next/navigation";

import styles from "../../styles/login.module.scss";
import { BiLogoGoogle } from "react-icons/bi";

import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

function index() {
  const router = useRouter();

  const context = useContext(ContextGeneral);
  const { verificarLogin } = useContext(ContextGeneral);

  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    verificarLogin();
    console.log(context.user);

    if (context.estadoUsuario === 1) {
      router.push("/cuenta");
    }
  }, [context.user]);

  return (
    <div className={styles.main}>
      {context.estadoUsuario === 0 && (
        <div
          className={styles.container}
          onClick={() => signInWithPopup(context.auth, googleProvider)}
        >
          <BiLogoGoogle />
          <p>Ingresar con Google</p>
        </div>
      )}

      {context.estadoUsuario === 1 && (
        <div className={styles.container} onClick={() => signOut(context.auth)}>
          <p>Cerrar Sesion</p>
        </div>
      )}
    </div>
  );
}

export default index;
