// pages/detail/[id].js

import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from 'next/router';
import styles from '@/styles/[id].module.css';

import React, { useState, useEffect} from 'react';

import axios from "axios";




const Detail = () => {

    const router = useRouter();
    const { id } = router.query;

    const [selectedProduct, setSelectedProduct] = useState(null);


    // ข้อมูลสินค้า
    const productData = [
        {
            id: 1,
            name: 'Berry Bliss',
            image: '/index/BerryBliss.jpg',
            price: 59.00,
            description: 'กลิ่นหอมที่เย้ายวนของผลเบอร์รี่ ผักใบเขียวและไวโอเล็ต',
            burningtime: '20 hours',
            diameter: '7.5cm x 7cm',
            weight: '260g',
            
        },
        {
            id: 2,
            name: 'Vanilla Serenity',
            image: '/index/VanillaSerenity.jpg',
            price: 59.00,
            description: 'กลิ่นหอมหวานของวานิลลาและนมอุ่นพร้อมกลิ่นมะพร้าว',
            burningtime: '20 hours',
            diameter: '7.5cm x 7cm',
            weight: '260g',
        },
        {
            id: 3,
            name: 'Ember Glow',
            image: '/index/EmberGlow.jpg',
            price: 59.00,
            description: 'กลิ่นหอมเอิร์ธโทนและควันพร้อมกลิ่นหอมหวาน',
            burningtime: '20 hours',
            diameter: '7.5cm x 7cm',
            weight: '260g',
        },
        {
            id: 4,
            name: 'Meadow Breeze',
            image: '/index/MeadowBreeze.jpg',
            price: 59.00,
            description: 'กลิ่นหอมสดชื่นของหญ้าที่เพิ่งตัดใหม่และสมุนไพรรสเผ็ด',
            burningtime: '20 hours',
            diameter: '7.5cm x 7cm',
            weight: '260g',
        },
        {
            id: 5,
            name: 'Earthy Elegance',
            image: '/index/EarthyElegance.jpg',
            price: 59.00,
            description: 'กลิ่นหอมป่าไม้และลำธารที่ไหลผ่าน',
            burningtime: '20 hours',
            diameter: '7.5cm x 7cm',
            weight: '260g',
        },
        {
            id: 6,
            name: 'Zesty Citrus Deligh',
            image: '/index/ZestyCitrusDeligh.jpg',
            price: 59.00,
            description: 'กลิ่นหอมสดชื่นของมะนาวและตะไคร้',
            burningtime: '20 hours',
            diameter: '7.5cm x 7cm',
            weight: '260g',
        },
        {
            id: 7,
            name: 'Nordic Forest',
            image: '/index/NordicForest.jpg',
            price: 59.00,
            description: 'กลิ่นที่ปลอบโยนของป่าไม้และอำพัน มีกลิ่นซิตรัสและไซเปรส',
            burningtime: '20 hours',
            diameter: '7.5cm x 7cm',
            weight: '260g',
        },
        {
            id: 8,
            name: 'Enchanting Jasmine',
            image: '/index/EnchantingJasmine .jpg',
            price: 59.00,
            description: 'กลิ่นหอมของดอกมะลิ ลูกแพร์ ขิง และดอกลิลลี่แห่งหุบเขา',
            burningtime: '20 hours',
            diameter: '7.5cm x 7cm',
            weight: '260g',
        },



        {
            id: 9,
            name: 'Berry Bliss',
            image: '/index/sBerryBliss.jpg',
            price: 129.00,
            description: 'กลิ่นหอมที่เย้ายวนของผลเบอร์รี่ ผักใบเขียวและไวโอเล็ต',
            burningtime: '3.5 hours',
            diameter: '3.8cm x 3cm',
            weight: '390g',
        },
        {
            id: 10,
            name: 'Vanilla Serenity',
            image: '/index/sVanillaSerenity.jpg',
            price: 129.00,
            description: 'กลิ่นหอมหวานของวานิลลาและนมอุ่นพร้อมกลิ่นมะพร้าว',
            burningtime: '3.5 hours',
            diameter: '3.8cm x 3cm',
            weight: '390g',
        },
        {
            id: 11,
            name: 'Ember Glow',
            image: '/index/sEmberGlow.jpg',
            price: 129.00,
            description: 'กลิ่นหอมเอิร์ธโทนและควันพร้อมกลิ่นหอมหวาน',
            burningtime: '3.5 hours',
            diameter: '3.8cm x 3cm',
            weight: '390g',
        },
        {
            id: 12,
            name: 'Meadow Breeze',
            image: '/index/sMeadowBreeze.jpg',
            price: 129.00,
            description: 'กลิ่นหอมสดชื่นของหญ้าที่เพิ่งตัดใหม่และสมุนไพรรสเผ็ด',
            burningtime: '3.5 hours',
            diameter: '3.8cm x 3cm',
            weight: '390g',
        },
        {
            id: 13,
            name: 'Earthy Elegance',
            image: '/index/sEarthyElegance.jpg',
            price: 129.00,
            description: 'กลิ่นหอมป่าไม้และลำธารที่ไหลผ่าน',
            burningtime: '3.5 hours',
            diameter: '3.8cm x 3cm',
            weight: '390g',
        },
        {
            id: 14,
            name: 'Zesty Citrus Deligh',
            image: '/index/sZestyCitrusDelight.jpg',
            price: 129.00,
            description: 'กลิ่นหอมสดชื่นของมะนาวและตะไคร้',
            burningtime: '3.5 hours',
            diameter: '3.8cm x 3cm',
            weight: '390g',
        },
        {
            id: 15,
            name: 'Nordic Forest',
            image: '/index/sNordicForest.jpg',
            price: 129.00,
            description: 'กลิ่นที่ปลอบโยนของป่าไม้และอำพัน มีกลิ่นซิตรัสและไซเปรส',
            burningtime: '3.5 hours',
            diameter: '3.8cm x 3cm',
            weight: '390g',
        },
        {
            id: 16,
            name: 'Enchanting Jasmine',
            image: '/index/sEnchantingJasmine.jpg',
            price: 129.00,
            description: 'กลิ่นหอมของดอกมะลิ ลูกแพร์ ขิง และดอกลิลลี่แห่งหุบเขา',
            burningtime: '3.5 hours',
            diameter: '3.8cm x 3cm',
            weight: '390g',
        },

    ];





  useEffect(() => {
    const fetchProductList = async () => {
      try {
        if (selectedProduct && selectedProduct.description) {
          const API_URL = `http://localhost:3000/detail/${id}/${selectedProduct.description}`;
          const result = await fetch(API_URL, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (result.ok) {
            const responseBody = await result.text();
            setItems(JSON.parse(responseBody));
          } else {
            throw new Error(`Error: ${result.status} - ${result.body}`);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProductList();
  }, [selectedProduct]); // Add router.query.keyword to dependency array

 

  const play = async () => {
    const audioCtx = new AudioContext();

    let buffer = null;
    const handleAudioProduct = async () => {

    if (!selectedProduct) {
            throw new Error("Selected product is null");
          }  

      const API_URL = `http://localhost:3000/sound/detail/${id}/${selectedProduct.description}.wav`;
    
      try {
        const result = await fetch(API_URL, {
          method: "GET",
          
        });
        if (result.ok) {
          const arrayBuffer = await result.arrayBuffer();
          return arrayBuffer;
        } else {
          throw new Error(`Error: ${result.status} - ${result.statusText}`);
        }
      } catch (err) {
        throw err;
      }
    };

    const audioData = await handleAudioProduct();


   
    audioCtx.decodeAudioData(
      audioData,
      (decodedData) => {
        buffer = decodedData;
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.start(0);
      },
      (error) => {
        console.error("Error decoding audio data:", error);
      }
    );
  };

 











useEffect(() => {
    if (id) { // ตรวจสอบว่า id ไม่เป็น undefined
        const foundProduct = productData.find(product => product.id === parseInt(id));
        if (foundProduct) {
            setSelectedProduct(foundProduct);
        } else {
            console.error(`Product with id ${id} not found`);
        }
    }
}, [id]); // เรียกใช้ฟังก์ชันเมื่อ id เปลี่ยนแปลง

// ฟังก์ชันสำหรับตรวจสอบว่าสินค้ามีอยู่ในตะกร้าหรือไม่
const isItemInCart = (itemId) => {
    // ดึงข้อมูลสินค้าที่อยู่ใน Local Storage
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    // ตรวจสอบว่าไอดีสินค้าอยู่ในตะกร้าหรือไม่
    return existingCartItems.some(item => item.id === itemId);
};

// ฟังก์ชันสำหรับจัดการเหตุการณ์การคลิก Add to Cart
const handleAddToCart = (selectedProduct) => {
    // ตรวจสอบว่าสินค้ามีอยู่ในตะกร้าหรือไม่
    const isItemAlreadyInCart = isItemInCart(selectedProduct.id);
    if (isItemAlreadyInCart) {
        alert('สินค้านี้มีอยู่ในตะกร้าแล้ว');
        return;
    }

    // เพิ่มคุณสมบัติ addedFromButton เพื่อระบุว่าสินค้าถูกเพิ่มจากการกดปุ่ม "Add to Cart"
    selectedProduct.addedFromButton = true;
    // ดึงข้อมูลสินค้าที่มีอยู่ใน Local Storage (หากมี)
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    // เพิ่มข้อมูลสินค้าที่เลือกเข้าไปในตัวแปร existingCartItems
    const updatedCartItems = [...existingCartItems, selectedProduct];
    // บันทึกข้อมูลสินค้าที่อัพเดทลงใน Local Storage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    // ส่งข้อมูลสินค้าไปยังหน้า cart.js ผ่าน query parameters
    router.push({
        pathname: '/cart',
        query: {
            items: JSON.stringify(updatedCartItems), // ส่งสินค้าเป็น JSON string
        },
    });
};

















    return (
        <div>
            <Head>
                <title>Product Detail</title>
            </Head>
            <Navbar />
            
            {selectedProduct && (
            <div className={styles.detailContainer}>
                <img className={styles.image}src={selectedProduct.image} alt={selectedProduct.name} />
                <div>
                    <h1>{selectedProduct.name}</h1>
                    <p className={styles.price}>THB {selectedProduct.price.toFixed(2)}</p>

                    <div className={styles.java}>


                    <button onClick={play} className={styles.audiobutton}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className={styles.volume}
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                            />
                        </svg>
                        </button>
  
                        <p className={styles.description}>{selectedProduct.description}</p>


                        </div>



                    <div className={styles.detailBox}>
                        <p>
                            <span className={styles.label}>Wax:</span> Top grade Soy wax that delivers a smoke less, consistent burn<br />
                            <span className={styles.label}>Fragrance:</span> Premium quality ingredients with natural essential oils<br />
                            <span className={styles.label}>Burning Time: </span> {selectedProduct.burningtime}  <span className={styles.label}>    Dimension: </span> {selectedProduct.diameter}<span className={styles.label}>    Weight: </span> {selectedProduct.weight}
                        </p>
                    </div>

                    <button className={styles.cartButton} onClick={() => handleAddToCart(selectedProduct)}>Add Cart</button>



                </div>
            </div>

            )}
             <Footer />
        </div>
    );
};

export default Detail;
