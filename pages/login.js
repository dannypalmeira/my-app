import React, {useEffect, useState} from 'react';
import {supabase} from "../lib/initSupabase";
import {useRouter} from "next/router";
import Link from "next/link";
import Layout from "../components/Layout";
import styles from "../styles/Login.module.css";

const Login = ({logout}) => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [forgotPassword, setForgotPassword] = useState(false)
    const [forgotEmail, setForgotEmail] = useState("")
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
        if (!email) return

        const {error, data} = await supabase.auth.signIn({
            email,
            password
        })

        if (error) {
            console.error(error)
            setMessage(error.message ? error.message : "Algum dado não está correto.")
        }

        if (data) {
            setTimeout(() => {
                router.push('/filmes')
            }, 500)
        }
    }

    async function requestReset(e) {
        e.preventDefault()
        if (!forgotEmail) {
            setMessage("Insira um email válido.")
            return;
        }

        const {data, error} = await supabase.auth.api.resetPasswordForEmail(forgotEmail)

        if (error) {
            console.error(error)
            setMessage(error.message ? error.message : "Algum dado não está correto.")
        }

        if (data) {
            console.log(data)
            setMessage('O link para recuperar a sua senha já foi enviado para o seu email.')
        }
    }

    return (
        <Layout title={"Login"}>

            <h1>Login</h1>

            <div className={styles.formContainer}>

                {forgotPassword ?
                    <form onSubmit={requestReset} >
                        <input className={styles.input} type="email" placeholder={"Email"} onChange={(e) => setForgotEmail(e.target.value)}/>
                        <button className={styles.button} type={"submit"}>Redefinir senha</button>
                    </form>
                    :
                    <form onSubmit={signIn} className={styles.formContainer}>
                        <input
                            className={styles.input}
                            type="text"
                            required
                            placeholder={"Email"}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            className={styles.input}
                            required
                            type="password"
                            placeholder={"Password"}
                            onChange={e => setPassword(e.target.value)}
                        />
                        {message && message}
                        <button className={styles.button} type={"submit"}>Entrar</button>
                        <div>{!forgotPassword ? "Esqueceu a senha?" : "Voltar a página de login"} <button className={styles.button} onClick={() => setForgotPassword(!forgotPassword)}>Clique aqui</button></div>
                        

                    </form>
                }

            </div>

            <div className={`space-h-20 text-center my-5`}>
                Não tem uma conta? &nbsp;&nbsp;&nbsp;<Link href={"/sign-up"}><button className={styles.button} > Cadastre-se</button></Link>
            </div>
        </Layout>
    );
};

export default Login;

export async function getServerSideProps({req}) {
    const {user} = await supabase.auth.api.getUserByCookie(req)

    if (user) return {props: {}, redirect: {destination: '/filmes'}}

    return {
        props: {
            logout: true
        }
    }
}