
import React from 'react';
import { Product, Currency } from '../types';
import { CURRENCY_CONFIG } from '../constants';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, currency, onAddToCart }) => {
  const config = CURRENCY_CONFIG[currency];
  const convertedPrice = (product.price * config.rate).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <div className="group bg-white rounded-[2rem] border border-gray-100 p-5 hover:shadow-2xl hover:border-violet-100 transition-all duration-500 flex flex-col h-full">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-gray-50 mb-6">
        <img 
          src={product.image} 
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-4 left-4 flex space-x-2">
           <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-violet-600 shadow-sm uppercase tracking-widest border border-white/20">
            {product.brand}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <button 
             onClick={() => onAddToCart(product)}
             className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl hover:bg-violet-600 hover:text-white transition-all active:scale-90"
           >
             <i className="fa-solid fa-cart-plus text-lg"></i>
           </button>
        </div>
      </div>
      
      <div className="flex-grow">
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <i key={i} className={`fa-solid fa-star text-[10px] ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-200'}`}></i>
          ))}
          <span className="text-[10px] font-bold text-gray-400 ml-1">{product.rating}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-violet-600 transition-colors duration-300">{product.name}</h3>
        <p className="text-gray-500 text-xs mt-2 leading-relaxed line-clamp-2">
          {product.description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-50">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Authorized Price</span>
          <span className="text-xl font-black text-violet-600">
            {config.symbol}{convertedPrice}
          </span>
        </div>
        <div className="bg-green-50 px-3 py-1 rounded-full flex items-center space-x-1">
           <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
           <span className="text-[10px] font-bold text-green-600 uppercase">In Stock</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
