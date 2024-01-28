import React from 'react';
import {supabase} from "../lib/initSupabase";
import Layout from "../components/Layout";
import {useRouter} from "next/router";
import styles from "../styles/Login.module.css";

const Logout = () => {
    const router = useRouter()

    async function signOut() {
        await supabase.auth.signOut()
        router.push('/')
    }

    return (
        <Layout title={"Sign Out"}>
            <h1>Sair</h1>
            <div className={`text-center`}>
                <p>Você tem certeza que quer sair?</p>
                <button className={styles.button} onClick={signOut}>Confirmar</button>
            </div>
        </Layout>
    );
};

export default Logout;
