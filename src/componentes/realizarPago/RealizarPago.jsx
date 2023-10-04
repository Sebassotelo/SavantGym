import React, { useContext, useEffect, useState } from "react";
import styles from "./realizarPago.module.scss";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import ContextGeneral from "@/servicios/contextPrincipal";

import { toast } from "sonner";

function RealizarPago({ setShowPago, id, nombre }) {
  const context = useContext(ContextGeneral);
  const { llamadaDB } = useContext(ContextGeneral);

  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [fechaActual, setFechaActual] = useState("");

  const calcularFechaVencimiento = () => {
    const fechaActual = new Date();
    // Calcula la fecha de vencimiento dentro de un mes exacto.
    fechaActual.setMonth(fechaActual.getMonth() + 2);
    setFechaVencimiento(
      `${fechaActual.getDate()}/${fechaActual.getMonth()}/${fechaActual.getFullYear()}`
    );
    fechaActual.setMonth(fechaActual.getMonth() - 1);
    setFechaActual(
      `${fechaActual.getDate()}/${fechaActual.getMonth()}/${fechaActual.getFullYear()}`
    );
  };

  const realizarPago = async (e) => {
    e.preventDefault(e);

    const fecha = e.target.inputFecha.value;
    const monto = e.target.inputMonto.value;
    const vencimiento = e.target.inputVencimiento.value;

    //traemos los datos de base de datos
    const docRef = doc(context.firestore, `users/sebassotelo97@gmail.com`);
    const consulta = await getDoc(docRef);
    const infoDocu = consulta.data();

    const index = infoDocu.alumnos.findIndex((item) => item.id === id);

    const alumnosCopia = [...infoDocu.alumnos];

    let alumnoEdit = infoDocu.alumnos.filter((item) => item.id === id);

    let alumnoEditArray = alumnoEdit[0].historialDePago;

    alumnoEditArray = [
      {
        fecha: fecha,
        monto: monto,
        id: new Date().getTime(),
      },
      ...alumnoEditArray,
    ];

    alumnoEdit[0].vencimiento = vencimiento;

    alumnoEdit[0].historialDePago = alumnoEditArray;

    alumnosCopia[index] = alumnoEdit[0];
    console.log("alumnos copia", alumnosCopia);

    //seteamos el estado y updateamos la base de datos
    updateDoc(docRef, { alumnos: [...alumnosCopia] });
    llamadaDB();
    setShowPago(false);
    toast.success("Pago Guardado con Exito");
  };

  useEffect(() => {
    calcularFechaVencimiento();
  }, []);

  return (
    <div className={styles.container}>
      <form action="" className={styles.form} onSubmit={realizarPago}>
        <p>Pago de {nombre}</p>
        <p>Fecha:</p>
        <input type="text" id="inputFecha" defaultValue={fechaActual} />
        <p>Monto del pago $:</p>
        <input type="text" id="inputMonto" />
        <p>Fecha de Vencimiento:</p>
        <input
          type="text"
          id="inputVencimiento"
          defaultValue={fechaVencimiento}
        />
        <button type="submit">Guardar</button>
        <button onClick={() => setShowPago(false)}>Cerrar</button>
      </form>
    </div>
  );
}

export default RealizarPago;
