import React, { useEffect, useState } from "react";
import Head from "next/head";
import style from "./Layout.module.scss";

function Layout({ children, title }) {
  return (
    <div style={{ display: "grid" }}>
      <Head>
        <title>Savant Gym | Home</title>
        <meta name="description" content="Savant Gym |  Gimnasio de Crossfit" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Kanit:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={style.body}>{children}</div>
    </div>
  );
}

export default Layout;
