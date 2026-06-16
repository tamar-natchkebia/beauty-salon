import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-cream sticky top-0 z-50 px-6 py-4 md:px-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo / Salon Name - Minimalist Editorial Serif */}
        <Link href="/" className="font-serif text-xl tracking-[0.2em] text-near-black font-light uppercase group relative">
          BellaBelle
          {/* Classical architrave underline style on logo hover */}
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-forest/40 transition-all duration-500 group-hover:w-full"></span>
        </Link>

        {/* Navigation Links - Classical Architectural Hover Ornamentation */}
        <div className="hidden md:flex space-x-12 text-xs tracking-widest uppercase font-light text-near-black/70">
          
          <Link href="/services" className="relative pb-2 hover:text-forest transition-colors duration-300 group">
            Services & Menu
            {/* Classical Meander / Roman Diamond Ornamentation */}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center w-0 overflow-hidden opacity-0 group-hover:w-full group-hover:opacity-100 transition-all duration-500 ease-out">
              <span className="w-full h-[1px] bg-forest/30"></span>
              <span className="rotate-45 block w-1 h-1 bg-forest mx-1 flex-shrink-0"></span>
              <span className="w-full h-[1px] bg-forest/30"></span>
            </span>
          </Link>
          
          <Link href="/about" className="relative pb-2 hover:text-forest transition-colors duration-300 group">
            Our Standard
            {/* Classical Meander / Roman Diamond Ornamentation */}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center w-0 overflow-hidden opacity-0 group-hover:w-full group-hover:opacity-100 transition-all duration-500 ease-out">
              <span className="w-full h-[1px] bg-forest/30"></span>
              <span className="rotate-45 block w-1 h-1 bg-forest mx-1 flex-shrink-0"></span>
              <span className="w-full h-[1px] bg-forest/30"></span>
            </span>
          </Link>

        </div>

        {/* Call to Action Button - Framed with a clean Classical Pediment accent underneath */}
        <div className="flex flex-col items-center">
          <Link href="/book">
            <button className="bg-forest text-off-white text-xs tracking-widest uppercase px-5 py-2.5 rounded-none hover:bg-deep-green transition-all duration-300 font-light cursor-pointer shadow-sm">
              Book Appointment
            </button>
          </Link>
          {/* Architectural Frieze Accent Strip under button */}
          <div className="w-full max-w-[90%] flex items-center justify-between px-1 mt-1 opacity-40">
            <div className="w-2 h-[1px] bg-forest"></div>
            <div className="w-full h-[1px] bg-forest/20 mx-1"></div>
            <div className="w-1 h-1 rounded-full bg-forest"></div>
            <div className="w-full h-[1px] bg-forest/20 mx-1"></div>
            <div className="w-2 h-[1px] bg-forest"></div>
          </div>
        </div>
        
      </div>
    </nav>
  );
}