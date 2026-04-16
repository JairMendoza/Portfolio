import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { hobbiesData } from '@/data/hobbies';
import { Crosshair, Box, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const icons = {
  Crosshair: <Crosshair className="w-8 h-8 text-primary" />,
  Box: <Box className="w-8 h-8 text-primary" />,
  User: <User className="w-8 h-8 text-primary" />
};

export default function Hobbies() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const el = sectionRef.current;
    
    gsap.fromTo(
      cardsRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
        },
      }
    );
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="container mx-auto px-6 py-20 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-primary/5 blur-[120px] rounded-full z-0 pointer-events-none"></div>
      
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t('hobbies.title')}
        </h2>
        <p className="text-secondary-foreground text-lg max-w-2xl mx-auto">
          {t('hobbies.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10">
        {hobbiesData.map((hobby) => (
          <div 
            key={hobby.id} 
            ref={addToRefs}
            className="group relative bg-surface p-8 rounded-2xl border border-border overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_var(--color-primary-glow)]"
          >
            {/* Background pattern / glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center mb-6 border border-border group-hover:border-primary/50 transition-colors">
                {icons[hobby.icon]}
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                {hobby.title}
              </h3>
              
              <p className="text-secondary-foreground leading-relaxed">
                {hobby.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
