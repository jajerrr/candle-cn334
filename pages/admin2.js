import Head from "next/head";
import NavbarAdmin from "@/components/NavbarAdmin";
import styles from '../styles/admin2.module.css';
import { useState } from 'react';
import React from "react";
import Link from 'next/link';

export default function Admin2() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Berry Bliss',
      image: '/index/BerryBliss.jpg',
      price: 59.00,
  },
  {
      id: 2,
      name: 'Vanilla Serenity',
      image: '/index/VanillaSerenity.jpg',
      price: 59.00,
  },
  {
      id: 3,
      name: 'Ember Glow',
      image: '/index/EmberGlow.jpg',
      price: 59.00,
  },
  {
      id: 4,
      name: 'Meadow Breeze',
      image: '/index/MeadowBreeze.jpg',
      price: 59.00,
  },
  {
      id: 5,
      name: 'Earthy Elegance',
      image: '/index/EarthyElegance.jpg',
      price: 59.00,
  },
  {
      id: 6,
      name: 'Zesty Citrus Deligh',
      image: '/index/ZestyCitrusDeligh.jpg',
      price: 59.00,
  },
  {
      id: 7,
      name: 'Nordic Forest',
      image: '/index/NordicForest.jpg',
      price: 59.00,
  },
  {
      id: 8,
      name: 'Enchanting Jasmine',
      image: '/index/EnchantingJasmine .jpg',
      price: 59.00,
  },
  ]);

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);


  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowEditProductModal(true);
  };


  const handleDeleteProduct = (productId) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
  };

  const handleAddProduct = () => {
    setShowAddProductModal(true);
  };

  const handleEditProductSubmit = (event) => {
    event.preventDefault();
    
    // อ่านข้อมูลจากฟอร์ม
    const editedName = event.target.productName.value;
    const editedPrice = event.target.productPrice.value;
  
    // ตรวจสอบว่ามี URL ของภาพที่อัพโหลดใหม่หรือไม่
    const editedImage = localStorage.getItem('editedProductImage');
  
    // สร้างอ็อบเจ็กต์สินค้าที่แก้ไข
    const editedProduct = {
      id: selectedProduct.id,
      name: editedName,
      price: editedPrice,
      image: editedImage || selectedProduct.image, // ใช้ URL ใหม่หรือ URL เดิม
    };
  
    // อัพเดตรายการสินค้าใน state
    const updatedProducts = products.map(product => {
      if (product.id === selectedProduct.id) {
        return editedProduct;
      }
      return product;
    });
    setProducts(updatedProducts);
  
    // ปิด Modal
    setShowEditProductModal(false);
  
    // ล้างข้อมูล URL ของภาพที่เก็บไว้ใน localStorage
    localStorage.removeItem('editedProductImage');
  };

  const handleAddProductSubmit = (event) => {
    event.preventDefault();
    
    // อ่านข้อมูลจากฟอร์ม
    const formData = new FormData(event.target);
    const productName = formData.get('productName');
    const productPrice = formData.get('productPrice');
    const productImage = localStorage.getItem('newProductImage');
  
    // สร้างอ็อบเจ็กต์สินค้าใหม่
    const newProduct = {
      id: products.length + 1,
      name: productName,
      price: productPrice,
      image: productImage,
    };
  
    // อัพเดตรายการสินค้าใน state
    setProducts(prevProducts => [...prevProducts, newProduct]);
  
    // ปิด Modal
    setShowAddProductModal(false);
  
    // ล้างข้อมูล URL ของภาพที่เก็บไว้ใน localStorage
    localStorage.removeItem('newProductImage');
  };
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function (event) {
      const imageUrl = event.target.result;
      setImagePreview(imageUrl);
      localStorage.setItem('newProductImage', imageUrl);
    };
  
    reader.readAsDataURL(file);
  };
  
  


  return (
    <>
  <Head>
    <title>Admin</title>
  </Head>
  <NavbarAdmin />

  <div className={`${styles.container} mx-auto mt-10 px-4 md:px-0`}>
    <div className={styles.flexContainer}>
      <div className={styles.productListContainer}>
        <h1 className={styles.title}>Product List</h1>
        <h3 className={styles.add} onClick={handleAddProduct}>Add Product</h3>

        {/* แสดง Modal เพิ่มสินค้า */}
        {showAddProductModal && (
          <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
              <div className={styles.headaddproduct}>
                <h2>Add Product</h2>
                <Link href="#" className={styles.closeButton} onClick={() => setShowAddProductModal(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </Link>
              </div>
              <form onSubmit={handleAddProductSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="productImagetitle">Image</label>
                  <div className={styles.fileInput}>
                    <input type="file" name="productImage" accept="image/*" onChange={handleImageChange} required />
                    <span className={styles.fileInputLabel}>Choose file</span>
                  </div>
                </div>
                {imagePreview && (
                  <div className={styles.imagePreview}>
                    <img src={imagePreview} alt="Product Preview" className={styles.previewImage} />
                  </div>
                )}
                <div className={styles.formGroup}>
                  <label htmlFor="productName">Name</label>
                  <input type="text" name="productName" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="productPrice">Price</label>
                  <input type="text" name="productPrice" required />
                </div>
                <button className={styles.addbutton} type="submit">Add Product</button>
              </form>
            </div>
          </div>
        )}

        <div className={styles.productTable}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.headTable}>
                <th className={styles.headImage}>Image</th>
                <th className={styles.headName}>Name</th>
                <th className={styles.headPrice}>Price</th>
                <th className={styles.headAction}>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* แสดงรายการสินค้า */}
              {products.map((product, index) => (
                <React.Fragment key={product.id}>
                  <tr>
                    <td className={styles.product}>
                      <img src={product.image} className={styles.productImage} alt={product.name} />
                    </td>
                    <td>
                      <h2 className={styles.productName}>{product.name}</h2>
                    </td>
                    <td className={styles.productPrice}>{product.price}</td>
                    <td>
                      <div className={styles.buttonset}>
                        <button className={styles.edit} onClick={() => handleEditProduct(product)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: '30px', height: '30px' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487 18.55 2.8a1.875 1.875 0 1 1 2.651 2.651L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                          </svg>
                        </button>

                        <button className={styles.delete} onClick={() => handleDeleteProduct(product.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style={{ width: '30px', height: '30px' }}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        </button>

                      </div>
                    </td>
                  </tr>
                  {index !== products.length - 1 && <tr><td colSpan="4"><hr /></td></tr>} {/* Insert HR except for the last product */}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>


{showEditProductModal && selectedProduct && (
  <div className={styles.modalBackground}>
    <div className={styles.modalContent}>
      <div className={styles.headaddproduct}>
        <h2>Edit Product</h2>
        <Link href="#" className={styles.closeEdit} onClick={() => setShowEditProductModal(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </Link>
      </div>
      <form onSubmit={handleEditProductSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="productImagetitle">Image</label>
          {/* Render the original image */}
          {selectedProduct.image && (
            <div className={styles.imagePreview}>
              <img src={selectedProduct.image} alt="Original Product Image" className={styles.previewImage} />
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="productName">Name</label>
          <input type="text" name="productName" defaultValue={selectedProduct.name} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="productPrice">Price</label>
          <input type="text" name="productPrice" defaultValue={selectedProduct.price} required />
        </div>


        <button type="submit" className={`${styles.saveButton} saveButton`}>Save</button>
      </form>
    </div>
  </div>
)}

</>
  );
}
