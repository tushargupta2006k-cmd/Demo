import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Settings, Ruler, Layers, Sliders, Info, Check, CheckCircle2 } from 'lucide-react';

interface CustomBuilderViewProps {
  onAddCustomRequest: (request: {
    name: string;
    email: string;
    phone: string;
    furnitureType: string;
    woodType: string;
    dimensions: string;
    budget: string;
    requirements: string;
  }) => void;
}

export default function CustomBuilderView({ onAddCustomRequest }: CustomBuilderViewProps) {
  // Config state
  const [furnitureType, setFurnitureType] = useState('Bed');
  const [woodType, setWoodType] = useState('Solid Sheesham Wood');
  const [finishType, setFinishType] = useState('Premium Matte Melamine');
  const [width, setWidth] = useState(6);
  const [height, setHeight] = useState(4);
  const [depth, setDepth] = useState(2);
  
  // Custom features
  const [addons, setAddons] = useState<string[]>([]);
  
  // Estimates
  const [estimatedMinPrice, setEstimatedMinPrice] = useState(15000);
  const [estimatedMaxPrice, setEstimatedMaxPrice] = useState(18000);

  // User details
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRequirements, setUserRequirements] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const furnitureOptions = [
    { value: 'Bed', label: 'Luxury Bed Set', basePrice: 12000, maxW: 8, maxH: 6, maxD: 7 },
    { value: 'Dining Table', label: 'Bespoke Dining Table', basePrice: 9000, maxW: 10, maxH: 3, maxD: 5 },
    { value: 'Wardrobe', label: 'Modular Wardrobe', basePrice: 15000, maxW: 12, maxH: 10, maxD: 3 },
    { value: 'TV Unit', label: 'Living Console / TV Unit', basePrice: 6000, maxW: 9, maxH: 8, maxD: 2 },
    { value: 'Modular Kitchen', label: 'Modular Kitchen (Per Running Ft)', basePrice: 18000, maxW: 25, maxH: 7, maxD: 3 },
    { value: 'Executive Desk', label: 'Office Executive Table', basePrice: 5000, maxW: 7, maxH: 3, maxD: 4 },
  ];

  const woodOptions = [
    { value: 'Solid Sheesham Wood', label: 'Solid Sheesham Wood (Premium Rosewood)', multiplier: 1.4, desc: 'High density, deep grain, termite-resistant.' },
    { value: 'Solid Teak Wood', label: 'Solid Teak Wood (Elite Golden Teak)', multiplier: 1.6, desc: 'Highest grade luxury wood, lifetime warp-proof.' },
    { value: 'Solid Mango Wood', label: 'Solid Mango Wood (Eco-Friendly Solid)', multiplier: 1.15, desc: 'Affordable solid wood, beautiful light polish finish.' },
    { value: 'Commercial BWR Ply / Board', label: 'Commercial Marine BWR Ply', multiplier: 1.0, desc: 'Moisture resistant, perfectly calibrated, ideal for laminates.' },
  ];

  const finishOptions = [
    { value: 'Premium Matte Melamine', label: 'Premium Matte Melamine Polish', priceAdd: 2500 },
    { value: 'Mirror Glossy PU Polish', label: 'Mirror Glossy PU (Polyurethane)', priceAdd: 5000 },
    { value: 'Natural Linseed Oil & Wax Finish', label: 'Organic Oil & Natural Beeswax Finish', priceAdd: 1500 },
    { value: 'Sunmica High-Gloss Laminate', label: 'Sunmica Double-Tough Laminate', priceAdd: 2000 },
  ];

  const addonOptions = [
    { id: 'hydraulic', label: 'Heavy Hydraulic Lift storage (Beds)', price: 6500, appliesTo: ['Bed'] },
    { id: 'softclose', label: 'Premium soft-close silent sliders & hinges', price: 3200, appliesTo: ['Wardrobe', 'Modular Kitchen', 'TV Unit'] },
    { id: 'led', label: 'Built-in warm ambient LED lighting channels', price: 1800, appliesTo: ['Wardrobe', 'TV Unit', 'Modular Kitchen', 'Executive Desk'] },
    { id: 'glass', label: 'Toughened safety glass shelving / shutter inserts', price: 2800, appliesTo: ['TV Unit', 'Modular Kitchen', 'Wardrobe'] },
    { id: 'cushion', label: 'High-density premium fabric headboard/cushioning', price: 4500, appliesTo: ['Bed'] }
  ];

  const handleToggleAddon = (addonId: string) => {
    if (addons.includes(addonId)) {
      setAddons(addons.filter(a => a !== addonId));
    } else {
      setAddons([...addons, addonId]);
    }
  };

  // Live price calculation logic
  useEffect(() => {
    const selectedFurniture = furnitureOptions.find(f => f.value === furnitureType) || furnitureOptions[0];
    const selectedWood = woodOptions.find(w => w.value === woodType) || woodOptions[0];
    const selectedFinish = finishOptions.find(fi => fi.value === finishType) || finishOptions[0];

    // Calculate volume / surface area factor
    const baseVolume = width * height * depth;
    // Normalized multiplier (average size of 6x4x2 = 48 cubic units)
    const sizeMultiplier = Math.max(0.6, baseVolume / 48);

    let calculatedBase = selectedFurniture.basePrice * sizeMultiplier;
    calculatedBase = calculatedBase * selectedWood.multiplier;
    
    // Add finish style cost
    calculatedBase += selectedFinish.priceAdd;

    // Add selected addons cost
    addons.forEach(addonId => {
      const add = addonOptions.find(ao => ao.id === addonId);
      if (add) {
        calculatedBase += add.price;
      }
    });

    // Generate price range estimation
    const minVal = Math.round(calculatedBase * 0.92);
    const maxVal = Math.round(calculatedBase * 1.08);

    setEstimatedMinPrice(minVal);
    setEstimatedMaxPrice(maxVal);
  }, [furnitureType, woodType, finishType, width, height, depth, addons]);

  // Adjust defaults when furniture type changes
  const handleFurnitureTypeChange = (val: string) => {
    setFurnitureType(val);
    const opt = furnitureOptions.find(f => f.value === val);
    if (opt) {
      // set reasonable middle-ground sizing
      setWidth(Math.round(opt.maxW * 0.8));
      setHeight(Math.round(opt.maxH * 0.9));
      setDepth(Math.round(opt.maxD * 0.9));
    }
    // Clear un-matching addons
    setAddons([]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors: Record<string, string> = {};

    if (!userName.trim()) tempErrors.name = 'Your name is required';
    if (!userPhone.trim()) {
      tempErrors.phone = 'Phone/WhatsApp number is required';
    } else if (!/^[0-9+\s-]{10,15}$/.test(userPhone.trim())) {
      tempErrors.phone = 'Invalid phone format';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    // Submit Custom Design Configuration
    const compiledSpecs = `Furniture: ${furnitureType}
Wood Type: ${woodType}
Finish Finish: ${finishType}
Dimensions: ${width}ft x ${height}ft x ${depth}ft
Selected Add-ons: ${addons.length > 0 ? addons.map(a => addonOptions.find(ao => ao.id === a)?.label).join(', ') : 'None'}
Additional Request Details: ${userRequirements || 'None specified'}`.trim();

    onAddCustomRequest({
      name: userName,
      phone: userPhone,
      email: userEmail || 'custom-configurator@sharmafurniture.in',
      furnitureType: furnitureType,
      woodType: woodType,
      dimensions: `${width}W x ${height}H x ${depth}D feet`,
      budget: `₹${estimatedMinPrice.toLocaleString('en-IN')} - ₹${estimatedMaxPrice.toLocaleString('en-IN')}`,
      requirements: compiledSpecs
    });

    setIsSuccess(true);
    setTimeout(() => {
      // reset success message
      setIsSuccess(false);
      setUserName('');
      setUserPhone('');
      setUserEmail('');
      setUserRequirements('');
      setAddons([]);
    }, 4000);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Section Header */}
      <section className="bg-primary text-white py-12 text-center space-y-4">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Interactive Custom Design Tool</h2>
        <p className="text-secondary/80 max-w-xl mx-auto text-sm sm:text-base">
          Configure wood types, custom lengths, polishing shades, and calculate instant budget estimations from Rajesh Sharma's workshop.
        </p>
      </section>

      {/* Main Designer Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Estimator Config Form (lg:col-span-8) */}
          <div className="lg:col-span-8 bg-white border border-secondary/25 p-6 sm:p-8 rounded-3xl shadow-xs space-y-8">
            
            {/* Step 1: Furniture Type */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                <span className="bg-primary text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">1</span>
                <span>Select Custom Furniture Category</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {furnitureOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleFurnitureTypeChange(opt.value)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      furnitureType === opt.value
                        ? 'bg-primary-ultra-light border-primary ring-1 ring-primary'
                        : 'bg-secondary-light/20 border-secondary/30 hover:border-primary-light'
                    }`}
                  >
                    <span className="font-bold text-sm block text-text-main">{opt.label}</span>
                    <span className="text-[10px] text-text-muted mt-1 block">Est. Base ₹{opt.basePrice.toLocaleString('en-IN')}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Wood Material Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                <span className="bg-primary text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">2</span>
                <span>Select Timber & Wood Core</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {woodOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setWoodType(opt.value)}
                    className={`p-4 rounded-xl border text-left transition-all flex justify-between items-start cursor-pointer ${
                      woodType === opt.value
                        ? 'bg-primary-ultra-light border-primary ring-1 ring-primary'
                        : 'bg-secondary-light/20 border-secondary/30 hover:border-primary-light'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-sm block text-text-main">{opt.value}</span>
                      <span className="text-[11px] text-text-muted mt-1 block leading-relaxed">{opt.desc}</span>
                    </div>
                    {woodType === opt.value && <CheckCircle2 className="w-5 h-5 text-primary shrink-0 ml-2" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Dimensions Sliders */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                <span className="bg-primary text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">3</span>
                <span>Adjust Custom Dimensions (Feet)</span>
              </div>
              
              <div className="bg-secondary-light/20 p-5 rounded-2xl border border-secondary/20 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Width */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-text-muted uppercase tracking-wide">Width (Length)</span>
                    <span className="font-mono bg-primary text-white px-2 py-0.5 rounded font-bold">{width} ft</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={furnitureOptions.find(f => f.value === furnitureType)?.maxW || 15}
                    value={width}
                    onChange={(e) => setWidth(parseInt(e.target.value))}
                    className="w-full accent-primary bg-secondary-light h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-text-muted">
                    <span>Min: 2ft</span>
                    <span>Max: {furnitureOptions.find(f => f.value === furnitureType)?.maxW || 15}ft</span>
                  </div>
                </div>

                {/* Height */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-text-muted uppercase tracking-wide">Height</span>
                    <span className="font-mono bg-primary text-white px-2 py-0.5 rounded font-bold">{height} ft</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={furnitureOptions.find(f => f.value === furnitureType)?.maxH || 10}
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value))}
                    className="w-full accent-primary bg-secondary-light h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-text-muted">
                    <span>Min: 1ft</span>
                    <span>Max: {furnitureOptions.find(f => f.value === furnitureType)?.maxH || 10}ft</span>
                  </div>
                </div>

                {/* Depth */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-text-muted uppercase tracking-wide">Depth (Thickness)</span>
                    <span className="font-mono bg-primary text-white px-2 py-0.5 rounded font-bold">{depth} ft</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={furnitureOptions.find(f => f.value === furnitureType)?.maxD || 6}
                    value={depth}
                    onChange={(e) => setDepth(parseInt(e.target.value))}
                    className="w-full accent-primary bg-secondary-light h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-text-muted">
                    <span>Min: 1ft</span>
                    <span>Max: {furnitureOptions.find(f => f.value === furnitureType)?.maxD || 6}ft</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Polish Finish */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                <span className="bg-primary text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">4</span>
                <span>Select Polish Finishing style</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {finishOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFinishType(opt.value)}
                    className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                      finishType === opt.value
                        ? 'bg-primary-ultra-light border-primary ring-1 ring-primary font-semibold'
                        : 'bg-secondary-light/20 border-secondary/30 hover:border-primary-light text-text-muted'
                    }`}
                  >
                    <span className="text-xs block text-text-main font-bold">{opt.label}</span>
                    <span className="text-[9px] mt-1.5 block font-semibold text-primary font-mono">+₹{opt.priceAdd.toLocaleString('en-IN')}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Addons */}
            {addonOptions.filter(ao => ao.appliesTo.includes(furnitureType)).length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                  <span className="bg-primary text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">5</span>
                  <span>Premium Add-ons & Fixtures</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {addonOptions
                    .filter(ao => ao.appliesTo.includes(furnitureType))
                    .map((opt) => {
                      const isSelected = addons.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleToggleAddon(opt.id)}
                          className={`p-3.5 rounded-xl border text-left transition-all flex justify-between items-center cursor-pointer ${
                            isSelected
                              ? 'bg-primary-ultra-light border-primary ring-1 ring-primary'
                              : 'bg-secondary-light/20 border-secondary/30 hover:border-primary-light'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-primary border-primary text-white' : 'border-secondary/40'
                            }`}>
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                            <span className="text-xs font-semibold text-text-main">{opt.label}</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-primary shrink-0 ml-3">+₹{opt.price.toLocaleString('en-IN')}</span>
                        </button>
                      );
                    })}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Live Price Gauge & Direct Custom Order Form (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Live Pricing Estimation Card */}
            <div className="bg-primary text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              
              <div className="space-y-1.5 relative z-10">
                <span className="text-accent text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Sharma Instant Estimator
                </span>
                <h3 className="text-xl font-bold font-sans">Dynamic Cost Range</h3>
                <p className="text-xs text-secondary/70">Approximate cost based on configured wood, dimensions and finish.</p>
              </div>

              {/* Dynamic Cost Output Box */}
              <div className="bg-white/10 border border-white/10 rounded-2xl p-6 text-center space-y-1.5 relative z-10">
                <span className="text-[10px] uppercase font-bold text-secondary tracking-widest block">Estimated Budget</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-accent font-mono tracking-tight">
                  ₹{estimatedMinPrice.toLocaleString('en-IN')} – ₹{estimatedMaxPrice.toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-secondary/70 block">(Excludes GST & delivery outside 25km)</span>
              </div>

              {/* Itemized spec overview checklist */}
              <div className="space-y-2.5 text-xs text-secondary/90 border-t border-white/10 pt-4 relative z-10">
                <div className="flex justify-between">
                  <span className="font-medium text-white/70">Furniture:</span>
                  <span className="font-bold text-white">{furnitureType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-white/70">Timber Material:</span>
                  <span className="font-bold text-white">{woodType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-white/70">Finished Style:</span>
                  <span className="font-bold text-white max-w-[150px] text-right truncate" title={finishType}>{finishType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-white/70">Exact Sizing:</span>
                  <span className="font-bold text-white">{width}W x {height}H x {depth}D ft</span>
                </div>
              </div>
            </div>

            {/* Custom Inquiry Submission Form */}
            <div className="bg-white border border-secondary/25 p-6 rounded-3xl shadow-xs space-y-4">
              <div className="space-y-1.5">
                <h4 className="font-bold text-base text-text-main">Submit Design for Carpentry</h4>
                <p className="text-xs text-text-muted">Receive a formal quotation, exact timelines and timber material samples.</p>
              </div>

              {isSuccess ? (
                <div className="bg-accent/10 border border-accent/25 p-5 rounded-2xl text-center space-y-3.5 animate-in fade-in zoom-in duration-200">
                  <CheckCircle2 className="w-10 h-10 text-primary mx-auto animate-bounce" />
                  <h5 className="font-bold text-sm text-primary-dark">Specs Submitted Successfully!</h5>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Rajesh Sharma or our Sirsa workshop team has received your configured specs. We will contact you shortly on WhatsApp!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4.5">
                  <div>
                    <label className="block text-xs font-bold text-text-muted mb-1 uppercase tracking-wider">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => {
                        setUserName(e.target.value);
                        if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                      }}
                      placeholder="e.g. Anand Sharma"
                      className={`w-full bg-secondary-light/30 border ${errors.name ? 'border-red-500' : 'border-secondary/30'} rounded-lg p-2.5 text-xs text-text-main focus:outline-hidden focus:border-primary`}
                    />
                    {errors.name && <p className="text-red-500 text-[10px] mt-0.5">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-muted mb-1 uppercase tracking-wider">Phone / WhatsApp *</label>
                    <input
                      type="text"
                      required
                      value={userPhone}
                      onChange={(e) => {
                        setUserPhone(e.target.value);
                        if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                      }}
                      placeholder="e.g. +91 9991122334"
                      className={`w-full bg-secondary-light/30 border ${errors.phone ? 'border-red-500' : 'border-secondary/30'} rounded-lg p-2.5 text-xs text-text-main focus:outline-hidden focus:border-primary`}
                    />
                    {errors.phone && <p className="text-red-500 text-[10px] mt-0.5">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-muted mb-1 uppercase tracking-wider">Email (Optional)</label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="e.g. anand@gmail.com"
                      className="w-full bg-secondary-light/30 border border-secondary/30 rounded-lg p-2.5 text-xs text-text-main focus:outline-hidden focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-muted mb-1 uppercase tracking-wider">Custom Requirements (Optional)</label>
                    <textarea
                      rows={2}
                      value={userRequirements}
                      onChange={(e) => setUserRequirements(e.target.value)}
                      placeholder="e.g. I need custom carvings on the bed posts, or special laminate colors for the modular drawers."
                      className="w-full bg-secondary-light/30 border border-secondary/30 rounded-lg p-2.5 text-xs text-text-main focus:outline-hidden focus:border-primary resize-none text-left"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Submit Design Details <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
