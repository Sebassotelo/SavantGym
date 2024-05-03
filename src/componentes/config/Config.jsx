import React, { useContext } from "react";
import style from "./Config.module.scss";
import ContextGeneral from "@/servicios/contextPrincipal";

import { doc, updateDoc } from "firebase/firestore";
import { toast } from "sonner";

function Config() {
  const context = useContext(ContextGeneral);
  const { setConfig } = useContext(ContextGeneral);

  const manejarConfig = async (e) => {
    e.preventDefault(e);

    const nombre = e.target.inputNombre.value;
    const numeroContacto = e.target.inputNumero.value;

    //traemos los datos de base de datos
    const docRef = doc(context.firestore, `users/${context.user.email}`);

    const array = {
      nombre: nombre,
      numeroContacto: numeroContacto,
    };

    //seteamos el estado y updateamos la base de datos
    updateDoc(docRef, { config: array });

    toast.success(`Configuracion guardada con exito`);
  };
  return (
    <div className={style.main}>
      <div className={style.container}>
        <form className={style.form} onSubmit={manejarConfig}>
          <p>Nombre del Gimnasio:</p>
          <input
            type="text"
            id="inputNombre"
            required
            defaultValue={context.config.nombre}
          />
          <p>Numero de Contacto:</p>
          <input
            type="text"
            id="inputNumero"
            required
            defaultValue={context.config.numeroContacto}
          />
          <button type="submit">Guardar</button>
          <div className={style.premium}>
            <p>Premium: </p>

            {context.premium.activo ? (
              <span style={{ color: "green" }}>
                {context.premium.prueba ? "Periodo de Prueba " : "Activo"}
              </span>
            ) : (
              <span style={{ color: "red" }}>Desactivado</span>
            )}
          </div>

          {context.premium.activo && (
            <p>
              Vencimiento: <span>{context.premium.vencimiento}</span>{" "}
            </p>
          )}

          {context.premium.activo && !context.premium.prueba ? (
            <a
              href="https://www.mercadopago.com.ar/subscriptions#from-section=menu"
              target="_blank"
              className={style.suscripcion}
            >
              Ver suscripcion
            </a>
          ) : (
            <a
              href="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380848f3a27f0018f3d2580e801c1"
              target="_blank"
              className={style.suscripcion}
            >
              Suscribirme
            </a>
          )}
        </form>
      </div>
    </div>
  );
}

export default Config;
