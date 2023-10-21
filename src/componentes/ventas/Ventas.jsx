import React, { useContext, useState } from "react";
import styles from "./ventas.module.scss";
import NuevaVenta from "./nuevaVenta/NuevaVenta";
import ContextGeneral from "@/servicios/contextPrincipal";
import PagosPendientes from "./pagosPendientes/PagosPendientes";

function Ventas() {
  const context = useContext(ContextGeneral);

  const [showNuevaVenta, setShowNuevaVenta] = useState(false);

  const mostrarNuevaVenta = () => {
    setShowNuevaVenta(!showNuevaVenta);
  };

  return (
    <div className={styles.main}>
      <p className={styles.nuevaVentaBtn} onClick={mostrarNuevaVenta}>
        Nueva Venta +
      </p>

      <div className={styles.cabecera}>
        <p>Nombre</p>
        <p>DNI</p>
        <p>Producto</p>
        <p>Monto $</p>
        <p>Fecha</p>
        <p> </p>
      </div>

      <div className={styles.pagosPendientes}>
        {context.alumnosOriginal
          .filter((item) => item.compraProductos.length > 0)
          .map((item) => {
            return (
              <>
                {item.compraProductos.map((venta) => {
                  return <PagosPendientes item={item} venta={venta} />;
                })}
              </>
            );
          })}
      </div>

      {showNuevaVenta && <NuevaVenta mostrarNuevaVenta={mostrarNuevaVenta} />}
    </div>
  );
}

export default Ventas;
