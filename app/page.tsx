'use client';
// Bu sayfada compile hataları var onlar düzeltilmeli. Line-27, Line-37 Line-66'da.
//Ayrıca Product ve Category type ı için interface yazılmalı. Model klasör açıp types.ts dosyası içine export olarak yazılabilir.
// kullandığın api servisinde categoryleri çekmek için de bir endpoint var. Ürünlerin içinden almak yerine categoryleri de api den almayı dene. API dökümanını inceleyebilirsin.
// aynı şekilde filtreleme işi için de kullandığın serviste ürünleri categorylerine göre çekmek için de bir endpoint var onu da entegre edebilrsin.
// bu bahsettiğim apileri useEffect için de kullanabilirsin. Gerektiği yerde doğru şekilde kullanırsan çok faydalı bir hook.
// Bu yazdıklarımı bir yapmayı dene daha sonrasına bakalım. İlk review için gayet yeterli duruyor. Eline sağlık.
import { useState, useEffect, SetStateAction } from "react";
import ProductCard from "./components/ProductCard/page";

const fetchProducts = async () => { //apiden veri çekme
  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();
  return data;
};

export default function Home() {
  const [products, setProducts] = useState([]); //ürünler
  const [filteredProducts, setFilteredProducts] = useState([]); //kategori için filtreleme
  const [uniqueCategories, setUniqueCategories] = useState([]); //tekrar eden kategorileri bir kez kullanmak için
  const [selectedCategory, setSelectedCategory] = useState(null); //seçilen kategori

  useEffect(() => {
    const getProducts = async () => { //veri çekme, tekrar eden kategorileri filtreleme
      const productsData = await fetchProducts();
      setProducts(productsData);
      setFilteredProducts(productsData);
      const categories = Array.from(new Set(productsData.map((product: { category: any; }) => product.category)));
      setUniqueCategories(categories);
    };
    getProducts();
  }, []);

  const handleCategoryClick = (category: string | SetStateAction<null>) => { //seçilen kategoriye göre ürünleri filtreleme
    setSelectedCategory(category);
    if (category === "Tüm Kategoriler") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  return (
    <div>
      {/** üstteki kategori yapısı*/}
      <div className="flex space-x-4 justify-center mt-4"> 
        <button
          key="all"
          className={`px-4 py-2 rounded-3xl text-sm ${selectedCategory === "Tüm Kategoriler" ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-600'}`}
          onClick={() => handleCategoryClick("Tüm Kategoriler")}
        >
          Tüm Kategoriler
        </button>
        {uniqueCategories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-3xl text-sm ${selectedCategory === category ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {/** ürünlerin ProductCard compnentiyle listelenmesi */}
      <div className="grid md:grid-cols-6 gap-4 container mx-auto mt-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
