import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, Check, X, Phone, ShoppingCart, MessageSquare, CheckCircle, Info } from 'lucide-react';
import { PRODUCTS, CATEGORIES, BUSINESS_INFO } from '../data';
import { Product } from '../types';

interface ProductsViewProps {
  initialSelectedProduct: Product | null;
  clearSelectedProduct: () => void;
  onAddInquiry: (inquiry: { name: string; email: string; phone: string; subject: string; message: string; productName?: string }) => void;
}

export default function ProductsView({ initialSelectedProduct, clearSelectedProduct, onAddInquiry }: ProductsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default'); // 'default', 'price-low', 'price-high'
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  
  // Quote form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    customMessage: '',
    deliveryDate: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Open modal if redirected with initial product choice
  useEffect(() => {
    if (initialSelectedProduct) {
      setActiveProduct(initialSelectedProduct);
      setIsQuoteModalOpen(true);
    }
  }, [initialSelectedProduct]);

  const handleCloseModal = () => {
    setIsQuoteModalOpen(false);
    setActiveProduct(null);
    clearSelectedProduct();
    setIsSubmitted(false);
    setFormData({ name: '', email: '', phone: '', customMessage: '', deliveryDate: '' });
    setErrors({});
  };

  const handleRequestQuote = (product: Product) => {
    setActiveProduct(product);
    setIsQuoteModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone is required';
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone.trim())) {
      tempErrors.phone = 'Invalid phone number format';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    onAddInquiry({
      name: formData.name,
      email: formData.email || 'not-provided@sharmafurniture.in',
      phone: formData.phone,
      subject: `Quote Request for ${activeProduct?.name}`,
      message: `Product: ${activeProduct?.name} (₹${activeProduct?.price.toLocaleString('en-IN')})
Customization & Details: ${formData.customMessage || 'None specified'}
Preferred Delivery Date: ${formData.deliveryDate || 'No preference'}`.trim(),
      productName: activeProduct?.name
    });

    setIsSubmitted(true);
    setTimeout(() => {
      handleCloseModal();
    }, 2500);
  };

  // Filter and sort products
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0; // Default
  });

  return (
    <div className="space-y-12 pb-16">
      {/* Page Header */}
      <section className="bg-primary text-white py-12 text-center space-y-4">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Product Catalog</h2>
        <p className="text-secondary/80 max-w-xl mx-auto text-sm sm:text-base">
          Browse our collections of robust solid wood beds, ergonomic office sets, sleek TV consoles, and customized wardrobes.
        </p>
      </section>

      {/* Catalog Search & Filtering Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white border border-secondary/25 p-5 rounded-2xl shadow-xs grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search bar */}
          <div className="md:col-span-6 relative">
            <Search className="w-5 h-5 text-text-muted absolute left-4.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search wood types, beds, wardrobes, executive tables..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-secondary-light/40 border border-secondary/30 rounded-xl py-3 pl-12 pr-4 text-sm text-text-main placeholder-text-muted focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          {/* Sort dropdown */}
          <div className="md:col-span-3 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center text-text-muted pointer-events-none">
              <ArrowUpDown className="w-4 h-4 mr-1.5" />
              <span className="text-xs font-semibold">Sort By:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-secondary-light/40 border border-secondary/30 rounded-xl py-3 pl-20 pr-4 text-xs font-bold text-text-main appearance-none focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            >
              <option value="default">Featured / Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Quick info status */}
          <div className="md:col-span-3 text-right">
            <span className="text-xs font-bold text-text-muted bg-secondary-light px-3.5 py-2.5 rounded-xl inline-block w-full text-center md:text-right">
              Showing {sortedProducts.length} premium products
            </span>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide border transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-primary border-primary text-white shadow-sm'
                  : 'bg-white border-secondary/35 text-text-muted hover:text-primary hover:border-primary/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-secondary/20 shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between">
                <div>
                  <div className="relative overflow-hidden h-64 bg-secondary/10">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-sm">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-text-main group-hover:text-primary transition-colors mb-2">
                      {product.name}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed mb-4">
                      {product.description}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-2 pt-2 border-t border-secondary/10">
                      <h4 className="text-[11px] font-bold text-primary-dark uppercase tracking-wider mb-2">Specifications:</h4>
                      <div className="grid grid-cols-1 gap-1.5">
                        {product.features.map((feat, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-text-muted">
                            <Check className="w-3.5 h-3.5 text-accent shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Card CTA */}
                <div className="p-6 pt-0 mt-auto">
                  <div className="border-t border-secondary/15 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-text-muted uppercase tracking-wider block">Special price</span>
                      <span className="text-2xl font-extrabold text-primary font-mono">₹{product.price.toLocaleString('en-IN')}</span>
                    </div>
                    <button
                      onClick={() => handleRequestQuote(product)}
                      className="bg-primary hover:bg-primary-dark text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-xs hover:shadow-md cursor-pointer"
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-secondary/15 rounded-3xl space-y-4">
            <Info className="w-12 h-12 text-secondary mx-auto" />
            <h3 className="text-xl font-bold text-text-main">No products found</h3>
            <p className="text-text-muted max-w-md mx-auto text-sm">
              We couldn't find any products matching "{searchTerm}" in the category "{selectedCategory}". Please try adjusting your filters.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
            >
              Reset Search & Filters
            </button>
          </div>
        )}
      </section>

      {/* MODAL: Request Quote Form */}
      {isQuoteModalOpen && activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/55 backdrop-blur-xs" onClick={handleCloseModal}></div>
          
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-secondary/15 overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-primary text-white p-6 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-accent tracking-widest block">Sharma Workshop</span>
                <h3 className="text-lg font-bold">Request Quotation & Design Callback</h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {isSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="bg-accent/15 text-accent-dark p-3.5 rounded-full inline-block">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <h4 className="text-xl font-bold text-text-main">Quote Request Submitted!</h4>
                  <p className="text-text-muted text-sm max-w-xs mx-auto">
                    We have successfully logged your inquiry for <strong>{activeProduct.name}</strong>. Rajesh Sharma or a staff member will contact you on WhatsApp/Phone shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Selected product reference card */}
                  <div className="bg-secondary-light/40 border border-secondary/25 p-3.5 rounded-xl flex gap-3.5 items-center">
                    <img
                      src={activeProduct.imageUrl}
                      alt={activeProduct.name}
                      className="w-14 h-14 rounded-lg object-cover border border-secondary/20"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-text-main">{activeProduct.name}</h4>
                      <p className="text-xs text-primary font-bold font-mono">Catalog Price: ₹{activeProduct.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-text-muted mb-1 uppercase tracking-wider">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Ramesh Kumar"
                        className={`w-full bg-secondary-light/30 border ${errors.name ? 'border-red-500' : 'border-secondary/30'} rounded-lg p-2.5 text-sm text-text-main focus:outline-hidden focus:border-primary`}
                      />
                      {errors.name && <p className="text-red-500 text-[10px] mt-0.5">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-muted mb-1 uppercase tracking-wider">Phone / WhatsApp *</label>
                      <input
                        type="text"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +91 9876543210"
                        className={`w-full bg-secondary-light/30 border ${errors.phone ? 'border-red-500' : 'border-secondary/30'} rounded-lg p-2.5 text-sm text-text-main focus:outline-hidden focus:border-primary`}
                      />
                      {errors.phone && <p className="text-red-500 text-[10px] mt-0.5">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-muted mb-1 uppercase tracking-wider">Email (Optional)</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. customer@gmail.com"
                      className="w-full bg-secondary-light/30 border border-secondary/30 rounded-lg p-2.5 text-sm text-text-main focus:outline-hidden focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-text-muted mb-1 uppercase tracking-wider">Preferred Delivery / Finish Requirements</label>
                      <textarea
                        name="customMessage"
                        rows={2}
                        value={formData.customMessage}
                        onChange={handleInputChange}
                        placeholder="State any requirements (e.g., custom matte finish, hydraulic lift, Sheesham wood polish shade, size changes)"
                        className="w-full bg-secondary-light/30 border border-secondary/30 rounded-lg p-2.5 text-sm text-text-main focus:outline-hidden focus:border-primary resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-muted mb-1 uppercase tracking-wider">Preferred Completion / Delivery Date (Optional)</label>
                    <input
                      type="date"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleInputChange}
                      className="w-full bg-secondary-light/30 border border-secondary/30 rounded-lg p-2.5 text-sm text-text-main focus:outline-hidden focus:border-primary"
                    />
                  </div>

                  <div className="pt-2 flex gap-3 justify-end">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="bg-secondary-light text-text-main font-semibold px-4 py-2.5 rounded-xl text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-accent text-primary font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-accent-dark transition-colors"
                    >
                      Submit Quote Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
