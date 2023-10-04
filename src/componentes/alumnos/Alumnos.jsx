import React, { useContext } from "react";
import styles from "./Alumnos.module.scss";
import AlumnoCard from "../alumnoCard/AlumnoCard";
import AgregarAlumnos from "../agregarAlumnos/AgregarAlumnos";
import ContextGeneral from "@/servicios/contextPrincipal";
import { toast } from "sonner";

import { doc, updateDoc } from "firebase/firestore";

function Alumnos() {
  const context = useContext(ContextGeneral);
  const { llamadaDB } = useContext(ContextGeneral);

  const eliminarAlumno = (id, alumno) => {
    return async (e) => {
      if (confirm(`Seguro que desea eliminar a ${alumno}?`) === true) {
        e.preventDefault(e);

        const nuevoItems = context.alumnosOriginal.filter(
          (item) => item.id != id
        );

        console.log(nuevoItems);

        const docRef = doc(context.firestore, `users/sebassotelo97@gmail.com`);
        await updateDoc(docRef, { alumnos: [...nuevoItems] });
        llamadaDB();
        toast.success(`${alumno} Eliminado Correctamente`);
      }
    };
  };

  return (
    <div className={styles.main}>
      <div className={styles.headerSeccion}>
        <div>BUSQUEDA</div>

        <AgregarAlumnos />
      </div>
      <div className={styles.alumnos}>
        {context.alumnos &&
          context.alumnos.map((item) => {
            return (
              <AlumnoCard
                id={item.id}
                nombre={item.nombre}
                dni={item.dni}
                alumnoDesde={item.alumnoDesde}
                activo={item.activo}
                vencimiento={item.vencimiento}
                historialDePago={item.historialDePago}
                compraProductos={item.compraProducto}
                eliminarAlumno={eliminarAlumno}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Alumnos;
