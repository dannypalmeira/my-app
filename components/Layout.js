import React from 'react';
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({title, children}) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>{title} | CineAdmin</title>
                <meta name="description" content="NextJS x Supabase"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Header/>

            <main className={styles.main}>
            <div className={styles.home}>
                {children}
                </div>
            </main>

            <Footer/>

        </div>
    );
};

export default Layout;
   