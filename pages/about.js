import Head from "next/head";
import { CartContext } from '../components/CartContext';
import Navbar from "@/components/Navbar";
import styles from '../styles/about.module.css';
import Link from 'next/link';


export default function about(){
    return(
        <>
            <Head>
                <title>About Us</title>
            </Head>
            <Navbar />

        <div className={styles.flexcontainer}>
            <div className={styles.container}>            

                    <h1 className={styles.head}>Nature Candle</h1>
                    <h3 className={styles.sub}>&quot;Discover the magic of soy wax, known for its clean burn and long-lasting fragrance, ensuring<br></br>  
                                                that every candle from our collection is a delightful experience from start to finish.&quot;</h3>

                    <Link href="/products">
                        <button className={styles.button}>Shop Now</button>
                    </Link>
            </div>
                
           
                
                
                {/* เพิ่ม flexcontainer ด้านล่าง */}

                    <div className={styles.wrapper}>
                        <div className={styles.boxleft}>

                        <img className={styles.image}src="/about/about1.jpg" alt="About Image"></img>

                            <p className={styles.title}>Integrity and Transparency</p>
                            <p className={styles.content}> We carefully select high-quality ingredients<br></br> 
                                and utilize cutting-edge technology to<br></br> 
                                provide you with premium-quality and<br></br> 
                                transparentlysourced candles.
                            </p>
                        </div>


                        <div className={styles.boxmiddle}>
                            <img className={styles.image}src="/about/about2.jpg" alt="About Image"></img>
                                <p className={styles.title}>Quality Craftsmanship</p>
                                <p className={styles.content}>Each candle is hand-poured with<br></br> 
                                    meticulous attention to detail, ensuring<br></br> 
                                    that you receive a product of the highest<br></br> 
                                    quality and craftsmanship.</p>
                        </div>
                        
                        <div className={styles.boxright}>
                            <img className={styles.image}src="/about/about3.jpg" alt="About Image"></img>
                                <p className={styles.title}>Environmental Responsibility</p>
                                <p className={styles.content}>We are committed to sustainability<br></br> 
                                    and minimize our environmental impact<br></br> 
                                    by using eco-friendly packaging and<br></br> 
                                    sustainable sourcing practices.</p>
                        </div>

                    </div>
        

                    </div>

                 

                
               


        </>
    )
}
