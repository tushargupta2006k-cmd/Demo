import React from 'react';
import { Hammer, Phone, Mail, MapPin, Clock, ArrowUp, Send, Heart } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

interface FooterProps {
  setView: (view: string) => void;
}

export default function Footer({ setView }: FooterProps) {
  const handleLinkClick = (id: string) => {
    setView(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary-dark text-white border-t border-accent/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
        
        {/* Column 1: Brand & Bio */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-accent text-primary p-2 rounded-lg">
              <Hammer className="w-5 h-5" />
            </div>
            <span className="font-sans font-bold text-lg tracking-tight">Sharma Furniture</span>
          </div>
          <p className="text-xs text-secondary/80 leading-relaxed">
            Sharma Furniture House is a family-owned woodwork and carpentry enterprise established in 2015 under Rajesh Sharma. Delivering durable solid wood, modern modular designs, and ergonomic office configurations.
          </p>
          <div className="text-[10px] text-accent font-bold uppercase tracking-widest pt-1">
            EST. 2015 • Sirsa, Haryana
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="space-y-4">
          <h4 className="font-bold text-sm uppercase tracking-wider text-accent">Quick Navigation</h4>
          <ul className="space-y-2.5 text-xs text-secondary/80">
            <li>
              <button onClick={() => handleLinkClick('home')} className="hover:text-accent transition-colors cursor-pointer text-left focus:outline-hidden">
                Home Showcase
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('services')} className="hover:text-accent transition-colors cursor-pointer text-left focus:outline-hidden">
                Our Core Services
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('products')} className="hover:text-accent transition-colors cursor-pointer text-left focus:outline-hidden">
                Product Catalog & Quotes
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('custom-builder')} className="hover:text-accent transition-colors cursor-pointer text-left focus:outline-hidden">
                Custom Estimator Tool
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('about')} className="hover:text-accent transition-colors cursor-pointer text-left focus:outline-hidden">
                About Owner & Workshop
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('contact')} className="hover:text-accent transition-colors cursor-pointer text-left focus:outline-hidden">
                FAQs & Contact Desk
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Contacts */}
        <div className="space-y-4">
          <h4 className="font-bold text-sm uppercase tracking-wider text-accent">Get in Touch</h4>
          <ul className="space-y-3 text-xs text-secondary/80">
            <li className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Call / WhatsApp:</p>
                <p>{BUSINESS_INFO.phone}</p>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Email Address:</p>
                <p className="break-all">{BUSINESS_INFO.email}</p>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Showroom Location:</p>
                <p>{BUSINESS_INFO.address.landmark}, {BUSINESS_INFO.address.market}, Sirsa, Haryana - 125055</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Column 4: Quick Schedule & Guarantee */}
        <div className="space-y-4">
          <h4 className="font-bold text-sm uppercase tracking-wider text-accent">Workshop Operations</h4>
          <ul className="space-y-2.5 text-xs text-secondary/80">
            <li className="flex justify-between items-center">
              <span>Mon – Sat:</span>
              <span className="font-mono text-white">9:00 AM – 8:00 PM</span>
            </li>
            <li className="flex justify-between items-center text-accent/90">
              <span>Sunday:</span>
              <span className="font-mono text-white">10:00 AM – 5:00 PM</span>
            </li>
            <li className="border-t border-white/10 pt-3 text-[11px] leading-relaxed text-secondary/70">
              💡 <strong>Free delivery</strong> within 25 km of Sirsa. Full structural warranty of 5 Years included on premium timber.
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-secondary/60">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-center sm:text-left">
          <span>© {new Date().getFullYear()} Sharma Furniture House. All rights reserved.</span>
          <span className="hidden sm:inline-block h-3 w-px bg-white/10"></span>
          <span>Crafting Homes Since 2015 in Sirsa, Haryana.</span>
        </div>
        <div className="flex items-center gap-4.5">
          <button 
            onClick={handleScrollTop}
            className="bg-white/5 hover:bg-white/10 text-white p-2.5 rounded-lg border border-white/10 transition-colors flex items-center gap-1 cursor-pointer focus:outline-hidden"
          >
            <span>Top</span> <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
