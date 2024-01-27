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
                <div>
                <Link href="/"><Image
                src="/film-clipart.svg"
                alt="CineAdmin - Grupo O"
                className="dark:invert"
                width={200}
                height={70}
                priority
                /></Link>
                </div>            

                <ul className={styles.navContent}>
                <Link href="/">
                <li className={styles.buttons}>Home</li>
          </Link>
                    {!user ?
                        <>
                            <Link href="/sign-up">
                            <li className={styles.buttons}>Cadastre-se</li>
                            </Link>
                            <Link href="/login">
                            <li className={styles.buttons}>Login</li>
                            </Link>
                        </>
                        :
                        <>
                            <Link href="/logout">
                            <li className={styles.buttons}>Sair</li>
                            </Link>
                            <Link href="/filmes">
                            <li className={styles.buttons}>Filmes</li>
                            </Link>
                        </>
                    }
            </ul>
            </div>
        </header>
    );
};

export default Header;
