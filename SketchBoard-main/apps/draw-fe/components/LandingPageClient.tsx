"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@repo/ui/button";
import { motion, Variants } from "framer-motion";
import { 
  ArrowRight, Play, PenTool, Users, Maximize, Library, Download, Terminal, 
  ChevronDown 
} from "lucide-react";
import heroImage from "@/assets/hero-whiteboard.jpg";

const AnimatedCanvasDemo = () => {
  return (
    <div className="relative w-full h-full group">
      <div className="absolute -inset-2 bg-gradient-to-br from-primary via-pink-500 to-red-500 rounded-2xl blur-lg opacity-10 group-hover:opacity-20 dark:opacity-25 dark:group-hover:opacity-40 transition-opacity duration-300"></div>
      <div className="relative w-full h-full bg-white/60 dark:bg-slate-900/80 backdrop-blur-sm rounded-lg p-2 border border-slate-200/80 dark:border-border shadow-2xl shadow-slate-900/5">
        <Image 
          src={heroImage} 
          alt="Animated demo of the SketchBoard canvas" 
          layout="fill" 
          objectFit="cover" 
          className="rounded-md opacity-90 dark:opacity-70"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 dark:bg-black/20 rounded-md">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
            <Play className="w-8 h-8 text-white" fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  );
};

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200/60 dark:border-border py-6 last:border-b-0">
      <button
        className="w-full flex justify-between items-center text-left gap-4"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className={`text-lg font-medium font-sans text-foreground transition-colors ${isOpen ? 'text-primary' : ''}`}>{question}</h3>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }} 
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-8 h-8 flex-shrink-0 bg-white dark:bg-surface rounded-full flex items-center justify-center border border-slate-200/80 dark:border-border"
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, marginTop: isOpen ? '1rem' : '0px', opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="pt-2 text-base font-sans text-muted-foreground leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
};

const containerVariants: Variants = {};
const itemVariants: Variants = {};
const fadeIn: Variants = {};

export function LandingPageClient({ isLoggedIn }: { isLoggedIn: boolean }) {
  const features = [
    { icon: <PenTool size={24} className="text-primary"/>, title: 'Natural Hand-Drawn Feel', description: 'Sketch with rough edges and organic shapes that mimic real drawing.' },
    { icon: <Users size={24} className="text-primary"/>, title: 'Collaborate Without Friction', description: 'See teammates\' cursors and edits update instantly.' },
    { icon: <Maximize size={24} className="text-primary"/>, title: 'Infinite Canvas, Zero Limits', description: 'Zoom, pan, and expand your workspace endlessly.' },
    { icon: <Library size={24} className="text-primary"/>, title: 'Extensive Shape Library', description: 'Build diagrams, flowcharts, and mockups in seconds.' },
    { icon: <Download size={24} className="text-primary"/>, title: 'Export Anywhere', description: 'Download your work as PNG, SVG, or share a live link.' },
    { icon: <Terminal size={24} className="text-primary"/>, title: 'Lightning-Fast Shortcuts', description: 'Navigate, create, and edit at speed with intuitive keyboard commands.' },
  ];

  const testimonials = [
    { quote: 'SketchBoard replaced our clunky whiteboarding tools. The hand-drawn aesthetic feels right.', name: 'Alex Rodriguez', title: 'Design Lead at DesignStudio', avatar: 'https://i.pravatar.cc/48?u=alex' },
    { quote: 'Finally, a whiteboard tool that doesn\'t feel corporate. Our team switched in one day.', name: 'Jamie Park', title: 'Founder of StartupXYZ', avatar: 'https://i.pravatar.cc/48?u=jamie' },
    { quote: 'The keyboard shortcuts are insanely fast. We\'ve cut our wireframing time in half.', name: 'Casey Miller', title: 'Product Manager at TechCorp', avatar: 'https://i.pravatar.cc/48?u=casey' },
  ];

  const faqs = [
    { question: 'Is SketchBoard really free?', answer: 'Yes, our Free plan includes unlimited boards and core sketching features. Upgrade anytime for advanced collaboration tools and integrations.' },
    { question: 'How does real-time collaboration work?', answer: 'SketchBoard uses WebSocket technology to sync changes instantly. See teammates\' cursors and edits in real-time—no refresh needed.'},
    { question: 'What file formats can I export?', answer: 'PNG and SVG (Pro plan) are supported. Shareable links are available for all plans.' },
    { question: 'Is my data secure?', answer: 'Yes, all data is encrypted in transit and at rest. We take data security and privacy very seriously.' }
  ];

  return (
    <div className="font-sans bg-slate-50 dark:bg-background text-foreground overflow-x-hidden">
      <section className="relative min-h-screen flex items-center justify-center text-center py-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] pointer-events-none">
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,_hsl(var(--primary)/0.05)_0%,_transparent_50%)] dark:bg-[radial-gradient(circle_at_center,_hsl(var(--primary)/0.15)_0%,_transparent_50%)]"></div>
        </div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-slate-50 dark:bg-background bg-[radial-gradient(hsl(var(--foreground)/0.03)_1px,transparent_1px)] dark:bg-[radial-gradient(hsl(var(--foreground)/0.05)_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold tracking-tight font-sans bg-gradient-to-b from-slate-900 to-slate-600 dark:from-foreground dark:to-muted-foreground bg-clip-text text-transparent"
            variants={fadeIn} initial="initial" animate="animate"
          >
            Infinite Canvas for Visual Thinking
          </motion.h1>
          <motion.p 
            className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed"
            variants={fadeIn} initial="initial" animate="animate" transition={{ delay: 0.1 }}
          >
            Sketch ideas, collaborate in real-time, and bring your thoughts to life—no learning curve, just pure creativity.
          </motion.p>
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={fadeIn} initial="initial" animate="animate" transition={{ delay: 0.2 }}
          >
            <Link href={isLoggedIn ? "/dashboard" : "/signup"}>
              <Button 
                variant="primary" 
                className="h-14 text-lg w-full sm:w-auto min-w-[240px] shadow-[0_0_2rem_-0.5rem_hsl(var(--primary)/40%)] transition-all duration-300 hover:shadow-[0_0_3rem_-0.5rem_hsl(var(--primary)/50%)]"
              >
                {isLoggedIn ? "Go to Dashboard" : "Start Drawing for Free"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
          <motion.div 
            className="mt-16 w-full max-w-4xl mx-auto aspect-video"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <AnimatedCanvasDemo />
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-24 px-6 bg-white dark:bg-surface">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-handwriting">Everything You Need to Create</h2>
            <p className="mt-4 text-lg text-muted-foreground">Powerful tools that feel natural, designed for teams who think visually.</p>
          </div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className={`
                  bg-slate-50 dark:bg-background border border-slate-200/80 dark:border-border rounded-2xl p-8 
                  flex flex-col items-start
                  transition-all duration-300
                  hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 dark:hover:border-primary/50 dark:hover:bg-surface
                  ${index === 0 ? 'lg:col-span-2' : ''}
                  ${index === 3 ? 'lg:col-span-2' : ''}
                `}
                variants={itemVariants}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 border border-primary/20">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 font-sans">{feature.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed font-sans">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-50 dark:bg-background">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-handwriting">Loved by Creative Teams Worldwide</h2>
          </div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-surface border border-slate-200/80 dark:border-border rounded-2xl p-8 h-full flex flex-col shadow-lg shadow-slate-900/5 dark:shadow-none"
                variants={itemVariants}
              >
                <p className="text-base italic text-muted-foreground leading-relaxed mb-6 font-sans">"{testimonial.quote}"</p>
                <div className="mt-auto flex items-center gap-4 pt-6 border-t border-slate-200/60 dark:border-border">
                  <Image src={testimonial.avatar} alt={testimonial.name} width={48} height={48} className="w-12 h-12 rounded-full border-2 border-slate-200 dark:border-border" />
                  <div>
                    <p className="font-semibold text-base text-foreground font-sans">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground font-sans">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white dark:bg-surface">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-handwriting">Frequently Asked Questions</h2>
          </div>
          <div className="bg-slate-50 dark:bg-background border border-slate-200/80 dark:border-border rounded-2xl p-2 sm:p-4">
            {faqs.map((faq, index) => <FaqItem key={index} question={faq.question} answer={faq.answer} />)}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative overflow-hidden bg-slate-50 dark:bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,_hsl(var(--primary)/0.05)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle_at_center,_hsl(var(--primary)/0.15)_0%,_transparent_60%)]"></div>
        </div>
        <div className="container mx-auto text-center max-w-3xl relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-sans bg-gradient-to-b from-slate-900 to-slate-700 dark:from-foreground dark:to-muted-foreground bg-clip-text text-transparent">Ready to Transform Your Ideas?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Join thousands of teams already sketching, collaborating, and creating with SketchBoard. Get started for free today.
          </p>
          <div className="mt-10 flex justify-center">
            <Link href={isLoggedIn ? "/dashboard" : "/signup"}>
              <Button 
                variant="primary" 
                className="h-14 text-lg min-w-60 shadow-[0_0_2rem_-0.5rem_hsl(var(--primary)/40%)] transition-all duration-300 hover:shadow-[0_0_3rem_-0.5rem_hsl(var(--primary)/50%)]"
              >
                {isLoggedIn ? "Back to Dashboard" : "Start Drawing for Free"}
              </Button>
            </Link>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground">Free forever</p>
        </div>
      </section>
    </div>
  );
}
