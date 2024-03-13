import React from 'react';
import Link from 'next/link'
import {useUser} from "../lib/UserContext";
import styles from "../styles/Navbar.module.css";
import SearchBar from './SearchBar';

const Header = () => {
    const {user} = useUser()

    return (
        <nav className="navbar navbar-inverse navbar-static-top">
            <div className={styles.container}>
            <p className={styles.title}>
                        CineAdmin
                    </p>

                    <SearchBar />
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
                        
                        <Link href="/filmes">
                            <a className={styles.buttons}>Gerenciar Filmes</a>
                        </Link>
                            <Link href="/adicionar">
                            <a className={styles.buttons}>Cadastrar um Filme</a>
                            </Link>

                            <Link href="/logout">
                                <a className={styles.buttons}>Logout</a>
                            </Link>
                        </>
                    }
                </li>
            </ul>
            </div>
        </nav>
    );
};

export default Header;
