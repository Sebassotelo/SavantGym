import React, { useState } from "react";
import styles from "./AlumnoCard.module.scss";
import { MdOutlineDeleteForever } from "react-icons/md";
import RealizarPago from "../realizarPago/RealizarPago";
import AlumnoPopUp from "../alumnoPopUp/AlumnoPopUp";

function AlumnoCard({
  id,
  nombre,
  dni,
  alumnoDesde,
  activo,
  vencimiento,
  historialDePago,
  compraProductos,
  eliminarAlumno,
}) {
  const [showPago, setShowPago] = useState(false);
  const [showCardAlumno, setShowCardAlumno] = useState(false);

  return (
    <div className={styles.container}>
      <h3 onClick={() => setShowCardAlumno(true)}>{nombre}</h3>
      <p>DNI: {dni}</p>
      <p>Alumno Desde: {alumnoDesde}</p>
      <p>Vencimiento: {vencimiento}</p>
      {activo ? <p>Activo</p> : <p>Inactivo</p>}

      {showPago ? (
        <>
          <p className={styles.realizarPago}>Realizar Pago</p>
          <RealizarPago setShowPago={setShowPago} id={id} nombre={nombre} />
        </>
      ) : (
        <p onClick={() => setShowPago(true)} className={styles.realizarPago}>
          Realizar Pago
        </p>
      )}

      <MdOutlineDeleteForever
        className={styles.delete}
        onClick={eliminarAlumno(id, nombre)}
      />

      {showCardAlumno && (
        <AlumnoPopUp
          id={id}
          nombre={nombre}
          dni={dni}
          alumnoDesde={alumnoDesde}
          activo={activo}
          vencimiento={vencimiento}
          historialDePago={historialDePago}
          compraProductos={compraProductos}
          eliminarAlumno={eliminarAlumno}
          setShow={setShowCardAlumno}
        />
      )}
    </div>
  );
}

export default AlumnoCard;
