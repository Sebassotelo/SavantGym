import React, { useEffect, useState } from "react";
import Head from "next/head";
import style from "./Layout.module.scss";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

function Layout({ children, title }) {
  return (
    <div style={{ display: "grid" }}>
      <Head>
        <title>Gym Manager | Home</title>
        <meta
          name="description"
          content="Gym Manager |  Cotrol de mesualidad de Alumnos."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />

      <div className={style.body}>{children}</div>

      <Footer />
    </div>
  );
}

export default Layout;
