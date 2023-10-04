import React, { useState, useEffect, useContext } from "react";
import styles from "../../styles/cuenta.module.scss";
import Alumnos from "@/componentes/alumnos/Alumnos";
import ContextGeneral from "@/servicios/contextPrincipal";

function Index() {
  const context = useContext(ContextGeneral);
  const { llamadaDB } = useContext(ContextGeneral);
  const [estadoMenu, setEstadoMenu] = useState(1);

  const cambioEstado = (num) => {
    setEstadoMenu(num);
  };

  useEffect(() => {
    llamadaDB();
  }, []);

  return (
    <div className={styles.main}>
      <ul className={styles.menu}>
        <li onClick={() => cambioEstado(1)}>Alumnos</li>
        <li onClick={() => cambioEstado(2)}>Activos</li>
        <li onClick={() => cambioEstado(3)}>Vencimientos</li>
        <li onClick={() => cambioEstado(4)}>Ventas</li>
      </ul>
      <div className={styles.seccion}>
        {context.alumnos && estadoMenu === 1 && <Alumnos />}
        {estadoMenu === 2 && <p>Activos</p>}
        {estadoMenu === 3 && <p>Vencimientos</p>}
        {estadoMenu === 4 && <p>Ventas</p>}
      </div>
    </div>
  );
}

export default Index;
