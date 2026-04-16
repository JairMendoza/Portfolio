import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stackData } from '@/data/stack';
import { Code2, Server, Cloud, Hammer } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const icons = {
  frontend: <Code2 className="w-6 h-6 text-primary" />,
  backend: <Server className="w-6 h-6 text-primary" />,
  devops: <Cloud className="w-6 h-6 text-primary" />,
  tools: <Hammer className="w-6 h-6 text-primary" />
};

export default function Stack() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const el = sectionRef.current;
    
    gsap.fromTo(
      cardsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
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
    <section ref={sectionRef} className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t('stack.title')}
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full opacity-50"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {stackData.map((category, index) => (
          <div 
            key={category.category} 
            ref={addToRefs}
            className="glass p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              {icons[category.category]}
            </div>
            
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wider text-foreground">
              {t(`stack.${category.category}`)}
            </h3>
            
            <ul className="space-y-3">
              {category.items.map(item => (
                <li key={item} className="text-secondary-foreground flex items-center gap-2 text-sm font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
