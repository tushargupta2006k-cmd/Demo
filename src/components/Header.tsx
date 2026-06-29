import React, { useState } from 'react';
import { Menu, X, Phone, Hammer, MessageSquare } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

interface HeaderProps {
  currentView: string;
  setView: (view: string) => void;
  inquiryCount: number;
}

export default function Header({ currentView, setView, inquiryCount }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Products', id: 'products' },
    { name: 'Custom Builder', id: 'custom-builder' },
    { name: 'About Us', id: 'about' },
    { name: 'FAQ & Support', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setView(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-secondary/30 shadow-xs">
      {/* Top micro-bar */}
      <div className="bg-primary text-white text-xs py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-accent" /> {BUSINESS_INFO.phone}
            </span>
            <span className="hidden md:inline-block h-3 w-px bg-white/20"></span>
            <span className="hidden md:inline-block text-white/90">
              Free Delivery within 25 km of Sirsa!
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/80">Est. 2015</span>
            <span className="h-3 w-px bg-white/20"></span>
            <span className="text-accent font-semibold flex items-center gap-1">
              ★ {BUSINESS_INFO.experience} Experience
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo / Brand Name */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-hidden"
          >
            <div className="bg-primary hover:bg-primary-dark text-accent p-2.5 rounded-xl shadow-xs transition-colors">
              <Hammer className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-sans font-bold text-xl tracking-tight text-text-main group-hover:text-primary transition-colors">
                Sharma Furniture
              </h1>
              <p className="text-[10px] font-medium uppercase tracking-widest text-accent-dark">
                Sirsa, Haryana
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-text-muted hover:text-primary hover:bg-secondary/10'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons & Counters */}
          <div className="hidden lg:flex items-center gap-3">
            {inquiryCount > 0 && (
              <button
                onClick={() => handleNavClick('contact')}
                className="relative p-2 text-text-muted hover:text-primary transition-colors focus:outline-hidden"
                title="My Inquiries"
              >
                <MessageSquare className="w-5.5 h-5.5" />
                <span className="absolute -top-1 -right-1 bg-accent text-primary font-bold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                  {inquiryCount}
                </span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('custom-builder')}
              className="bg-accent hover:bg-accent-dark text-primary font-semibold px-5 py-2.5 rounded-lg text-sm tracking-wide transition-all shadow-xs hover:shadow-md cursor-pointer"
            >
              Custom Furniture Design
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-4 lg:hidden">
            {inquiryCount > 0 && (
              <button
                onClick={() => handleNavClick('contact')}
                className="relative p-2 text-text-muted hover:text-primary transition-colors"
              >
                <MessageSquare className="w-5.5 h-5.5" />
                <span className="absolute -top-1 -right-1 bg-accent text-primary font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {inquiryCount}
                </span>
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-text-muted hover:text-primary hover:bg-secondary/15 transition-colors focus:outline-hidden"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-secondary/20">
          <div className="flex items-center gap-2">
            <Hammer className="w-5 h-5 text-primary" />
            <span className="font-sans font-bold text-lg text-text-main">Menu</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg hover:bg-secondary/20 text-text-muted transition-colors focus:outline-hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-1.5 h-[calc(100%-120px)] overflow-y-auto">
          {navigation.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-text-muted hover:text-primary hover:bg-secondary/10'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        <div className="p-5 border-t border-secondary/20 absolute bottom-0 left-0 right-0 bg-secondary-light/40">
          <button
            onClick={() => handleNavClick('custom-builder')}
            className="w-full text-center bg-accent hover:bg-accent-dark text-primary font-bold py-3 rounded-xl text-sm transition-all shadow-xs"
          >
            Custom Furniture Design
          </button>
        </div>
      </div>
    </header>
  );
}
