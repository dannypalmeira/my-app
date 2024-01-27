import React, {useEffect, useState} from 'react';
import {supabase} from "../lib/initSupabase";
import {useRouter} from "next/router";
import Link from "next/link";
import Layout from "../components/Layout";

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

            {message && message}

            <h1>Login</h1>

            <div>

                {forgotPassword ?
                    <form onSubmit={requestReset} className={`flex flex-col`}>
                        <input type="email" placeholder={"Email"} onChange={(e) => setForgotEmail(e.target.value)}/>
                        <button className={`primary mt-2`} type={"submit"}>Redefinir senha</button>
                    </form>
                    :
                    <form onSubmit={signIn} className={`flex flex-col`}>
                        <input
                            className={`border-2 my-1`}
                            type="text"
                            required
                            placeholder={"Email"}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            className={`border-2 my-1`}
                            required
                            type="password"
                            placeholder={"Password"}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button className={`primary mt-1`} type={"submit"}>Login</button>
                    </form>
                }

                <p className={`text-center cursor-pointer hover:underline text-brand secondary mt-10`}
                   onClick={() => setForgotPassword(!forgotPassword)}>
                    {!forgotPassword ? "Esqueceu a senha?" : "Voltar a página de login"}
                </p>
            </div>

            <div className={`text-center my-5`}>
                Não tem uma conta? <Link href={"/sign-up"}><a>Clique aqui para criar um usuário</a></Link>
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