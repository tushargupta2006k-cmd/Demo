import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomeView from './components/HomeView';
import ServicesView from './components/ServicesView';
import ProductsView from './components/ProductsView';
import CustomBuilderView from './components/CustomBuilderView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import Footer from './components/Footer';
import { ContactInquiry, CustomFurnitureRequest, Product } from './types';

export default function App() {
  const [view, setView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Persistence state
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [customRequests, setCustomRequests] = useState<CustomFurnitureRequest[]>([]);

  // Load from local storage
  useEffect(() => {
    try {
      const storedInq = localStorage.getItem('sharma_inquiries');
      const storedCust = localStorage.getItem('sharma_custom_requests');
      if (storedInq) setInquiries(JSON.parse(storedInq));
      if (storedCust) setCustomRequests(JSON.parse(storedCust));
    } catch (e) {
      console.error('Error loading data from localStorage', e);
    }
  }, []);

  const handleAddInquiry = (newInq: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    productName?: string;
  }) => {
    const inquiryRecord: ContactInquiry = {
      id: `inq-${Date.now()}`,
      name: newInq.name,
      email: newInq.email,
      phone: newInq.phone,
      subject: newInq.subject,
      message: newInq.message,
      productName: newInq.productName,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updated = [inquiryRecord, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('sharma_inquiries', JSON.stringify(updated));
  };

  const handleAddCustomRequest = (newReq: {
    name: string;
    email: string;
    phone: string;
    furnitureType: string;
    woodType: string;
    dimensions: string;
    budget: string;
    requirements: string;
  }) => {
    const customRecord: CustomFurnitureRequest = {
      id: `cust-${Date.now()}`,
      name: newReq.name,
      email: newReq.email,
      phone: newReq.phone,
      furnitureType: newReq.furnitureType,
      woodType: newReq.woodType,
      dimensions: newReq.dimensions,
      budget: newReq.budget,
      requirements: newReq.requirements,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updated = [customRecord, ...customRequests];
    setCustomRequests(updated);
    localStorage.setItem('sharma_custom_requests', JSON.stringify(updated));
  };

  // Helper function to render active page
  const renderActiveView = () => {
    switch (view) {
      case 'home':
        return <HomeView setView={setView} setSelectedProduct={setSelectedProduct} />;
      case 'services':
        return <ServicesView setView={setView} />;
      case 'products':
        return (
          <ProductsView
            initialSelectedProduct={selectedProduct}
            clearSelectedProduct={() => setSelectedProduct(null)}
            onAddInquiry={handleAddInquiry}
          />
        );
      case 'custom-builder':
        return <CustomBuilderView onAddCustomRequest={handleAddCustomRequest} />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return (
          <ContactView
            inquiries={inquiries}
            customRequests={customRequests}
            onAddInquiry={handleAddInquiry}
          />
        );
      default:
        return <HomeView setView={setView} setSelectedProduct={setSelectedProduct} />;
    }
  };

  const totalInquiryCount = inquiries.length + customRequests.length;

  return (
    <div className="flex flex-col min-h-screen bg-bg-base font-sans antialiased text-text-main selection:bg-accent/30 selection:text-primary">
      {/* Dynamic Header */}
      <Header currentView={view} setView={setView} inquiryCount={totalInquiryCount} />

      {/* Main Container */}
      <main className="flex-grow">
        {renderActiveView()}
      </main>

      {/* Dynamic Footer */}
      <Footer setView={setView} />
    </div>
  );
}
