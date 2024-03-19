import Link from "next/link";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
        <h1 className={styles.text}>Projeto <span className={styles.stack}>PosTech</span> - Grupo <span className={styles.stack}>O</span></h1>
      </div>
  );
};

export default Footer;
