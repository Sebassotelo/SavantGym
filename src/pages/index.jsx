import Footer from "@/componentes/footer/Footer";
import Navbar from "@/componentes/navbar/Navbar";
import styles from "@/styles/Home.module.scss";

export default function Home() {
  return (
    <>
      <div className={styles.main}>
        <Navbar />

        <header className={styles.header}>
          <div className={styles.container}></div>
        </header>

        <section className={styles.about}>
          <h3 className={styles.about__title}>SOBRE NOSOTROS</h3>
          <div className={styles.info}>
            <img src="https://i.imgur.com/9Mdzo6l.jpg" alt="" />

            <div className={styles.text}>
              <h3>Savant CROSSFIT</h3>
              <p>
                ¡Bienvenidos a Savant CrossFit! Aquí, rompemos los límites y te
                ayudamos a alcanzar tus objetivos de fitness como nunca antes.
                En nuestro gimnasio de última generación, nuestros entrenadores
                te desafiarán, mientras te unes a una comunidad de apasionados
                del ejercicio. ¿Listo para ponerte en forma y pasarlo genial?
                ¡Te esperamos en Savant CrossFit!
              </p>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.text}>
              <h3>Que es el CROSSFIT?</h3>
              <p>
                El CrossFit es un método de entrenamiento versátil que combina
                levantamiento de pesas, ejercicios aeróbicos y movimientos
                funcionales para mejorar la fuerza, resistencia y agilidad de
                manera rápida y efectiva. Su variedad y desafíos constantes
                hacen que sea una opción atractiva para quienes buscan
                resultados notables en su forma física.
              </p>
            </div>
            <img src="https://i.imgur.com/mcsfrVb.jpg" alt="" />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
