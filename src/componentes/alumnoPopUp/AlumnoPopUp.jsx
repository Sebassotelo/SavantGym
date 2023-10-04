import React, { useContext } from "react";
import styles from "./AlumnoPopUp.module.scss";
import { doc, updateDoc, getDoc } from "firebase/firestore";

import { MdOutlineDeleteForever } from "react-icons/md";
import ContextGeneral from "@/servicios/contextPrincipal";

import { toast } from "sonner";

function AlumnoPopUp({
  id,
  nombre,
  dni,
  alumnoDesde,
  activo,
  vencimiento,
  historialDePago,
  compraProductos,
  eliminarAlumno,
  setShow,
}) {
  const context = useContext(ContextGeneral);
  const { llamadaDB } = useContext(ContextGeneral);

  const eliminarPago = (idPago) => {
    return async (e) => {
      e.preventDefault(e);

      //traemos los datos de base de datos
      const docRef = doc(context.firestore, `users/sebassotelo97@gmail.com`);
      const consulta = await getDoc(docRef);
      const infoDocu = consulta.data();

      const index = infoDocu.alumnos.findIndex((item) => item.id === id);

      const alumnosCopia = [...infoDocu.alumnos];

      let alumnoEdit = infoDocu.alumnos.filter((item) => item.id === id);

      let alumnoEditArray = alumnoEdit[0].historialDePago.filter(
        (item) => item.id != idPago
      );

      alumnoEdit[0].historialDePago = alumnoEditArray;

      alumnosCopia[index] = alumnoEdit[0];

      //seteamos el estado y updateamos la base de datos
      updateDoc(docRef, { alumnos: [...alumnosCopia] });
      llamadaDB();
      setShow(false);
      toast.success("Pago Eliminado con Exito");
    };
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h3>Nombre: {nombre}</h3>
        <p>DNI: {dni}</p>
        <p>Alumno Desde: {alumnoDesde}</p>
        <p>Activo: {activo ? "Si" : "No"} </p>
        <p>Vencimiento: {vencimiento}</p>
        <p>PAGOS:</p>

        {historialDePago.map((item) => {
          return (
            <div className={styles.pagos}>
              <p>Fecha: {item.fecha}</p>
              <p>${item.monto}</p>

              <MdOutlineDeleteForever
                className={styles.deletePago}
                onClick={eliminarPago(item.id)}
              />
            </div>
          );
        })}

        <button
          className={styles.eliminarAlumno}
          onClick={eliminarAlumno(id, nombre)}
        >
          Eliminar Alumno
        </button>

        <button className={styles.cerrar} onClick={() => setShow(false)}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default AlumnoPopUp;
