
import React, { useState, useEffect, useRef } from 'react';
import { CartItem, User, Product, Currency, EmailMessage } from '../types';
import { CURRENCY_CONFIG, MOJOAUTH_BASE_URL, MOJOAUTH_STATIC_STATE } from '../constants';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onCheckout: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, items, currency, onRemove, onUpdateQty, onCheckout }) => {
  if (!isOpen) return null;
  const config = CURRENCY_CONFIG[currency];
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-2xl rounded-l-[2rem] md:rounded-l-[3rem]">
            <div className="p-8 md:p-10 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Cart</h2>
                <p className="text-sm text-gray-400 font-medium">Review your selection</p>
              </div>
              <button onClick={onClose} className="w-12 h-12 bg-gray-50 hover:bg-gray-100 rounded-2xl flex items-center justify-center transition-colors">
                <i className="fa-solid fa-xmark text-xl text-gray-400"></i>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 md:px-10 space-y-8 scroll-hide">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <i className="fa-solid fa-bag-shopping text-6xl mb-6 text-gray-100"></i>
                  <h3 className="text-xl font-bold text-gray-400">Cart is empty</h3>
                  <button onClick={onClose} className="mt-8 bg-violet-600 text-white px-8 py-3 rounded-2xl font-bold">Start Shopping</button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="group relative flex space-x-4 border-b border-gray-50 pb-8 last:border-0">
                    <img src={item.image} className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-gray-50 rounded-2xl object-cover border" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] font-black text-violet-600 uppercase mb-1">{item.brand}</p>
                          <h4 className="font-bold text-gray-900 text-sm mb-2">{item.name}</h4>
                        </div>
                        <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                          <i className="fa-solid fa-trash-can text-sm"></i>
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-2.5 py-1">
                          <button onClick={() => onUpdateQty(item.id, -1)} className="text-gray-400 hover:text-gray-900 font-bold w-4">-</button>
                          <span className="text-xs font-black text-gray-900">{item.quantity}</span>
                          <button onClick={() => onUpdateQty(item.id, 1)} className="text-gray-400 hover:text-gray-900 font-bold w-4">+</button>
                        </div>
                        <p className="font-black text-gray-900 text-sm">{config.symbol}{(item.price * item.quantity * config.rate).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-8 md:p-10 border-t bg-gray-50/50 space-y-6">
              <div className="flex justify-between text-2xl font-black text-gray-900">
                <span>Total</span>
                <span className="text-violet-600">{config.symbol}{(subtotal * config.rate).toLocaleString()}</span>
              </div>
              <button 
                disabled={items.length === 0}
                onClick={onCheckout}
                className="w-full bg-violet-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-violet-100"
              >
                Secure Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (u: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  const handleRedirectLogin = () => {
    // Dynamically construct the redirect URL to match our actual origin
    const dynamicRedirectUri = encodeURIComponent(window.location.origin);
    const finalUrl = `${MOJOAUTH_BASE_URL}?state=${MOJOAUTH_STATIC_STATE}&redirect_uri=${dynamicRedirectUri}&env=production`;
    
    window.location.href = finalUrl;
  };

  const handleSimulateLogin = () => {
    // For local dev / fallback testing
    onLogin({
      id: `usr_${Date.now()}`,
      name: "Danks lite Demo User",
      email: "authorized@dankslite.com",
      picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=danks`,
      lastLogin: new Date().toISOString()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-lg" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden flex flex-col animate-fade-in border border-gray-100">
        <div className="text-center mb-10">
          <div className="inline-block bg-violet-600 p-5 rounded-[1.5rem] mb-6 shadow-2xl shadow-violet-200">
            <i className="fa-solid fa-lock text-white text-3xl"></i>
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Danks lite ID</h2>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Secure Authentication Gateway</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleRedirectLogin}
            className="w-full bg-violet-600 text-white py-5 rounded-2xl font-black flex items-center justify-center space-x-3 shadow-xl shadow-violet-100 hover:bg-violet-700 transition-all active:scale-95 group"
          >
            <i className="fa-brands fa-google text-lg"></i>
            <span>Login with Google</span>
            <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </button>
          
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center"><span className="bg-white px-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">Administrative Tools</span></div>
          </div>

          <button 
            onClick={handleSimulateLogin}
            className="w-full bg-gray-50 text-gray-900 py-4 rounded-2xl font-bold flex items-center justify-center space-x-3 border-2 border-transparent hover:border-violet-100 hover:bg-white transition-all active:scale-95"
          >
            <i className="fa-solid fa-user-gear text-gray-400"></i>
            <span>Simulate Authorized User</span>
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-50">
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <i className="fa-solid fa-shield-halved text-xs"></i>
            <p className="text-[9px] font-black uppercase tracking-widest">Verified by MojoAuth™</p>
          </div>
          <p className="text-[9px] text-gray-400 text-center font-medium mt-4 leading-relaxed max-w-[240px] mx-auto opacity-60">
            Authorized Obuasi Municipal node. All sessions are encrypted with industry-standard protocols.
          </p>
        </div>

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 text-gray-400 transition-colors"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>
    </div>
  );
};

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  user: User | null;
  onSuccess: (email: string, items: CartItem[], total: number, curr: Currency, orderId: string) => Promise<void>;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, items, currency, user, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingText, setProcessingText] = useState('Authorizing Bank...');
  const [orderId] = useState(() => `DL-${Math.floor(Math.random() * 900000 + 100000)}`);

  if (!isOpen) return null;
  const config = CURRENCY_CONFIG[currency];
  const totalUSD = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setProcessingText('Communicating with Danks lite Gateway...');
    
    setTimeout(async () => {
      setProcessingText('Dispatching digital tax invoice to your real email...');
      await onSuccess(user?.email || "guest@user.com", items, totalUSD, currency, orderId);
      setIsProcessing(false);
      setStep(3);
      setTimeout(() => {
        onClose();
        setStep(1);
      }, 7000);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-violet-900/40 backdrop-blur-xl" onClick={onClose} />
      <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[600px] flex flex-col md:flex-row">
        {step < 3 ? (
          <>
            <div className="md:w-5/12 bg-gray-50/50 p-8 md:p-12 border-r border-gray-100 flex flex-col">
              <h3 className="font-black text-gray-400 uppercase text-[10px] tracking-widest mb-4">Review Order</h3>
              <div className="flex-grow space-y-4 overflow-y-auto pr-2 scroll-hide max-h-[300px]">
                {items.map(item => (
                  <div key={item.id} className="flex space-x-4 items-center">
                    <img src={item.image} className="w-12 h-12 rounded-xl object-cover border" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">{item.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{item.quantity} units</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-8 mt-8">
                <div className="flex justify-between text-3xl font-black text-violet-600">
                  <span>Total</span>
                  <span>{config.symbol}{(totalUSD * config.rate).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="md:w-7/12 p-8 md:p-12 bg-white flex flex-col justify-center">
              {isProcessing ? (
                <div className="text-center animate-fade-in">
                  <div className="w-20 h-20 border-8 border-violet-100 border-t-violet-600 rounded-full animate-spin mx-auto mb-8"></div>
                  <h2 className="text-2xl font-black">{processingText}</h2>
                </div>
              ) : step === 1 ? (
                <div className="space-y-6">
                  <h2 className="text-3xl font-black">Shipping</h2>
                  <input placeholder="Full Name" defaultValue={user?.name || ""} className="w-full bg-gray-50 border-2 p-4 rounded-2xl outline-none focus:border-violet-600 font-semibold" />
                  <input placeholder="Authorized Obuasi Address" className="w-full bg-gray-50 border-2 p-4 rounded-2xl outline-none focus:border-violet-600 font-semibold" />
                  <button onClick={() => setStep(2)} className="w-full bg-violet-600 text-white py-5 rounded-2xl font-black shadow-xl shadow-violet-100">Continue to Payment</button>
                </div>
              ) : (
                <form onSubmit={handlePay} className="space-y-6">
                  <h2 className="text-3xl font-black">Secure Payment</h2>
                  <div className="space-y-4">
                    <div className="relative">
                      <input placeholder="Card Number" defaultValue="4242 4242 4242 4242" className="w-full bg-gray-50 border-2 p-4 rounded-2xl outline-none focus:border-violet-600 font-mono text-lg" />
                      <i className="fa-brands fa-cc-visa absolute right-5 top-1/2 -translate-y-1/2 text-3xl text-gray-300"></i>
                    </div>
                    <div className="flex gap-4">
                      <input placeholder="MM/YY" defaultValue="12/28" className="w-full bg-gray-50 border-2 p-4 rounded-2xl outline-none focus:border-violet-600 font-semibold" />
                      <input placeholder="CVC" defaultValue="123" className="w-full bg-gray-50 border-2 p-4 rounded-2xl outline-none focus:border-violet-600 font-semibold" />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-violet-600 text-white py-5 rounded-2xl font-black shadow-xl shadow-violet-100">Authorize {config.symbol}{(totalUSD * config.rate).toLocaleString()}</button>
                </form>
              )}
            </div>
          </>
        ) : (
          <div className="w-full p-20 text-center flex flex-col items-center justify-center space-y-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-5xl animate-bounce shadow-lg">
              <i className="fa-solid fa-check"></i>
            </div>
            <h2 className="text-4xl font-black">Payment Authorized</h2>
            <p className="text-gray-500 text-lg max-w-md mx-auto">A detailed order receipt has been sent to your real Gmail/Outlook inbox. Please check it for your records.</p>
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 inline-block">
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] mb-2">Order Reference</p>
               <p className="font-mono text-gray-900 font-black text-xl">{orderId}</p>
            </div>
            <p className="text-xs text-gray-400">Danks lite Limited • Obuasi Municipal</p>
          </div>
        )}
      </div>
    </div>
  );
};
