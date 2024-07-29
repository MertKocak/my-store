//Line-17, Line-23, 

import Link from 'next/link';
import Image from "next/image";
import { use } from 'react';

interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

async function fetchProduct(id: number): Promise<ProductProps> { //ProductCard'tan gönderilen id ile ürüne özel veri çekme
  const res = await fetch(`https://fakestoreapi.com/products/${id}`); // api çağrısı için axios kullanabilirsin piyasada o kullanılıyo çünkü
  const product = await res.json();
  return product;
}

const ProductPage = ({ params }: { params: { id: number } }) => { //
  const product = use(fetchProduct(params.id)); //Burada api çağrısı useEffect içinde yapılmalı.

  return ( // temel bir detay sayfası tasarımı
      <div className='flex space-x-8 px-8'>
        <div className=' mx-12flex object-contain '>
        <Image
      className='flex-grow px-12 py-12 h-full w-full object-contain mb-4 border rounded-xl border-gray-300'
        src= {product.image}
        alt= {product.title}
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
