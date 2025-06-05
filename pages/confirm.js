import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import styles from "../styles/confirm.module.css";
import Link from 'next/link';

const PageNav = () => (
    <div className={styles.navBar}>
        <div className={styles.bar}>
            <Link href="/cart" className={styles.linkCart}>
                <p>Cart</p>
            </Link>
            <svg className={styles.svgIcon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
            </svg>
            <Link href="/shipping" className={styles.linkShipping}>
                <p>Shipping</p>
            </Link>
            <svg className={styles.svgIcon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
            </svg>
            <Link href="/payment" className={styles.linkPayment}>
                <p>Payment</p>
            </Link>
        </div>
    </div>
);

const ConfirmPage = () => {
    return (
        <>
            <Head>
                <title>Confirmed Payment</title>
            </Head>

            <Navbar />
            <PageNav />

            <div className={`${styles.container} mx-auto mt-10 px-4 md:px-0`}>
                <div className={styles.flexContainer} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#56B280" width="200" height="200" className={styles.w6_h6} style={{ opacity: 0.7, marginBottom: '-20px' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15L15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    <h1 style={{ color: 'black', marginBottom: '-15px' }}>Payment Confirmed</h1>
                    <h3 style={{ color: '#56B280', marginBottom: '20px' }}>We appreciate your order!</h3>

                    <Link href="/products" style={{ marginBottom: '-20px' }}>
                        <button className={styles.payButton}>Back to shopping</button>
                    </Link>

                    <p style={{ color: '#56B280', textDecoration: 'underline', marginBottom: '250px' }}>Print receipt</p>
                </div>
            </div>



            <Footer />
        </>
    );
};

export default ConfirmPage;

