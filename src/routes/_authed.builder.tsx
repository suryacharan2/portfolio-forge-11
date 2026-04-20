import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Eye, Plus, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { usePortfolioStore } from "@/lib/portfolio-store";
import type { Education, Experience, Project, ThemeId } from "@/lib/portfolio-types";

export const Route = createFileRoute("/_authed/builder")({
  head: () => ({
    meta: [
      { title: "Portfolio Builder — PortfolioForge" },
      { name: "description", content: "Fill out 8 quick steps and pick a theme to generate your portfolio." },
      { property: "og:title", content: "Portfolio Builder — PortfolioForge" },
      { property: "og:description", content: "8-step builder. Live preview. Instant download." },
    ],
  }),
  component: Builder,
});

const TOTAL_STEPS = 8;
const STEP_TITLES = [
  "Personal Details", "About", "Education", "Skills",
  "Experience", "Projects", "Extra Info", "Theme",
];

const THEMES: { id: ThemeId; name: string; desc: string; grad: string }[] = [
  { id: "cyber", name: "Cyber Neon", desc: "Dark futuristic with neon glow & particles.", grad: "from-cyan-500 to-pink-500" },
  { id: "minimal", name: "Minimal Elegant", desc: "Clean, premium, editorial typography.", grad: "from-zinc-300 to-zinc-500" },
  { id: "matrix", name: "Developer Matrix", desc: "Terminal vibes & code aesthetic.", grad: "from-green-500 to-emerald-700" },
  { id: "gradient", name: "Creative Gradient", desc: "Floating blobs & vibrant gradients.", grad: "from-pink-500 via-purple-500 to-indigo-500" },
  { id: "luxury", name: "Luxury Gold", desc: "Executive black-and-gold finish.", grad: "from-amber-300 to-yellow-700" },
];

function Builder() {
  const { data, step, setField, setStep, setData } = usePortfolioStore();
  const navigate = Route.useNavigate();
  const [photoLoading, setPhotoLoading] = useState(false);

  const next = () => {
    if (step === 1 && (!data.fullName || !data.email)) {
      toast.error("Please fill in your name and email");
      return;
    }
    if (step < TOTAL_STEPS) setStep(step + 1);
    else navigate({ to: "/preview" });
  };
  const back = () => step > 1 && setStep(step - 1);

  const onPhoto = (file?: File | null) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2 MB");
      return;
    }
    setPhotoLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setField("photo", String(reader.result));
      setPhotoLoading(false);
      toast.success("Photo uploaded");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Step {step} of {TOTAL_STEPS}</p>
              <h1 className="font-display text-3xl font-bold mt-1">{STEP_TITLES[step - 1]}</h1>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link to="/preview"><Eye className="h-4 w-4" /> Preview</Link>
            </Button>
          </div>
          <Progress value={(step / TOTAL_STEPS) * 100} className="h-2" />
        </div>

        <Card className="p-6 md:p-8 shadow-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {step === 1 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Full Name *"><Input value={data.fullName} onChange={(e) => setField("fullName", e.target.value)} /></Field>
                  <Field label="Professional Title"><Input value={data.title} onChange={(e) => setField("title", e.target.value)} placeholder="Full-Stack Developer" /></Field>
                  <Field label="Tagline" full><Input value={data.tagline} onChange={(e) => setField("tagline", e.target.value)} placeholder="I build delightful experiences" /></Field>
                  <Field label="Email *"><Input type="email" value={data.email} onChange={(e) => setField("email", e.target.value)} /></Field>
                  <Field label="Phone"><Input value={data.phone} onChange={(e) => setField("phone", e.target.value)} /></Field>
                  <Field label="Location"><Input value={data.location} onChange={(e) => setField("location", e.target.value)} /></Field>
                  <Field label="LinkedIn"><Input value={data.linkedin} onChange={(e) => setField("linkedin", e.target.value)} /></Field>
                  <Field label="GitHub"><Input value={data.github} onChange={(e) => setField("github", e.target.value)} /></Field>
                  <Field label="Website"><Input value={data.website} onChange={(e) => setField("website", e.target.value)} /></Field>
                  <Field label="Profile Photo" full>
                    <label className="flex items-center gap-3 p-4 rounded-lg border border-dashed border-border cursor-pointer hover:bg-accent/30 transition-colors">
                      {data.photo ? (
                        <img src={data.photo} alt="Preview" className="h-14 w-14 rounded-full object-cover" />
                      ) : (
                        <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center"><Upload className="h-5 w-5 text-muted-foreground" /></div>
                      )}
                      <div className="text-sm">
                        <div className="font-medium">{photoLoading ? "Uploading…" : data.photo ? "Change photo" : "Upload photo"}</div>
                        <div className="text-muted-foreground">PNG / JPG, under 2 MB</div>
                      </div>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => onPhoto(e.target.files?.[0])} />
                    </label>
                  </Field>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-4">
                  <Field label="Short Bio"><Textarea rows={4} value={data.bio} onChange={(e) => setField("bio", e.target.value)} /></Field>
                  <Field label="Career Objective"><Textarea rows={3} value={data.objective} onChange={(e) => setField("objective", e.target.value)} /></Field>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Key Strengths (comma separated)"><Input value={data.strengths} onChange={(e) => setField("strengths", e.target.value)} /></Field>
                    <Field label="Languages Known"><Input value={data.languages} onChange={(e) => setField("languages", e.target.value)} /></Field>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  {data.education.map((e, idx) => (
                    <Card key={e.id} className="p-4 bg-muted/40">
                      <div className="grid gap-3 md:grid-cols-2">
                        <Input placeholder="Degree" value={e.degree} onChange={(ev) => updateArr(setData, data.education, idx, { degree: ev.target.value }, "education")} />
                        <Input placeholder="College" value={e.college} onChange={(ev) => updateArr(setData, data.education, idx, { college: ev.target.value }, "education")} />
                        <Input placeholder="Branch" value={e.branch} onChange={(ev) => updateArr(setData, data.education, idx, { branch: ev.target.value }, "education")} />
                        <Input placeholder="CGPA" value={e.cgpa} onChange={(ev) => updateArr(setData, data.education, idx, { cgpa: ev.target.value }, "education")} />
                        <Input placeholder="Graduation Year" value={e.year} onChange={(ev) => updateArr(setData, data.education, idx, { year: ev.target.value }, "education")} />
                      </div>
                      {data.education.length > 1 && (
                        <Button variant="ghost" size="sm" className="mt-3 text-destructive" onClick={() => setData({ education: data.education.filter((_, i) => i !== idx) })}>
                          <Trash2 className="h-4 w-4" /> Remove
                        </Button>
                      )}
                    </Card>
                  ))}
                  <Button variant="outline" onClick={() => setData({ education: [...data.education, blankEdu()] })}>
                    <Plus className="h-4 w-4" /> Add Education
                  </Button>
                  <Field label="Certifications"><Textarea rows={3} value={data.certifications} onChange={(e) => setField("certifications", e.target.value)} placeholder="Comma separated" /></Field>
                </div>
              )}

              {step === 4 && (
                <div className="grid gap-4">
                  <Field label="Technical Skills (comma separated)"><Input value={data.techSkills} onChange={(e) => setField("techSkills", e.target.value)} /></Field>
                  <Field label="Frameworks"><Input value={data.frameworks} onChange={(e) => setField("frameworks", e.target.value)} /></Field>
                  <Field label="Tools"><Input value={data.tools} onChange={(e) => setField("tools", e.target.value)} /></Field>
                  <Field label="Soft Skills"><Input value={data.softSkills} onChange={(e) => setField("softSkills", e.target.value)} /></Field>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-4">
                  {data.experience.map((x, idx) => (
                    <Card key={x.id} className="p-4 bg-muted/40">
                      <div className="grid gap-3 md:grid-cols-2">
                        <Input placeholder="Role" value={x.role} onChange={(ev) => updateArr(setData, data.experience, idx, { role: ev.target.value }, "experience")} />
                        <Input placeholder="Company" value={x.company} onChange={(ev) => updateArr(setData, data.experience, idx, { company: ev.target.value }, "experience")} />
                        <Input placeholder="Period (e.g., Jun 2023 — Sep 2023)" value={x.period} onChange={(ev) => updateArr(setData, data.experience, idx, { period: ev.target.value }, "experience")} className="md:col-span-2" />
                        <Textarea placeholder="Responsibilities & achievements" value={x.description} onChange={(ev) => updateArr(setData, data.experience, idx, { description: ev.target.value }, "experience")} className="md:col-span-2" rows={3} />
                      </div>
                      <Button variant="ghost" size="sm" className="mt-3 text-destructive" onClick={() => setData({ experience: data.experience.filter((_, i) => i !== idx) })}>
                        <Trash2 className="h-4 w-4" /> Remove
                      </Button>
                    </Card>
                  ))}
                  <Button variant="outline" onClick={() => setData({ experience: [...data.experience, blankExp()] })}>
                    <Plus className="h-4 w-4" /> Add Experience
                  </Button>
                </div>
              )}

              {step === 6 && (
                <div className="space-y-4">
                  {data.projects.map((p, idx) => (
                    <Card key={p.id} className="p-4 bg-muted/40">
                      <div className="grid gap-3 md:grid-cols-2">
                        <Input placeholder="Project title" value={p.title} onChange={(ev) => updateArr(setData, data.projects, idx, { title: ev.target.value }, "projects")} />
                        <Input placeholder="Tech stack (comma separated)" value={p.tech} onChange={(ev) => updateArr(setData, data.projects, idx, { tech: ev.target.value }, "projects")} />
                        <Textarea placeholder="Description" rows={3} value={p.description} onChange={(ev) => updateArr(setData, data.projects, idx, { description: ev.target.value }, "projects")} className="md:col-span-2" />
                        <Input placeholder="GitHub link" value={p.github} onChange={(ev) => updateArr(setData, data.projects, idx, { github: ev.target.value }, "projects")} />
                        <Input placeholder="Live demo link" value={p.demo} onChange={(ev) => updateArr(setData, data.projects, idx, { demo: ev.target.value }, "projects")} />
                      </div>
                      <Button variant="ghost" size="sm" className="mt-3 text-destructive" onClick={() => setData({ projects: data.projects.filter((_, i) => i !== idx) })}>
                        <Trash2 className="h-4 w-4" /> Remove
                      </Button>
                    </Card>
                  ))}
                  <Button variant="outline" onClick={() => setData({ projects: [...data.projects, blankProject()] })}>
                    <Plus className="h-4 w-4" /> Add Project
                  </Button>
                </div>
              )}

              {step === 7 && (
                <div className="grid gap-4">
                  <Field label="Awards"><Textarea rows={2} value={data.awards} onChange={(e) => setField("awards", e.target.value)} /></Field>
                  <Field label="Hackathons"><Textarea rows={2} value={data.hackathons} onChange={(e) => setField("hackathons", e.target.value)} /></Field>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Interests"><Input value={data.interests} onChange={(e) => setField("interests", e.target.value)} /></Field>
                    <Field label="Hobbies"><Input value={data.hobbies} onChange={(e) => setField("hobbies", e.target.value)} /></Field>
                  </div>
                </div>
              )}

              {step === 8 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {THEMES.map((t) => {
                    const active = data.theme === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => { setField("theme", t.id); toast.success(`${t.name} theme selected`); }}
                        className={`text-left rounded-xl border-2 overflow-hidden transition-all ${active ? "border-primary shadow-glow" : "border-border hover:border-primary/40"}`}
                      >
                        <div className={`h-32 bg-gradient-to-br ${t.grad} relative`}>
                          {active && <div className="absolute top-2 right-2 bg-background text-foreground text-xs px-2 py-0.5 rounded-full font-medium">Selected</div>}
                        </div>
                        <div className="p-4">
                          <div className="font-semibold">{t.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">{t.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Card>

        <div className="flex items-center justify-between mt-6">
          <Button variant="ghost" onClick={back} disabled={step === 1}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <Button variant="hero" onClick={next}>
            {step === TOTAL_STEPS ? "Preview Portfolio" : "Continue"} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? "md:col-span-2 grid gap-2" : "grid gap-2"}>
      <Label className="text-sm">{label}</Label>
      {children}
    </div>
  );
}

function blankEdu(): Education {
  return { id: crypto.randomUUID(), degree: "", college: "", branch: "", cgpa: "", year: "" };
}
function blankExp(): Experience {
  return { id: crypto.randomUUID(), role: "", company: "", period: "", description: "" };
}
function blankProject(): Project {
  return { id: crypto.randomUUID(), title: "", description: "", tech: "", github: "", demo: "" };
}

function updateArr<T>(setData: (p: any) => void, arr: T[], idx: number, patch: Partial<T>, key: string) {
  const next = arr.map((it, i) => (i === idx ? { ...it, ...patch } : it));
  setData({ [key]: next });
}
