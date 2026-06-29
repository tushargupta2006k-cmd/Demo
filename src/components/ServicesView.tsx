import React from 'react';
import { motion } from 'motion/react';
import { Hammer, Briefcase, LayoutGrid, Compass, CheckCircle2, ChevronRight, ShieldCheck, Heart } from 'lucide-react';
import { SERVICES, BUSINESS_INFO } from '../data';

interface ServicesViewProps {
  setView: (view: string) => void;
}

export default function ServicesView({ setView }: ServicesViewProps) {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Hammer': return <Hammer className="w-12 h-12 text-accent" />;
      case 'Briefcase': return <Briefcase className="w-12 h-12 text-accent" />;
      case 'LayoutGrid': return <LayoutGrid className="w-12 h-12 text-accent" />;
      case 'Compass': return <Compass className="w-12 h-12 text-accent" />;
      default: return <Hammer className="w-12 h-12 text-accent" />;
    }
  };

  // Detailed imagery for each category
  const getServiceImage = (id: string) => {
    switch (id) {
      case 's1': return 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80'; // Wooden furniture bed
      case 's2': return 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80'; // Office workspace
      case 's3': return 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=800&q=80'; // Modular kitchen
      case 's4': return 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'; // Custom wood design
      default: return 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80';
    }
  };

  return (
    <div className="space-y-20 pb-16">
      {/* Header Banner */}
      <section className="bg-primary text-white py-16 text-center space-y-4">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Our Services</h2>
        <p className="text-secondary/80 max-w-2xl mx-auto text-base sm:text-lg font-light">
          Premium workmanship across heavy-duty solid wood, modern modular designs, ergonomic workspace solutions, and custom bespoke furniture.
        </p>
      </section>

      {/* Services detailed breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {SERVICES.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={service.id} 
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Image Section */}
              <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative rounded-3xl overflow-hidden shadow-lg border border-secondary/25 group">
                  <img 
                    src={getServiceImage(service.id)} 
                    alt={service.title} 
                    className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 to-transparent"></div>
                  <div className="absolute top-6 left-6 bg-primary/95 text-accent p-3.5 rounded-2xl shadow-md">
                    {getServiceIcon(service.icon)}
                  </div>
                </div>
              </div>

              {/* Text Description Section */}
              <div className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <span className="text-accent-dark text-xs font-extrabold uppercase tracking-widest block">
                  Category 0{index + 1}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-main">
                  {service.title}
                </h3>
                <p className="text-text-muted leading-relaxed">
                  {service.description} We work hand-in-hand with our clients in Sirsa, Haryana, to create bespoke dimensions and styles tailored to exact structural demands.
                </p>

                {/* Sub-items bullet checks */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {service.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <div className="bg-primary/10 text-primary p-1 rounded-full">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-sm text-text-main">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-secondary/15 flex flex-wrap gap-4 items-center">
                  <button 
                    onClick={() => setView('products')}
                    className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all cursor-pointer"
                  >
                    View Catalog Products
                  </button>
                  <button 
                    onClick={() => setView('custom-builder')}
                    className="bg-accent/20 hover:bg-accent/30 text-primary-dark font-bold px-6 py-2.5 rounded-xl text-sm transition-all cursor-pointer"
                  >
                    Design Custom {service.title}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Material and Quality Standards */}
      <section className="bg-primary text-white py-20 border-y border-accent/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-accent text-xs font-bold uppercase tracking-widest">Our Quality Directives</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Material & Workshop Integrity</h2>
            <p className="text-secondary/80 leading-relaxed">
              We exclusively source verified <strong>Indian Sheesham Wood (Rosewood)</strong> and seasoned <strong>Teak Wood</strong>. Every board goes through an extensive vacuum-pressure chemical treatment and industrial kiln seasoning process.
            </p>
            <p className="text-secondary/80 leading-relaxed">
              This guarantees that our products do not warp, crack, or suffer from termite infestations. For modular products, we utilize calibrated commercial BWR marine-ply and high-density fiberboards coupled with certified German fittings.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-accent shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">5-Year Warranty</h4>
                  <p className="text-xs text-secondary/70">Structural guarantee</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8 text-accent shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">100% Seasoned</h4>
                  <p className="text-xs text-secondary/70">Moisture-free wood</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3">
              <h4 className="font-bold text-lg text-accent">Vacuum Preserved</h4>
              <p className="text-secondary/70 text-sm leading-relaxed">
                Our wooden components undergo pressurized treatment protecting them from borers and termites forever.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3">
              <h4 className="font-bold text-lg text-accent">Soft-Close Slides</h4>
              <p className="text-secondary/70 text-sm leading-relaxed">
                Hassle-free modular kitchens fitted with heavy-duty telescopic channels and high-end hinges.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3">
              <h4 className="font-bold text-lg text-accent">Melamine Finishes</h4>
              <p className="text-secondary/70 text-sm leading-relaxed">
                Multi-coat polyurethane or high-grade melamine polishes for a premium matte or mirror gloss finish.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3">
              <h4 className="font-bold text-lg text-accent">Calibrated Sizing</h4>
              <p className="text-secondary/70 text-sm leading-relaxed">
                Engineered precision ensuring modular alignments with gaps below 0.5mm across all panels.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
