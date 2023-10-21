import React, { useContext, useEffect, useState } from "react";
import styles from "./activos.module.scss";
import ContextGeneral from "@/servicios/contextPrincipal";
import ItemActivo from "./itemActivo/ItemActivo";

function Activos() {
  const context = useContext(ContextGeneral);

  const [showActivos, setShowActivos] = useState([]);

  const compararPorFecha = (a, b) => {
    const fechaA = new Date(a.vencimiento.split("/").reverse().join("/"));
    const fechaB = new Date(b.vencimiento.split("/").reverse().join("/"));

    if (fechaA < fechaB) {
      return -1;
    }
    if (fechaA > fechaB) {
      return 1;
    }
    return 0;
  };

  const filtrarActivos = () => {
    let alumnosFiltrados = context.alumnosOriginal.filter(
      (item) => item.activo
    );

    alumnosFiltrados.sort(compararPorFecha);

    setShowActivos(alumnosFiltrados);
  };

  useEffect(() => {
    filtrarActivos();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.cabecera}>
        <p>Nombre</p>
        <p>DNI</p>
        <p>Vencimiento</p>
      </div>
      {showActivos.map((item, i) => {
        return <ItemActivo key={i} item={item} />;
      })}
    </div>
  );
}

export default Activos;
