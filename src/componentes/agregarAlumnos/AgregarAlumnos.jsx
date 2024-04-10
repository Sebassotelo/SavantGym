import React, { useContext, useEffect, useState } from "react";
import styles from "./agregarAlumnos.module.scss";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import ContextGeneral from "@/servicios/contextPrincipal";

function AgregarAlumnos() {
  const context = useContext(ContextGeneral);
  const { setAlumnos } = useContext(ContextGeneral);

  const [show, setShow] = useState(false);
  const [fechaVencimiento, setFechaVencimiento] = useState("");

  const manejarShow = () => {
    setShow(!show);
  };

  const calcularFechaVencimiento = () => {
    const fechaActual = new Date();
    // Calcula la fecha de vencimiento dentro de un mes exacto.
    fechaActual.setMonth(fechaActual.getMonth() + 2);
    setFechaVencimiento(
      `${fechaActual.getDate()}/${fechaActual.getMonth()}/${fechaActual.getFullYear()}`
    );
  };

  const agregarAlumno = async (e) => {
    e.preventDefault(e);

    const nombre = e.target.inputNombre.value;
    const correo = e.target.inputCorreo.value;
    const numero = e.target.inputNumero.value;
    const dni = e.target.inputDni.value;
    const vencimiento = e.target.inputVencimiento.value;
    const monto = e.target.inputMonto.value;

    //traemos los datos de base de datos
    const docRef = doc(context.firestore, `users/${context.user.email}`);
    const consulta = await getDoc(docRef);
    const infoDocu = consulta.data();

    const newArray = [];

    let fechaRegistro = new Date();
    fechaRegistro = `${fechaRegistro.getDate()}/${
      fechaRegistro.getMonth() + 1
    }/${fechaRegistro.getFullYear()}`;

    newArray.push(
      {
        id: new Date().getTime(),
        nombre: nombre,
        correo: correo,
        numero: numero,
        dni: dni,
        alumnoDesde: fechaRegistro,
        activo: true,
        vencimiento: vencimiento,
        historialDePago: [
          { fecha: fechaRegistro, monto: monto, id: new Date().getTime() },
        ],
        compraProductos: [],
      },
      ...context.alumnos
    );

    //seteamos el estado y updateamos la base de datos
    setAlumnos(newArray);
    updateDoc(docRef, { alumnos: [...newArray] });

    // toast.success(`${title} Agregado con exito`);

    // //limpiar Form
    // e.target.inputTitle.value = "";
    // e.target.inputDesc.value = "";
    // e.target.inputPrecio.value = "";
    // // e.target.inputImagen.value = "";
    // e.target.inputStock.value = "";
    // e.target.inputSeccion.value = "";
    // e.target.inputCaracteristicas.value = "";
    // setImage("");
    // llamadaDB();

    // // setShow(false);
    setShow(false);
  };

  useEffect(() => {}, []);

  return (
    <>
      {show ? (
        <>
          <p className={styles.agregar}>Añadir Alumno +</p>
          <div className={styles.container}>
            <form className={styles.container__popup} onSubmit={agregarAlumno}>
              <p>Nombre:</p>
              <input type="text" id="inputNombre" required />
              <p>DNI:</p>
              <input type="text" id="inputDni" required />
              <p>Numero:</p>
              <input type="text" id="inputNumero" required />
              <p>Correo Electronico:</p>
              <input type="text" id="inputCorreo" required />
              <p>Vencimiento:</p>
              <input
                type="text"
                defaultValue={fechaVencimiento}
                id="inputVencimiento"
              />
              <p>Monto del Pago $:</p>
              <input type="text" id="inputMonto" />
              <button type="submit">Guardar</button>
              <button className={styles.agregar} onClick={manejarShow}>
                Cerrar
              </button>
            </form>
          </div>
        </>
      ) : (
        <p
          className={styles.agregar}
          onClick={() => {
            manejarShow();
            calcularFechaVencimiento();
          }}
        >
          Añadir Alumno +
        </p>
      )}
    </>
  );
}

export default AgregarAlumnos;
