import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '@/components/Navbar'; 
import Footer from '@/components/Footer';
import styles from '../styles/shipping.module.css';
import Link from 'next/link';


// ฟังก์ชันการนำทางในหน้าจัดส่ง
const PageNav = () => (
    <div className={styles.navBar}>
        <div className={styles.bar}>
            <Link href="/cart" className={styles.linkCart}>Cart</Link>
            <svg className={styles.svgIcon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
            </svg>
            <Link href="/shipping" className={styles.linkShipping}>Shipping</Link>
            <svg className={styles.svgIcon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
            </svg>
            <Link href="/payment" className={styles.linkPayment}>Payment</Link>
        </div>
    </div>
);

// คอมโพเนนต์สำหรับการเลือกวิธีการจัดส่ง
const ShippingMethod = ({ handleShippingChange, selectedMethod }) => (
    <div>
        <label className={`${styles.shippingOption} ${selectedMethod === 'Standard' ? styles.selected : ''}`}>
            <input
                type="radio"
                name="shippingMethod"
                value="Standard"
                className={styles.radio}
                onChange={handleShippingChange}
                checked={selectedMethod === 'Standard'}
            />
            Standard Shipping <span className={styles.boldRight}>Free</span>
        </label>
    </div>
);


// ฟังก์ชันหลักของ ShippingPage
const ShippingPage = () => {
    const router = useRouter();
    const { query } = router;

    // สร้างสถานะสำหรับ sender, shippingCost, subtotal, total, cartItems และ quantities
    const [sender, setSender] = useState({
        name: '',
        surname: '',
        address: '',
        city: '',
        postalCode: '',
        province: '',
        country: '',
        note: '',
        contact: '',
        selectedMethod: 'Standard',
    });

    const [shippingCost, setShippingCost] = useState(parseFloat(query.shippingCost) || 0);
    const [subtotal, setSubtotal] = useState(parseFloat(query.total) || 0);
    const [total, setTotal] = useState(subtotal + shippingCost);

    const [cartItems, setCartItems] = useState([]);
    const [quantities, setQuantities] = useState([]);

    // ดึงข้อมูล `cartItems` จาก `localStorage` เมื่อคอมโพเนนต์ถูกโหลด
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);

        // ดึงข้อมูล `subtotal` และ `shippingCost` จาก `localStorage`
        const storedSubtotal = parseFloat(localStorage.getItem('subtotal')) || 0;
        const storedShippingCost = parseFloat(localStorage.getItem('shippingCost')) || 0;

        setSubtotal(storedSubtotal);
        setShippingCost(storedShippingCost);
    }, []);

    // ดึงข้อมูลจาก query และตั้งค่า sender, cartItems, และ quantities
    useEffect(() => {
        if (router.isReady) {
            // ดึงข้อมูลสินค้าและตั้งค่า `cartItems` และ `quantities`
            const productsFromQuery = query.products ? JSON.parse(query.products) : [];
            setCartItems(productsFromQuery);
            setQuantities(productsFromQuery.map(item => item.productQuantity || 1));

            // ตั้งค่าผู้ส่งข้อมูลจาก query
            setSender({
                name: query.name || '',
                surname: query.surname || '',
                address: query.address || '',
                city: query.city || '',
                postalCode: query.postalCode || '',
                province: query.province || '',
                country: query.country || '',
                note: query.note || '',
                contact: query.contact || '',
                selectedMethod: query.selectedMethod || 'Standard',
            });

            // ตั้งค่าค่าใช้จ่ายการจัดส่ง
            setShippingCost(parseFloat(query.shippingCost) || 0);
        }
    }, [router.isReady, query]);

        // ใช้ `useEffect` เพื่อบันทึก `subtotal` และ `shippingCost` ลงใน `localStorage`
        useEffect(() => {
            // คำนวณ subtotal
            const subtotal = cartItems.reduce((sum, item, index) => {
                return sum + (parseFloat(item.productPrice) * quantities[index]);
            }, 0);
    
            // บันทึก `subtotal` และ `shippingCost` ลงใน `localStorage`
            localStorage.setItem('subtotal', subtotal.toFixed(2));
            localStorage.setItem('shippingCost', shippingCost.toFixed(2));
    
            // อัปเดตค่า `total`
            setTotal(subtotal);
        }, [cartItems, quantities, shippingCost]);

    // จัดการการเปลี่ยนแปลงของตัวเลือกการจัดส่ง
    const handleShippingChange = (event) => {
        const shippingOption = event.target.value;
        let newShippingCost = shippingOption === 'Express' ? 40 : 0;
        setShippingCost(newShippingCost);
        setSender((prevSender) => ({
            ...prevSender,
            selectedMethod: shippingOption,
        }));
    };

    // จัดการการเปลี่ยนแปลงของ sender
    const handleSenderChange = (event) => {
        const { name, value } = event.target;
        setSender((prevSender) => ({
            ...prevSender,
            [name]: value,
        }));
    };

    // ฟังก์ชันที่ใช้ในการนำทางไปที่หน้า `payment` และส่งข้อมูล `query` ตามที่ต้องการ
    const handleGoToPayment = () => {
        const cartData = cartItems.map((item, index) => ({
            productId : item.productId || '' ,
            productImg: item.productImg || '',
            productName: item.productName || '',
            productQuantity: quantities[index],
            productPrice: parseFloat(item.productPrice).toFixed(2),
        }));

        const queryParams = new URLSearchParams({
            name: sender.name,
            surname: sender.surname,
            address: sender.address,
            city: sender.city,
            postalCode: sender.postalCode,
            province: sender.province,
            country: sender.country,
            note: sender.note,
            contact: sender.contact,
            selectedMethod: sender.selectedMethod,
            shippingCost: shippingCost.toFixed(2),
        });

        // เพิ่มข้อมูล `cartData` และ `total` ใน `queryParams`
        queryParams.append('products', JSON.stringify(cartData));
        queryParams.append('total', total.toFixed(2));

        // นำทางไปที่ `payment` พร้อมกับข้อมูล `query`
        router.push({
            pathname: '/payment',
            query: queryParams.toString(),
        });
    };


    const backtocart = () => {
        // ดึงข้อมูลจาก Local Storage
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
        // ตรวจสอบว่ามีสินค้าในตะกร้าหรือไม่
        if (storedCartItems.length > 0) {
            // ส่งไปยังหน้า cart พร้อมกับข้อมูลใน Local Storage
            router.push({
                pathname: '/cart',
                query: {
                    items: JSON.stringify(storedCartItems),
                },
            });
        } 
    };




    return (
        <>
            <Head>
                <title>Shipping</title>
            </Head>
            <Navbar />
            <PageNav />
        
        
            <div className={styles.container}>



            
                {/* ส่วนแรก (ซ้าย) */}
                   

                    <div className={styles.flexContainer}>



                        <h2 className={styles.contact}>Contact</h2>
                        <form className={styles.contactBox}>
                            <input
                                name="contact"
                                value={sender.contact}
                                onChange={handleSenderChange}
                                placeholder=" example@mail.com"
                                className={styles.textName}
                                required
                            />
                        </form>

                        <h2 className={styles.shippingAddress}>Shipping Address</h2>
                        <form className={styles.nameSurnameBox}>
                            <div>
                                <input
                                    name="name"
                                    value={sender.name}
                                    onChange={handleSenderChange}
                                    placeholder=" Name"
                                    className={styles.textName}
                                    required
                                />
                                <input
                                    name="surname"
                                    value={sender.surname}
                                    onChange={handleSenderChange}
                                    placeholder=" Surname"
                                    className={styles.textName}
                                    required
                                />
                            </div>
                        </form>

                        <form className={styles.addressBox}>
                            <input
                                name="address"
                                value={sender.address}
                                onChange={handleSenderChange}
                                placeholder=" Address"
                                className={styles.textName}
                                required
                            />
                        </form>

                        <form className={styles.noteBox}>
                            <input
                                name="note"
                                value={sender.note}
                                onChange={handleSenderChange}
                                placeholder=" Note (optional)"
                                className={styles.textName}
                            />
                        </form>

                        <form className={styles.locationBox}>
                            <div>
                                <input
                                    name="city"
                                    value={sender.city}
                                    onChange={handleSenderChange}
                                    placeholder=" City"
                                    className={styles.textName}
                                    required
                                />
                                <input
                                    name="postalCode"
                                    value={sender.postalCode}
                                    onChange={handleSenderChange}
                                    placeholder=" Postal Code"
                                    className={styles.textName}
                                    required
                                />
                                <input
                                    name="province"
                                    value={sender.province}
                                    onChange={handleSenderChange}
                                    placeholder=" Province"
                                    className={styles.textName}
                                    required
                                />
                            </div>
                        </form>

                        <form className={styles.countryBox}>
                            <input
                                name="country"
                                value={sender.country}
                                onChange={handleSenderChange}
                                placeholder=" Country/Region"
                                className={styles.textName}
                                required
                            />
                        </form>

                        <h2 className={styles.shippingMethod}>Shipping Method</h2>
                        <ShippingMethod
                            handleShippingChange={handleShippingChange}
                            selectedMethod={sender.selectedMethod}
                        /> 


                

                        <div className={styles.backAndPayButtons}>
                                <button className={styles.payButton} onClick={backtocart}>Back to cart</button>
                            
                            <button className={styles.payButton} onClick={handleGoToPayment}>
                                Go to payment
                            </button>
                        </div>
                    
                </div>
               

                {/* ส่วนหลัง (ขวา) */}
               


                    <div className={styles.orderContainer}>
                    <h2 className={styles.contact}>Your Order</h2>

                       {cartItems.map((product, index) => (
                            <div key={index} className={styles.productBox}>
                                <span className={styles.imgProduct}>
                                    <img src={`http://127.0.0.1:8000${product.productImg}`} alt={product.productName} />
                                </span>
                                <div>
                                    <h2>
                                        <span className={styles.infoLabels}></span> {product.productName}
                                    </h2>
                                    <h2 className={styles.productPrice}>THB {parseFloat(product.productPrice).toFixed(2)}</h2>
                                    <h3>
                                        <span className={styles.infoQuantity}>Quantity : </span> {product.productQuantity}
                                    </h3>
                                </div>
                            </div>
                        ))}

                        <hr className={styles.separator} />

                


                        <div className={styles.priceDetail}>
                            <p className={styles.priceRow}>
                                <span className={styles.label}>Subtotal</span>
                                <span className={styles.value}>THB {total.toFixed(2)}</span>
                            </p>

                            <p className={styles.priceRow}>
                                <span className={styles.label}>Shipping</span>
                                <span className={styles.value}>THB {shippingCost.toFixed(2)}</span>
                            </p>

         

                            <h2 className={styles.totalRow}>
                                <span className={styles.labelTotal}>Total</span>
                                <span className={styles.valueTotal}>THB {(total + shippingCost).toFixed(2)}</span>
                            </h2>
                        </div> 
                        
                        </div> 
                    

            </div>

      
        <Footer/>
           
        </>
    );
};

export default ShippingPage;