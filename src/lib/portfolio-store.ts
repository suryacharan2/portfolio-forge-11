import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultPortfolio, type PortfolioData, type ThemeId } from "./portfolio-types";

interface PortfolioStore {
  data: PortfolioData;
  step: number;
  setData: (patch: Partial<PortfolioData>) => void;
  setField: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => void;
  setStep: (step: number) => void;
  setTheme: (theme: ThemeId) => void;
  reset: () => void;
}

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set) => ({
      data: defaultPortfolio,
      step: 1,
      setData: (patch) => set((s) => ({ data: { ...s.data, ...patch } })),
      setField: (key, value) => set((s) => ({ data: { ...s.data, [key]: value } })),
      setStep: (step) => set({ step }),
      setTheme: (theme) => set((s) => ({ data: { ...s.data, theme } })),
      reset: () => set({ data: defaultPortfolio, step: 1 }),
    }),
    { name: "portfolioforge-data" }
  )
);
