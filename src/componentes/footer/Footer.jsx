import React from "react";
import styles from "./footer.module.scss";

import { AiOutlineInstagram, AiOutlineWhatsApp } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import { BsFillTelephoneFill } from "react-icons/bs";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.redes}>
          <h4>Nuestras Redes</h4>
          <div className={styles.icon__container}>
            <AiOutlineInstagram className={styles.icon} />
            <AiOutlineWhatsApp className={styles.icon} />
          </div>
          <h4>Horarios</h4>
          <p>De 14hs a 17hs y 18hs a 22hs</p>
        </div>
        <div className={styles.contacto}>
          <h4>Contacto</h4>
          <p>
            <BiMap /> Direccion
          </p>
          <p>
            <BsFillTelephoneFill /> Numero de celular
          </p>
          <h4>Metodos de Pago</h4>
          <p>Efectivo y Transferencia</p>
        </div>
      </div>

      <p className={styles.hecho}>
        Hecho por{" "}
        <a href="https://www.sebassotelo.com.ar/" target="_blank">
          Sebas Sotelo
        </a>
      </p>
    </div>
  );
}

export default Footer;
