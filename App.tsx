
import React, { useState, useMemo, useEffect } from 'react';
import { AppState, Brand, Product, User, Currency, EmailMessage } from './types';
import { PRODUCTS, CURRENCY_CONFIG, MOJOAUTH_API_KEY } from './constants';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import Inbox from './components/Inbox';
import { CartModal, AuthModal, CheckoutModal } from './components/Modals';
import { getProductRecommendation } from './services/gemini';
import { generateOrderEmail } from './services/email';

const STORAGE_KEY = 'dankslite_app_state_v3';

const App: React.FC = () => {
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          isCartOpen: false,
          isAuthOpen: false,
          isCheckoutOpen: false,
          searchQuery: '',
        };
      } catch (e) {
        console.error("Error loading state", e);
      }
    }
    return {
      cart: [],
      user: null,
      selectedBrand: 'All',
      searchQuery: '',
      isCartOpen: false,
      isAuthOpen: false,
      isCheckoutOpen: false,
      currency: 'GHS',
      inbox: [],
    };
  });

  const [aiTip, setAiTip] = useState<string | null>(null);

  // Handle MojoAuth OIDC callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const stateId = urlParams.get('state_id');

    if (stateId && (window as any).MojoAuth) {
      const mojoInstance = new (window as any).MojoAuth(MOJOAUTH_API_KEY);
      mojoInstance.signInWithStateID(stateId).then((response: any) => {
        if (response && response.authenticated && response.user) {
          const userEmail = response.user.email || response.user.identifier || "customer@dankslite.com";
          const userObj: User = {
            id: `usr_${Date.now()}`,
            name: response.user.name || userEmail.split('@')[0],
            email: userEmail,
            picture: response.user.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail}`,
            lastLogin: new Date().toISOString()
          };
          
          setState(prev => ({ ...prev, user: userObj }));
          
          // Clear URL parameter without refreshing
          window.history.replaceState({}, document.title, window.location.origin + window.location.pathname);
          
          // Welcome notification
          addEmailToInbox({
            subject: 'Account Verified: Welcome to Danks lite',
            body: `<p>Hello ${userObj.name}, your account is now secured with passwordless biometric-grade authentication. Start exploring our premium collection.</p>`,
            type: 'AUTH'
          });
        }
      }).catch((err: any) => {
        console.error("MojoAuth OIDC Exchange Error:", err);
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      cart: state.cart,
      user: state.user,
      selectedBrand: state.selectedBrand,
      currency: state.currency,
      inbox: state.inbox
    }));
  }, [state.cart, state.user, state.selectedBrand, state.currency, state.inbox]);

  const addEmailToInbox = (emailPart: Partial<EmailMessage>) => {
    const newMsg: EmailMessage = {
      id: `msg_${Date.now()}`,
      subject: emailPart.subject || 'New Message',
      body: emailPart.body || '',
      timestamp: new Date().toISOString(),
      read: false,
      type: emailPart.type || 'AUTH',
      otp: emailPart.otp
    };
    setState(prev => ({ ...prev, inbox: [...prev.inbox, newMsg] }));
    try { new Audio('https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3').play(); } catch(e){}
  };

  const handleOrderSuccess = async (email: string, items: any[], total: number, curr: Currency, orderId: string) => {
    const emailData = await generateOrderEmail(email, items, total, curr, orderId);
    addEmailToInbox(emailData);
    setState(prev => ({ ...prev, cart: [] }));
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const brandMatch = state.selectedBrand === 'All' || p.brand === state.selectedBrand;
      const searchMatch = p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
                          p.brand.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(state.searchQuery.toLowerCase());
      return brandMatch && searchMatch;
    });
  }, [state.selectedBrand, state.searchQuery]);

  useEffect(() => {
    if (state.searchQuery.length > 3) {
      const timer = setTimeout(async () => {
        const tip = await getProductRecommendation(state.searchQuery, state.user);
        setAiTip(tip);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setAiTip(null);
    }
  }, [state.searchQuery, state.user]);

  const unreadCount = state.inbox.filter(m => !m.read).length;

  return (
    <div className="min-h-screen flex flex-col selection:bg-violet-100 selection:text-violet-900 bg-gray-50/30">
      <Navbar 
        user={state.user}
        cartCount={state.cart.reduce((acc, item) => acc + item.quantity, 0)}
        selectedBrand={state.selectedBrand}
        currency={state.currency}
        onCurrencyChange={(curr) => setState(prev => ({ ...prev, currency: curr }))}
        onBrandSelect={(brand) => setState(prev => ({ ...prev, selectedBrand: brand }))}
        onSearch={(q) => setState(prev => ({ ...prev, searchQuery: q }))}
        onCartClick={() => setState(prev => ({ ...prev, isCartOpen: true }))}
        onAuthClick={() => setState(prev => ({ ...prev, isAuthOpen: true }))}
      />

      <button 
        onClick={() => setIsInboxOpen(true)}
        className="fixed bottom-8 right-8 z-[150] bg-white border border-gray-100 p-5 rounded-[2rem] shadow-2xl hover:scale-110 transition-all group flex items-center space-x-3 active:scale-95"
      >
        <div className="relative">
          <i className="fa-solid fa-envelope text-2xl text-violet-600"></i>
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full ring-4 ring-white">
              {unreadCount}
            </span>
          )}
        </div>
        <span className="text-sm font-black text-gray-900 group-hover:text-violet-600 hidden md:block">Receipts & Alerts</span>
      </button>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {aiTip && (
          <div className="mb-8 bg-white border border-violet-100 p-5 rounded-[2rem] flex items-center animate-fade-in shadow-xl shadow-violet-50/50">
            <div className="bg-violet-600 p-2.5 rounded-2xl mr-5 shadow-lg shadow-violet-200">
              <i className="fa-solid fa-wand-magic-sparkles text-white text-sm"></i>
            </div>
            <div>
              <p className="text-[10px] font-black text-violet-600 uppercase tracking-[0.2em] mb-1">Danks lite Assistant</p>
              <p className="text-gray-700 text-sm leading-relaxed font-medium">"{aiTip}"</p>
            </div>
          </div>
        )}

        {state.selectedBrand === 'All' && state.searchQuery === '' && (
          <div className="mb-12 relative h-64 md:h-[500px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden group shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&h=900&auto=format&fit=crop" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 brightness-[0.85]" 
              alt="Premium Electronics"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-20">
              <div className="max-w-2xl">
                <span className="inline-block bg-violet-600 text-white font-black text-[10px] tracking-[0.3em] uppercase mb-6 px-4 py-1.5 rounded-full shadow-lg">
                  MojoAuth™ Powered Store
                </span>
                <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-[0.9] tracking-tighter">
                  Experience <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-amber-300">Modernity.</span>
                </h1>
                <p className="text-gray-200 mb-10 text-lg max-w-md hidden md:block font-medium opacity-90">
                  Secure passwordless access to the finest devices from Samsung, Google, and Microsoft. Authorized Obuasi branch.
                </p>
                <div className="flex space-x-4">
                   <button 
                     onClick={() => setState(prev => ({ ...prev, selectedBrand: 'Samsung' }))}
                     className="bg-white text-black px-10 py-5 rounded-[1.5rem] font-black hover:bg-violet-600 hover:text-white transition-all transform active:scale-95 shadow-xl shadow-black/20"
                    >
                    Explore Samsung
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              {state.selectedBrand === 'All' ? 'Latest Releases' : `${state.selectedBrand} Gear`}
            </h2>
            <div className="flex items-center space-x-2 mt-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Authorized Stock</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              currency={state.currency}
              onAddToCart={(p) => setState(prev => {
                const existing = prev.cart.find(i => i.id === p.id);
                if (existing) {
                  return { ...prev, cart: prev.cart.map(i => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i) };
                }
                return { ...prev, cart: [...prev.cart, { ...p, quantity: 1 }], isCartOpen: true };
              })}
            />
          ))}
        </div>
      </main>

      <Footer />

      <Inbox 
        messages={state.inbox}
        isOpen={isInboxOpen}
        onClose={() => setIsInboxOpen(false)}
        onMarkRead={(id) => setState(prev => ({
          ...prev,
          inbox: prev.inbox.map(m => m.id === id ? { ...m, read: true } : m)
        }))}
      />

      <CartModal 
        isOpen={state.isCartOpen} 
        currency={state.currency}
        onClose={() => setState(prev => ({ ...prev, isCartOpen: false }))}
        items={state.cart}
        onRemove={(id) => setState(prev => ({ ...prev, cart: prev.cart.filter(i => i.id !== id) }))}
        onUpdateQty={(id, delta) => setState(prev => ({
          ...prev,
          cart: prev.cart.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i)
        }))}
        onCheckout={() => setState(prev => ({ ...prev, isCartOpen: false, isCheckoutOpen: true }))}
      />

      <AuthModal 
        isOpen={state.isAuthOpen}
        onClose={() => setState(prev => ({ ...prev, isAuthOpen: false }))}
        onLogin={(user) => setState(prev => ({ ...prev, user }))}
      />

      <CheckoutModal 
        isOpen={state.isCheckoutOpen}
        currency={state.currency}
        user={state.user}
        onClose={() => setState(prev => ({ ...prev, isCheckoutOpen: false }))}
        items={state.cart}
        onSuccess={handleOrderSuccess}
      />
    </div>
  );
};

export default App;
