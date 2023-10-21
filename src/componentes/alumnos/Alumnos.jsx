import React, { useContext, useState } from "react";
import styles from "./Alumnos.module.scss";
import AlumnoCard from "../alumnoCard/AlumnoCard";
import AgregarAlumnos from "../agregarAlumnos/AgregarAlumnos";
import ContextGeneral from "@/servicios/contextPrincipal";
import { toast } from "sonner";

import { doc, updateDoc } from "firebase/firestore";

function Alumnos() {
  const context = useContext(ContextGeneral);
  const { llamadaDB, setAlumnos } = useContext(ContextGeneral);

  const [busqueda, setBusqueda] = useState("");

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

  const buscador = (e) => {
    e.preventDefault(e);
    let busca = e.target.inputBusca.value;

    busca = busca
      .toLowerCase()
      .replace(/á/g, "a")
      .replace(/é/g, "e")
      .replace(/í/g, "i")
      .replace(/ó/g, "o")
      .replace(/ú/g, "u");

    const objetosFiltrados = context.alumnosOriginal.filter(
      (objeto) =>
        objeto.nombre
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(busca) ||
        objeto.dni
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(busca)
    );

    if (objetosFiltrados.length === 0) {
      toast.error(
        "Lo siento, no se encontraron alumnos que coincidan con tu búsqueda. "
      );
      e.target.inputBusca.value = "";
    } else {
      setBusqueda(e.target.inputBusca.value);
      setAlumnos(objetosFiltrados);
      e.target.inputBusca.value = "";
    }
  };

  const borrarBusqueda = (e) => {
    e.preventDefault();

    setBusqueda("");
    setAlumnos(context.alumnosOriginal);
  };

  return (
    <div className={styles.main}>
      <div className={styles.headerSeccion}>
        <form action="" className={styles.buscador} onSubmit={buscador}>
          <input
            type="text"
            placeholder="Ingrese nombre o DNI"
            id="inputBusca"
          />
          <button type="submit">Buscar</button>
        </form>

        {busqueda && (
          <p className={styles.borrarBusqueda} onClick={borrarBusqueda}>
            Borrar Busqueda
          </p>
        )}

        <AgregarAlumnos />
      </div>
      <div className={styles.alumnos}>
        {context.alumnos &&
          context.alumnos.map((item, i) => {
            return (
              <AlumnoCard
                key={i}
                id={item.id}
                nombre={item.nombre}
                dni={item.dni}
                alumnoDesde={item.alumnoDesde}
                activo={item.activo}
                vencimiento={item.vencimiento}
                historialDePago={item.historialDePago}
                compraProductos={item.compraProductos}
                eliminarAlumno={eliminarAlumno}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Alumnos;
