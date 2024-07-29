"use-client";

import Link from "next/link";
import Image from "next/image";


type ProductCardProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

const ProductCard = ({ id, title, price, description, image, category }: ProductCardProps) => {

  return ( //temel bir Ürün Kartı
    <Link href={`pages/${id}`} className="hover:bg-gray-100 flex flex-col border rounded-xl p-4 mt-2 cursor-pointer">
      <div className='flex-grow'>
      <Image
      className='bg-white h-44 object-contain mb-4'
        src= {image}
        alt= {title}
        width={176}
        height={176}
      />
      <h2 className="text-blue-900 text-sm font-bold line-clamp-2 mb-2">{title}</h2>
      <p className="text-gray-500 text-xs line-clamp-3">{description}</p>
      
      </div>
      <div className='mt-auto'>
      <p className=" text-xs mt-2 text-gray-500">Kategori: {category}</p>
      <p className=" font-bold text-sm mt-2 text-blue-900">{price} ₺</p>
      
      <Link className='border w-auto h-6 flex rounded-md hover:bg-blue-900 hover:text-white text-blue-900 bg-white border-blue-900 mt-2  text-xs py-3 items-center justify-center' href={`pages/${id}`}>Ürünü İncele</Link>
      </div>
    </Link>
  );
};

export default ProductCard;
