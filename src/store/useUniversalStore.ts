import { create } from "zustand";
import { PortfolioRepository } from "../repositories";
import type { PortfolioData } from "../domain/portfolio";

interface UniversalStoreState extends PortfolioData {
  isLoading: boolean;
  error: string | null;
  isSaving: boolean;
  
  // Actions
  fetchPortfolioData: () => Promise<void>;
  
  // Update local state (Optimistic)
  setProfile: (profile: PortfolioData["profile"]) => void;
  setProjects: (projects: PortfolioData["projects"]) => void;
  setSkills: (skills: PortfolioData["skills"]) => void;
  setExperience: (experience: PortfolioData["experience"]) => void;
  setEducation: (education: PortfolioData["education"]) => void;
  setCertificates: (certificates: PortfolioData["certificates"]) => void;
  setArticles: (articles: PortfolioData["articles"]) => void;
  setMedia: (media: PortfolioData["media"]) => void;
  setSocialLinks: (socialLinks: PortfolioData["socialLinks"]) => void;
  setSEO: (seo: PortfolioData["seo"]) => void;
  setSettings: (settings: PortfolioData["settings"]) => void;
  setTestimonials: (testimonials: PortfolioData["testimonials"]) => void;
  setServices: (services: PortfolioData["services"]) => void;
  setNavigation: (navigation: PortfolioData["navigation"]) => void;

  // Persist to Supabase
  saveToSupabase: () => Promise<void>;
}

export const useUniversalStore = create<UniversalStoreState>((set, get) => ({
  profile: null,
  projects: [],
  skills: [],
  experience: [],
  education: [],
  certificates: [],
  articles: [],
  media: [],
  socialLinks: null,
  seo: null,
  settings: null,
  testimonials: [],
  services: [],
  navigation: [],

  isLoading: false,
  error: null,
  isSaving: false,

  fetchPortfolioData: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await PortfolioRepository.fetchAll();
      set({ ...data, isLoading: false });
    } catch (err: any) {
      console.error("Failed to fetch universal portfolio data:", err);
      set({ error: err.message, isLoading: false });
    }
  },

  setProfile: (profile) => set({ profile }),
  setProjects: (projects) => set({ projects }),
  setSkills: (skills) => set({ skills }),
  setExperience: (experience) => set({ experience }),
  setEducation: (education) => set({ education }),
  setCertificates: (certificates) => set({ certificates }),
  setArticles: (articles) => set({ articles }),
  setMedia: (media) => set({ media }),
  setSocialLinks: (socialLinks) => set({ socialLinks }),
  setSEO: (seo) => set({ seo }),
  setSettings: (settings) => set({ settings }),
  setTestimonials: (testimonials) => set({ testimonials }),
  setServices: (services) => set({ services }),
  setNavigation: (navigation) => set({ navigation }),

  saveToSupabase: async () => {
    set({ isSaving: true, error: null });
    try {
      const state = get();
      
      // We run all save operations in parallel to push the current state
      await Promise.all([
        PortfolioRepository.saveProfile(state.profile),
        PortfolioRepository.saveProjects(state.projects),
        PortfolioRepository.saveSkills(state.skills),
        PortfolioRepository.saveExperience(state.experience),
        PortfolioRepository.saveEducation(state.education),
        PortfolioRepository.saveCertificates(state.certificates),
        PortfolioRepository.saveArticles(state.articles),
        PortfolioRepository.saveMedia(state.media),
        PortfolioRepository.saveSocialLinks(state.socialLinks),
        PortfolioRepository.saveSEO(state.seo),
        PortfolioRepository.saveSettings(state.settings),
        PortfolioRepository.saveTestimonials(state.testimonials),
        PortfolioRepository.saveServices(state.services),
        PortfolioRepository.saveNavigation(state.navigation),
      ]);
      
      set({ isSaving: false });
    } catch (err: any) {
      console.error("Failed to save universal portfolio data:", err);
      set({ error: err.message, isSaving: false });
    }
  }
}));
