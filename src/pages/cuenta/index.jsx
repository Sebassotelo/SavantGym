import React, { useState, useEffect, useContext } from "react";
import styles from "../../styles/cuenta.module.scss";
import Alumnos from "@/componentes/alumnos/Alumnos";
import ContextGeneral from "@/servicios/contextPrincipal";
import Activos from "@/componentes/activos/Activos";
import Ventas from "@/componentes/ventas/Ventas";

import {
  MdPerson,
  MdOutlineCalendarMonth,
  MdOutlineCurrencyExchange,
  MdOutlineSettings,
} from "react-icons/md";

import { push } from "next/router";
import Config from "@/componentes/config/Config";

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
            backgroundColor: estadoMenu == 1 && "#413f46",
            color: estadoMenu == 1 && "white",
          }}
          onClick={() => cambioEstado(1)}
        >
          <MdPerson className={styles.icon} /> <span>Alumnos</span>
        </li>
        <li
          style={{
            backgroundColor: estadoMenu == 2 && "#413f46",
            color: estadoMenu == 2 && "white",
          }}
          onClick={() => cambioEstado(2)}
        >
          {" "}
          <MdOutlineCalendarMonth className={styles.icon} />{" "}
          <span>Vencimientos</span>
        </li>
        <li
          style={{
            backgroundColor: estadoMenu == 3 && "#413f46",
            color: estadoMenu == 3 && "white",
          }}
          onClick={() => cambioEstado(3)}
        >
          <MdOutlineCurrencyExchange className={styles.icon} />{" "}
          <span>Ventas</span>
        </li>
        <li
          style={{
            backgroundColor: estadoMenu == 4 && "#413f46",
            color: estadoMenu == 4 && "white",
          }}
          onClick={() => cambioEstado(4)}
        >
          <MdOutlineSettings className={styles.icon} /> <span>Mi Cuenta</span>
        </li>
      </ul>
      <div className={styles.seccion}>
        {context.premium && !context.premium.activo && (
          <div className={styles.seccion__premium}>
            <p>
              No tiene premium activo, para realizar cambios o agregar alumnos
              necesitará suscribirse.
            </p>
          </div>
        )}
        {context.alumnos && estadoMenu === 1 && <Alumnos />}
        {estadoMenu === 2 && <Activos />}
        {estadoMenu === 3 && <Ventas />}
        {estadoMenu === 4 && <Config />}
      </div>
    </div>
  );
}

export default Index;
