import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAppStore = create(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      language: 'es',
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'portfolio-storage',
    }
  )
);

export default useAppStore;
