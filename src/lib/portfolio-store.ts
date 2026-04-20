import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultPortfolio, type PortfolioData, type ThemeId } from "./portfolio-types";

interface PortfolioStore {
  data: PortfolioData;
  step: number;
  currentId: string | null;
  currentName: string;
  setData: (patch: Partial<PortfolioData>) => void;
  setField: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => void;
  setStep: (step: number) => void;
  setTheme: (theme: ThemeId) => void;
  loadPortfolio: (id: string, name: string, data: PortfolioData) => void;
  setCurrentName: (name: string) => void;
  reset: () => void;
}

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set) => ({
      data: defaultPortfolio,
      step: 1,
      currentId: null,
      currentName: "Untitled Portfolio",
      setData: (patch) => set((s) => ({ data: { ...s.data, ...patch } })),
      setField: (key, value) => set((s) => ({ data: { ...s.data, [key]: value } })),
      setStep: (step) => set({ step }),
      setTheme: (theme) => set((s) => ({ data: { ...s.data, theme } })),
      loadPortfolio: (id, name, data) => set({ currentId: id, currentName: name, data, step: 1 }),
      setCurrentName: (name) => set({ currentName: name }),
      reset: () => set({ data: defaultPortfolio, step: 1, currentId: null, currentName: "Untitled Portfolio" }),
    }),
    { name: "portfolioforge-data" }
  )
);
