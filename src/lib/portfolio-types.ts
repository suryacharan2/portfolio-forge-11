export type ThemeId = "cyber" | "minimal" | "matrix" | "gradient" | "luxury";

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string;
  github: string;
  demo: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  college: string;
  branch: string;
  cgpa: string;
  year: string;
}

export interface PortfolioData {
  // Step 1
  fullName: string;
  title: string;
  tagline: string;
  photo: string; // data URL
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
  // Step 2
  bio: string;
  objective: string;
  strengths: string;
  languages: string;
  // Step 3
  education: Education[];
  certifications: string;
  // Step 4
  techSkills: string;
  softSkills: string;
  tools: string;
  frameworks: string;
  // Step 5
  experience: Experience[];
  // Step 6
  projects: Project[];
  // Step 7
  awards: string;
  hackathons: string;
  interests: string;
  hobbies: string;
  // Step 8
  theme: ThemeId;
}

export const defaultPortfolio: PortfolioData = {
  fullName: "Alex Morgan",
  title: "Full-Stack Developer",
  tagline: "I build delightful digital experiences.",
  photo: "",
  email: "alex@example.com",
  phone: "+1 555 123 4567",
  location: "San Francisco, CA",
  linkedin: "https://linkedin.com/in/alex",
  github: "https://github.com/alex",
  website: "https://alex.dev",
  bio: "Passionate engineer with 3+ years of experience crafting modern web apps. I love turning complex problems into elegant interfaces.",
  objective: "To join an innovative team where I can grow as an engineer and ship products that matter.",
  strengths: "Problem solving, Communication, Ownership, Curiosity",
  languages: "English, Spanish",
  education: [
    {
      id: "e1",
      degree: "B.S. Computer Science",
      college: "Stanford University",
      branch: "Computer Science",
      cgpa: "3.8",
      year: "2024",
    },
  ],
  certifications: "AWS Certified Developer, Google UX Design",
  techSkills: "TypeScript, React, Node.js, Python, PostgreSQL",
  softSkills: "Leadership, Empathy, Time management",
  tools: "Git, Docker, Figma, VS Code",
  frameworks: "Next.js, Express, FastAPI, TailwindCSS",
  experience: [
    {
      id: "x1",
      role: "Software Engineer Intern",
      company: "Acme Corp",
      period: "Jun 2023 — Sep 2023",
      description: "Built internal dashboards used by 200+ employees, improving reporting speed by 40%.",
    },
  ],
  projects: [
    {
      id: "p1",
      title: "TaskFlow",
      description: "A collaborative task management app with realtime sync and beautiful animations.",
      tech: "React, Node.js, WebSocket",
      github: "https://github.com/alex/taskflow",
      demo: "https://taskflow.demo",
    },
    {
      id: "p2",
      title: "PixelMint",
      description: "AI-powered image enhancer running fully in the browser using WebGPU.",
      tech: "TypeScript, WebGPU, ONNX",
      github: "https://github.com/alex/pixelmint",
      demo: "https://pixelmint.demo",
    },
  ],
  awards: "Hackathon Winner — TechCrunch Disrupt 2023",
  hackathons: "MLH Top 10 finalist",
  interests: "Open source, Design systems, Coffee",
  hobbies: "Photography, Trail running, Chess",
  theme: "minimal",
};
