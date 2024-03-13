import React, {useState, useEffect} from 'react';
import {supabase} from "../lib/initSupabase";
import Link from "next/link";
import Layout from "../components/Layout";
import styles from "../styles/Login.module.css";


const SignUp = ({logout}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        if (logout) {
            signOut()
        }
    }, [])

    async function signOut() {
        await supabase.auth.signOut()
    }

    async function signIn(e) {
        e.preventDefault()
        if (!email ||!password) {
            setMessage("Insira um email e uma senha válidos")
            return
        }

        const {error, data} = await supabase.auth.signUp({
            email,
            password
        })

        if (error) {
            console.log({error})
            setMessage(error.message ? error.message : "Algum dado não está correto")
        } else {
            console.log(data)
            setMessage("O link para confirmação já foi encaminhado para o seu email.")
            setEmail("")
            setPassword("")
        }
    }

    return (
        <Layout title={"Sign Up"}>
            
            <h1>Cadastre-se</h1>

            <form onSubmit={signIn}  className={styles.formContainer}>
                <input
                    type="text"
                    className={styles.input}
                    required
                    placeholder={"Email"}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    required
                    type="password"
                    className={styles.input}
                    placeholder={"Password"}
                    onChange={e => setPassword(e.target.value)}
                />
                <span>{message && message}</span>
                <button className={styles.button} type={"submit"}>Enviar</button>
            </form>

            <div className={`space-h-20 text-center my-5`}>
                <p className={`text-center cursor-pointer hover:underline text-brand secondary mt-10`}>Já tem uma conta? &nbsp;&nbsp; <Link href={"/login"}><button className={styles.button} >Clique aqui para entrar</button></Link></p>
            </div>
        </Layout>
    );
};

export default SignUp;

export async function getServerSideProps({req}) {
    const {user} = await supabase.auth.api.getUserByCookie(req)

    if (user) return {props: {}, redirect: {destination: '/profile'}}

    return {
        props: {
            logout: true
        }
    }
}

