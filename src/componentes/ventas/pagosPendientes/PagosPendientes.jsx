import React, { useContext } from "react";
import styles from "./pagosPendientes.module.scss";
import { toast } from "sonner";

import { doc, updateDoc, getDoc } from "firebase/firestore";
import ContextGeneral from "@/servicios/contextPrincipal";

import { MdOutlineDeleteForever } from "react-icons/md";

function PagosPendientes({ item, venta }) {
  const context = useContext(ContextGeneral);
  const { llamadaDB } = useContext(ContextGeneral);

  const eliminarVenta = async (e) => {
    e.preventDefault(e);
    if (
      confirm(
        `Seguro que desea eliminar la venta de ${item.nombre} por el monto de ${venta.monto}?`
      ) === true
    ) {
      //traemos los datos de base de datos
      const docRef = doc(context.firestore, `users/${context.user.email}`);
      const consulta = await getDoc(docRef);
      const infoDocu = consulta.data();

      const index = infoDocu.alumnos.findIndex((item2) => item2.id === item.id);

      const alumnosCopia = [...infoDocu.alumnos];

      let alumnoEdit = infoDocu.alumnos.filter((item2) => item2.id === item.id);

      let alumnoEditArray = alumnoEdit[0].compraProductos.filter(
        (item2) => item2.id != venta.id
      );

      alumnoEdit[0].compraProductos = alumnoEditArray;

      alumnosCopia[index] = alumnoEdit[0];

      //seteamos el estado y updateamos la base de datos
      updateDoc(docRef, { alumnos: [...alumnosCopia] });
      llamadaDB();
      toast.success("Venta eliminada con Exito");
    }
  };

  return (
    <div className={styles.container}>
      <p>{item.nombre}</p>
      <p>{venta.producto}</p>
      <p>${venta.monto}</p>
      <p>{venta.fecha}</p>

      <MdOutlineDeleteForever
        className={styles.eliminar}
        onClick={eliminarVenta}
      />
    </div>
  );
}

export default PagosPendientes;
