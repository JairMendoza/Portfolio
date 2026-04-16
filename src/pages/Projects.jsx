import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '@/data/projects';
import * as Dialog from '@radix-ui/react-dialog';

export default function Projects() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = ['all', 'personal', 'frontend', 'backend', 'fullstack'];

  const filteredProjects = projectsData.filter((project) => 
    filter === 'all' 
      ? true 
      : filter === 'personal' 
        ? project.variant === 'personal' 
        : project.category === filter
  );

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <Helmet>
        <title>{t('projects.title')} | Jair Mendoza</title>
      </Helmet>

      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          {t('projects.title')}
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f 
                  ? 'bg-primary text-primary-foreground shadow-[0_0_15px_var(--color-primary-glow)]' 
                  : 'bg-surface hover:bg-surface-hover text-secondary-foreground hover:text-foreground border border-border'
              }`}
            >
              {t(`projects.filters.${f}`)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-2xl overflow-hidden border border-border group flex flex-col h-full"
              >
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      {project.category}
                    </span>
                    {project.variant === 'personal' && project.liveUrl ? (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-secondary-foreground hover:text-foreground">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    ) : null}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-secondary-foreground text-sm mb-6 flex-grow">{project.shortDesc}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="text-xs bg-surface-hover px-2 py-1 rounded text-secondary-foreground">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-xs bg-surface-hover px-2 py-1 rounded text-secondary-foreground">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {project.variant === 'collab' ? (
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <button 
                          className="w-full py-3 rounded-xl bg-surface hover:bg-surface-hover border border-border text-foreground transition-colors font-medium mt-auto"
                          onClick={() => setSelectedProject(project)}
                        >
                          Ver Detalles
                        </button>
                      </Dialog.Trigger>
                      
                      <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 animate-in fade-in" />
                        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-surface border border-border rounded-2xl p-6 md:p-10 shadow-2xl z-50 animate-in zoom-in-95">
                          {selectedProject && (
                            <>
                              <Dialog.Title className="text-3xl font-bold mb-2">
                                {selectedProject.title}
                              </Dialog.Title>
                              <div className="text-primary text-sm font-semibold uppercase mb-6">
                                {selectedProject.role}
                              </div>
                              
                              <p className="text-secondary-foreground leading-relaxed mb-8">
                                {selectedProject.longDesc}
                              </p>
                              
                              <div className="mb-8">
                                <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary-foreground mb-3">Tecnologías</h4>
                                <div className="flex flex-wrap gap-2">
                                  {selectedProject.tech.map(t => (
                                    <span key={t} className="bg-background border border-border px-3 py-1 rounded-full text-sm">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              {selectedProject.liveUrl && (
                                <a 
                                  href={selectedProject.liveUrl} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold rounded-xl transition-colors"
                                >
                                  Visitar Proyecto <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                              
                              <Dialog.Close asChild>
                                <button className="absolute top-6 right-6 text-secondary-foreground hover:text-foreground">
                                  <X className="w-6 h-6" />
                                </button>
                              </Dialog.Close>
                            </>
                          )}
                        </Dialog.Content>
                      </Dialog.Portal>
                    </Dialog.Root>
                  ) : (
                    project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full block text-center py-3 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground transition-colors font-medium mt-auto"
                      >
                        Visitar Proyecto
                      </a>
                    )
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
