import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import {useUser} from "../lib/UserContext";
import styles from "../styles/Navbar.module.css";

const Header = () => {
    const {user} = useUser()

    return (
        <header className={styles.header}>
            <div className={styles.container}>
            <h1 className={styles.title}>
                        CineAdmin
                    </h1>

            <ul className={styles.headerNav}>
                <li>
                    {!user ?
                        <>
                        <Link href="/">
                            <a className={styles.buttons}>Home</a>
                        </Link>
                            <Link href="/login">
                                <a className={styles.buttons}>Login</a>
                            </Link>
                            <Link href="/sign-up">
                                <a className={styles.buttons}>Cadastre-se</a>
                            </Link>
                        </>
                        :
                        <>
                            <Link href="/logout">
                                <a className={styles.buttons}>Logout</a>
                            </Link>
                            <Link href="/create">
                            <a className={styles.buttons}>Criar Filme</a>
                            </Link>
                        </>
                    }
                </li>
            </ul>
            </div>
        </header>
    );
};

export default Header;
