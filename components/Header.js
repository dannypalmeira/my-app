import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import {useUser} from "../lib/UserContext";
import styles from "../styles/Home.module.css";

const Header = () => {
    const {user} = useUser()

    return (
        <header className={styles.header}>
            <Image
              src="/film-clipart.svg"
              alt="CineAdmin - Grupo O"
              className="dark:invert"
              width={200}
              height={70}
              priority
            />

            <ul className={styles.headerNav}>
                <li>
                    <Link href="/">
                        <a className={styles.headerLink}>Home</a>
                    </Link>
                    {!user ?
                        <>
                            <Link href="/sign-up">
                                <a className={styles.headerLink}>Cadastre-se</a>
                            </Link>
                            <Link href="/login">
                                <a className={styles.headerLink}>Login</a>
                            </Link>
                        </>
                        :
                        <>
                            <Link href="/logout">
                                <a className={styles.headerLink}>Logout</a>
                            </Link>
                            <Link href="/filmes">
                                <a className={styles.headerLink}>Filmes</a>
                            </Link>
                        </>
                    }
                </li>
            </ul>
        </header>
    );
};

export default Header;
