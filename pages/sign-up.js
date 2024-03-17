import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/initSupabase";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import styles from "../styles/Login.module.css";


const SignUp = ({logout}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setTipo] = useState("user");
    const [message, setMessage] = useState("");
    const router = useRouter();

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
            setMessage("Insira um email e uma senha válidos");
            return;
        }

        const {error: signUpError, data: signUpUser} = await supabase.auth.signUp({
            email,
            password
        });

        if (signUpError) {
            console.log({signUpError})
            setMessage(signUpError.message ? signUpError.message : "Algum dado não está correto")
        } else {
            console.log(signUpUser)
            setMessage("O link para confirmação já foi encaminhado para o seu email.")

            const { error: insertError } = await supabase
            .from("users")
            .insert([
                {
                    id: signUpUser.data.id,
                    email: email,
                    role: role
                }
            ]);

            if (insertError){
                console.error("Error inserting user data:", insertError.message);
            } else {
                console.log("User data inserted successfully");
            }

            setEmail("")
            setPassword("")
            setTipo("user")
            router.push("/");
        }
    };

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
                <div className={styles.radioContainer}>
                    <label className={styles.radio}>
                        <input
                        type='radio'
                        value='user'
                        checked={role === 'user'}
                        onChange={(e) => setTipo(e.target.value)}>
                        </input>
                        <span>Usuário</span>
                    </label>
                    <label className={styles.radio}>
                        <input
                        type='radio'
                        value='admin'
                        checked={role === 'admin'}
                        onChange={(e) => setTipo(e.target.value)}>
                        </input>
                        <span>Administrador</span>
                    </label>
                    </div>
                {message && message}
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

