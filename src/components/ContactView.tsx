import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, ChevronDown, ChevronUp, History, Info, Sparkles, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO, FAQS } from '../data';
import { ContactInquiry, CustomFurnitureRequest } from '../types';

interface ContactViewProps {
  inquiries: ContactInquiry[];
  customRequests: CustomFurnitureRequest[];
  onAddInquiry: (inquiry: { name: string; email: string; phone: string; subject: string; message: string }) => void;
}

export default function ContactView({ inquiries, customRequests, onAddInquiry }: ContactViewProps) {
  // Collapsible FAQ state
  const [openFaqId, setOpenFaqId] = useState<string | null>('f1');
  
  // Contact Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleToggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors: Record<string, string> = {};

    if (!name.trim()) tempErrors.name = 'Your name is required';
    if (!phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{10,15}$/.test(phone.trim())) {
      tempErrors.phone = 'Invalid phone format';
    }
    if (!message.trim()) tempErrors.message = 'Message is required';

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    onAddInquiry({ name, email: email || 'general-contact@sharmafurniture.in', phone, subject, message });
    setIsSent(true);

    // Reset Form
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setSubject('General Inquiry');
    setErrors({});

    setTimeout(() => {
      setIsSent(false);
    }, 4000);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Header */}
      <section className="bg-primary text-white py-12 text-center space-y-4">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Contact Us & Support</h2>
        <p className="text-secondary/80 max-w-xl mx-auto text-sm sm:text-base">
          Get in touch with Rajesh Sharma, browse our frequently asked questions, or check the status of your submitted custom design designs.
        </p>
      </section>

      {/* Main Grid: Info + Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Contact Info details (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <span className="text-accent-dark text-xs font-bold uppercase tracking-widest block">Direct Contact Lines</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-text-main">Reach Out Instantly</h3>
            <p className="text-text-muted text-sm sm:text-base">
              Call, WhatsApp, email, or visit our Sirsa showroom directly. Our customer support desk is ready to assist you.
            </p>
          </div>

          <div className="space-y-4">
            {/* Phone */}
            <div className="bg-white border border-secondary/20 p-5 rounded-2xl flex items-center gap-4 shadow-xs">
              <div className="bg-primary/10 text-primary p-3 rounded-xl">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wide block">Call or WhatsApp</span>
                <span className="font-bold text-text-main text-base">{BUSINESS_INFO.phone}</span>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white border border-secondary/20 p-5 rounded-2xl flex items-center gap-4 shadow-xs">
              <div className="bg-primary/10 text-primary p-3 rounded-xl">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wide block">Email Address</span>
                <span className="font-bold text-text-main text-base">{BUSINESS_INFO.email}</span>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white border border-secondary/20 p-5 rounded-2xl flex items-center gap-4 shadow-xs">
              <div className="bg-primary/10 text-primary p-3 rounded-xl">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wide block">Showroom Address</span>
                <span className="font-bold text-text-main text-sm">
                  {BUSINESS_INFO.address.landmark}, {BUSINESS_INFO.address.market}, {BUSINESS_INFO.address.city}, Haryana
                </span>
              </div>
            </div>
          </div>

          {/* Social Media Shortcuts */}
          <div className="bg-primary-ultra-light border border-secondary/15 p-6 rounded-2xl space-y-3">
            <h4 className="font-bold text-sm text-primary-dark">Social Media Presence</h4>
            <p className="text-text-muted text-xs leading-relaxed">
              Follow Sharma Furniture House on Facebook, Instagram, or YouTube to browse our completed home interiors and daily customer deliveries.
            </p>
            <div className="flex gap-3 pt-1">
              <a href={BUSINESS_INFO.socials.facebook} target="_blank" rel="noreferrer" className="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">Facebook</a>
              <a href={BUSINESS_INFO.socials.instagram} target="_blank" rel="noreferrer" className="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">Instagram</a>
              <a href={BUSINESS_INFO.socials.youtube} target="_blank" rel="noreferrer" className="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">YouTube</a>
            </div>
          </div>
        </div>

        {/* Right: Beautiful Contact Form (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-white border border-secondary/25 p-6 sm:p-8 rounded-3xl shadow-xs space-y-6">
          <div className="space-y-1.5">
            <h3 className="text-2xl font-bold text-text-main">Send an Electronic Query</h3>
            <p className="text-text-muted text-xs sm:text-sm">Have specific carpentry or finish questions? Submit this form and we'll reply shortly.</p>
          </div>

          {isSent ? (
            <div className="bg-accent/10 border border-accent/25 p-8 rounded-2xl text-center space-y-4 animate-in fade-in zoom-in duration-200">
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto animate-bounce" />
              <h4 className="text-lg font-bold text-primary-dark">Inquiry Sent Successfully!</h4>
              <p className="text-sm text-text-muted max-w-sm mx-auto leading-relaxed">
                Thank you! We have logged your general inquiry. Rajesh Sharma or our Sirsa front office will give you a call or WhatsApp callback within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-muted mb-1 uppercase tracking-wider">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                    }}
                    placeholder="e.g. Satish Goyal"
                    className={`w-full bg-secondary-light/35 border ${errors.name ? 'border-red-500' : 'border-secondary/35'} rounded-lg p-3 text-xs text-text-main focus:outline-hidden focus:border-primary`}
                  />
                  {errors.name && <p className="text-red-500 text-[10px] mt-0.5">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-muted mb-1 uppercase tracking-wider">Phone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                    }}
                    placeholder="e.g. +91 9876543210"
                    className={`w-full bg-secondary-light/35 border ${errors.phone ? 'border-red-500' : 'border-secondary/35'} rounded-lg p-3 text-xs text-text-main focus:outline-hidden focus:border-primary`}
                  />
                  {errors.phone && <p className="text-red-500 text-[10px] mt-0.5">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-muted mb-1 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. satish@gmail.com"
                    className="w-full bg-secondary-light/35 border border-secondary/35 rounded-lg p-3 text-xs text-text-main focus:outline-hidden focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-muted mb-1 uppercase tracking-wider">Inquiry Topic</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-secondary-light/35 border border-secondary/35 rounded-lg p-3 text-xs font-bold text-text-main focus:outline-hidden focus:border-primary"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Modular Kitchen Design">Modular Kitchen Design</option>
                    <option value="Custom Bedroom Set">Custom Bedroom Set</option>
                    <option value="Office Bulk Order">Office Bulk Order</option>
                    <option value="Warranty Care Support">Warranty / Post-Sales Support</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-muted mb-1 uppercase tracking-wider">Describe Your Requirements *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
                  }}
                  placeholder="Detail what you need (e.g. modular kitchen size, custom wardrobe design, wooden beds specs, delivery options)"
                  className={`w-full bg-secondary-light/35 border ${errors.message ? 'border-red-500' : 'border-secondary/35'} rounded-lg p-3 text-xs text-text-main focus:outline-hidden focus:border-primary resize-none`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-[10px] mt-0.5">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white font-bold px-7 py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm hover:shadow-md"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* COLLAPSIBLE FAQS SECTION */}
      <section className="bg-secondary-light/40 border-y border-secondary/15 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-primary text-xs font-bold uppercase tracking-widest bg-primary-ultra-light px-3 py-1 rounded-full">Got Questions?</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-text-main">Frequently Answered Queries</h3>
          </div>

          <div className="space-y-4.5">
            {FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="bg-white rounded-2xl border border-secondary/20 overflow-hidden shadow-xs">
                  <button
                    onClick={() => handleToggleFaq(faq.id)}
                    className="w-full flex justify-between items-center px-6 py-4.5 text-left font-bold text-sm text-text-main hover:bg-primary-ultra-light/30 transition-all focus:outline-hidden"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-4.5 h-4.5 text-primary" /> : <ChevronDown className="w-4.5 h-4.5 text-text-muted" />}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-text-muted leading-relaxed border-t border-secondary/10">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DYNAMIC: MY INQUIRIES & DESIGN ESTIMATES */}
      {(inquiries.length > 0 || customRequests.length > 0) && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center gap-2 border-b border-secondary/20 pb-3">
            <History className="w-5.5 h-5.5 text-primary" />
            <h3 className="text-xl sm:text-2xl font-bold text-text-main">My Submitted Inquiries</h3>
            <span className="bg-primary text-accent text-xs font-bold px-2 py-0.5 rounded-full font-mono ml-1">
              {inquiries.length + customRequests.length}
            </span>
          </div>

          <p className="text-text-muted text-xs sm:text-sm leading-relaxed -mt-4">
            These are the design blueprints and catalog quote requests you have requested from Rajesh Sharma's Sirsa workshop. Inquiries are stored in your browser session memory.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Catalog Quote Inquiries */}
            {inquiries.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-primary-dark uppercase tracking-wider">Catalog & General Queries</h4>
                <div className="space-y-3.5">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="bg-white border border-secondary/25 p-5 rounded-2xl shadow-xs space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h5 className="font-bold text-sm text-text-main">{inq.subject}</h5>
                          <span className="text-[10px] text-text-muted font-mono">{inq.date}</span>
                        </div>
                        <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">
                          Awaiting Callback
                        </span>
                      </div>
                      
                      <div className="text-xs text-text-muted space-y-1 border-t border-secondary/10 pt-2.5">
                        <p><strong>Name:</strong> {inq.name}</p>
                        <p><strong>Phone:</strong> {inq.phone}</p>
                        <p className="whitespace-pre-wrap mt-2 bg-secondary-light/30 p-2.5 rounded-lg border border-secondary/15 leading-relaxed text-[11px] text-text-main">
                          {inq.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Design Requests */}
            {customRequests.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-primary-dark uppercase tracking-wider">Interactive Custom Designs</h4>
                <div className="space-y-3.5">
                  {customRequests.map((req) => (
                    <div key={req.id} className="bg-white border border-secondary/25 p-5 rounded-2xl shadow-xs space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h5 className="font-bold text-sm text-text-main">Custom {req.furnitureType} Blueprint</h5>
                          <span className="text-[10px] text-text-muted font-mono">{req.date}</span>
                        </div>
                        <span className="bg-green-100 text-green-800 text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">
                          Wood Phase Queue
                        </span>
                      </div>

                      <div className="text-xs text-text-muted space-y-1.5 border-t border-secondary/10 pt-2.5">
                        <div className="grid grid-cols-2 gap-1 bg-secondary-light/20 p-2 rounded-lg text-[10px]">
                          <div><strong>Wood:</strong> {req.woodType}</div>
                          <div><strong>Size:</strong> {req.dimensions}</div>
                          <div className="col-span-2"><strong>Est Price Range:</strong> <span className="font-bold text-primary">{req.budget}</span></div>
                        </div>
                        <p className="text-[10px] whitespace-pre-wrap pt-1">{req.requirements}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* GOOGLE MAPS EMBED SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-secondary/25 rounded-3xl p-4 shadow-sm space-y-4">
          <div className="flex items-center gap-2 px-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h4 className="font-bold text-sm text-text-main">Showroom Location on Google Maps (Sirsa, Haryana)</h4>
          </div>
          <div className="h-96 rounded-2xl overflow-hidden border border-secondary/20 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13783.504269806412!2d75.02521959999999!3d29.5312389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3911adbdfdfbdfff%3A0xe5a1b3be095d3ee1!2sSirsa%2C%20Haryana%20125055!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sharma Furniture House Google Map Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
