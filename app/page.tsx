"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Home() {
  const heroImageUrl = "https://senchgucwjsitagylknx.supabase.co/storage/v1/object/public/salon-images/hero-image.jpg";

  return (
    <div className="flex flex-col min-h-screen bg-off-white">
      {/* 1. Navigation Bar */}
      <Navbar />

      <main className="flex-1 w-full">
        {/* 2. Hero Banner */}
        <section className="relative w-full h-[75vh] md:h-[85vh] bg-cream overflow-hidden">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-near-black/30 via-near-black/20 to-near-black/60 z-10">
            <span className="text-xs tracking-[0.4em] text-white/90 font-light uppercase mb-4">
              Bespoke Hair & Esthetics
            </span>
            <h1 className="font-serif text-4xl md:text-6xl tracking-wide text-white uppercase max-w-3xl font-light leading-tight">
              Elevate Your Natural Radiance
            </h1>
            <p className="font-sans text-xs md:text-sm tracking-[0.25em] text-off-white/90 uppercase font-light mt-6 max-w-md border-t border-white/20 pt-4">
              Experience Premium Luxury Salon Services
            </p>
          </div>

          <Image
            src={heroImageUrl}
            alt="Luxury Salon Interior Backdrop"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </section>

        {/* 3. Brand Pillars Section */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl tracking-widest text-near-black uppercase font-light">
              Why Our Guests Love Us
            </h2>
            <div className="w-12 h-[1px] bg-forest/40 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Team Pillar */}
            <div className="border border-cream bg-white p-8 rounded-none shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs tracking-[0.2em] font-light text-forest uppercase block mb-3">01 / Experience</span>
                <h3 className="font-serif text-xl tracking-wide uppercase text-near-black mb-4 font-light">Our Team</h3>
                <p className="font-sans text-xs text-near-black/70 leading-relaxed font-light tracking-wide text-justify">
                  You are served by certified specialists trained and working according to global standards and putting their soul into each of their work. Manicure and pedicure specialists take advanced training courses every six months. New technologies are constantly appearing that need to be implemented in order to meet constantly increasing global quality standards in this area.
                </p>
              </div>
            </div>

            {/* Sterilization Pillar */}
            <div className="border border-cream bg-white p-8 rounded-none shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs tracking-[0.2em] font-light text-forest uppercase block mb-3">02 / Safety</span>
                <h3 className="font-serif text-xl tracking-wide uppercase text-near-black mb-4 font-light">Sterilization</h3>
                <p className="font-sans text-xs text-near-black/70 leading-relaxed font-light tracking-wide text-justify">
                  Absolutely all procedures are performed with a sterile instrument in our place. We comply with absolutely all international norms and standards of hygiene! You can be absolutely calm for your health and the safety of your loved ones in our beauty salon. They are in good hands with us. And you can always take a tour and personally get acquainted with all the standards in accordance with which we work.
                </p>
              </div>
            </div>

            {/* Services Pillar */}
            <div className="border border-cream bg-white p-8 rounded-none shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs tracking-[0.2em] font-light text-forest uppercase block mb-3">03 / Dedication</span>
                <h3 className="font-serif text-xl tracking-wide uppercase text-near-black mb-4 font-light">Services</h3>
                <p className="font-sans text-xs text-near-black/70 leading-relaxed font-light tracking-wide text-justify">
                  Quality of service is one of the most important components in our business. We do our best so that you can completely relax with us and enjoy the process, no matter which procedure are you making here, be it manicure and pedicure, nail or eyelash extensions, nano-spraying or laser hair removal! You get away from all your worries temporarily! That is why we always have very tasty aromatic coffee, interesting movies and much more :)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Consultation Form & Hospitality Split Section */}
        <section className="bg-cream/40 border-t border-b border-cream py-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left: Premium Contact Form */}
            <div className="bg-white border border-cream p-8 md:p-10 shadow-sm">
              <h3 className="font-serif text-2xl tracking-wide text-near-black uppercase font-light mb-2">
                Have a Question?
              </h3>
              <p className="font-sans text-xs tracking-widest text-near-black/60 uppercase font-light mb-8">
                Send us a message and we will gladly answer you.
              </p>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase font-light text-near-black/70 mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-off-white border border-cream/80 px-4 py-3 text-xs font-light tracking-wider focus:outline-none focus:border-forest text-near-black transition-colors rounded-none"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase font-light text-near-black/70 mb-2">Phone</label>
                  <input 
                    type="tel" 
                    className="w-full bg-off-white border border-cream/80 px-4 py-3 text-xs font-light tracking-wider focus:outline-none focus:border-forest text-near-black transition-colors rounded-none"
                    placeholder="+995 000 00 00 00"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase font-light text-near-black/70 mb-3">
                    How would you like to receive your answer?
                  </label>
                  <div className="grid grid-cols-2 gap-3 text-xs font-light tracking-wide text-near-black/80">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="radio" name="contact-preference" className="accent-forest" />
                      <span>Phone Call</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="radio" name="contact-preference" className="accent-forest" />
                      <span>WhatsApp</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="radio" name="contact-preference" className="accent-forest" />
                      <span>Viber</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="radio" name="contact-preference" className="accent-forest" />
                      <span>Telegram</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase font-light text-near-black/70 mb-2">Comments</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-off-white border border-cream/80 px-4 py-3 text-xs font-light tracking-wider focus:outline-none focus:border-forest text-near-black transition-colors rounded-none resize-none"
                    placeholder="Write your thoughts here..."
                  />
                </div>

                <button type="submit" className="w-full bg-forest text-white text-xs tracking-[0.2em] uppercase font-light py-4 hover:bg-deep-green transition-colors duration-300 rounded-none shadow-sm cursor-pointer">
                  Send Inquiry
                </button>
              </form>
            </div>

            {/* Right: Hospitality and Invitation Side */}
            <div className="lg:pt-10 flex flex-col justify-between h-full">
              <div className="space-y-8">
                <span className="text-xs tracking-[0.4em] text-forest font-light uppercase block">
                  A Gentle Invitation
                </span>
                <p className="font-serif text-2xl md:text-3xl tracking-wide text-near-black uppercase font-light leading-relaxed">
                  "Visit us just for a cup of delicious aromatic coffee, which we will gladly treat you, and we will have conversation to you with great pleasure :)"
                </p>
                <div className="w-20 h-[1px] bg-forest/30"></div>
              </div>

              {/* Instant Call Accent Box */}
              <div className="mt-12 bg-forest p-8 rounded-none text-white border border-forest/20 shadow-sm">
                <span className="text-[10px] tracking-[0.3em] text-off-white/70 uppercase font-light block mb-1">
                  Direct Line
                </span>
                <a href="tel:+995000000000" className="font-serif text-2xl md:text-3xl tracking-widest block hover:text-cream transition-colors font-light">
                  +995 000 00 00 000
                </a>
                <p className="text-[11px] font-light tracking-wider text-off-white/80 mt-2 italic">
                  *Please call back if the line is busy
                </p>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* 5. Luxury Editorial Footer Container */}
      <footer className="bg-near-black text-off-white/90 py-16 px-6 md:px-12 border-t border-near-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-6">
          
          <div className="space-y-4 max-w-sm">
            <h4 className="font-serif text-lg tracking-[0.2em] text-white uppercase font-light">
              We Are Waiting For You Here
            </h4>
            <p className="font-sans text-xs font-light tracking-widest text-off-white/60 uppercase">
              Tbilisi, Saburtalo,<br />Kazbegi Ave. 43
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-lg tracking-[0.2em] text-white uppercase font-light">
              Hours
            </h4>
            <p className="font-sans text-xs font-light tracking-widest text-off-white/60 uppercase">
              Open every day<br />10:00 — 21:00
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-lg tracking-[0.2em] text-white uppercase font-light">
              Connect
            </h4>
            <p className="font-sans text-xs font-light tracking-widest text-off-white/60 uppercase">
              Phone: +995 000 00 00 000<br />
              Instagram / Telegram
            </p>
          </div>

        </div>
        
        <div className="max-w-7xl mx-auto border-t border-white/10 mt-16 pt-6 text-center">
  {/* Add suppressHydrationWarning directly to the element text block */}
  <p 
    suppressHydrationWarning 
    className="text-[10px] tracking-[0.2em] font-light text-off-white/40 uppercase"
  >
    © {new Date().getFullYear()} BellaBelle. Designed for Ultimate Relaxation.
  </p>
</div>
      </footer>
    </div>
  );
}