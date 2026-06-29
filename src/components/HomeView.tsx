import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Check, Award, Flame, Users, CheckCircle2, Hammer, Compass, Briefcase, LayoutGrid, Quote } from 'lucide-react';
import { BUSINESS_INFO, PRODUCTS, REVIEWS, SERVICES } from '../data';

interface HomeViewProps {
  setView: (view: string) => void;
  setSelectedProduct: (product: any) => void;
}

export default function HomeView({ setView, setSelectedProduct }: HomeViewProps) {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // Auto-scroll testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleProductInquire = (product: any) => {
    setSelectedProduct(product);
    setView('products');
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Hammer': return <Hammer className="w-8 h-8 text-accent" />;
      case 'Briefcase': return <Briefcase className="w-8 h-8 text-accent" />;
      case 'LayoutGrid': return <LayoutGrid className="w-8 h-8 text-accent" />;
      case 'Compass': return <Compass className="w-8 h-8 text-accent" />;
      default: return <Hammer className="w-8 h-8 text-accent" />;
    }
  };

  return (
    <div className="space-y-20 pb-16">
      {/* SECTION 1: HERO BANNER */}
      <section className="relative overflow-hidden bg-primary text-white py-24 lg:py-32">
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary/90 to-transparent z-10"></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/20 text-accent font-semibold text-xs uppercase tracking-widest border border-accent/30"
            >
              <Award className="w-3.5 h-3.5" /> Established in 2015
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
            >
              Sharma Furniture House
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-secondary max-w-2xl font-light"
            >
              {BUSINESS_INFO.tagline}. Specializing in premium wooden furniture, custom modular kitchens, bespoke office workspaces, and solid Sheesham/Teak pieces designed to last.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button 
                onClick={() => setView('products')}
                className="bg-accent hover:bg-accent-dark text-primary font-bold px-8 py-3.5 rounded-xl text-base tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                Explore Catalog <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setView('custom-builder')}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl text-base tracking-wide border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                Custom Design Tool
              </button>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden group"
            >
              <img 
                src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80" 
                alt="Premium Bedroom Collection" 
                className="rounded-xl w-full h-[380px] object-cover transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-primary-dark/90 backdrop-blur-xs p-5 rounded-xl border border-white/10">
                <span className="text-accent text-xs font-bold uppercase tracking-widest">Featured Range</span>
                <h3 className="text-white font-bold text-lg mt-1">Premium Wooden Beds & Wardrobes</h3>
                <p className="text-secondary/80 text-sm mt-1">Custom crafted under Rajesh Sharma's supervision.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT US OVERVIEW & STATISTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block bg-primary-ultra-light text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Our Journey
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-main">
              18+ Years of Craftsmanship & Trust
            </h2>
            <p className="text-text-muted leading-relaxed">
              Founded in 2015 by master craftsman <strong>Rajesh Sharma</strong>, Sharma Furniture House has grown from a humble workshop to Sirsa's premier furniture destination. 
            </p>
            <p className="text-text-muted leading-relaxed">
              We focus on absolute structural durability, premium finish, and modern designs. Every piece of wood is seasoned, treated for termites, and carved by our expert craftsmen to make sure your investment stands the test of time.
            </p>
            <div className="pt-4">
              <button 
                onClick={() => setView('about')}
                className="text-primary hover:text-primary-dark font-bold inline-flex items-center gap-2 group border-b-2 border-primary/25 hover:border-primary pb-1 transition-all"
              >
                Learn More About Us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-6">
            {BUSINESS_INFO.stats.map((stat, i) => (
              <div key={i} className="bg-white border border-secondary/25 p-8 rounded-2xl shadow-xs hover:shadow-md transition-all text-center space-y-2">
                <div className="text-4xl sm:text-5xl font-bold text-primary font-mono">{stat.value}</div>
                <div className="text-sm font-semibold text-text-muted uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: SERVICES */}
      <section className="bg-secondary-light/40 py-20 border-y border-secondary/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-primary text-xs font-bold uppercase tracking-widest bg-primary-ultra-light px-3.5 py-1.5 rounded-full">Our Core Offerings</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-main">What We Excel At</h2>
            <p className="text-text-muted">From heavy-duty solid wood furniture to state-of-the-art modular setups, we bring your vision to life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service) => (
              <div key={service.id} className="bg-white border border-secondary/20 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="bg-primary/90 text-accent p-3.5 rounded-xl inline-block mb-5">
                    {getServiceIcon(service.icon)}
                  </div>
                  <h3 className="font-bold text-lg text-text-main mb-2">{service.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-4">{service.description}</p>
                </div>
                <div className="border-t border-secondary/10 pt-4 mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {service.items.map((item, idx) => (
                      <span key={idx} className="bg-secondary-light text-primary-dark font-medium text-[11px] px-2 py-1 rounded-md">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => setView('services')}
              className="bg-primary hover:bg-primary-dark text-white font-bold px-7 py-3 rounded-xl text-sm transition-all"
            >
              Detailed Services Overview
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="space-y-3">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Handcrafted Masterpieces</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-main">Featured Collections</h2>
            <p className="text-text-muted max-w-xl">A glimpse into our premium range of highly popular products made with solid wood & modular aesthetics.</p>
          </div>
          <button 
            onClick={() => setView('products')}
            className="text-primary hover:text-primary-dark font-bold inline-flex items-center gap-1.5 border-b-2 border-primary/25 hover:border-primary pb-0.5 transition-all"
          >
            View Entire Catalog <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.slice(0, 3).map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-secondary/20 shadow-xs hover:shadow-lg transition-all group flex flex-col">
              <div className="relative overflow-hidden h-64 bg-secondary/10">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-sm">
                  {product.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-bold text-xl text-text-main group-hover:text-primary transition-colors mb-2">
                    {product.name}
                  </h3>
                  <p className="text-text-muted text-sm line-clamp-2 mb-4">
                    {product.description}
                  </p>
                  
                  {/* Features list */}
                  <div className="space-y-1.5 mb-6">
                    {product.features.slice(0, 3).map((feat, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-text-muted">
                        <Check className="w-3.5 h-3.5 text-accent" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-secondary/15 pt-4 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[11px] text-text-muted uppercase tracking-wider block">Special Price</span>
                    <span className="text-2xl font-extrabold text-primary font-mono">₹{product.price.toLocaleString('en-IN')}</span>
                  </div>
                  <button 
                    onClick={() => handleProductInquire(product)}
                    className="bg-primary hover:bg-primary-dark text-white font-semibold px-4.5 py-2.5 rounded-lg text-sm transition-all shadow-xs"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: WHY CHOOSE US */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-accent text-xs font-bold uppercase tracking-widest">Our Promise</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Why Sharma Furniture House?</h2>
            <p className="text-secondary/80">Every piece of furniture we sell is constructed according to the highest industry standards of quality and customer care.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BUSINESS_INFO.whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/15 p-6 rounded-xl hover:bg-white/10 transition-all">
                <div className="bg-accent/15 text-accent p-2 rounded-lg inline-block mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-white mb-2">{item.title}</h3>
                <p className="text-secondary/70 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: TESTIMONIALS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center">
        <div className="space-y-3">
          <span className="text-primary text-xs font-bold uppercase tracking-widest bg-primary-ultra-light px-3 py-1 rounded-full">Client Love</span>
          <h2 className="text-3xl font-bold tracking-tight text-text-main">What Customers Are Saying</h2>
        </div>

        <div className="relative bg-white border border-secondary/20 p-10 sm:p-14 rounded-3xl shadow-xs">
          <Quote className="w-12 h-12 text-secondary/35 absolute top-6 left-6" />
          
          <div className="space-y-6">
            <p className="text-xl text-text-main italic font-light leading-relaxed">
              "{REVIEWS[activeReviewIndex].comment}"
            </p>
            
            <div className="flex justify-center gap-1">
              {[...Array(REVIEWS[activeReviewIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>

            <div>
              <h4 className="font-bold text-lg text-text-main">{REVIEWS[activeReviewIndex].name}</h4>
              <p className="text-xs text-text-muted font-medium uppercase tracking-wider">{REVIEWS[activeReviewIndex].city}, Haryana</p>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveReviewIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === activeReviewIndex ? 'bg-primary w-6' : 'bg-secondary'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: QUICK INFO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-accent/15 border border-accent/20 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl font-bold text-primary-dark">Want custom furniture for your space?</h3>
            <p className="text-text-muted max-w-xl">Calculate estimated material, sizing, polish costs and request an exact quote in seconds using our interactive helper tool.</p>
          </div>
          <button
            onClick={() => setView('custom-builder')}
            className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3.5 rounded-xl tracking-wide shadow-md transition-all shrink-0"
          >
            Open Interactive Builder
          </button>
        </div>
      </section>
    </div>
  );
}
