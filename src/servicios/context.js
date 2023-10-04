import React, { useEffect, useState, useRef } from "react";
import ContextPrincipal from "./contextPrincipal";
import firebaseApp from "./firebase";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

function Context(props) {
  const [loader, setLoader] = useState(null);

  const [estadoUsuario, setEstadoUsuario] = useState(0);
  // 0 = No logueado
  // 1 = Logueado
  const [user, setUser] = useState(null);

  const [alumnos, setAlumnos] = useState([]);
  const [alumnosOriginal, setAlumnosOriginal] = useState([]);

  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  const inspectorSesion = (usuarioFirebase) => {
    //en caso de que haya seison iniciada
    if (usuarioFirebase) {
      setUser(usuarioFirebase);
      if (usuarioFirebase.email == "sebassotelo97@gmail.com") {
        setEstadoUsuario(1);
        setUser(usuarioFirebase);
      }
    } else {
      //en caso de que haya seison iniciada
      setUser(null);
      setEstadoUsuario(0);
    }
  };
  const verificarLogin = () => {
    onAuthStateChanged(auth, inspectorSesion);
  };

  const llamadaDB = async () => {
    setLoader(false);
    const docRef = doc(firestore, `users/sebassotelo97@gmail.com`);
    const consulta = await getDoc(docRef);
    const infoDocu = consulta.data();

    setAlumnos(infoDocu.alumnos);
    setAlumnosOriginal(infoDocu.alumnos);
    // setProductosCopia(infoDocu.items);
    // setCupones(infoDocu.cupones);
    // setDescuentoCantidad(infoDocu.descuento);
    // recuperarStorage();

    setLoader(true);
  };

  return (
    <ContextPrincipal.Provider
      value={{
        auth: auth,
        firestore: firestore,
        loader: loader,
        user: user,
        estadoUsuario: estadoUsuario,
        alumnos: alumnos,
        alumnosOriginal: alumnosOriginal,
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
