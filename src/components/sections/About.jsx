import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    const el = sectionRef.current;
    
    gsap.fromTo(
      elementsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="container mx-auto px-6 py-20 relative">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center md:items-start">
        
        {/* Avatar */}
        <div 
          ref={addToRefs} 
          className="shrink-0 w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-surface border border-border flex items-center justify-center shadow-lg relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span className="text-6xl md:text-8xl font-black tracking-tighter text-foreground group-hover:scale-110 transition-transform duration-500">
            JM
          </span>
        </div>

        {/* Bio content */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h2 ref={addToRefs} className="text-3xl md:text-4xl font-bold">
            {t('about.title')}
          </h2>
          
          <div ref={addToRefs} className="space-y-4 text-secondary-foreground text-lg leading-relaxed">
            <p>{t('about.bio1')}</p>
            <p>{t('about.bio2')}</p>
          </div>
          
          <div ref={addToRefs} className="grid grid-cols-2 gap-4 pt-6 border-t border-border mt-8">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-3xl font-black text-primary">15+</span>
              <span className="text-xs text-secondary-foreground uppercase tracking-wider mt-1">{t('about.stats.projects')}</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="text-3xl font-black text-primary">15+</span>
              <span className="text-xs text-secondary-foreground uppercase tracking-wider mt-1">{t('about.stats.techs')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
