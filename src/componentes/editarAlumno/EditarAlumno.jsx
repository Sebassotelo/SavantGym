import React, { useContext } from "react";
import styles from "./editarAlumno.module.scss";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import ContextGeneral from "@/servicios/contextPrincipal";
import { toast } from "sonner";

function EditarAlumno({
  id,
  nombre,
  dni,
  correo,
  numero,
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

  if (!compraProductos) {
    compraProductos = [];
  }

  const editarAlumno = async (e) => {
    e.preventDefault(e);

    const nombreEdit = e.target.inputNombre.value;
    const dniEdit = e.target.inputDni.value;
    const correoEdit = e.target.inputCorreo.value;
    const numeroEdit = e.target.inputNumero.value;
    const alumnoDesdeEdit = e.target.inputAlumnoDesde.value;
    const vencimientoEdit = e.target.inputVencimiento.value;

    //traemos los datos de base de datos
    const docRef = doc(context.firestore, `users/${context.user.email}`);
    const consulta = await getDoc(docRef);
    const infoDocu = consulta.data();

    const index = infoDocu.alumnos.findIndex((item) => item.id === id);

    let alumnosCopia = [...infoDocu.alumnos];

    const nuevoAlumno = {
      id: id,
      nombre: nombreEdit,
      dni: dniEdit,
      numero: numeroEdit,
      correo: correoEdit,
      activo: activo,
      alumnoDesde: alumnoDesdeEdit,
      vencimiento: vencimientoEdit,
      historialDePago: historialDePago,
      compraProductos: compraProductos,
    };

    alumnosCopia[index] = nuevoAlumno;

    console.log(alumnosCopia);

    //seteamos el estado y updateamos la base de datos
    updateDoc(docRef, { alumnos: [...alumnosCopia] });
    toast.success(`${nombre} se edito correctamente`);
    llamadaDB();
    setShow(false);
    // toast.success("Pago Guardado con Exito");
  };
  return (
    <div className={styles.main}>
      <form className={styles.container} onSubmit={editarAlumno}>
        <p>Nombre:</p>
        <input type="text" id="inputNombre" required defaultValue={nombre} />
        <p>DNI:</p>
        <input type="text" id="inputDni" required defaultValue={dni} />
        <p>Numero:</p>
        <input type="text" id="inputNumero" required defaultValue={numero} />
        <p>Correo Electronico:</p>
        <input type="text" id="inputCorreo" required defaultValue={correo} />
        <p>Alumno Desde:</p>
        <input type="text" id="inputAlumnoDesde" defaultValue={alumnoDesde} />
        <p>Vencimiento:</p>
        <input type="text" id="inputVencimiento" defaultValue={vencimiento} />
        <button type="submit">Guardar</button>
        <button onClick={() => setShow(false)}>Cerrar</button>
      </form>
    </div>
  );
}

export default EditarAlumno;
