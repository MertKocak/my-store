'use client';

import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { Product, Category } from "./models/types";
import axios from "axios";

const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get('https://fakestoreapi.com/products');
  return res.data;
};

const fetchCategories = async (): Promise<string[]> => {
  const res = await axios.get('https://fakestoreapi.com/products/categories');
  return res.data;
};

const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const res = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
  return res.data;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const getProductsAndCategories = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
      setFilteredProducts(productsData);

      const categoriesData = await fetchCategories();
      setUniqueCategories(['Tüm Kategoriler', ...categoriesData]);
    };

    getProductsAndCategories();
  }, []);

  const handleCategoryClick = async (category: string) => {
    setSelectedCategory(category);
    if (category === "Tüm Kategoriler") {
      setFilteredProducts(products);
    } else {
      const filtered = await fetchProductsByCategory(category);
      setFilteredProducts(filtered);
    }
  };

  return (
    <div>
      {/** üstteki kategori yapısı */}
      <div className="flex space-x-4 justify-center mt-4">
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
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
