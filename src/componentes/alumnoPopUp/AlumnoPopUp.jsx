import React, { useContext, useState } from "react";
import styles from "./AlumnoPopUp.module.scss";
import { doc, updateDoc, getDoc } from "firebase/firestore";

import { MdOutlineDeleteForever } from "react-icons/md";
import ContextGeneral from "@/servicios/contextPrincipal";

import { toast } from "sonner";
import RealizarPago from "../realizarPago/RealizarPago";

function AlumnoPopUp({
  id,
  nombre,
  numero,
  correo,
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

  const [showPagos, setShowPagos] = useState(false);

  const eliminarPago = (idPago) => {
    return async (e) => {
      e.preventDefault(e);

      //traemos los datos de base de datos
      const docRef = doc(context.firestore, `users/${context.user.email}`);
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

  const avisoElimVenta = () => {
    toast.error("Elimina la venta en la seccion de Ventas");
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h3>Nombre: {nombre}</h3>
        <p className={styles.p}>DNI: {dni}</p>
        <p className={styles.p}>Numero: {numero}</p>
        <p className={styles.p}>Correo Electronico: {correo}</p>
        <p className={styles.p}>Alumno Desde: {alumnoDesde}</p>
        <p className={styles.p}>Activo: {activo ? "Si" : "No"} </p>
        <p className={styles.p}>Vencimiento: {vencimiento}</p>
        <h3>PAGOS:</h3>

        {historialDePago.map((item, i) => {
          return (
            <div className={styles.pagos} key={i}>
              <p>Fecha: {item.fecha}</p>
              <p>${item.monto}</p>

              <MdOutlineDeleteForever
                className={styles.deletePago}
                onClick={eliminarPago(item.id)}
              />
            </div>
          );
        })}

        {compraProductos.length > 0 && <h3>PRODUCTOS:</h3>}

        {compraProductos &&
          compraProductos.map((item, i) => {
            return (
              <div className={styles.pagos} key={i} onClick={avisoElimVenta}>
                <p>{item.producto}</p>
                <p>{item.fecha}</p>
                <p>${item.monto}</p>
              </div>
            );
          })}

        <div className={styles.botones}>
          <button className={styles.cerrar} onClick={() => setShowPagos(true)}>
            Realizar Pago
          </button>

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

      {showPagos && (
        <RealizarPago setShowPago={setShowPagos} id={id} nombre={nombre} />
      )}
    </div>
  );
}

export default AlumnoPopUp;
