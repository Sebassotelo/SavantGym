import React from "react";
import styles from "./footer.module.scss";

import { AiOutlineInstagram, AiOutlineWhatsApp } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import { BsFillTelephoneFill } from "react-icons/bs";

function Footer() {
  return (
    <div className={styles.container}>
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
