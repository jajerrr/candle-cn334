import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; 
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer"; 
import Head from "next/head"; 
import styles from '../styles/cart.module.css';
import Link from 'next/link';


const CartPage = () => {

    const router = useRouter();
    const { items } = router.query; // ดึง query parameters items มาจาก URL
    const [cartItems, setCartItems] = useState([]);
    //const [initialCartItems, setInitialCartItems] = useState([]);
    const initialProductItems = items ? JSON.parse(items) : [];
    const [quantities, setQuantities] = useState(initialProductItems.map(() => 1));
    const [subtotal, setSubtotal] = useState(0);

    

    useEffect(() => {
        if (items) {
            // แปลง JSON string เป็น array ของสินค้า
            const parsedItems = JSON.parse(items);
            // เพิ่มข้อมูลใหม่ลงไปในอาร์เรย์ของสินค้า
            const newCartItems = [...cartItems, ...parsedItems];
            setCartItems(newCartItems);
            // บันทึกข้อมูลใหม่ทั้งหมดลงใน localStorage
            localStorage.setItem('cartItems', JSON.stringify(newCartItems));
        }
    }, [items]);
    

    
    const calculateSubtotal = () => {
        return cartItems.reduce((total, item, index) => {
            return total + item.candle_price * quantities[index];
        }, 0);
    };

    const updateQuantity = (index, newQuantity) => {
        if (newQuantity <= 0) {
            return;
        }
        const updatedQuantities = [...quantities];
        updatedQuantities[index] = newQuantity;
        setQuantities(updatedQuantities);
    };


    const removeItem = (index) => {
        // ดึงข้อมูลที่มีอยู่ใน localStorage
        const existingItems = localStorage.getItem('cartItems');
        let cartItems = [];
        if (existingItems) {
            // แปลง JSON string เป็น array
            cartItems = JSON.parse(existingItems);
        }
    
        // ลบสินค้าที่ต้องการออกจากอาร์เรย์ของสินค้า
        cartItems.splice(index, 1);
    
        // บันทึกข้อมูลใหม่ลงใน localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
        // อัปเดต state ด้วยอาร์เรย์ใหม่หลังจากลบ
        setCartItems(cartItems);
    };
    
    

    useEffect(() => {
        setSubtotal(calculateSubtotal());
    }, [cartItems, quantities]);

    const handleCheckout = () => {
        const cartData = cartItems.map((item, index) => ({
            productId: item._id,
            productImg: item.image_url,
            productName: item.candle_name,
            productQuantity: quantities[index],
            productPrice: item.candle_price.toFixed(2),
        }));

        const query = {
            products: JSON.stringify(cartData),
            total: subtotal.toFixed(2),
        };

        // นำทางไปที่ /shipping ด้วยข้อมูล query
        router.push({
            pathname: '/shipping',
            query: query,
        });
        

        
    };


return (
    

<> 

<Head> 

<title>Cart</title> 

</Head> 

<Navbar /> 

 

<div className={`${styles.container} mx-auto mt-10 px-4 md:px-0`}> 
    <div className={styles.flexContainer}> 
        <div className={styles.productListContainer}> 
            <div className={styles.header}> 
                <h1 className={styles.title}>Your cart items</h1> 
                    <Link href="/products"> 
                    <h3 className={styles.back}>Back to shopping</h3> 
                    </Link> 
    </div> 

 

        <div className={styles.productTable}> 
            <table className={styles.table}> 
                <thead> 
                    <tr className={styles.headTable}> 
                        <th className={styles.headProduct}>Product</th> 
                        <th className={styles.headPrice}>Price</th> 
                        <th className={styles.headQuantity}>Quantity</th> 
                        <th className={styles.headTotal}>Total</th> 
                    </tr> 
                </thead> 

            <tbody> 

        {cartItems.map((item, index) => (
        <tr key={index}> 
            <td className={styles.product}> 
                <div className={styles.productInfo}> 
                <img src={`http://127.0.0.1:8000${item.image_url}`} className={styles.productImage} alt={item.candle_name} /> 
                        <div className={styles.productDetails}> 

                        <h2 className={styles.productName}>{item.name}</h2> 
                
                        <Link> <h3 className={styles.removeProduct} onClick={() => removeItem(index)}>Remove</h3>  </Link> 
                        </div> 
                </div> 
            </td> 

            <td className={styles.priceValue}>THB {item.candle_price}</td> 
            <td> 
                <div className={styles.quantity}> 
                    <button className={styles.quantityButtonMinus} onClick={() => updateQuantity(index, quantities[index] - 1)}>-</button> 
                    <span className={styles.quantityValue}>{quantities[index]}</span> 
                    <button className={styles.quantityButtonPlus} onClick={() => updateQuantity(index, quantities[index] + 1)}>+</button> 
                 </div> 
            </td> 

            <td className={styles.totalValue}>THB {(item.candle_price * quantities[index]).toFixed(2)}</td> 
                </tr> 
                ))} 

            </tbody> 
        </table> 
    </div> 
</div> 

 

                <div className={styles.summaryContainer}> 
                    <div className={styles.summaryBox}> 
                        <div className={styles.sammaryPrice}> 
                            <h4> 
                            <span className={styles.summaryLabel}>Total</span> 
                            <span className={styles.summaryValue}>THB {subtotal.toFixed(2)}</span> 
                            </h4> 
                        </div> 
                            <button className={styles.checkoutButton} onClick={handleCheckout}>Check Out</button> 
                        </div> 
                        </div> 
                    </div> 
                </div> 

 

<Footer /> 

</> 

    ); 

}; 

 

export default CartPage; 