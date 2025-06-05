import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from 'react';
import styles from '@/styles/index.module.css';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const ProductList = () => {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/products/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data.candle);
                {console.log("dataimage",data.candle)}
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);


    
    // ฟังก์ชันสำหรับจัดการเหตุการณ์การคลิก Add to Cart
    const handleAddToCart = (item) => {
        // สร้าง array สำหรับข้อมูลสินค้า
        const cartItems = [item];
        
        // ส่งข้อมูลสินค้าไปยังหน้า cart.js ผ่าน query parameters
        router.push({
            pathname: '/cart',
            query: {
                items: JSON.stringify(cartItems), // ส่งสินค้าเป็น JSON string
            },
        });
    };


    return (
        <div>
            <Head>
                <title>Products</title>
            </Head>
            <Navbar />


            <div className={styles.containertitle}>
                <div className={styles.containertext}>
                    <h1 className={styles.title}>Products</h1>
                    <p className={styles.subtitle}>Order it for you or for your beloved ones</p>
                    <p className={styles.subhead}>&quot;Unveil the Enchantment of Soy Wax: With its Clean Burn and Enduring Aroma, Our Collection Promises<br></br> 
                        Every Candle to be an Exquisite Journey of Scent, Lasting from the First Light to the Last Glimmer.&quot;</p>
                </div>
            </div>


                <h2 className={styles.headCol}>Blow your mind</h2>
                <hr className={styles.line} />
                <p className={styles.subCol}>Scented candles will help you relax and let your mind wander with the scent. The beautiful scents<br></br>
                    complement the cosy candlelight to help you set the mood. From fresh fruit to spring flowers,<br></br> 
                    there are a lot of fragrances for you to explore.</p>
           

            <div className={styles.productFlexContainer}>

            {products.slice(0,8).map((item, index) => (
                    <Link href={`/detail/${item._id.$oid}`} as={`/detail/${item._id.$oid}`} key={index}>
                    <div key={index} className={styles.productItem}>
                        <img src={`http://127.0.0.1:8000${item.image_url}`} alt={item.candle_name} style={{ width: '300px', height: '300px' }} />
                        <div className={styles.textProduct}>
                            <h2 className={styles.productName}>{item.candle_name}</h2>
                            <p className={styles.productPrice}>THB {item.candle_price.toFixed(2)}</p>
                        </div>
                    </div>
                </Link>
                ))}

            </div>


            <h2 className={styles.headCol}>A little, but can feel it.</h2>
            <hr className={styles.line} />
            <p className={styles.subCol}>Just a little bit of the scent of a scented candle can be soothing. The beautiful scent complements<br></br> 
                                        the warm candlelight to help set your mood. From fresh fruits to spring flowers There are many<br></br>
                                        fragrances for you to find.</p>

    
            <div className={styles.productFlexContainer}>

                {products.slice(8).map((item, index) => (
                    <Link href={`/detail/${item._id.$oid}`} as={`/detail/${item._id.$oid}`} key={index}>
                    <div key={index} className={styles.productItem}>
                    <img src={`http://127.0.0.1:8000${item.image_url}`} alt={item.candle_name} style={{ width: '300px', height: '300px' }} />
                        <div className={styles.textProduct}>
                        <h2 className={styles.productName}>{item.candle_name}</h2>
                            <p className={styles.productPrice}>THB {item.candle_price}</p>
                        </div>
                    </div>
                </Link>
                ))}

            </div>




            <Footer />
        </div>
       
    );
};

export default ProductList;
