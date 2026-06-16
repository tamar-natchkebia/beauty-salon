"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

interface ServiceItem {
  name: string;
  price: string;
  duration: string;
  durationMinutes: number; // For advanced filtering logic
  concern: "glow" | "hydration" | "exfoliation" | "tension" | "grooming";
  description: string;
  image: string; // Dynamic storage asset reference
}

interface MenuData {
  [category: string]: ServiceItem[];
}

const SERVICES_MENU: MenuData = {
  Skincare: [
    {
      name: "Deep Cleansing & Salicylic Acid Glow Facial",
      price: "₾120",
      duration: "60 min",
      durationMinutes: 60,
      concern: "glow",
      description: "A targeted deep-cleansing facial utilizing active Salicylic acid to clarify skin texture, dissolve impurities, and restore your natural clarity.",
      image: "https://senchgucwjsitagylknx.supabase.co/storage/v1/object/public/salon-images/deep%20cleaning.jpg"
    },
    {
      name: "Hydrating Squalane & Botanical Infusion",
      price: "₾140",
      duration: "75 min",
      durationMinutes: 75,
      concern: "hydration",
      description: "Intense moisture barrier reconstruction using premium plant-derived squalane and custom botanical serums pressed into the deep layers of the skin.",
      image: "https://senchgucwjsitagylknx.supabase.co/storage/v1/object/public/salon-images/hydration.jpg"
    },
    {
      name: "Brightening Papaya Enzyme Resurfacing Peel",
      price: "₾95",
      duration: "45 min",
      durationMinutes: 45,
      concern: "exfoliation",
      description: "A gentle fruit-enzyme exfoliating treatment that lifts away dead skin cells to immediately reveal an ultra-radiant, polished complexion.",
      image: "https://senchgucwjsitagylknx.supabase.co/storage/v1/object/public/salon-images/exfo.jpg"
    }
  ],
  Spa: [
    {
      name: "Whipped Shea Butter Body Renewal Scrub",
      price: "₾160",
      duration: "60 min",
      durationMinutes: 60,
      concern: "exfoliation",
      description: "Full-body cellular exfoliation featuring rich, raw organic shea butter and papaya seed oils to deeply condition your skin texture.",
      image: "https://senchgucwjsitagylknx.supabase.co/storage/v1/object/public/salon-images/body%20scrub.jpg"
    },
    {
      name: "Deep Tissue Stress Relief Massage",
      price: "₾180",
      duration: "90 min",
      durationMinutes: 90,
      concern: "tension",
      description: "A restorative, deep-pressure massage designed by certified professionals to release chronic physical tension and soothe muscular fatigue.",
      image: "https://senchgucwjsitagylknx.supabase.co/storage/v1/object/public/salon-images/massage.jpg"
    },
    {
      name: "Aromatic Hot Stone Relaxation Ritual",
      price: "₾150",
      duration: "75 min",
      durationMinutes: 75,
      concern: "tension",
      description: "Smooth heated volcanic stones combined with artisanal organic oils are glided over key energy centers to melt tension away completely.",
      image: "https://senchgucwjsitagylknx.supabase.co/storage/v1/object/public/salon-images/massage-stones.jpg"
    }
  ],
  Nails: [
    {
      name: "Classic Manicure & Polish",
      price: "₾45",
      duration: "45 min",
      durationMinutes: 45,
      concern: "grooming",
      description: "Precise cuticle care, shaping, and premium, long-lasting color lacquer application performed to pristine structural hygiene standards.",
      image: "https://senchgucwjsitagylknx.supabase.co/storage/v1/object/public/salon-images/manicure.jpg"
    },
    {
      name: "Premium Pedicure Care",
      price: "₾70",
      duration: "60 min",
      durationMinutes: 60,
      concern: "grooming",
      description: "A completely therapeutic foot treatment including intensive skin smoothing, deep message, and uniform cuticle styling.",
      image: "https://senchgucwjsitagylknx.supabase.co/storage/v1/object/public/salon-images/pedicure.jpg"
    }
  ],
  Hair: [
    {
      name: "Bespoke Haircut & Blowout",
      price: "₾85",
      duration: "60 min",
      durationMinutes: 60,
      concern: "grooming",
      description: "A luxury master-stylist architectural cut customized entirely to your hair texture and facial structural dimensions, finalized with a high-gloss blowout.",
      image: "https://senchgucwjsitagylknx.supabase.co/storage/v1/object/public/salon-images/haircut.jpg"
    },
    {
      name: "Precision Laser Hair Removal",
      price: "₾90",
      duration: "30 min",
      durationMinutes: 30,
      concern: "grooming",
      description: "Advanced, comfortable cooling laser technology targeted at localized areas to eliminate growth permanently over a cycle of sessions.",
      image: "https://senchgucwjsitagylknx.supabase.co/storage/v1/object/public/salon-images/laser.jpg"
    }
  ]
};

export default function AdvancedServicesPage() {
  const categories = Object.keys(SERVICES_MENU);
  
  const [activeTab, setActiveTab] = useState<string>(categories[0]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [maxDuration, setMaxDuration] = useState<number>(90);
  const [selectedConcern, setSelectedConcern] = useState<string>("all");

  const filteredServices = useMemo(() => {
    const currentCategoryItems = SERVICES_MENU[activeTab] || [];
    
    return currentCategoryItems.filter((service) => {
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            service.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDuration = service.durationMinutes <= maxDuration;
      const matchesConcern = selectedConcern === "all" || service.concern === selectedConcern;
      
      return matchesSearch && matchesDuration && matchesConcern;
    });
  }, [activeTab, searchQuery, maxDuration, selectedConcern]);

  return (
    <div className="flex flex-col min-h-screen bg-off-white text-near-black antialiased selection:bg-forest/10 selection:text-forest">
      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto py-20 px-6">
        
        {/* Editorial Heading Block */}
        <div className="text-center mb-20 relative">
          <span className="text-[10px] tracking-[0.5em] text-forest font-medium uppercase block mb-4">
            The Wellness Collective
          </span>
          <h1 className="font-serif text-4xl md:text-5xl tracking-[0.15em] uppercase font-light leading-tight">
            The Treatment Menu
          </h1>
          <div className="w-16 h-[1px] bg-forest/40 mx-auto mt-8 mb-6"></div>
          <p className="font-sans text-xs tracking-wide text-near-black/50 font-light max-w-xl mx-auto leading-relaxed text-center">
            Every session is a bespoke configuration of medical-grade formulations, organic botanical compounds, and masterful technical execution.
          </p>
        </div>

        {/* Advanced Interactive Control Widget Panel */}
        <div className="bg-white border border-cream p-6 md:p-8 mb-16 shadow-[0_4px_24px_rgba(0,0,0,0.01)] transition-all duration-300">
          <div className="text-xs tracking-widest uppercase font-medium text-forest mb-4 pb-2 border-b border-cream/60 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse"></span>
            Menu Customizer & Smart Filter
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Control 1: Text Search Input Field */}
            <div className="space-y-2">
              <label className="block font-sans text-[11px] tracking-wider uppercase text-near-black/60 font-light">
                Search Treatments
              </label>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Salicylic, Massage, Shea..."
                className="w-full bg-off-white border border-cream/80 px-4 py-2.5 font-sans text-xs font-light tracking-wide focus:outline-none focus:border-forest transition-colors placeholder:text-near-black/30"
              />
            </div>

            {/* Control 2: Interactive Focus Focus Filter Toggle */}
            <div className="space-y-2">
              <label className="block font-sans text-[11px] tracking-wider uppercase text-near-black/60 font-light">
                Filter by Treatment Benefit
              </label>
              <select
                value={selectedConcern}
                onChange={(e) => setSelectedConcern(e.target.value)}
                className="w-full bg-off-white border border-cream/80 px-3 py-2.5 font-sans text-xs font-light tracking-wide focus:outline-none focus:border-forest transition-colors cursor-pointer appearance-none rounded-none"
                style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%231c251d\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><polyline points=\'6 9 12 15 18 9\'></polyline></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
              >
                <option value="all">All Benefits & Disciplines</option>
                <option value="glow">Skin Clarifying & Glow</option>
                <option value="hydration">Deep Dermal Hydration</option>
                <option value="exfoliation">Cellular Resurfacing & Exfoliation</option>
                <option value="tension">Deep Muscular Tension Release</option>
                <option value="grooming">Architectural Grooming & Styling</option>
              </select>
            </div>

            {/* Control 3: Time Frame Duration Slider Controller */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className="font-sans text-[11px] tracking-wider uppercase text-near-black/60 font-light">
                  Maximum Available Time
                </label>
                <span className="font-serif text-xs text-forest italic font-light">{maxDuration} minutes</span>
              </div>
              <div className="pt-2">
                <input 
                  type="range" 
                  min="30" 
                  max="90" 
                  step="15"
                  value={maxDuration}
                  onChange={(e) => setMaxDuration(Number(e.target.value))}
                  className="w-full accent-forest h-[2px] bg-cream cursor-pointer"
                />
                <div className="flex justify-between font-sans text-[9px] text-near-black/30 mt-1 font-light tracking-widest">
                  <span>30 MIN</span>
                  <span>60 MIN</span>
                  <span>90 MIN</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Tab Bar Switcher */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-10 border-b border-cream/60 pb-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveTab(category);
                setSearchQuery("");
              }}
              className={`text-xs tracking-[0.3em] uppercase transition-all duration-500 pb-3 border-b relative cursor-pointer font-light ${
                activeTab === category
                  ? "text-forest font-normal"
                  : "text-near-black/30 border-transparent hover:text-near-black/70"
              }`}
            >
              {category}
              {activeTab === category && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-forest animate-[fadeIn_0.3s_ease]"></span>
              )}
            </button>
          ))}
        </div>

        {/* Dynamic Treatment Display Engine View */}
        <div className="space-y-10 min-h-[300px]">
          {filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <div 
                key={index} 
                className="group relative bg-white md:bg-transparent hover:bg-white border border-transparent hover:border-cream/60 p-6 md:p-8 md:-mx-8 transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-8"
              >
                {/* Structural Image Wrapper (Left aligned layout anchor) */}
                <div className="w-full md:w-44 h-48 md:h-32 flex-shrink-0 relative overflow-hidden bg-cream/30 border border-cream/40">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover grayscale-[25%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-near-black/5 opacity-20 group-hover:opacity-0 transition-opacity duration-500"></div>
                </div>

                {/* Left Structural Side: Descriptive Focus Blocks */}
                <div className="flex-1 space-y-3 w-full">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="font-serif text-xl tracking-wide text-near-black font-light group-hover:text-forest transition-colors duration-300">
                      {service.name}
                    </h3>
                    <span className="text-[9px] tracking-widest font-sans font-light bg-off-white text-near-black/50 border border-cream/50 px-2 py-0.5 rounded-none uppercase">
                      {service.concern}
                    </span>
                  </div>
                  
                  <p className="font-sans text-xs text-near-black/60 leading-relaxed font-light max-w-2xl text-justify">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-[10px] tracking-wider text-forest font-medium uppercase">
                    <svg className="w-3 h-3 text-forest/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    Treatment Window: {service.duration}
                  </div>
                </div>

                {/* Right Structural Side: Interactive Transaction Actions */}
                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-4 w-full md:w-auto min-w-[140px] pt-4 md:pt-0 border-t md:border-t-0 border-cream/40">
                  <span className="font-serif text-2xl font-light tracking-wide text-near-black">
                    {service.price}
                  </span>
                  <Link href="/book" className="w-full md:w-auto">
                    <button className="w-full md:w-auto bg-transparent border border-near-black/20 text-near-black group-hover:bg-forest group-hover:text-white group-hover:border-forest text-[10px] tracking-widest uppercase font-light px-5 py-2.5 transition-all duration-300 rounded-none cursor-pointer">
                      Request Slot
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            /* Elegant Zero-Match Error Handling Container Fallback */
            <div className="text-center py-20 border border-dashed border-cream bg-white/50">
              <span className="font-serif text-3xl text-near-black/20 block mb-3">~</span>
              <p className="font-serif text-lg text-near-black/50 font-light italic">
                No matching configurations found
              </p>
              <p className="font-sans text-[10px] tracking-widest text-near-black/40 uppercase font-light mt-1">
                Try widening your available time window or resetting the search string input.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setMaxDuration(90);
                  setSelectedConcern("all");
                }}
                className="mt-6 text-[10px] tracking-widest uppercase font-light text-forest underline cursor-pointer hover:text-near-black transition-colors"
              >
                Clear Current Configurations
              </button>
            </div>
          )}
        </div>

        {/* Advanced Reassurance Structural Banner Footer */}
        <div className="mt-32 border-t border-b border-cream py-12 flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto px-4">
          <div className="space-y-1 max-w-md text-center md:text-left">
            <h4 className="font-serif text-lg tracking-wide font-light">Custom Group Curations</h4>
            <p className="font-sans text-xs text-near-black/50 font-light leading-relaxed">
              Planning an exclusive event, custom bridal morning, or private spa buyout sequence? Contact our concierge desk directly.
            </p>
          </div>
          <Link href="/book">
            <button className="bg-near-black text-white hover:bg-forest text-[10px] tracking-widest uppercase font-light px-6 py-3.5 transition-all duration-300 rounded-none cursor-pointer">
              Inquire Corporate Booking
            </button>
          </Link>
        </div>

      </main>
    </div>
  );
}