import React, { useEffect, useState } from "react";
import styles from "./itemActivo.module.scss";
import AlumnoPopUp from "@/componentes/alumnoPopUp/AlumnoPopUp";

function ItemActivo({ item }) {
  const [showCardAlumno, setShowCardAlumno] = useState(false);
  const [vencido, setVencido] = useState(false);

  const eliminarAlumno = (id, alumno) => {
    return async (e) => {
      if (confirm(`Seguro que desea eliminar a ${alumno}?`) === true) {
        e.preventDefault(e);

        const nuevoItems = context.alumnosOriginal.filter((it) => it.id != id);

        console.log(nuevoItems);

        const docRef = doc(context.firestore, `users/${context.user.email}`);
        await updateDoc(docRef, { alumnos: [...nuevoItems] });
        llamadaDB();
        toast.success(`${alumno} Eliminado Correctamente`);
      }
    };
  };

  const verificarFecha = (fecha) => {
    const fechaObj = new Date(fecha.split("/").reverse().join("/"));
    const hoy = new Date();

    if (fechaObj < hoy) {
      setVencido(true);
    }

    console.log(vencido);
  };

  const styleInline = { backgroundColor: vencido ? "#DBB4AC" : "" };

  useEffect(() => {
    verificarFecha(item.vencimiento);
  }, []);

  return (
    <>
      <div
        className={styles.alumnos}
        onClick={() => setShowCardAlumno(true)}
        style={styleInline}
      >
        <p>{item.nombre}</p>
        <p>{item.dni}</p>
        <p>{item.vencimiento}</p>
      </div>

      {showCardAlumno && (
        <AlumnoPopUp
          id={item.id}
          nombre={item.nombre}
          dni={item.dni}
          alumnoDesde={item.alumnoDesde}
          activo={item.activo}
          vencimiento={item.vencimiento}
          historialDePago={item.historialDePago}
          compraProductos={item.compraProductos}
          eliminarAlumno={eliminarAlumno}
          setShow={setShowCardAlumno}
        />
      )}
    </>
  );
}

export default ItemActivo;
