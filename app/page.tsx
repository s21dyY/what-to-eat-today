'use client'

import Link from 'next/link'
import { ChefHat, Sparkles, ShieldCheck, Zap, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

// Animation variants for cleaner code
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-x-hidden">
      {/* 1. Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-50">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-orange-200">
            W
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">WhatToEatToday</span>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-orange-500 transition-colors">
            Sign In
          </Link>
        </motion.div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 lg:pt-32 lg:pb-40">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -mr-20 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-3xl -z-10" />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial="initial"
            animate="animate"
            variants={{
              animate: { transition: { staggerChildren: 0.1 } }
            }}
            className="text-center lg:text-left">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-orange-100">
              <Sparkles size={14} />
              By Sandy Yang
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
              Stop staring at the fridge. <br />
              <span className="text-orange-500">Just cook it.</span>
            </motion.h1 >
            
            <motion.p variants={fadeInUp} className="text-xl text-slate-500 mb-10 leading-relaxed max-w-md mx-auto lg:mx-0 font-medium">
              The minimalist meal planner for the indecisive kitchen.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/login" className="group bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold transition-all hover:bg-orange-600 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-slate-200">
                Start Cooking
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/*The Visual Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            className="relative">
            {/* Floating Status Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 bg-white shadow-2xl rounded-2xl p-4 z-30 border border-slate-50 flex items-center gap-3" >
              <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Pantry</p>
                <p className="text-sm font-bold text-slate-800">Everything Fresh</p>
              </div>
            </motion.div>

            {/* Main Mockup Card */}
            <div className="relative aspect-square bg-white border border-slate-100 rounded-[3rem] shadow-2xl p-8 overflow-hidden">
               <div className="flex justify-between items-center mb-10">
                  <div className="space-y-2">
                    <div className="h-2 w-12 bg-slate-100 rounded-full" />
                    <div className="h-3 w-32 bg-slate-900 rounded-full" />
                  </div>
                  <ChefHat className="text-orange-500" size={32} />
               </div>

               <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm" />
                        <div className="space-y-2">
                          <div className="h-2 w-20 bg-slate-200 rounded-full" />
                          <div className="h-2 w-12 bg-slate-100 rounded-full" />
                        </div>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 border-orange-500" />
                    </div>
                  ))}
                  
                  {/* AI Generating Animation Placeholder */}
                  <motion.div 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mt-6 p-5 bg-orange-500 rounded-2xl text-white text-center font-bold shadow-lg shadow-orange-200">
                    Brainstorming Recipes...
                  </motion.div>
               </div>
            </div>

            {/* Background Blur Blobs for Visual */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100/50 rounded-full blur-3xl -z-10" />
          </motion.div>

        </div>
      </section>
    </div>
  )
}