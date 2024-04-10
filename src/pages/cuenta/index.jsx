import React, { useState, useEffect, useContext } from "react";
import styles from "../../styles/cuenta.module.scss";
import Alumnos from "@/componentes/alumnos/Alumnos";
import ContextGeneral from "@/servicios/contextPrincipal";
import Activos from "@/componentes/activos/Activos";
import Ventas from "@/componentes/ventas/Ventas";

import { push } from "next/router";

function Index() {
  const context = useContext(ContextGeneral);
  const { verificarLogin } = useContext(ContextGeneral);
  const [estadoMenu, setEstadoMenu] = useState(1);

  const cambioEstado = (num) => {
    setEstadoMenu(num);
  };

  useEffect(() => {
    if (!context.user) {
      verificarLogin();
    }
  }, []);

  return (
    <div className={styles.main}>
      <ul className={styles.menu}>
        <li
          style={{
            backgroundColor: estadoMenu == 1 && "#4b05ad",
            color: estadoMenu == 1 && "#E8D6CB",
          }}
          onClick={() => cambioEstado(1)}
        >
          Alumnos
        </li>
        <li
          style={{
            backgroundColor: estadoMenu == 2 && "#4b05ad",
            color: estadoMenu == 2 && "#E8D6CB",
          }}
          onClick={() => cambioEstado(2)}
        >
          Vencimientos
        </li>
        <li
          style={{
            backgroundColor: estadoMenu == 3 && "#4b05ad",
            color: estadoMenu == 3 && "#E8D6CB",
          }}
          onClick={() => cambioEstado(3)}
        >
          Ventas
        </li>
      </ul>
      <div className={styles.seccion}>
        {context.alumnos && estadoMenu === 1 && <Alumnos />}
        {estadoMenu === 2 && <Activos />}
        {estadoMenu === 3 && <Ventas />}
      </div>
    </div>
  );
}

export default Index;
