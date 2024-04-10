import Head from "next/head";
import style from "../styles/Home.module.scss";
import { useContext, useEffect, useState } from "react";
import ContextGeneral from "@/servicios/contextPrincipal";
import LinkNext from "next/link";

import { color, motion } from "framer-motion";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

import ItemAbout from "../componentes/itemAbout/ItemAbout";
import Clientes from "../componentes/clientes/Clientes";

export default function Home() {
  const context = useContext(ContextGeneral);
  const { verificarLogin } = useContext(ContextGeneral);
  const googleProvider = new GoogleAuthProvider();

  const [itemsCategoria, setItemsCategoria] = useState([]);

  const arrayAbout = [
    {
      icon: "🤓",
      title: "Registro de Alumnos:",
      desc: "GymManager permite a los administradores registrar fácilmente a nuevos alumnos, recopilando información personal relevante, como nombre, edad y número de contacto.",
    },
    {
      icon: "🙋‍♂️",
      title: "Autogestionable",
      desc: "Administras tu panel de control sin ayuda de profesionales y desde cualquier dispositivo.",
    },
    {
      icon: "📋",
      title: "Gestión de Pagos:",
      desc: "La aplicación facilita el seguimiento de los pagos de los alumnos, para asi saber cuando es el vencimiento de la mensualidad de estos.",
    },
    {
      icon: "🌐",
      title: "Notificaciones y Recordatorios:",
      desc: "La aplicacion tiene una seccion donde te va a avisar cuales son los alumnos que vencieron y están por vencer.",
    },
    {
      icon: "🛍️",
      title: "Sin cantidad limite:",
      desc: "No hay limite en la cantidad de alumnos.",
    },
    {
      icon: "🥳",
      title: "7 dias de prueba gratis:",
      desc: "Sin configurar un medio de pago.",
    },
  ];
  const [arrayMostrar, setArrayMostrar] = useState(arrayAbout);

  const arrayPrecio = [
    {
      icon: "😉",
      title: "Sin limites de Alumnos",
      desc: "No exite una cantidad maxima para agregar Alumnos.",
    },
    {
      icon: "⚡",
      title: "Panel de Vencimientos",
      desc: "Panel donde estan los alumnos proximos a vencer y ya vencidos.",
    },
    {
      icon: "🛒",
      title: "Guardar venta de productos en alumnos.",
      desc: "Se podran adjuntar la venta de productos a la carta de cada Alumno.",
    },
    {
      icon: "🎥",
      title: "Videos explicativos",
      desc: "Videos que te guian a como configurar tu perfil y cargar Alumnos.",
    },
  ];

  const arrayClientes = [
    {
      url: "mommy's.piggy",
      nombre: "Mommy's Piggy",
      logo: "https://i.ibb.co/n7KvnJ6/Banner-de-You-Tube-gamer-gato-lindo-rosa-png.png",
    },
    {
      url: "susi.moda",
      nombre: "Susi Moda",
      logo: "https://i.ibb.co/Ny16hJ3/zy1-Xa6q-png.png",
    },
  ];

  const [arrayMostrarPrecio, setArrayMostrarPrecio] = useState(arrayPrecio);
  useEffect(() => {
    verificarLogin();
  }, []);

  return (
    <>
      <main className={style.main}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ width: "100%" }}
        >
          <header className={style.header}>
            <div className={style.container}>
              <div className={style.title}>
                <h1>
                  Gestioná y organizá a tus{" "}
                  <span style={{ color: "rgb(48, 160, 20)" }}>Alumnos!</span>{" "}
                </h1>

                {context.user ? (
                  <LinkNext href={"/cuenta"} className={style.btn}>
                    Ir a Mi Cuenta
                  </LinkNext>
                ) : (
                  <button
                    className={style.btn}
                    onClick={() =>
                      signInWithPopup(context.auth, googleProvider)
                    }
                  >
                    Creá tu Cuenta con Google
                  </button>
                )}
              </div>
              <div className={style.logo}>
                <img src={context.urlLogo} alt="" />
              </div>
            </div>
          </header>
        </motion.div>

        <section className={style.about} id="about">
          <div className={style.container}>
            <h2>Que hacemos?</h2>
            <p>
              GymManager es una aplicación diseñada para gestionar de manera
              eficiente y efectiva los datos y actividades relacionadas con los
              alumnos de un gimnasio. Esta aplicación está dirigida a los
              administradores del gimnasio con el objetivo de optimizar la
              experiencia del usuario y mejorar la gestión interna del
              establecimiento.
            </p>
            <p> Creando tu cuenta automáticamente tenes acceso a:</p>

            <div className={style.about__icons}>
              {arrayMostrar.map((item, i) => {
                return (
                  <ItemAbout
                    icon={item.icon}
                    title={item.title}
                    desc={item.desc}
                    key={i}
                  />
                );
              })}
            </div>
          </div>
        </section>

        <section className={style.pasos}>
          <img src="https://i.imgur.com/QiTODWB.jpg" alt="" />
          <div className={style.pasos__text}>
            <div>
              <h3>Hazlo, de una u otra forma...</h3>
            </div>
            <div>
              <p>
                Nosotros nos encargamos de que tu panel esté siempre disponible.
              </p>
              <p>Cualquier duda te respondera una persona.</p>
              <p>Todo feedback para mejorar será bienvenido.</p>
            </div>
          </div>
        </section>

        <section className={style.precio} id="precio">
          <div className={style.precio__precio}>
            <div className={style.conte}>
              <p>ÚNICO PRECIO.</p>
              <h3>
                $4990{" "}
                <span style={{ textDecoration: "line-through" }}>$6499</span>
              </h3>
              <p>Finales por mes.</p>
              <p>Obtene la suscripcion de 1 año pagando solo 8 meses!</p>
              <h3>
                $39990{" "}
                <span style={{ textDecoration: "line-through" }}>$77999</span>
              </h3>
              {context.user ? (
                <button onClick={() => signOut(context.auth)}>
                  Cerrar Sesion
                </button>
              ) : (
                <button
                  onClick={() => signInWithPopup(context.auth, googleProvider)}
                >
                  Creá tu Cuenta con Google
                </button>
              )}
            </div>
          </div>
          <div className={style.precio__benef}>
            {arrayMostrarPrecio.map((item, i) => {
              return (
                <div className={style.card} key={i}>
                  <div>
                    <h4>
                      {item.icon} {item.title}
                    </h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* <section className={style.clientes}>
          <h2>Conocé quien está usando MyShop</h2>
          <div className={style.container}>
            {arrayClientes.map((item, i) => {
              return <Clientes key={i} url={item.url} logo={item.logo} />;
            })}
          </div>
        </section> */}
      </main>
    </>
  );
}
