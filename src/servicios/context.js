import React, { useEffect, useState, useRef } from "react";
import ContextPrincipal from "./contextPrincipal";
import firebaseApp from "./firebase";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

function Context(props) {
  const [loader, setLoader] = useState(null);

  const [estadoUsuario, setEstadoUsuario] = useState(0);
  // 0 = No logueado
  // 1 = Logueado
  const [user, setUser] = useState(null);
  let user1 = "";

  const [alumnos, setAlumnos] = useState([]);
  const [alumnosOriginal, setAlumnosOriginal] = useState([]);

  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  const urlLogo = "https://i.imgur.com/RhjDkrz.png";

  const verificarLogin = () => {
    onAuthStateChanged(auth, inspectorSesion);
  };
  const inspectorSesion = (usuarioFirebase) => {
    //en caso de que haya seison iniciada
    if (usuarioFirebase) {
      setEstadoUsuario(1);
      setUser(usuarioFirebase);
      user1 = usuarioFirebase;
      buscarOCrearUsuario();
    } else {
      //en caso de que haya seison iniciada
      setUser(null);
      setEstadoUsuario(0);
    }
  };

  const buscarOCrearUsuario = async () => {
    const docRef = doc(firestore, `users/${user1.email}`);
    const consulta = await getDoc(docRef);
    if (consulta.exists()) {
      llamadaDB();
    } else {
      const fecha = new Date();
      const fechaDeRegistro = `${fecha.getDate()}/${
        fecha.getMonth() + 1
      }/${fecha.getFullYear()}`;
      await setDoc(docRef, {
        alumnos: [],
        idCuenta: new Date().getTime().toString(),
        fechaDeRegistro: fechaDeRegistro,
      });
      llamadaDB();
    }
  };

  const compararPorNombre = (a, b) => {
    const nombreA = a.nombre.toLowerCase();
    const nombreB = b.nombre.toLowerCase();
    if (nombreA < nombreB) {
      return -1;
    }
    if (nombreA > nombreB) {
      return 1;
    }
    return 0;
  };

  const llamadaDB = async () => {
    setLoader(false);
    const docRef = doc(
      firestore,
      `users/${user1.email ? user1.email : user.email}`
    );
    const consulta = await getDoc(docRef);
    const infoDocu = consulta.data();

    setAlumnos(infoDocu.alumnos.sort(compararPorNombre));
    setAlumnosOriginal(infoDocu.alumnos);

    setLoader(true);
  };

  return (
    <ContextPrincipal.Provider
      value={{
        auth: auth,
        firestore: firestore,
        loader: loader,
        user: user,
        user1: user1,
        estadoUsuario: estadoUsuario,
        alumnos: alumnos,
        alumnosOriginal: alumnosOriginal,
        urlLogo: urlLogo,
        setEstadoUsuario,
        setLoader,
        setUser,
        llamadaDB,
        setAlumnos,
        setAlumnosOriginal,
        verificarLogin,
        llamadaDB,
      }}
    >
      {props.children}
    </ContextPrincipal.Provider>
  );
}

export default Context;
