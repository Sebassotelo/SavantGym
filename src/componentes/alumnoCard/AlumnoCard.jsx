import React, { useContext, useState } from "react";
import styles from "./AlumnoCard.module.scss";

import {
  MdOutlineDeleteForever,
  MdOutlineEdit,
  MdToggleOff,
  MdToggleOn,
  MdOutlineAttachMoney,
} from "react-icons/md";

import RealizarPago from "../realizarPago/RealizarPago";
import AlumnoPopUp from "../alumnoPopUp/AlumnoPopUp";
import EditarAlumno from "../editarAlumno/EditarAlumno";

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import ContextGeneral from "@/servicios/contextPrincipal";

import { toast } from "sonner";

function AlumnoCard({
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
}) {
  const context = useContext(ContextGeneral);
  const { llamadaDB } = useContext(ContextGeneral);

  const [showPago, setShowPago] = useState(false);
  const [showCardAlumno, setShowCardAlumno] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const manejarActivo = async (e) => {
    if (
      confirm(
        `Seguro que desea ${!activo ? "activar" : "desactivar"} a ${nombre}`
      ) === true
    ) {
      e.preventDefault(e);

      //traemos los datos de base de datos
      const docRef = doc(context.firestore, `users/${context.user.email}`);
      const consulta = await getDoc(docRef);
      const infoDocu = consulta.data();

      const index = infoDocu.alumnos.findIndex((item) => item.id === id);

      let alumnosCopia = [...infoDocu.alumnos];

      alumnosCopia[index].activo = !activo;

      console.log(alumnosCopia);

      //seteamos el estado y updateamos la base de datos
      updateDoc(docRef, { alumnos: [...alumnosCopia] });
      llamadaDB();
      toast.success(`${!activo ? "Alumno activo" : "Alumno Inactivo"}`);
    }
  };

  return (
    <div className={styles.container}>
      <div
        onClick={() => setShowCardAlumno(true)}
        style={{ cursor: "pointer" }}
      >
        <h3>{nombre}</h3>
        <p>
          <span>DNI:</span> {dni}
        </p>
        <p>
          <span>Alumno Desde:</span> {alumnoDesde}
        </p>
        <p>
          <span>Vencimiento:</span> {vencimiento}
        </p>
      </div>

      <div className={styles.acciones}>
        {activo ? (
          <MdToggleOn className={styles.toggleOn} onClick={manejarActivo} />
        ) : (
          <MdToggleOff className={styles.toggleOff} onClick={manejarActivo} />
        )}

        <MdOutlineAttachMoney
          className={styles.realizarPago}
          onClick={() => setShowPago(true)}
        />

        <MdOutlineEdit
          className={styles.delete}
          onClick={() => setShowEdit(true)}
        />

        <MdOutlineDeleteForever
          className={styles.delete}
          onClick={eliminarAlumno(id, nombre)}
        />
      </div>

      {showEdit && (
        <EditarAlumno
          id={id}
          nombre={nombre}
          numero={numero}
          correo={correo}
          dni={dni}
          alumnoDesde={alumnoDesde}
          activo={activo}
          vencimiento={vencimiento}
          historialDePago={historialDePago}
          compraProductos={compraProductos}
          eliminarAlumno={eliminarAlumno}
          setShow={setShowEdit}
        />
      )}

      {showPago && (
        <RealizarPago setShowPago={setShowPago} id={id} nombre={nombre} />
      )}

      {showCardAlumno && (
        <AlumnoPopUp
          id={id}
          nombre={nombre}
          numero={numero}
          correo={correo}
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
