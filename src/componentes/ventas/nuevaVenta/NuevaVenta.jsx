import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./nuevaVenta.module.scss";
import ContextGeneral from "@/servicios/contextPrincipal";

import { doc, updateDoc, getDoc } from "firebase/firestore";
import { toast } from "sonner";

function NuevaVenta({ mostrarNuevaVenta }) {
  const context = useContext(ContextGeneral);
  const { llamadaDB } = useContext(ContextGeneral);

  const [busquedaVentas, setBusquedaVentas] = useState(context.alumnosOriginal);
  const alumnos = useRef(context.alumnosOriginal);

  const [buscador, setBuscador] = useState("");

  const [comprador, setComprador] = useState(null);
  const [fechaActual, setFechaActual] = useState("");

  const agregarVenta = async (e) => {
    e.preventDefault(e);

    const fecha = e.target.inputFecha.value;
    const monto = e.target.inputMonto.value;
    const producto = e.target.inputProducto.value;

    //traemos los datos de base de datos
    const docRef = doc(context.firestore, `users/sebassotelo97@gmail.com`);
    const consulta = await getDoc(docRef);
    const infoDocu = consulta.data();

    const index = infoDocu.alumnos.findIndex(
      (item) => item.id === comprador.id
    );

    const alumnosCopia = [...infoDocu.alumnos];

    let alumnoEdit = infoDocu.alumnos.filter(
      (item) => item.id === comprador.id
    );

    let alumnoEditArray = alumnoEdit[0].compraProductos;

    alumnoEditArray = [
      {
        producto: producto,
        fecha: fecha,
        monto: monto,
        id: new Date().getTime(),
      },
      ...alumnoEditArray,
    ];

    alumnoEdit[0].compraProductos = alumnoEditArray;

    alumnosCopia[index] = alumnoEdit[0];

    //seteamos el estado y updateamos la base de datos
    updateDoc(docRef, { alumnos: [...alumnosCopia] });
    llamadaDB();
    mostrarNuevaVenta();
    toast.success("Venta Guardada con Exito");
  };

  const manejarBuscador = (e) => {
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
      setBuscador(e.target.inputBusca.value);
      setBusquedaVentas(objetosFiltrados);
      e.target.inputBusca.value = "";
    }
  };

  const calcularFechaVencimiento = () => {
    const fechaActual = new Date();
    // Calcula la fecha de vencimiento dentro de un mes exacto.
    fechaActual.setMonth(fechaActual.getMonth() + 1);
    setFechaActual(
      `${fechaActual.getDate()}/${fechaActual.getMonth()}/${fechaActual.getFullYear()}`
    );
  };

  useEffect(() => {
    calcularFechaVencimiento();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {!comprador && (
          <>
            <p>Buscar Alumno</p>
            <form
              action=""
              className={styles.formBuscador}
              onSubmit={manejarBuscador}
            >
              <input
                type="text"
                id="inputBusca"
                placeholder="Ingrese Nombre o DNI"
              />
              <button type="submit">Buscar</button>
            </form>
          </>
        )}

        {!comprador && (
          <div className={styles.listaNombres}>
            {busquedaVentas.map((item, i) => {
              return (
                <div
                  key={i}
                  className={styles.listaItems}
                  onClick={() => setComprador(item)}
                >
                  <p>{item.nombre}</p>
                  <p>{item.dni}</p>
                </div>
              );
            })}
          </div>
        )}

        {comprador && (
          <>
            <div className={styles.alumnoSelecionado}>
              <p>{comprador.nombre}</p>
              <p>{comprador.dni}</p>
              <p
                onClick={() => {
                  setComprador(null);
                  setBusquedaVentas(context.alumnosOriginal);
                }}
                className={styles.cambiarAlumno}
              >
                Cambiar Alumno
              </p>
            </div>
            <form
              action=""
              className={styles.formVenta}
              onSubmit={agregarVenta}
            >
              <p>Producto:</p>
              <input type="text" id="inputProducto" />
              <p>Monto $:</p>
              <input type="text" id="inputMonto" />
              <p>Fecha:</p>
              <input type="text" id="inputFecha" defaultValue={fechaActual} />
              <button type="submit">Guardar</button>
            </form>
          </>
        )}

        <button className={styles.cerrar} onClick={mostrarNuevaVenta}>
          cerrar
        </button>
      </div>
    </div>
  );
}

export default NuevaVenta;
