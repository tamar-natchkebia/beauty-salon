"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Navbar from "../components/Navbar";

// Initialize your live secure cloud connection to Supabase
const supabase = createClient(
  "https://senchgucwjsitagylknx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlbmNoZ3Vjd2pzaXRhZ3lsa254Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwNzUzNjcsImV4cCI6MjA5NjY1MTM2N30.odquTmokx06Og34-5KDjk7LjuGQOpJPc8d0HP5Hoe_Q"
);

interface Review {
  id: string;
  author: string;
  treatment: string;
  rating: number;
  text: string;
  likes: number;
  created_at: string;
}

export default function StandardsAndReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form State Handlers
  const [formAuthor, setFormAuthor] = useState("");
  const [formTreatment, setFormTreatment] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formText, setFormText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 1. Live Fetch Effect: Downloads approved records from Supabase on mount
  useEffect(() => {
    async function streamReviews() {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from("reviews")
        .select("id, author, treatment, rating, text, likes, created_at")
        .eq("is_approved", true) // Ensures unmoderated spam never hits your page automatically
        .order("created_at", { ascending: false });

      if (!error && data) {
        setReviews(data);
      }
      setIsLoading(false);
    }
    
    streamReviews();
  }, []);

  // 2. Interactive Like Trigger: Directly increments database columns
  const handleLike = async (id: string, currentLikes: number) => {
    setReviews(prev =>
      prev.map(review => 
        review.id === id ? { ...review, likes: currentLikes + 1 } : review
      )
    );

    await supabase
      .from("reviews")
      .update({ likes: currentLikes + 1 })
      .eq("id", id);
  };

  // 3. Form Submission: Pipes client review payload to Supabase
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAuthor || !formText || !formTreatment) return;

    const { error } = await supabase
      .from("reviews")
      .insert([
        {
          author: formAuthor,
          treatment: formTreatment,
          rating: formRating,
          text: formText,
          likes: 0
        }
      ]);

    if (!error) {
      setIsSubmitted(true);
      setFormAuthor("");
      setFormTreatment("");
      setFormRating(5);
      setFormText("");

      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCF9] text-[#1C251D] antialiased">
      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto py-24 px-6 lg:px-12">
        
        {/* ========================================================================= */}
        {/* 1. CINEMATIC HEADER SECTION */}
        {/* ========================================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-32">
          <span className="text-[10px] tracking-[0.5em] text-[#3D5A45] font-semibold uppercase block mb-4">
            Our Promise To You
          </span>
          <h1 className="font-serif text-4xl md:text-5xl tracking-[0.1em] uppercase font-light leading-tight">
            The Golden Standards
          </h1>
          <div className="flex items-center justify-center gap-3 mt-6 opacity-40">
            <div className="w-16 h-[1px] bg-[#3D5A45]"></div>
            <div className="rotate-45 w-1.5 h-1.5 bg-[#3D5A45]"></div>
            <div className="w-16 h-[1px] bg-[#3D5A45]"></div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. ADVANCED ASYMMETRIC EDITORIAL PILLARS */}
        {/* ========================================================================= */}
        <div className="space-y-32 mb-40">
          
          {/* Pillar 01 - Clean Left Alignment */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
            <div className="lg:col-span-2 hidden lg:block text-center">
              <span className="font-serif text-7xl font-extralight text-[#3D5A45]/10 group-hover:text-[#3D5A45]/30 transition-colors duration-700 select-none block">
                01
              </span>
            </div>
            <div className="lg:col-span-10 border-l border-[#E6E1DA] pl-8 lg:pl-12 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-widest uppercase text-[#3D5A45] font-medium lg:hidden">01 / Hygiene</span>
                <h3 className="font-serif text-2xl tracking-wide uppercase font-light">Immaculate Hygiene Standards</h3>
              </div>
              <p className="font-sans text-sm text-[#1C251D]/70 leading-relaxed font-light max-w-3xl text-justify">
                Absolutely all procedures are performed with a 100% sterile instrument in our space. We strictly comply with all international health norms and standards of medical-grade hygiene. You can rest entirely peaceful for your health and the safety of your loved ones in our beauty salon. You are in expert hands.
              </p>
            </div>
          </div>

          {/* Pillar 02 - Inverted Offset Alignment */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
            <div className="lg:col-span-10 lg:text-right border-r lg:border-l-0 border-[#E6E1DA] pr-8 lg:pr-12 space-y-4 order-2 lg:order-1">
              <div className="flex items-center lg:justify-end gap-2">
                <h3 className="font-serif text-2xl tracking-wide uppercase font-light">Certified Technical Mastery</h3>
                <span className="text-[10px] tracking-widest uppercase text-[#3D5A45] font-medium lg:hidden">02 / Mastery</span>
              </div>
              <p className="font-sans text-sm text-[#1C251D]/70 leading-relaxed font-light max-w-3xl lg:ml-auto text-justify lg:text-right">
                Our specialists are trained and certified to meet high quality standards, putting their heart into every single stroke. Our manicure and pedicure artisans take specialized advanced training courses every single six months to implement new technologies and keep up with global trends.
              </p>
            </div>
            <div className="lg:col-span-2 hidden lg:block text-center order-1 lg:order-2">
              <span className="font-serif text-7xl font-extralight text-[#3D5A45]/10 group-hover:text-[#3D5A45]/30 transition-colors duration-700 select-none block">
                02
              </span>
            </div>
          </div>

          {/* Pillar 03 - Wide Editorial Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
            <div className="lg:col-span-2 hidden lg:block text-center">
              <span className="font-serif text-7xl font-extralight text-[#3D5A45]/10 group-hover:text-[#3D5A45]/30 transition-colors duration-700 select-none block">
                03
              </span>
            </div>
            <div className="lg:col-span-10 border-l border-[#E6E1DA] pl-8 lg:pl-12 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-widest uppercase text-[#3D5A45] font-medium lg:hidden">03 / Rituals</span>
                <h3 className="font-serif text-2xl tracking-wide uppercase font-light">The Coffee and Conversation Ritual</h3>
              </div>
              <p className="font-sans text-sm text-[#1C251D]/70 leading-relaxed font-light max-w-3xl text-justify">
                We want you to completely step away from all your worries temporarily. That is why we always welcome you with incredibly delicious aromatic coffee, hand-picked sweet treats, interesting cinema movies, and heartfelt conversations. Come just for a warm cup of coffee and a friendly chat—we will treat you with absolute pleasure.
              </p>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. STORIES FROM OUR DIARY DISPLAY */}
        {/* ========================================================================= */}
        <section className="space-y-16 mb-40">
          <div className="text-center">
            <span className="text-[10px] tracking-[0.5em] text-[#3D5A45] font-semibold uppercase block mb-3">
              Loved By Guests
            </span>
            <h2 className="font-serif text-3xl tracking-widest uppercase font-light">
              Stories From Our Diary
            </h2>
            <div className="w-12 h-[1px] bg-[#3D5A45]/20 mx-auto mt-4"></div>
          </div>

          {isLoading ? (
            <div className="text-center font-sans text-xs font-light text-[#1C251D]/40 py-24 tracking-[0.2em]">
              Syncing secure guest logs...
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center font-sans text-xs font-light text-[#1C251D]/40 py-24 italic tracking-widest">
              No verified stories shared in the diary yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <div 
                  key={review.id} 
                  className="bg-white border border-[#E6E1DA] p-8 flex flex-col justify-between transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(28,37,29,0.03)] group relative"
                >
                  <div>
                    {/* Exquisite luxury quotation background vector layout */}
                    <span className="absolute top-2 right-6 font-serif text-7xl text-[#E6E1DA]/30 font-bold select-none group-hover:text-[#3D5A45]/10 transition-colors duration-500">“</span>
                    
                    <div className="flex text-[#3D5A45] text-[10px] gap-1 mb-5 tracking-widest">
                      {"★".repeat(review.rating)}
                    </div>

                    <p className="font-sans text-xs font-light text-[#1C251D]/80 leading-relaxed italic mb-8">
                      "{review.text}"
                    </p>
                  </div>

                  <div className="border-t border-[#F2EFE9] pt-5 flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-xs font-normal text-[#1C251D] tracking-wider">{review.author}</h4>
                      <span className="text-[9px] tracking-widest text-[#3D5A45] font-light uppercase block mt-0.5">{review.treatment}</span>
                    </div>
                    
                    <button 
                      onClick={() => handleLike(review.id, review.likes)}
                      className="text-[10px] tracking-wider font-light text-[#1C251D]/40 hover:text-[#3D5A45] flex items-center gap-1.5 transition-colors cursor-pointer group/like"
                    >
                      <span className="group-hover/like:scale-125 transition-transform duration-300 block">❤️</span> 
                      <span>{review.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 4. PREMIUM ARCHITECTURAL SUBMISSION FORM */}
        {/* ========================================================================= */}
        <section className="max-w-xl mx-auto bg-white border border-[#E6E1DA] p-10 md:p-12 shadow-[0_30px_60px_rgba(28,37,29,0.02)]">
          <div className="text-center mb-10">
            <span className="text-[9px] tracking-[0.4em] text-[#3D5A45] font-semibold uppercase block mb-3">Share Your Journey</span>
            <h3 className="font-serif text-2xl tracking-wide uppercase font-light">Write A Review</h3>
            <div className="w-12 h-[1px] bg-[#3D5A45]/30 mx-auto mt-4"></div>
          </div>

          {isSubmitted && (
            <div className="mb-8 p-4 bg-[#F5F3EF] border border-[#3D5A45]/20 text-center text-xs font-sans font-light tracking-widest text-[#3D5A45] flex items-center justify-center gap-2">
              <span>✨</span> Story logged. Displayed pending quick moderation check.
            </div>
          )}

          <form onSubmit={handleSubmitReview} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block font-sans text-[10px] tracking-widest uppercase text-[#1C251D]/50 font-medium">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formAuthor}
                  onChange={(e) => setFormAuthor(e.target.value)}
                  placeholder="e.g. Elena R."
                  className="w-full bg-transparent border-b border-[#E6E1DA] py-2 font-sans text-xs font-light tracking-wide focus:outline-none focus:border-[#3D5A45] transition-colors placeholder:text-[#1C251D]/20"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block font-sans text-[10px] tracking-widest uppercase text-[#1C251D]/50 font-medium">Treatment Received</label>
                <input 
                  type="text" 
                  required
                  value={formTreatment}
                  onChange={(e) => setFormTreatment(e.target.value)}
                  placeholder="e.g. Classic Manicure"
                  className="w-full bg-transparent border-b border-[#E6E1DA] py-2 font-sans text-xs font-light tracking-wide focus:outline-none focus:border-[#3D5A45] transition-colors placeholder:text-[#1C251D]/20"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block font-sans text-[10px] tracking-widest uppercase text-[#1C251D]/50 font-medium">Rating Score</label>
              <div className="relative">
                <select 
                  value={formRating}
                  onChange={(e) => setFormRating(Number(e.target.value))}
                  className="w-full bg-transparent border-b border-[#E6E1DA] py-2 font-sans text-xs font-light tracking-wide focus:outline-none focus:border-[#3D5A45] transition-colors appearance-none rounded-none cursor-pointer text-[#1C251D]/80"
                  style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%233d5a45\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><polyline points=\'6 9 12 15 18 9\'></polyline></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 4px center' }}
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5) — Perfect Execution</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5) — Very Good</option>
                  <option value={3}>⭐⭐⭐ (3/5) — Average</option>
                  <option value={2}>⭐⭐ (2/5) — Needs Work</option>
                  <option value={1}>⭐ (1/5) — Unsatisfactory</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block font-sans text-[10px] tracking-widest uppercase text-[#1C251D]/50 font-medium">Your Experience Diary</label>
              <textarea 
                rows={4}
                required
                value={formText}
                onChange={(e) => setFormText(e.target.value)}
                placeholder="Share your thoughts about the atmosphere, immaculate hygiene, or our hospitality ritual..."
                className="w-full bg-[#FAF9F5] border border-[#E6E1DA] p-4 font-sans text-xs font-light tracking-wide focus:outline-none focus:border-[#3D5A45] transition-colors placeholder:text-[#1C251D]/20 resize-none leading-relaxed"
              ></textarea>
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                className="w-full bg-[#1C251D] text-white hover:bg-[#3D5A45] text-xs tracking-[0.25em] uppercase font-light py-4 transition-colors duration-500 rounded-none cursor-pointer shadow-sm relative overflow-hidden group"
              >
                <span className="relative z-10">Publish To Diary</span>
              </button>
            </div>
          </form>
        </section>

      </main>
    </div>
  );
}