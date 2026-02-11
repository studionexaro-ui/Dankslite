
import React from 'react';
import { Brand, User, Currency } from '../types';

interface NavbarProps {
  user: User | null;
  cartCount: number;
  selectedBrand: Brand;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onCartClick: () => void;
  onAuthClick: () => void;
  onBrandSelect: (brand: Brand) => void;
  onSearch: (q: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  user,
  cartCount,
  selectedBrand,
  currency,
  onCurrencyChange,
  onCartClick,
  onAuthClick,
  onBrandSelect,
  onSearch
}) => {
  const brands: Brand[] = ['All', 'Samsung', 'Google', 'Microsoft', 'Dell', 'HP', 'Lenovo'];
  const currencies: Currency[] = ['GHS', 'USD', 'EUR', 'GBP'];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => onBrandSelect('All')}>
            <div className="bg-violet-600 p-2.5 rounded-2xl mr-4 shadow-lg shadow-violet-200 group-hover:rotate-12 transition-transform duration-300">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <path d="M4 4h8a8 8 0 0 1 8 8 8 8 0 0 1-8 8H4V4zm4 4v8h4a4 4 0 0 0 4-4 4 4 0 0 0-4-4H8z" />
                <rect x="6" y="8" width="4" height="4" fill="white" fillOpacity="0.5" />
                <rect x="10" y="12" width="4" height="4" fill="white" fillOpacity="0.8" />
              </svg>
            </div>
            <div>
              <span className="text-2xl font-black tracking-tighter text-gray-900 block leading-none">
                Danks <span className="text-violet-600">lite</span>
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 block">Obuasi Municipal</span>
            </div>
          </div>

          {/* Search */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-12">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Find S24 Ultra, Pixel 8, or Surface Pro..."
                className="w-full bg-gray-50 border-gray-100 border-2 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-4 focus:ring-violet-100 focus:border-violet-600 outline-none transition-all duration-300 text-sm"
                onChange={(e) => onSearch(e.target.value)}
              />
              <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {/* Desktop Controls */}
          <div className="flex items-center space-x-4">
            {/* Currency Selector */}
            <select 
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value as Currency)}
              className="bg-gray-100 border-none rounded-xl px-3 py-2 text-xs font-bold text-gray-600 outline-none focus:ring-2 focus:ring-violet-200 cursor-pointer hidden sm:block"
            >
              {currencies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <div className="h-8 w-[1px] bg-gray-100 hidden sm:block mx-2"></div>

            <button 
              onClick={onAuthClick}
              className="flex items-center space-x-3 bg-gray-50 hover:bg-violet-50 px-4 py-2.5 rounded-2xl transition-all duration-300 group"
            >
              {user ? (
                <div className="flex items-center space-x-3">
                  <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full border-2 border-violet-200" />
                  <div className="hidden md:block text-left">
                     <p className="text-xs font-bold leading-none">{user.name.split(' ')[0]}</p>
                     <p className="text-[10px] text-gray-400 leading-none mt-1">Authorized</p>
                  </div>
                </div>
              ) : (
                <>
                  <i className="fa-regular fa-user text-gray-400 group-hover:text-violet-600 transition-colors"></i>
                  <span className="text-sm font-bold text-gray-600 group-hover:text-violet-600 transition-colors hidden sm:inline">Sign In</span>
                </>
              )}
            </button>

            <button 
              onClick={onCartClick}
              className="relative p-3 bg-violet-600 hover:bg-violet-700 rounded-2xl transition-all duration-300 group shadow-lg shadow-violet-100 active:scale-90"
            >
              <i className="fa-solid fa-bag-shopping text-white text-lg"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-black text-[10px] font-black px-1.5 py-0.5 rounded-full ring-4 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Brand Filter Bar */}
        <div className="flex space-x-2 overflow-x-auto scroll-hide pb-4 text-xs">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => onBrandSelect(brand)}
              className={`whitespace-nowrap px-6 py-2 rounded-xl font-bold transition-all duration-300 ${
                selectedBrand === brand
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-100 scale-105'
                  : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
