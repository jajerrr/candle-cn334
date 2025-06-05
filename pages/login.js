import styles from '../styles/login.module.css'; 
import Link from 'next/link';

export default function Login() {
    return (
        <div className={`bg-cover bg-center flex justify-center items-center ${styles.container}`}>
            <div className={styles.flexContainer}>
                <div className={styles.Box} style={{ display: 'flex',flexDirection: 'column'}}>
                    <img src="/logo.jpg" alt="Logo" width="270" height="150"  className="logo" />
                    <h1 className={styles.head}>Log In</h1>
                    <p className={styles.sub}>Please enter your username and password to log in and <br></br>access our online candle shop.</p>

                    <form className={styles.userBox}>
                        <input
                            name="username"
                            placeholder="  Username"
                            className={styles.textName}
                        />
                    </form>

                    <form className={styles.passwordBox}>
                        <input
                            name="password"
                            placeholder="  Password"
                            className={styles.textName}
                        />
                    </form>

                    <Link href="/">
                        <button className={styles.payButton}>Login</button>
                    </Link>

                </div>
            </div>
        </div>
    );
}

