/**
 * Generates a complete static HTML/CSS/JS portfolio website from user data.
 * Returns the file map for a JSZip build.
 */
import type { PortfolioData, ThemeId } from "./portfolio-types";

interface ThemePreset {
  bg: string;
  fg: string;
  accent: string;
  accent2: string;
  card: string;
  font: string;
  fontUrl: string;
  extraHead: string;
  bodyClass: string;
  effects: string; // additional CSS
  scriptExtras: string; // additional JS
}

const THEMES: Record<ThemeId, ThemePreset> = {
  cyber: {
    bg: "#06060f",
    fg: "#e6f1ff",
    accent: "#00f0ff",
    accent2: "#ff00d4",
    card: "rgba(255,255,255,0.03)",
    font: "'Orbitron', system-ui",
    fontUrl: "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=JetBrains+Mono:wght@400;600&display=swap",
    extraHead: "",
    bodyClass: "theme-cyber",
    effects: `
      body{background:radial-gradient(ellipse at top,#0a0a2e 0%,#06060f 70%);overflow-x:hidden}
      .neon{text-shadow:0 0 8px var(--accent),0 0 24px var(--accent)}
      .grid-bg{position:fixed;inset:0;background-image:linear-gradient(var(--accent) 1px,transparent 1px),linear-gradient(90deg,var(--accent) 1px,transparent 1px);background-size:50px 50px;opacity:.05;pointer-events:none;z-index:0}
      #particles{position:fixed;inset:0;pointer-events:none;z-index:0}
      .card{border:1px solid rgba(0,240,255,.15);box-shadow:0 0 30px rgba(0,240,255,.05)}
      .skill-bar-fill{background:linear-gradient(90deg,var(--accent),var(--accent2));box-shadow:0 0 10px var(--accent)}
    `,
    scriptExtras: `
      const c=document.getElementById('particles');if(c){const ctx=c.getContext('2d');const resize=()=>{c.width=innerWidth;c.height=innerHeight};resize();addEventListener('resize',resize);
      const pts=Array.from({length:60},()=>({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3}));
      (function loop(){ctx.clearRect(0,0,c.width,c.height);pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>c.width)p.vx*=-1;if(p.y<0||p.y>c.height)p.vy*=-1;ctx.fillStyle='rgba(0,240,255,.6)';ctx.beginPath();ctx.arc(p.x,p.y,1.5,0,7);ctx.fill()});requestAnimationFrame(loop)})()}
      const t=document.querySelector('.typing');if(t){const txt=t.dataset.text||'';let i=0;t.textContent='';(function type(){if(i<=txt.length){t.textContent=txt.slice(0,i++)+'▌';setTimeout(type,80)}else{t.textContent=txt}})()}
    `,
  },
  minimal: {
    bg: "#fafafa",
    fg: "#0a0a0a",
    accent: "#0a0a0a",
    accent2: "#737373",
    card: "#ffffff",
    font: "'Inter', system-ui",
    fontUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap",
    extraHead: "",
    bodyClass: "theme-minimal",
    effects: `
      body{background:#fafafa}
      h1,h2,h3{font-family:'Playfair Display',serif;letter-spacing:-.02em}
      .card{background:#fff;border:1px solid #eee;box-shadow:0 1px 3px rgba(0,0,0,.04)}
      .skill-bar-fill{background:#0a0a0a}
      .accent-line{width:48px;height:2px;background:#0a0a0a;margin:8px 0 20px}
    `,
    scriptExtras: ``,
  },
  matrix: {
    bg: "#000",
    fg: "#00ff66",
    accent: "#00ff66",
    accent2: "#00cc4d",
    card: "rgba(0,255,102,.04)",
    font: "'JetBrains Mono', monospace",
    fontUrl: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap",
    extraHead: "",
    bodyClass: "theme-matrix",
    effects: `
      body{background:#000}
      #matrix{position:fixed;inset:0;z-index:0;opacity:.15;pointer-events:none}
      .card{border:1px solid rgba(0,255,102,.2);background:rgba(0,255,102,.03)}
      .terminal{border:1px solid #00ff66;border-radius:8px;padding:24px;background:rgba(0,0,0,.7)}
      .prompt::before{content:'$ ';color:#00ff66;opacity:.6}
      .skill-bar-fill{background:#00ff66;box-shadow:0 0 8px #00ff66}
      a{color:#00ff66;text-decoration:underline}
    `,
    scriptExtras: `
      const m=document.getElementById('matrix');if(m){const ctx=m.getContext('2d');const resize=()=>{m.width=innerWidth;m.height=innerHeight};resize();addEventListener('resize',resize);
      const chars='01ABCDEF<>{}[]/=*+';const cols=Math.floor(m.width/16);const drops=Array(cols).fill(0);
      setInterval(()=>{ctx.fillStyle='rgba(0,0,0,.08)';ctx.fillRect(0,0,m.width,m.height);ctx.fillStyle='#00ff66';ctx.font='14px monospace';drops.forEach((y,i)=>{ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*16,y*16);if(y*16>m.height&&Math.random()>.97)drops[i]=0;drops[i]++})},60)}
    `,
  },
  gradient: {
    bg: "#0f0a1f",
    fg: "#fff",
    accent: "#ff6ec7",
    accent2: "#7873f5",
    card: "rgba(255,255,255,.06)",
    font: "'Plus Jakarta Sans', system-ui",
    fontUrl: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap",
    extraHead: "",
    bodyClass: "theme-gradient",
    effects: `
      body{background:#0f0a1f;overflow-x:hidden}
      .blob{position:fixed;border-radius:50%;filter:blur(80px);opacity:.5;z-index:0;animation:floaty 12s ease-in-out infinite}
      .blob1{width:400px;height:400px;background:#ff6ec7;top:-100px;left:-100px}
      .blob2{width:500px;height:500px;background:#7873f5;bottom:-150px;right:-100px;animation-delay:-4s}
      .blob3{width:300px;height:300px;background:#4ade80;top:40%;left:50%;animation-delay:-8s}
      @keyframes floaty{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(40px,-40px) scale(1.1)}}
      .text-gradient{background:linear-gradient(90deg,#ff6ec7,#7873f5,#4ade80);-webkit-background-clip:text;background-clip:text;color:transparent}
      .card{background:rgba(255,255,255,.05);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.1)}
      .skill-bar-fill{background:linear-gradient(90deg,#ff6ec7,#7873f5)}
    `,
    scriptExtras: ``,
  },
  luxury: {
    bg: "#0a0a0a",
    fg: "#f5e6c8",
    accent: "#d4af37",
    accent2: "#b8941f",
    card: "rgba(212,175,55,.03)",
    font: "'Cormorant Garamond', serif",
    fontUrl: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;700&family=Montserrat:wght@300;400;600&display=swap",
    extraHead: "",
    bodyClass: "theme-luxury",
    effects: `
      body{background:radial-gradient(ellipse at center,#1a1410 0%,#0a0a0a 80%);font-family:'Montserrat',sans-serif}
      h1,h2,h3{font-family:'Cormorant Garamond',serif;letter-spacing:.02em}
      .gold{color:#d4af37}
      .card{background:linear-gradient(135deg,rgba(212,175,55,.06),rgba(212,175,55,.02));border:1px solid rgba(212,175,55,.2)}
      .skill-bar-fill{background:linear-gradient(90deg,#d4af37,#f5e6c8)}
      .divider{width:80px;height:1px;background:linear-gradient(90deg,transparent,#d4af37,transparent);margin:16px auto}
    `,
    scriptExtras: ``,
  },
};

function escapeHtml(s: string): string {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function csv(s: string): string[] {
  return (s || "").split(",").map((x) => x.trim()).filter(Boolean);
}

function skillBars(items: string[]): string {
  return items
    .map(
      (s, i) => `
    <div class="skill" data-aos="fade-up" data-delay="${i * 60}">
      <div class="skill-row"><span>${escapeHtml(s)}</span><span class="skill-pct">${75 + ((i * 7) % 20)}%</span></div>
      <div class="skill-bar"><div class="skill-bar-fill" style="width:${75 + ((i * 7) % 20)}%"></div></div>
    </div>`,
    )
    .join("");
}

export function buildPortfolioHtml(data: PortfolioData): { html: string; css: string; js: string; readme: string } {
  const t = THEMES[data.theme] || THEMES.minimal;
  const photo =
    data.photo ||
    `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><rect width='200' height='200' fill='${t.accent}'/><text x='50%' y='55%' text-anchor='middle' font-family='sans-serif' font-size='80' fill='${t.bg}'>${(data.fullName || "?").charAt(0)}</text></svg>`,
    )}`;

  const techList = csv(data.techSkills);
  const toolsList = csv(data.tools);
  const fwList = csv(data.frameworks);
  const softList = csv(data.softSkills);

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${escapeHtml(data.fullName)} — ${escapeHtml(data.title)}</title>
<meta name="description" content="${escapeHtml(data.tagline)}" />
<meta property="og:title" content="${escapeHtml(data.fullName)} — ${escapeHtml(data.title)}" />
<meta property="og:description" content="${escapeHtml(data.tagline)}" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="${t.fontUrl}" />
<link rel="stylesheet" href="style.css" />
${t.extraHead}
</head>
<body class="${t.bodyClass}">
${data.theme === "cyber" ? '<div class="grid-bg"></div><canvas id="particles"></canvas>' : ""}
${data.theme === "matrix" ? '<canvas id="matrix"></canvas>' : ""}
${data.theme === "gradient" ? '<div class="blob blob1"></div><div class="blob blob2"></div><div class="blob blob3"></div>' : ""}

<nav class="nav">
  <div class="container nav-inner">
    <a href="#home" class="brand">${escapeHtml(data.fullName.split(" ")[0])}<span class="accent">.</span></a>
    <div class="nav-links">
      <a href="#about">About</a>
      <a href="#skills">Skills</a>
      <a href="#education">Education</a>
      <a href="#experience">Experience</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </div>
  </div>
</nav>

<section id="home" class="hero">
  <div class="container hero-inner">
    <div class="hero-text" data-aos="fade-up">
      <p class="eyebrow">Hello, I'm</p>
      <h1 class="hero-title ${data.theme === "cyber" ? "neon" : ""} ${data.theme === "gradient" ? "text-gradient" : ""}">${escapeHtml(data.fullName)}</h1>
      <h2 class="hero-sub"><span class="typing" data-text="${escapeHtml(data.title)}">${escapeHtml(data.title)}</span></h2>
      <p class="lead">${escapeHtml(data.tagline)}</p>
      <div class="cta-row">
        <a class="btn btn-primary" href="#projects">View Work</a>
        <a class="btn btn-outline" href="#contact">Contact Me</a>
      </div>
    </div>
    <div class="hero-photo" data-aos="zoom-in">
      <img src="${photo}" alt="${escapeHtml(data.fullName)}" />
    </div>
  </div>
</section>

<section id="about" class="section">
  <div class="container">
    <h2 class="section-title">About Me</h2>
    ${data.theme === "luxury" ? '<div class="divider"></div>' : data.theme === "minimal" ? '<div class="accent-line"></div>' : ""}
    <div class="grid-2">
      <div class="card pad" data-aos="fade-right">
        <h3>Bio</h3>
        <p>${escapeHtml(data.bio)}</p>
      </div>
      <div class="card pad" data-aos="fade-left">
        <h3>Career Objective</h3>
        <p>${escapeHtml(data.objective)}</p>
        ${data.strengths ? `<p class="muted"><strong>Strengths:</strong> ${escapeHtml(data.strengths)}</p>` : ""}
        ${data.languages ? `<p class="muted"><strong>Languages:</strong> ${escapeHtml(data.languages)}</p>` : ""}
      </div>
    </div>
  </div>
</section>

<section id="skills" class="section">
  <div class="container">
    <h2 class="section-title">Skills</h2>
    ${data.theme === "luxury" ? '<div class="divider"></div>' : data.theme === "minimal" ? '<div class="accent-line"></div>' : ""}
    <div class="grid-2">
      <div class="card pad">
        <h3>Technical</h3>
        ${skillBars(techList)}
      </div>
      <div class="card pad">
        <h3>Frameworks &amp; Tools</h3>
        <div class="chips">${[...fwList, ...toolsList].map((s) => `<span class="chip">${escapeHtml(s)}</span>`).join("")}</div>
        <h3 style="margin-top:24px">Soft Skills</h3>
        <div class="chips">${softList.map((s) => `<span class="chip">${escapeHtml(s)}</span>`).join("")}</div>
      </div>
    </div>
  </div>
</section>

<section id="education" class="section">
  <div class="container">
    <h2 class="section-title">Education</h2>
    ${data.theme === "luxury" ? '<div class="divider"></div>' : data.theme === "minimal" ? '<div class="accent-line"></div>' : ""}
    <div class="timeline">
      ${data.education
        .map(
          (e, i) => `
        <div class="timeline-item" data-aos="fade-up" data-delay="${i * 100}">
          <div class="timeline-dot"></div>
          <div class="card pad">
            <div class="meta">${escapeHtml(e.year)} · CGPA ${escapeHtml(e.cgpa)}</div>
            <h3>${escapeHtml(e.degree)}</h3>
            <p class="muted">${escapeHtml(e.college)} — ${escapeHtml(e.branch)}</p>
          </div>
        </div>`,
        )
        .join("")}
    </div>
    ${data.certifications ? `<p class="muted center" style="margin-top:20px"><strong>Certifications:</strong> ${escapeHtml(data.certifications)}</p>` : ""}
  </div>
</section>

<section id="experience" class="section">
  <div class="container">
    <h2 class="section-title">Experience</h2>
    ${data.theme === "luxury" ? '<div class="divider"></div>' : data.theme === "minimal" ? '<div class="accent-line"></div>' : ""}
    <div class="grid-2">
      ${data.experience
        .map(
          (x, i) => `
        <div class="card pad" data-aos="fade-up" data-delay="${i * 80}">
          <div class="meta">${escapeHtml(x.period)}</div>
          <h3>${escapeHtml(x.role)}</h3>
          <p class="muted">${escapeHtml(x.company)}</p>
          <p>${escapeHtml(x.description)}</p>
        </div>`,
        )
        .join("")}
    </div>
  </div>
</section>

<section id="projects" class="section">
  <div class="container">
    <h2 class="section-title">Projects</h2>
    ${data.theme === "luxury" ? '<div class="divider"></div>' : data.theme === "minimal" ? '<div class="accent-line"></div>' : ""}
    <div class="grid-3">
      ${data.projects
        .map(
          (p, i) => `
        <div class="card pad project" data-aos="fade-up" data-delay="${i * 80}">
          <h3>${escapeHtml(p.title)}</h3>
          <p>${escapeHtml(p.description)}</p>
          <div class="chips">${csv(p.tech).map((s) => `<span class="chip">${escapeHtml(s)}</span>`).join("")}</div>
          <div class="proj-links">
            ${p.github ? `<a href="${escapeHtml(p.github)}" target="_blank" rel="noopener">GitHub →</a>` : ""}
            ${p.demo ? `<a href="${escapeHtml(p.demo)}" target="_blank" rel="noopener">Live Demo →</a>` : ""}
          </div>
        </div>`,
        )
        .join("")}
    </div>
  </div>
</section>

<section id="contact" class="section">
  <div class="container">
    <h2 class="section-title">Get In Touch</h2>
    ${data.theme === "luxury" ? '<div class="divider"></div>' : data.theme === "minimal" ? '<div class="accent-line"></div>' : ""}
    <div class="card pad center contact-card">
      <p class="lead">${escapeHtml(data.tagline)}</p>
      <div class="contact-grid">
        ${data.email ? `<a href="mailto:${escapeHtml(data.email)}">✉ ${escapeHtml(data.email)}</a>` : ""}
        ${data.phone ? `<span>☎ ${escapeHtml(data.phone)}</span>` : ""}
        ${data.location ? `<span>📍 ${escapeHtml(data.location)}</span>` : ""}
      </div>
      <div class="socials">
        ${data.linkedin ? `<a href="${escapeHtml(data.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>` : ""}
        ${data.github ? `<a href="${escapeHtml(data.github)}" target="_blank" rel="noopener">GitHub</a>` : ""}
        ${data.website ? `<a href="${escapeHtml(data.website)}" target="_blank" rel="noopener">Website</a>` : ""}
      </div>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="container">© ${new Date().getFullYear()} ${escapeHtml(data.fullName)}. Built with PortfolioForge.</div>
</footer>

<script src="script.js"></script>
</body>
</html>`;

  const css = `
:root{--bg:${t.bg};--fg:${t.fg};--accent:${t.accent};--accent2:${t.accent2};--card:${t.card}}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:${t.font};background:var(--bg);color:var(--fg);line-height:1.6;position:relative}
.container{max-width:1100px;margin:0 auto;padding:0 24px;position:relative;z-index:1}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
.muted{opacity:.7}.center{text-align:center}
.accent{color:var(--accent)}

.nav{position:sticky;top:0;z-index:50;backdrop-filter:blur(12px);background:color-mix(in oklab,var(--bg) 75%,transparent);border-bottom:1px solid color-mix(in oklab,var(--fg) 8%,transparent)}
.nav-inner{display:flex;justify-content:space-between;align-items:center;padding:16px 24px}
.brand{font-weight:700;font-size:1.25rem;letter-spacing:-.02em}
.nav-links{display:flex;gap:24px}
.nav-links a{font-size:.9rem;opacity:.75;transition:opacity .2s}
.nav-links a:hover{opacity:1;color:var(--accent)}
@media(max-width:720px){.nav-links{display:none}}

.hero{min-height:90vh;display:flex;align-items:center;padding:80px 0}
.hero-inner{display:grid;grid-template-columns:1.4fr 1fr;gap:48px;align-items:center}
@media(max-width:820px){.hero-inner{grid-template-columns:1fr;text-align:center}.hero-photo{order:-1}}
.eyebrow{text-transform:uppercase;letter-spacing:.2em;font-size:.85rem;color:var(--accent);margin-bottom:12px}
.hero-title{font-size:clamp(2.5rem,6vw,4.5rem);line-height:1.05;margin-bottom:12px}
.hero-sub{font-size:clamp(1.2rem,2.5vw,1.6rem);opacity:.85;margin-bottom:18px;min-height:1.6em}
.lead{font-size:1.05rem;opacity:.75;max-width:520px;margin-bottom:28px}
@media(max-width:820px){.lead{margin:0 auto 28px}}
.cta-row{display:flex;gap:12px;flex-wrap:wrap}
@media(max-width:820px){.cta-row{justify-content:center}}
.btn{display:inline-block;padding:12px 24px;border-radius:8px;font-weight:600;font-size:.95rem;transition:transform .2s,box-shadow .2s;cursor:pointer;border:none;font-family:inherit}
.btn:hover{transform:translateY(-2px)}
.btn-primary{background:var(--accent);color:var(--bg)}
.btn-outline{border:1.5px solid var(--accent);color:var(--accent);background:transparent}
.hero-photo img{width:280px;height:280px;border-radius:50%;object-fit:cover;border:3px solid var(--accent);margin:0 auto}

.section{padding:80px 0}
.section-title{font-size:clamp(1.8rem,3.5vw,2.5rem);margin-bottom:28px}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.grid-3{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px}
@media(max-width:720px){.grid-2{grid-template-columns:1fr}}

.card{background:var(--card);border-radius:14px;transition:transform .3s,box-shadow .3s}
.card:hover{transform:translateY(-4px)}
.pad{padding:28px}
.card h3{font-size:1.2rem;margin-bottom:12px}
.meta{font-size:.8rem;text-transform:uppercase;letter-spacing:.15em;color:var(--accent);margin-bottom:8px}

.skill{margin-bottom:14px}
.skill-row{display:flex;justify-content:space-between;font-size:.9rem;margin-bottom:6px}
.skill-pct{opacity:.6}
.skill-bar{height:6px;border-radius:4px;background:color-mix(in oklab,var(--fg) 10%,transparent);overflow:hidden}
.skill-bar-fill{height:100%;border-radius:4px;width:0;transition:width 1.2s ease-out}

.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{padding:6px 12px;border-radius:20px;background:color-mix(in oklab,var(--accent) 12%,transparent);color:var(--accent);font-size:.8rem;font-weight:500}

.timeline{position:relative;padding-left:32px;display:flex;flex-direction:column;gap:20px}
.timeline::before{content:"";position:absolute;left:8px;top:8px;bottom:8px;width:2px;background:color-mix(in oklab,var(--accent) 40%,transparent)}
.timeline-item{position:relative}
.timeline-dot{position:absolute;left:-32px;top:18px;width:14px;height:14px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 4px color-mix(in oklab,var(--accent) 25%,transparent)}

.proj-links{display:flex;gap:16px;margin-top:14px;font-size:.9rem}
.proj-links a{color:var(--accent);font-weight:600}
.proj-links a:hover{text-decoration:underline}

.contact-card{padding:48px 28px}
.contact-grid{display:flex;flex-wrap:wrap;justify-content:center;gap:24px;margin:24px 0}
.contact-grid a:hover,.socials a:hover{color:var(--accent)}
.socials{display:flex;justify-content:center;gap:24px;margin-top:8px}
.socials a{padding:10px 20px;border:1px solid color-mix(in oklab,var(--accent) 40%,transparent);border-radius:8px;font-weight:600;transition:all .2s}
.socials a:hover{background:var(--accent);color:var(--bg)}

.footer{padding:32px 0;text-align:center;font-size:.85rem;opacity:.6;border-top:1px solid color-mix(in oklab,var(--fg) 8%,transparent);margin-top:60px}

[data-aos]{opacity:0;transform:translateY(20px);transition:opacity .8s,transform .8s}
[data-aos="fade-right"]{transform:translateX(-20px)}
[data-aos="fade-left"]{transform:translateX(20px)}
[data-aos="zoom-in"]{transform:scale(.92)}
[data-aos].in{opacity:1;transform:none}

${t.effects}
`;

  const js = `
// Reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const el=e.target;const d=parseInt(el.dataset.delay||'0',10);setTimeout(()=>el.classList.add('in'),d);io.unobserve(el)}}),{threshold:.12});
document.querySelectorAll('[data-aos]').forEach(el=>io.observe(el));

// Animate skill bars when visible
const sio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.style.width=e.target.style.width;sio.unobserve(e.target)}}),{threshold:.3});
document.querySelectorAll('.skill-bar-fill').forEach(b=>{const w=b.style.width;b.style.width='0';requestAnimationFrame(()=>{setTimeout(()=>{b.style.width=w},100)});sio.observe(b)});

${t.scriptExtras}
`;

  const readme = `# ${data.fullName} — Portfolio

Generated with **PortfolioForge** ✨

## Run locally
Just open \`index.html\` in your browser, or serve the folder:

\`\`\`bash
npx serve .
\`\`\`

## Deploy
Drag this folder into Vercel, Netlify, GitHub Pages, or any static host.

## Files
- \`index.html\` — markup
- \`style.css\` — styles
- \`script.js\` — animations

Theme: **${data.theme}**
`;

  return { html, css, js, readme };
}

/**
 * Downloads the portfolio as a single self-contained .html file.
 * CSS and JS are inlined so the user can just double-click to open it
 * in any browser — no unzipping, no broken file paths.
 */
export async function downloadPortfolioZip(data: PortfolioData): Promise<void> {
  const { html, css, js } = buildPortfolioHtml(data);
  const inlined = html
    .replace('<link rel="stylesheet" href="style.css" />', `<style>${css}</style>`)
    .replace('<script src="script.js"></script>', `<script>${js}<\/script>`);
  const blob = new Blob([inlined], { type: "text/html;charset=utf-8" });
  const safe = (data.fullName || "portfolio").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${safe}-portfolio.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
