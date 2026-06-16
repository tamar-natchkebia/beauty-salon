"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import { createClient } from "@supabase/supabase-js";

interface Service {
  id: string;
  name: string;
  category: string;
  duration: string;
}

const supabase = createClient(
  "https://senchgucwjsitagylknx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlbmNoZ3Vjd2pzaXRhZ3lsa254Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwNzUzNjcsImV4cCI6MjA5NjY1MTM2N30.odquTmokx06Og34-5KDjk7LjuGQOpJPc8d0HP5Hoe_Q"
);

const SERVICES_DATA: Service[] = [
  // --- NAILS & EYES ---
  { id: "m1", name: "Classic Manicure & Polish", category: "Nails", duration: "45 min" },
  { id: "p1", name: "Premium Pedicure Care", category: "Nails", duration: "60 min" },
  { id: "e1", name: "Classic Eyelash Extensions", category: "Eyes", duration: "90 min" },
  
  // --- HAIR & ESTHETICS ---
  { id: "h1", name: "Bespoke Haircut & Blowout", category: "Hair", duration: "60 min" },
  { id: "l1", name: "Precision Laser Hair Removal", category: "Esthetics", duration: "30 min" },

  // --- SKINCARE TREATMENTS ---
  { id: "s1", name: "Deep Cleansing & Salicylic Acid Glow Facial", category: "Skincare", duration: "60 min" },
  { id: "s2", name: "Hydrating Squalane & Botanical Infusion", category: "Skincare", duration: "75 min" },
  { id: "s3", name: "Brightening Papaya Enzyme Resurfacing Peel", category: "Skincare", duration: "45 min" },

  // --- SPA & WELLNESS ---
  { id: "spa1", name: "Whipped Shea Butter Body Renewal Scrub", category: "Spa", duration: "60 min" },
  { id: "spa2", name: "Deep Tissue Stress Relief Massage", category: "Spa", duration: "90 min" },
  { id: "spa3", name: "Aromatic Hot Stone Relaxation Ritual", category: "Spa", duration: "75 min" },
];

const TIME_SLOTS = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00"];

export default function BookAppointment() {
  // Application State Hub
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "", // Captures real email for DB matching
    phone: "",
    preference: "WhatsApp",
    notes: ""
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form Submission Processing linked directly to your bookings table
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const { error } = await supabase
        .from("bookings") // Points perfectly to your real database table
        .insert([
          {
            client_name: formData.name,
            client_email: formData.email,
            treatment: selectedService.name,
            booking_date: selectedDate,
            booking_time: selectedTime,
            status: "pending" // Sets an initial status for dashboard tracking
          }
        ]);

      if (error) throw error;

      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Booking submission error:", err);
      setErrorMessage(err.message || "An unexpected connection error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen bg-off-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white border border-cream p-12 max-w-md w-full text-center shadow-sm">
            <span className="text-3xl mb-4 block">✨</span>
            <h2 className="font-serif text-2xl tracking-wide uppercase text-near-black mb-3 font-light">
              Booking Requested
            </h2>
            <p className="font-sans text-xs text-near-black/70 leading-relaxed mb-6 font-light">
              Thank you, <span className="font-normal text-near-black">{formData.name}</span>. Your appointment for <span className="font-normal text-near-black">{selectedService?.name}</span> on {selectedDate} at {selectedTime} has been received. We will contact you via {formData.preference} shortly!
            </p>
            <div className="border-t border-cream pt-4">
              <p className="text-[10px] tracking-widest text-near-black/50 uppercase font-light">
                Please call back at +995 514 64 64 64 if the line is busy
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-off-white">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto py-12 px-6">
        
        {/* Editorial Header */}
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.4em] text-forest font-light uppercase block mb-2">
            Reservations
          </span>
          <h1 className="font-serif text-3xl md:text-4xl tracking-widest text-near-black uppercase font-light">
            Book Appointment
          </h1>
          <div className="w-12 h-[1px] bg-forest/30 mx-auto mt-4"></div>
        </div>

        {/* Dynamic Progress Indicator Strip */}
        <div className="flex justify-between items-center max-w-md mx-auto mb-12 text-[10px] tracking-[0.2em] uppercase font-light text-near-black/40">
          <span className={`pb-2 border-b transition-colors duration-300 ${currentStep === 1 ? "text-forest border-forest font-normal" : "border-transparent"}`}>
            1. Treatment
          </span>
          <span className={`pb-2 border-b transition-colors duration-300 ${currentStep === 2 ? "text-forest border-forest font-normal" : "border-transparent"}`}>
            2. Date & Time
          </span>
          <span className={`pb-2 border-b transition-colors duration-300 ${currentStep === 3 ? "text-forest border-forest font-normal" : "border-transparent"}`}>
            3. Confirmation
          </span>
        </div>

        {errorMessage && (
          <div className="max-w-md mx-auto mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs tracking-wide">
            ⚠️ Database Error: {errorMessage}
          </div>
        )}

        {/* Step 1 Layout: Treatment Selector Grid */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="font-serif text-lg tracking-wide uppercase text-near-black font-light text-center mb-4">
              Select a Premium Service
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SERVICES_DATA.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`p-5 text-left border rounded-none transition-all duration-300 flex justify-between items-center cursor-pointer ${
                    selectedService?.id === service.id
                      ? "border-forest bg-forest/5 shadow-sm"
                      : "border-cream bg-white hover:border-forest/50"
                  }`}
                >
                  <div>
                    <span className="text-[9px] tracking-widest text-forest uppercase block font-light mb-1">
                      {service.category}
                    </span>
                    <span className="font-sans text-xs font-normal tracking-wide text-near-black block">
                      {service.name}
                    </span>
                  </div>
                  <span className="text-[10px] tracking-wider text-near-black/50 font-light">
                    {service.duration}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-6">
              <button
                disabled={!selectedService}
                onClick={() => setCurrentStep(2)}
                className="bg-forest text-white text-xs tracking-[0.2em] uppercase font-light px-8 py-3 hover:bg-deep-green disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm rounded-none"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 2 Layout: Scheduling System */}
        {currentStep === 2 && (
          <div className="bg-white border border-cream p-8 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Date Input Column */}
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase font-light text-near-black/70 mb-3">
                  Select Calendar Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split("T")[0]} // Prevents booking past dates
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-off-white border border-cream px-4 py-3 text-xs font-light focus:outline-none focus:border-forest tracking-wider rounded-none text-near-black"
                />
              </div>

              {/* Time Slots Selection Column */}
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase font-light text-near-black/70 mb-3">
                  Available Sessions
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2.5 text-center text-xs font-light tracking-widest border transition-all rounded-none cursor-pointer ${
                        selectedTime === time
                          ? "bg-forest text-white border-forest"
                          : "bg-white border-cream text-near-black/80 hover:border-forest/50"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step Navigation Buttons */}
            <div className="flex justify-between border-t border-cream pt-6">
              <button
                onClick={() => setCurrentStep(1)}
                className="border border-cream text-near-black/70 text-xs tracking-[0.2em] uppercase font-light px-6 py-3 hover:bg-off-white transition-colors rounded-none"
              >
                Back
              </button>
              <button
                disabled={!selectedDate || !selectedTime}
                onClick={() => setCurrentStep(3)}
                className="bg-forest text-white text-xs tracking-[0.2em] uppercase font-light px-8 py-3 hover:bg-deep-green disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm rounded-none"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 3 Layout: Final Personal Verification Details */}
        {currentStep === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Input Details Form Fields */}
            <div className="lg:col-span-2 bg-white border border-cream p-8 shadow-sm">
              <h3 className="font-serif text-lg tracking-wide uppercase text-near-black font-light mb-6">
                Client Contact Details
              </h3>
              <form onSubmit={handleFinalSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase font-light text-near-black/70 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-off-white border border-cream px-4 py-3 text-xs font-light tracking-wider focus:outline-none focus:border-forest text-near-black rounded-none"
                    placeholder="Your Name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase font-light text-near-black/70 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-off-white border border-cream px-4 py-3 text-xs font-light tracking-wider focus:outline-none focus:border-forest text-near-black rounded-none"
                      placeholder="mara@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase font-light text-near-black/70 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-off-white border border-cream px-4 py-3 text-xs font-light tracking-wider focus:outline-none focus:border-forest text-near-black rounded-none"
                      placeholder="+995 514 64 64 64"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase font-light text-near-black/70 mb-3">
                    Preferred Communication Method
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-light tracking-wide text-near-black/80">
                    {["Phone Call", "WhatsApp", "Viber", "Telegram"].map((method) => (
                      <label key={method} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="form-preference"
                          value={method}
                          checked={formData.preference === method}
                          onChange={(e) => setFormData({ ...formData, preference: e.target.value })}
                          className="accent-forest"
                        />
                        <span>{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase font-light text-near-black/70 mb-2">Special Accommodations / Comments</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-off-white border border-cream px-4 py-3 text-xs font-light tracking-wider focus:outline-none focus:border-forest text-near-black rounded-none resize-none"
                    placeholder="Any specific requests for our team..."
                  />
                </div>

                <div className="flex justify-between border-t border-cream pt-6">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setCurrentStep(2)}
                    className="border border-cream text-near-black/70 text-xs tracking-[0.2em] uppercase font-light px-6 py-3 hover:bg-off-white transition-colors rounded-none disabled:opacity-40"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-forest text-white text-xs tracking-[0.2em] uppercase font-light px-8 py-3 hover:bg-deep-green transition-colors shadow-sm rounded-none disabled:opacity-40"
                  >
                    {isSubmitting ? "Processing..." : "Confirm Reservation"}
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar Sticky Receipt Card */}
            <div className="bg-cream/30 border border-cream p-6 text-near-black space-y-4">
              <h4 className="font-serif text-xs tracking-[0.2em] uppercase text-near-black font-semibold border-b border-cream pb-3">
                Appointment Summary
              </h4>
              <div className="space-y-3 text-xs font-light tracking-wide">
                <div className="flex justify-between">
                  <span className="text-near-black/60">Treatment:</span>
                  <span className="text-right font-normal max-w-[140px] truncate">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-near-black/60">Duration:</span>
                  <span className="font-normal">{selectedService?.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-near-black/60">Date:</span>
                  <span className="font-normal">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-near-black/60">Time Session:</span>
                  <span className="font-normal">{selectedTime}</span>
                </div>
              </div>
              <div className="border-t border-cream pt-4 text-[10px] text-near-black/50 tracking-wider leading-relaxed">
                📍 Tbilisi, Saburtalo, Kazbegi Ave. 43
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}