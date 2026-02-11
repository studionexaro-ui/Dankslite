
import React from 'react';
import { CONTACT_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6">
              <div className="bg-violet-600 p-1.5 rounded-lg mr-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M4 4h8a8 8 0 0 1 8 8 8 8 0 0 1-8 8H4V4zm4 4v8h4a4 4 0 0 0 4-4 4 4 0 0 0-4-4H8z" />
                </svg>
              </div>
              <span className="text-xl font-bold">Danks <span className="text-violet-600">lite</span></span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Premium retailer of cutting-edge technology from the world's leading brands. 
              Quality, reliability, and innovation at your fingertips.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Shop Brands</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-violet-600">Samsung</a></li>
              <li><a href="#" className="hover:text-violet-600">Microsoft</a></li>
              <li><a href="#" className="hover:text-violet-600">Google</a></li>
              <li><a href="#" className="hover:text-violet-600">Dell & HP</a></li>
              <li><a href="#" className="hover:text-violet-600">Lenovo</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Contact Us</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <i className="fa-solid fa-location-dot mt-1 text-violet-600 w-5"></i>
                  <div>
                    <p className="font-semibold text-sm">{CONTACT_INFO.name}</p>
                    <p className="text-gray-500 text-sm">{CONTACT_INFO.address}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fa-solid fa-clock mt-1 text-violet-600 w-5"></i>
                  <p className="text-gray-500 text-sm">{CONTACT_INFO.hours}</p>
                </div>
              </div>
              <div className="space-y-3">
                {CONTACT_INFO.emails.map(email => (
                  <div key={email} className="flex items-center">
                    <i className="fa-solid fa-envelope text-violet-600 w-5"></i>
                    <a href={`mailto:${email}`} className="text-gray-500 text-sm hover:text-violet-600">{email}</a>
                  </div>
                ))}
                {CONTACT_INFO.phones.map(phone => (
                  <div key={phone} className="flex items-center">
                    <i className="fa-solid fa-phone text-violet-600 w-5"></i>
                    <a href={`tel:${phone}`} className="text-gray-500 text-sm hover:text-violet-600">{phone}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs">
          <p>© {new Date().getFullYear()} Dankslite Limited. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-violet-600">Privacy Policy</a>
            <a href="#" className="hover:text-violet-600">Terms of Service</a>
            <a href="#" className="hover:text-violet-600">Shipping Info</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
