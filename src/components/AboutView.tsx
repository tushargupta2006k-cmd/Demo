import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Award, ShieldCheck, MapPin, Check, Heart, Trophy } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

export default function AboutView() {
  return (
    <div className="space-y-16 pb-16">
      {/* Page Header */}
      <section className="bg-primary text-white py-12 text-center space-y-4">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">About Our Store</h2>
        <p className="text-secondary/80 max-w-xl mx-auto text-sm sm:text-base">
          Our heritage, craftsmanship philosophy, owner Rajesh Sharma's vision, and daily operational hours.
        </p>
      </section>

      {/* Main Narrative & Owner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Beautiful wood collage / craft image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-secondary/20">
              <img 
                src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80" 
                alt="Woodworking workshop" 
                className="w-full h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 to-transparent"></div>
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-secondary/15 flex items-center gap-4">
                <div className="bg-primary text-accent p-3.5 rounded-xl">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-text-main">18 Years Craftsmanship</h4>
                  <p className="text-xs text-text-muted">Rajesh Sharma, Principal Designer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Narrative text */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-primary text-xs font-bold uppercase tracking-widest bg-primary-ultra-light px-3.5 py-1.5 rounded-full inline-block">
              Established 2015
            </span>
            <h3 className="text-3xl font-bold tracking-tight text-text-main">
              A Family Tradition of Beautiful Homes
            </h3>
            <p className="text-text-muted leading-relaxed text-sm sm:text-base">
              Sharma Furniture House was established in 2015 with a single core mission: to deliver heirloom-quality solid wood furniture and customizable interiors at workshop-direct prices to the people of Sirsa and nearby regions. 
            </p>
            <p className="text-text-muted leading-relaxed text-sm sm:text-base">
              Under the rigorous direction of our principal founder, <strong>Rajesh Sharma</strong>, who brings over 18 years of specialized woodworking and carpentry expertise, we have completed over 500+ custom projects and earned the trust of more than 2,500 happy families.
            </p>

            {/* Principles checks */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 text-primary p-1 rounded-full shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-sm text-text-muted font-medium">
                  <strong>Premium Timber Grading:</strong> We exclusively use high-density seasoned Sheesham and solid Teak, vacuum-treated against pests.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 text-primary p-1 rounded-full shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-sm text-text-muted font-medium">
                  <strong>Zero Middleman Margins:</strong> Raw wood sourcing to design to finishing is done inside our local workshop.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 text-primary p-1 rounded-full shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-sm text-text-muted font-medium">
                  <strong>Complete Setup Care:</strong> Free home delivery within 25 km and full structural installation support on-site.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Working Hours & Address section */}
      <section className="bg-secondary-light/40 border-y border-secondary/15 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Operational details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
              <Clock className="w-5 h-5 text-accent" />
              <span>Showroom Operations & Timings</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-text-main">
              Visit Our Sirsa Showroom
            </h3>
            <p className="text-text-muted text-sm sm:text-base leading-relaxed">
              We welcome you to visit our physical showroom located near the main Sirsa bus stand. Touch the quality, check the joints, choose polish shades, or speak with Rajesh Sharma directly for your custom architectural furniture needs.
            </p>

            <div className="bg-white border border-secondary/25 p-5 rounded-2xl shadow-xs space-y-4">
              <div className="flex items-start gap-3 text-text-main">
                <MapPin className="w-5.5 h-5.5 text-primary shrink-0" />
                <div className="text-sm">
                  <p className="font-bold">Sharma Furniture House</p>
                  <p className="text-text-muted">{BUSINESS_INFO.address.landmark}, {BUSINESS_INFO.address.market}</p>
                  <p className="text-text-muted">{BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} - {BUSINESS_INFO.address.pincode}</p>
                  <p className="text-text-muted font-semibold mt-1">{BUSINESS_INFO.address.country}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Beautiful timings table */}
          <div className="lg:col-span-7 bg-white border border-secondary/25 rounded-3xl shadow-xs overflow-hidden">
            <div className="bg-primary text-white p-5 flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              <h4 className="font-bold text-sm uppercase tracking-wider">Weekly Business Schedule</h4>
            </div>

            <div className="divide-y divide-secondary/20">
              {BUSINESS_INFO.workingHours.map((schedule) => {
                const isSunday = schedule.day === 'Sunday';
                return (
                  <div 
                    key={schedule.day} 
                    className={`flex justify-between items-center px-6 py-4.5 text-sm ${
                      isSunday ? 'bg-accent/5 font-semibold text-primary' : 'text-text-main'
                    }`}
                  >
                    <span className="font-bold flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isSunday ? 'bg-accent' : 'bg-primary'}`}></span>
                      {schedule.day}
                    </span>
                    <span className="font-mono text-xs font-bold text-text-muted">{schedule.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
