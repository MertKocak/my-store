"use client"

import Link from 'next/link';
import Image from "next/image";
import {useEffect, useState } from 'react';
import axios from 'axios';

interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

async function fetchProduct(id: number): Promise<ProductProps> { //ProductCard'tan gönderilen id ile ürüne özel veri çekme
  const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return res.data;
}

const ProductPage = ({ params }: { params: { id: number } }) => {

  const [product, setProduct] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const product = await fetchProduct(params.id);
        setProduct(product);
      } catch (err) {
        setError('Ürün yüklenirken hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [params.id]);

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Ürün bulunamadı.</p>;
  }

  return ( // temel bir detay sayfası tasarımı
    <div className='flex space-x-8 px-8'>
      <div className=' mx-12flex object-contain '>
        <Image
          className='flex-grow px-12 py-12 h-full w-full object-contain mb-4 border rounded-xl border-gray-300'
          src={product.image}
          alt={product.title}
          width={500}
          height={500}
        />
      </div>
      <div className='flex flex-col justify-between pr-8 mr-80'>
        <div className=' mr-20'>
          <h1 className='pt-4 text-lg text-black font-bold'>{product.title}</h1>
          <p className='text-base text-black'>Kategori: {product.category}</p>
          <p className='py-2 text-xl text-blue-900 font-bold'>{product.price} ₺</p>
          <p className='text-base text-black' >Ürün Açıklaması: {product.description}</p>
        </div>
        <Link href="/" className='mr-20 mt-4 mb-6 px-3 py-2 bg-blue-900 text-lg text-white border rounded-xl flex justify-center'>Sepete Ekle</Link>
      </div>
    </div>
  );
};

export default ProductPage;
