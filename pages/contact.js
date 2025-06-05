import Head from "next/head";
import Navbar from "@/components/Navbar";
import styles from '../styles/contact.module.css';

export default function Contact() {
    return (
        <>
            <Head>
                <title>Contact</title>
            </Head>
            <Navbar />

            <div className={styles.flexcontainer}>
                <h1 className={styles.Contact}>Contact us</h1>
                <p className={styles.sub}>We are here to help with any questions or inquiries you may have.<br></br> 
                                            Feel free to reach out to us using any of the methods below</p>
                <div className={styles.containerBox}>
                    <div className={styles.box}>
                        <img src="/contact/address.png" alt="Contact" className={styles.image}/>
                        <p className={styles.title}>Address</p>
                        <p className={styles.content}> 99 Phaholyothin Road,<br></br>
                                                    Klong Neung Subdistrict,<br></br>
                                                    Klong Luang District,<br></br>
                                                    Pathum Thani, 12120.</p>
                    </div>

                    <div className={styles.box}>
                        <img src="/contact/phone.png" alt="Phone" className={styles.image}/>
                        <p className={styles.title}>Call Us</p>
                        <p className={styles.content}>+123-456-7890<br></br>
                                                        +987-654-3210<br></br>
                                                        +111-222-3333</p>
                    </div>
                    <div className={styles.box}>
                        <img src="/contact/mail.png" alt="Mail" className={styles.image}/>
                        <p className={styles.title}>Email Us</p>
                        <p className={styles.content}>contact@example.com<br></br>
                                                        info@example.com<br></br>
                                                        support@example.com</p>
                    </div>
                </div>
            </div>
           
        </>
    );
}
