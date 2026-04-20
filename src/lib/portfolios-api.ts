import { supabase } from "@/integrations/supabase/client";
import type { PortfolioData } from "./portfolio-types";

export interface SavedPortfolio {
  id: string;
  user_id: string;
  name: string;
  data: PortfolioData;
  theme: string | null;
  created_at: string;
  updated_at: string;
}

export async function listPortfolios(): Promise<SavedPortfolio[]> {
  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as SavedPortfolio[];
}

export async function getPortfolio(id: string): Promise<SavedPortfolio> {
  const { data, error } = await supabase.from("portfolios").select("*").eq("id", id).single();
  if (error) throw error;
  return data as unknown as SavedPortfolio;
}

export async function createPortfolio(name: string, data: PortfolioData): Promise<SavedPortfolio> {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("Not authenticated");
  const { data: row, error } = await supabase
    .from("portfolios")
    .insert({ name, data: data as unknown as Record<string, unknown>, theme: data.theme, user_id: user.user.id })
    .select()
    .single();
  if (error) throw error;
  return row as unknown as SavedPortfolio;
}

export async function updatePortfolio(id: string, patch: { name?: string; data?: PortfolioData }) {
  const update: Record<string, unknown> = {};
  if (patch.name !== undefined) update.name = patch.name;
  if (patch.data !== undefined) {
    update.data = patch.data as unknown as Record<string, unknown>;
    update.theme = patch.data.theme;
  }
  const { error } = await supabase.from("portfolios").update(update).eq("id", id);
  if (error) throw error;
}

export async function deletePortfolio(id: string) {
  const { error } = await supabase.from("portfolios").delete().eq("id", id);
  if (error) throw error;
}
