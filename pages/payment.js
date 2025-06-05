import React, { useState, useEffect } from 'react'; 
import { useRouter } from 'next/router'; 
import Head from 'next/head'; 
import Navbar from '@/components/Navbar'; 
import Footer from '@/components/Footer'; 
import styles from '../styles/payment.module.css'; 
import Link from 'next/link';


const PageNav = () => (  
    <div className={styles.navBar}>  
        <div className={styles.bar}>  
            <Link href="/cart" className={styles.linkCart}>  
                <p>Cart</p>  
            </Link>  
            <svg className={styles.svgIcon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">  
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />  
            </svg>  
                
            <Link href="/shipping" className={styles.linkShipping}>
                <p>Shipping</p>  
            </Link>  
            <svg className={styles.svgIcon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">  
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />  
            </svg>  

            <Link href="/payment" className={styles.linkPayment}>  
                <p>Payment</p>  
            </Link>  
        </div>  
    </div>  

);  



// จัดการเหตุการณ์เมื่อคลิกปุ่ม "Pay Now"
const handlePayNowClick = (cartItems,sender,subtotal) => {
    // เตรียมข้อมูลที่ต้องการส่งไปยัง API
    const data = {
        products: cartItems, // สินค้าที่ลูกค้าสั่งซื้อ
        shipping_address: sender, // ข้อมูลการจัดส่ง
        //paymentMethod: selectedPaymentMethod, // วิธีการชำระเงินที่เลือก
        total_price: subtotal , // ยอดรวมทั้งหมด
    };

    // โพสข้อมูลไปยัง API
    postDataToAPI(data);
    console.log("Data to be posted:", data);
};

//ฟังก์ชันสำหรับการโพสข้อมูลไปยัง API
const postDataToAPI = async (data) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/orders/orders/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        console.log('Response from API:', responseData);

        // หลังจากที่ส่งข้อมูลไปยัง API และได้รับการยืนยัน
        // รีเซ็ตค่าใน Local Storage
        resetLocalStorage();
        // ทำสิ่งที่คุณต้องการกับข้อมูลที่ได้รับกลับจาก API
    } catch (error) {
        console.error('Error posting data to API:', error);
    }
};

// ฟังก์ชันสำหรับรีเซ็ตค่าใน Local Storage
const resetLocalStorage = () => {
    // ลบข้อมูลที่เกี่ยวข้องออกจาก Local Storage
    localStorage.removeItem('cartItems');
    // อื่น ๆ ตามต้องการ
};



// ฟังก์ชันหลักของ PaymentPage

const PaymentPage = () => {
    const [shippingCost, setShippingCost] = useState(0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [sender, setSender] = useState({
        contact: '',
        name: '',
        surname: '',
        address: '',
        note: '',
        city: '',
        province: '',
        country: '',
        postcode: '',
        selectedMethod: '',
    });
    const [total, setTotal] = useState(0);

    const router = useRouter();
    const query = router.query;

    // ใช้ `useEffect` เพื่ออ่านข้อมูลจาก `query` เมื่อหน้าเพจโหลดสำเร็จ
    useEffect(() => {
        if (router.isReady) {
            // อ่านข้อมูลจาก `query`
            try {
                const productsFromQuery = query.products ? JSON.parse(query.products) : [];
                setCartItems(productsFromQuery);
                setQuantities(productsFromQuery.map(item => item.productQuantity || 1));

                // ตั้งค่า sender จาก `query`
                setSender({
                    contact: query.contact || '',
                    name: query.name || '',
                    surname: query.surname || '',
                    address: query.address || '',
                    city: query.city || '',
                    province: query.province || '',
                    country: query.country || '',
                    postcode: query.postcode || '',
                    note: query.note || '',
                    selectedMethod: query.selectedMethod || '',
                    //body: item.body || '', // ใช้ property "body" จากอาร์เรย์ที่กำหนด
                    //shipping_address: item.shipping_address || '', // ใช้ property "shipping_address" จากอาร์เรย์ที่กำหนด
                });

                // ตั้งค่า total, shippingCost, และ selectedPaymentMethod จาก query
                setTotal(parseFloat(query.total) || 0);
                setShippingCost(parseFloat(query.shippingCost) || 0);
                setSelectedPaymentMethod(query.paymentMethod || '');
            } catch (error) {
                console.error('Error parsing query data:', error);
            }
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
        //localStorage.setItem('shippingCost', shippingCost.toFixed(2));

        // อัปเดตค่า `total`
        setTotal(subtotal);
    }, [cartItems, quantities]);

    // จัดการการเปลี่ยนแปลงของ sender
    const handleSenderChange = (event) => {
        const { name, value } = event.target;
        setSender((prevSender) => ({
            ...prevSender,
            [name]: value,
        }));
    };

    // จัดการการเปลี่ยนแปลงของ selectedPaymentMethod
    const handleMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

    // การจัดรูปแบบข้อมูล cartData สำหรับการแสดงใน PaymentPage
    const cartData = cartItems.map((item, index) => {
        const productPrice = parseFloat(item.productPrice) || 0;
        const formattedPrice = productPrice.toFixed(2);

        return {
            productId : item.productId,
            productImg: item.productImg || '', // จัดการกรณีที่ productImg เป็นค่า undefined หรือ null
            productName: item.productName || '', // จัดการกรณีที่ productName เป็นค่า undefined หรือ null
            productQuantity: quantities[index],
            productPrice: formattedPrice,
            
        };
    });

    
    return (
        <>
            <Head>
                <title>Payment</title>
            </Head>
            <Navbar />
            <PageNav />

            <div className={`${styles.container} mx-auto mt-10 px-4 md:px-0`}>
                <div className={styles.flexContainer}>
                    {/* Payment Box */}
                    <div className={styles.paymentBox}>
                        {/* Contact Information */}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            
                            <span className={styles.infoLabel}>Contact: <span className={styles.email}>{sender.contact}</span></span>

                            <Link href={`/shipping?name=${sender.name}&surname=${sender.surname}&address=${sender.address}&city=${sender.city}&province=${sender.province}&country=${sender.country}&postcode=${sender.postcode}&products=${encodeURIComponent(JSON.stringify(cartItems))}&method=${sender.selectedMethod}`}>
                                <p className={styles.edit}>Edit</p>
                            </Link>

                        </div>

                        <hr className={styles.separator} />


                        {/* Shipping Information */}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    
                                <div>
                                <span className={styles.infoLabel}>Ship to:</span> 
                                <span className={styles.nameAndSurname}>{`${sender.name} ${sender.surname}`}</span><br />

                                    <div className={styles.inputAdd}>
                                        {sender.address}<br />
                                        {sender.city}<br />
                                        {`${sender.province}, ${sender.postcode}`}<br />
                                        
                                    </div>
                                </div>
                                <Link href={`/shipping?contact=${sender.contact}&products=${encodeURIComponent(JSON.stringify(cartItems))}&method=${sender.selectedMethod}`}>
                                    <p className={styles.edit}>Edit</p>
                                </Link>
                            
                        </div>

                        <hr className={styles.separator} />

                        {/* Shipping Method */}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className={styles.infoLabel}>
                                Method: <span className={styles.inputShipping}>{sender.selectedMethod}</span>
                            </span>
                            <Link href={`/shipping?method=${sender.selectedMethod}&contact=${sender.contact}&name=${sender.name}&surname=${sender.surname}&address=${sender.address}&city=${sender.city}&province=${sender.province}&country=${sender.country}&postcode=${sender.postcode}&products=${encodeURIComponent(JSON.stringify(cartItems))}`}>
                                <p className={styles.edit}>Edit</p>
                            </Link>
                        </div>
                    </div>

                    {/* Coupon Container */}
                    <div className={styles.couponContainer}>
                        <form className={styles.couponBox}>
                            <input
                                type="text"
                                placeholder=" Coupon Code"
                                className={styles.textCoupon}
                                required
                            />
                            <button type="submit" className={styles.couponButton}>Add Code</button>
                        </form>
                    </div>

                    {/* Products Information */}
                    <h2 className={styles.product}>Products</h2>
                    {cartData.map((product, index) => (
                        
                        <div key={index}>
                            <div className={styles.productBox}>
                                <span className={styles.imgProduct}>
                                    <img src={`http://127.0.0.1:8000${product.productImg}`} alt={product.productName} />
                                </span>
                                <div>
                                    <h2><span className={styles.infoLabels}> </span>{product.productName}</h2>
                                    <h3><span className={styles.infoQuantity}>Quantity: </span>{product.productQuantity}</h3>
                                </div>
                                <h3 className={styles.productPrice}>
                                    THB {parseFloat(product.productPrice).toFixed(2)}
                                </h3>
                            </div>
                            
                        </div>
                    ))}


                <hr className={styles.separator} />

                    <div className={styles.priceDetail}>
                        <div className={styles.priceRow}>
                            <span className={styles.label}>Subtotal</span>
                            <span className={styles.value}>THB {total.toFixed(2)}</span>
                        </div>

                        <div className={styles.priceRow}>
                            <span className={styles.label}>Shipping</span>
                            <span className={styles.value}>THB {shippingCost.toFixed(2)}</span>
                        </div>

                        <h2 className={styles.totalRow}>
                            <span className={styles.labelTotal}>Total</span>
                            <span className={styles.valueTotal}>THB {(total +  shippingCost).toFixed(2)}</span>
                        </h2>
                    </div>

                    <div className={styles.backAndPayButtons}>

                        <Link href={`/shipping?method=${sender.selectedMethod}&contact=${sender.contact}&name=${sender.name}&surname=${sender.surname}&address=${sender.address}&city=${sender.city}&province=${sender.province}&country=${sender.country}&postcode=${sender.postcode}&products=${encodeURIComponent(JSON.stringify(cartItems))}`} className="{styles.backButton}">
                            <h3 className={styles.back}>Back to detail</h3>
                        </Link>
                        <Link href="/confirm">
                            <button className={styles.payButton}onClick={() => {handlePayNowClick(cartItems, sender, total, shippingCost);}}>Pay Now</button>                        
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PaymentPage;