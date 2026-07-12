import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
  Download, Mail, Github, Linkedin, MapPin, ArrowUp, ExternalLink,
  Code2, Database, ShieldCheck, Bug, Wrench, GraduationCap, Briefcase,
  Award, FileText, Send, Menu, X, Sparkles, CheckCircle2, Sun, Moon,
  Rocket, Lightbulb, Target, Trophy, Layers, BookOpen, Star, GitFork,
} from "lucide-react";
import profileImg from "@/assets/profile.jpg";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "shoaib Ghare — MCA Graduate | QA & Cybersecurity Portfolio" },
      { name: "description", content: "Recent MCA graduate specializing in software testing, QA engineering, SQL databases, and cybersecurity. Explore projects, skills, and certifications." },
    ],
  }),
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "tech", label: "Tech" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "learning", label: "Learning" },
  { id: "hire", label: "Hire Me" },
  { id: "contact", label: "Contact" },
];

const EMAIL = "shoaib.ghare@example.com";
const LINKEDIN = "https://linkedin.com/in/shoaibghare";
const GITHUB = "https://github.com/shoaibghare";
const GITHUB_USER = "shoaibghare";

function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState("home");
  const [navOpen, setNavOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as "dark" | "light" | null;
    const initial = stored ?? "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 500);
      const y = window.scrollY + 120;
      for (const s of NAV) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) {
          setActive(s.id);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try { localStorage.setItem("theme", next); } catch { /* noop */ }
  };

  if (!mounted) {
    return (
      <div className="fixed inset-0 grid place-items-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-foreground">
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 right-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-primary via-cyan to-primary"
      />
      <Nav active={active} navOpen={navOpen} setNavOpen={setNavOpen} theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <TechStack />
        <Experience />
        <Projects />
        <GitHubStats />
        <Certifications />
        <Learning />
        <WhyHireMe />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-50 grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 glow"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Nav ---------- */
function Nav({ active, navOpen, setNavOpen, theme, toggleTheme }: {
  active: string; navOpen: boolean; setNavOpen: (v: boolean) => void;
  theme: "dark" | "light"; toggleTheme: () => void;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-3 max-w-6xl px-4">
        <div className="glass flex items-center justify-between rounded-2xl px-4 py-3">
          <a href="#home" className="flex items-center gap-2 font-display font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-cyan text-primary-foreground">SG</span>
            <span className="hidden sm:inline gradient-text">Shoaib Ghare</span>
          </a>
          <nav className="hidden xl:flex items-center gap-1" aria-label="Primary">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`relative rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === n.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-primary/15 ring-1 ring-primary/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{n.label}</span>
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-foreground transition-colors hover:bg-secondary/70"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid place-items-center"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
            <button
              className="xl:hidden grid h-9 w-9 place-items-center rounded-lg bg-secondary"
              onClick={() => setNavOpen(!navOpen)}
              aria-label="Toggle menu"
              aria-expanded={navOpen}
            >
              {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {navOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass mt-2 grid grid-cols-2 gap-1 rounded-2xl p-2 xl:hidden"
            aria-label="Mobile"
          >
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setNavOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm ${active === n.id ? "bg-primary/15 text-foreground" : "text-muted-foreground"}`}
              >
                {n.label}
              </a>
            ))}
          </motion.nav>
        )}
      </div>
    </header>
  );
}

/* ---------- Reusable ---------- */
function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-cyan">
            <Sparkles className="h-3.5 w-3.5" /> {eyebrow}
          </div>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">
            <span className="gradient-text">{title}</span>
          </h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_50px_-20px_oklch(0.72_0.17_240/0.5)] ${className}`}>
      {children}
    </div>
  );
}

/* ---------- Typing Animation ---------- */
const ROLES = ["Software Tester", "QA Engineer", "Cybersecurity Enthusiast", "Database Developer"];

function useTypingRoles(roles: string[]) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[i];
    const speed = deleting ? 45 : 90;
    const timer = setTimeout(() => {
      const next = deleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1);
      setText(next);
      if (!deleting && next === current) {
        setTimeout(() => setDeleting(true), 1400);
      } else if (deleting && next === "") {
        setDeleting(false);
        setI((p) => (p + 1) % roles.length);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, i, roles]);

  return text;
}

/* ---------- Hero ---------- */
function Hero() {
  const typed = useTypingRoles(ROLES);
  return (
    <section id="home" className="relative scroll-mt-24 pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-cyan">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
              </span>
              Available for opportunities
            </div>
            <p className="mt-6 text-lg text-muted-foreground">Hello, I'm</p>
            <h1 className="mt-1 text-5xl md:text-6xl lg:text-7xl font-bold">
              <span className="gradient-text">Shoaib Ghare</span>
            </h1>
            <p className="mt-3 text-xl md:text-2xl font-medium text-foreground/90">MCA Graduate</p>
            <div className="mt-2 flex items-center gap-1 text-base md:text-xl min-h-[2rem]" aria-live="polite">
              <span className="text-muted-foreground">I'm a&nbsp;</span>
              <span className="font-semibold text-cyan">{typed}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse" }}
                className="ml-0.5 inline-block h-5 w-0.5 bg-cyan align-middle"
              />
            </div>
            <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
              I am a recent Master of Computer Applications (MCA) graduate with strong knowledge of
              software testing, SQL Server, cybersecurity fundamentals, and web application development.
              I enjoy building secure, reliable software solutions and continuously learning modern technologies.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#resume" className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cyan px-5 py-3 font-medium text-primary-foreground transition-transform hover:scale-105 glow">
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                Download Resume
              </a>
              <a href="#projects" className="inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-5 py-3 font-medium text-foreground transition-colors hover:bg-primary/20">
                <Code2 className="h-4 w-4" /> View Projects
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-5 py-3 font-medium transition-colors hover:bg-secondary/70">
                <Mail className="h-4 w-4" /> Contact Me
              </a>
            </div>
            <div className="mt-8 flex items-center gap-3">
              {[
                { icon: Linkedin, href: LINKEDIN, label: "LinkedIn" },
                { icon: Github, href: GITHUB, label: "GitHub" },
                { icon: Mail, href: `mailto:${EMAIL}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card/60 text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary/50 hover:text-cyan"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-primary/40 via-cyan/30 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 glow">
              <img
                src={profileImg}
                alt="Shoaib Ghare"
                width={768}
                height={768}
                loading="eager"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="glass absolute -left-4 top-10 hidden rounded-2xl px-4 py-3 text-sm shadow-lg sm:block"
            >
              <div className="flex items-center gap-2 text-cyan"><ShieldCheck className="h-4 w-4" /> Cybersecurity</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="glass absolute -right-4 bottom-10 hidden rounded-2xl px-4 py-3 text-sm shadow-lg sm:block"
            >
              <div className="flex items-center gap-2 text-cyan"><Bug className="h-4 w-4" /> QA Engineering</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  const highlights = [
    "MCA Graduate with strong fundamentals",
    "Passion for software quality assurance",
    "Interest in cybersecurity & ethical hacking",
    "SQL database design & optimization",
    "ASP.NET and Java development experience",
    "Fast learner of new technologies",
  ];
  return (
    <Section id="about" eyebrow="About Me" title="A brief introduction">
      <div className="grid gap-8 md:grid-cols-5">
        <Card className="md:col-span-3">
          <p className="text-muted-foreground leading-relaxed">
            I'm a Master of Computer Applications graduate with a keen interest in building software that
            is both robust and secure. My work spans manual and functional testing, SQL Server database
            development, and hands-on cybersecurity projects with tools like Nmap, Wireshark, and SQLMap.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            I'm actively looking for entry-level opportunities as a{" "}
            <span className="text-foreground font-medium">Software Tester, QA Engineer, Database Developer,
            or Cybersecurity Analyst</span> — where I can contribute quality, curiosity, and consistency.
          </p>
        </Card>
        <Card className="md:col-span-2">
          <ul className="space-y-3">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan" />
                <span className="text-muted-foreground">{h}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  );
}

/* ---------- Timeline ---------- */
function Timeline({ items }: { items: { title: string; sub: string; period: string; detail: string; icon: React.ComponentType<{ className?: string }>; bullets?: string[] }[] }) {
  return (
    <div className="relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-cyan/30 to-transparent md:-translate-x-1/2" />
      <div className="space-y-8">
        {items.map((it, i) => {
          const Icon = it.icon;
          const leftSide = i % 2 === 0;
          return (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative md:grid md:grid-cols-2 md:gap-8"
            >
              <div className={`pl-12 md:pl-0 ${leftSide ? "md:pr-8 md:text-right" : "md:col-start-2 md:pl-8"}`}>
                <div className="absolute left-4 md:left-1/2 top-4 grid h-6 w-6 -translate-x-1/2 place-items-center rounded-full bg-gradient-to-br from-primary to-cyan glow">
                  <Icon className="h-3 w-3 text-primary-foreground" />
                </div>
                <Card>
                  <div className="text-xs font-medium text-cyan">{it.period}</div>
                  <h3 className="mt-1 text-lg font-semibold">{it.title}</h3>
                  <p className="text-sm text-cyan/80">{it.sub}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{it.detail}</p>
                  {it.bullets && (
                    <ul className="mt-3 space-y-1.5">
                      {it.bullets.map((b) => (
                        <li key={b} className={`flex items-start gap-2 text-xs text-muted-foreground ${leftSide ? "md:flex-row-reverse md:text-right" : ""}`}>
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-cyan" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Education ---------- */
function Education() {
  const items = [
    {
      title: "Master of Computer Applications (MCA)",
      sub: "Postgraduate Degree",
      period: "Recently Completed",
      detail: "Advanced coursework in software engineering, DBMS, cybersecurity, and modern web frameworks.",
      icon: GraduationCap,
    },
    {
      title: "Bachelor of Computer Applications (BCA)",
      sub: "Undergraduate Degree",
      period: "CGPA: 8.2",
      detail: "Foundation in programming, data structures, database systems, and web development.",
      icon: GraduationCap,
    },
  ];
  return (
    <Section id="education" eyebrow="Education" title="Academic journey">
      <Timeline items={items} />
    </Section>
  );
}

/* ---------- Skills ---------- */
function Skills() {
  const groups = [
    { icon: Code2, title: "Programming", items: ["Java", "Python", "C++", "HTML", "CSS", "JavaScript", "ASP.NET"] },
    { icon: Database, title: "Database", items: ["SQL Server", "MySQL"] },
    { icon: ShieldCheck, title: "Cybersecurity", items: ["Vulnerability Assessment", "Web Security", "OWASP Basics", "Network Security", "Nmap", "Wireshark", "SQLMap", "XSSER"] },
    { icon: Bug, title: "Software Testing", items: ["Manual Testing", "Bug Reporting", "Test Cases", "Functional Testing", "Regression Testing"] },
    { icon: Wrench, title: "Tools", items: ["NetBeans", "Visual Studio", "SSMS", "Git", "Wireshark"] },
  ];
  return (
    <Section id="skills" eyebrow="Skills" title="What I work with">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Card>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-cyan/20 text-cyan">
                  <g.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{g.title}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span key={it} className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground">
                    {it}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Tech Stack ---------- */
function TechStack() {
  const tech = [
    { name: "Java", slug: "openjdk", color: "ED8B00" },
    { name: "Python", slug: "python", color: "3776AB" },
    { name: "SQL Server", slug: "databricks", color: "CC2927" },
    { name: "MySQL", slug: "MySql", color: "4479A1" },
    { name: "HTML5", slug: "html5", color: "E34F26" },
    { name: "CSS3", slug: "css", color: "1572B6" },
    { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
    { name: "ASP.NET", slug: "dotnet", color: "512BD4" },
    { name: "C++", slug: "cplusplus", color: "00599C" },
    { name: "Git", slug: "git", color: "F05032" },
    { name: "GitHub", slug: "github", color: "ffffff" },
    { name: "Wireshark", slug: "wireshark", color: "1679A7" },
    { name: "Linux", slug: "linux", color: "FCC624" },
    { name: "VS Code", slug: "codersrank", color: "0065A9" },
  ];
  return (
    <Section id="tech" eyebrow="Tech Stack" title="Tools & technologies">
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
        {tech.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.03 }}
            whileHover={{ y: -6, scale: 1.05 }}
            className="glass group flex flex-col items-center justify-center gap-2 rounded-2xl p-4 text-center transition-colors hover:border-primary/40"
          >
            <img
              src={`https://cdn.simpleicons.org/${t.slug}/${t.color}`}
              alt={t.name}
              loading="lazy"
              width={36}
              height={36}
              className="h-9 w-9 transition-transform group-hover:scale-110"
            />
            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">{t.name}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Experience ---------- */
function Experience() {
  const items = [
    {
      title: "Cybersecurity Intern",
      sub: "Acmegrade Pvt Ltd",
      period: "Internship",
      detail: "Hands-on experience with vulnerability assessments, penetration testing, and security tooling.",
      icon: Briefcase,
      bullets: [
        "Identified security vulnerabilities across web applications",
        "Performed vulnerability assessments and documented findings",
        "Supported implementation of security best practices",
        "Monitored network and application security",
        "Learned penetration testing methodologies hands-on",
      ],
    },
    {
      title: "Academic Projects",
      sub: "MCA Coursework",
      period: "During MCA",
      detail: "Built full-stack academic projects across web, desktop, and database platforms.",
      icon: Code2,
      bullets: [
        "School Management System (ASP.NET + SQL Server)",
        "Automobile Service Centre (Core Java + Swing)",
        "Customer Order Management (Python + MySQL)",
      ],
    },
  ];
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've contributed">
      <Timeline items={items} />
    </Section>
  );
}

/* ---------- Projects (Case Studies) ---------- */
function Projects() {
  const projects = [
    {
      title: "School Management System",
      icon: Database,
      tags: ["ASP.NET", "HTML", "CSS", "SQL Server"],
      problem: "Schools struggled with scattered records and manual student/teacher management, causing errors and slow retrieval.",
      solution: "Built a centralized web-based system with secure authentication, role-based access, and normalized SQL Server database.",
      challenges: "Ensuring secure DB connectivity and preventing SQL injection while keeping the UI simple for non-technical staff.",
      outcome: "Reduced record-lookup time significantly and provided a reliable single source of truth for the institution.",
    },
    {
      title: "Automobile Service Centre Software",
      icon: Wrench,
      tags: ["Core Java", "Swing", "NetBeans"],
      problem: "Service centres relied on paper-based appointment booking and manual customer records.",
      solution: "Developed a Java Swing desktop app with customer registration, secure login, appointment booking, and service history.",
      challenges: "Designing an intuitive Swing UI and structuring the data layer for offline-first reliability.",
      outcome: "Streamlined booking workflow and gave staff a clear view of active and completed service jobs.",
    },
    {
      title: "Customer Order Management System",
      icon: Code2,
      tags: ["Python", "Tkinter", "MySQL"],
      problem: "Small businesses needed a lightweight tool to track orders without complex ERP overhead.",
      solution: "Built a Tkinter GUI backed by MySQL supporting full CRUD, search, and secure DB integration.",
      challenges: "Handling concurrent DB access safely and validating user input to prevent malformed queries.",
      outcome: "Delivered a compact, easy-to-deploy tool suitable for daily order tracking by non-technical users.",
    },
    {
      title: "Web Application Penetration Testing",
      icon: ShieldCheck,
      tags: ["DVWA", "SQLMap", "Wireshark", "XSSER"],
      problem: "Needed practical understanding of how attackers exploit common OWASP Top 10 vulnerabilities.",
      solution: "Executed structured pen-tests on DVWA, exploiting SQLi, XSS, CSRF and documenting reproducible PoCs.",
      challenges: "Interpreting Wireshark captures and correlating traffic with SQLMap payloads under different security levels.",
      outcome: "Produced a detailed report with findings, severity ratings, and remediation guidance — sharpening security intuition.",
    },
  ];

  return (
    <Section id="projects" eyebrow="Case Studies" title="Selected projects">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="group h-full">
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-cyan/20 text-cyan">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>

                <div className="mt-4 space-y-3 text-sm">
                  <CaseRow icon={Target} label="Problem" text={p.problem} />
                  <CaseRow icon={Lightbulb} label="Solution" text={p.solution} />
                  <CaseRow icon={Layers} label="Challenges" text={p.challenges} />
                  <CaseRow icon={Trophy} label="Outcome" text={p.outcome} />
                </div>

                <div className="mt-4 border-t border-border/60 pt-4">
                  <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Technologies</div>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs text-cyan">{t}</span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

function CaseRow({ icon: Icon, label, text }: { icon: React.ComponentType<{ className?: string }>; label: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-md bg-primary/10 text-cyan">
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div>
        <div className="text-xs font-semibold text-foreground/90">{label}</div>
        <p className="text-muted-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

/* ---------- GitHub Stats ---------- */
function GitHubStats() {
  const theme = "tokyonight";
  /*return (
    <Section id="github" eyebrow="GitHub" title="Open-source activity">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-cyan text-primary-foreground">
              <Star className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">Stats</h3>
          </div>
          <a href={GITHUB} target="_blank" rel="noreferrer" className="mt-4 block overflow-hidden rounded-xl">
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USER}&show_icons=true&hide_border=true&theme=${theme}&count_private=true`}
              alt="GitHub Stats"
              loading="lazy"
              className="w-full"
            />
          </a>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-cyan text-primary-foreground">
              <GitFork className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">Top Languages</h3>
          </div>
          <a href={GITHUB} target="_blank" rel="noreferrer" className="mt-4 block overflow-hidden rounded-xl">
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USER}&layout=compact&hide_border=true&theme=${theme}`}
              alt="Top Languages"
              loading="lazy"
              className="w-full"
            />
          </a>
        </Card>
        <Card className="md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-cyan text-primary-foreground">
              <Rocket className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">Contribution Streak</h3>
          </div>
          <a href={GITHUB} target="_blank" rel="noreferrer" className="mt-4 block overflow-hidden rounded-xl">
            <img
              src={`https://streak-stats.demolab.com?user=${GITHUB_USER}&hide_border=true&theme=${theme}`}
              alt="GitHub Streak"
              loading="lazy"
              className="w-full"
            />
          </a>
        </Card>
      </div>
    </Section>
  );*/
}

/* ---------- Certifications ---------- */
function Certifications() {
  const certs = [
    { title: "Cyber Security Internship Certificate", issuer: "Acmegrade Pvt Ltd" },
    { title: "Mastercard Cyber Security Job Simulation", issuer: "Forage" },
    { title: "Verizon Cloud Platform Job Simulation", issuer: "Forage" },
  ];
  return (
    <Section id="certifications" eyebrow="Certifications" title="Credentials & training">
      <div className="grid gap-6 md:grid-cols-3">
        {certs.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Card>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-cyan text-primary-foreground">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-cyan">{c.issuer}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Currently Learning ---------- */
function Learning() {
  const items = [
    { name: "Selenium", desc: "Browser automation for cross-browser regression tests." },
    { name: "Postman", desc: "API testing, collections, and automated request flows." },
    { name: "JMeter", desc: "Performance and load testing for web applications." },
    { name: "Cypress", desc: "Modern end-to-end testing for JavaScript apps." },
    { name: "Docker", desc: "Containerizing test environments and services." },
    { name: "GitHub Actions", desc: "CI/CD pipelines for automated build & test." },
  ];
  return (
    <Section id="learning" eyebrow="Currently Learning" title="Levelling up my toolkit">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <motion.div
            key={it.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Card className="h-full">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-cyan/20 text-cyan">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold">{it.name}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${40 + (i * 9) % 45}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-cyan"
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Why Hire Me ---------- */
function WhyHireMe() {
  const reasons = [
    { icon: Lightbulb, title: "Strong Problem Solving", text: "Break down complex issues into testable, secure, and maintainable solutions." },
    { icon: GraduationCap, title: "MCA Graduate", text: "Solid academic foundation in software engineering, DBMS, and security." },
    { icon: Code2, title: "Hands-on Projects", text: "Delivered real academic projects across Java, Python, ASP.NET, and SQL." },
    { icon: ShieldCheck, title: "Cybersecurity Internship", text: "Practical exposure to vulnerability assessment and industry-standard tools." },
    { icon: Rocket, title: "Quick Learner", text: "Comfortable ramping up on new tools, frameworks, and codebases rapidly." },
    { icon: MapPin, title: "Open to Work in Mumbai", text: "Available on-site in Mumbai, and open to remote or hybrid opportunities." },
  ];
  return (
    <Section id="hire" eyebrow="Recruiters" title="Why hire me?">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r, i) => {
          const Icon = r.icon;
          return (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              <Card className="h-full">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-cyan text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.text}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- Resume ---------- */
function Resume() {
  return (
    <Section id="resume" eyebrow="Resume" title="Take a closer look">
      <Card className="text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-cyan text-primary-foreground">
          <FileText className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-xl font-semibold">Shoaib Ghare — Resume</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          A concise summary of my education, skills, projects, and internship experience.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="https://drive.google.com/file/d/15_WqgQWoDEZBTR41CusMuFf523BToroC/preview" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cyan px-5 py-3 font-medium text-primary-foreground transition-transform hover:scale-105 glow">
            <Download className="h-4 w-4" /> Download Resume
          </a>
          <a href="https://drive.google.com/file/d/15_WqgQWoDEZBTR41CusMuFf523BToroC/preview" className="inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-5 py-3 font-medium transition-colors hover:bg-primary/20">
            <ExternalLink className="h-4 w-4" /> Preview
          </a>
        </div>
      </Card>
    </Section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Section id="contact" eyebrow="Contact" title="Let's connect">
      <div className="grid gap-6 md:grid-cols-5">
        <Card className="md:col-span-2">
          <h3 className="text-lg font-semibold">Get in touch</h3>
          <p className="mt-2 text-sm text-muted-foreground">Open to full-time roles, internships, and interesting conversations.</p>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-cyan" />
              <div>
                <div className="font-medium">Location</div>
                <div className="text-muted-foreground">Taloja Phase 1, Navi Mumbai, Maharashtra, India</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="mt-0.5 h-4 w-4 text-cyan" />
              <div>
                <div className="font-medium">Open to work</div>
                <div className="text-muted-foreground">Mumbai & remote</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-cyan" />
              <a href={`mailto:${EMAIL}`} className="text-muted-foreground hover:text-foreground">{EMAIL}</a>
            </li>
            <li className="flex items-start gap-3">
              <Linkedin className="mt-0.5 h-4 w-4 text-cyan" />
              <a href={LINKEDIN} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">LinkedIn</a>
            </li>
            <li className="flex items-start gap-3">
              <Github className="mt-0.5 h-4 w-4 text-cyan" />
              <a href={GITHUB} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">GitHub</a>
            </li>
          </ul>
        </Card>
        <Card className="md:col-span-3">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 4000);
              (e.target as HTMLFormElement).reset();
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" id="name" required maxLength={100} />
              <Field label="Email" id="email" type="email" required maxLength={255} />
            </div>
            <Field label="Subject" id="subject" required maxLength={150} />
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium">Message</label>
              <textarea
                id="message"
                required
                maxLength={1000}
                rows={5}
                className="w-full resize-none rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cyan px-5 py-3 font-medium text-primary-foreground transition-transform hover:scale-[1.02] glow"
            >
              <Send className="h-4 w-4" /> Send Message
            </button>
            {sent && (
              <p className="text-sm text-cyan">Thanks — I'll get back to you soon.</p>
            )}
          </form>
        </Card>
      </div>
    </Section>
  );
}

function Field({ label, id, type = "text", ...rest }: { label: string; id: string; type?: string; required?: boolean; maxLength?: number }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">{label}</label>
      <input
        id={id}
        type={type}
        {...rest}
        className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-border/60 py-8 mt-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-muted-foreground md:flex-row">
        <p>© 2026 Shoaib Ghare</p>
        <p>Designed with <span className="text-red-400">❤</span> using React</p>
      </div>
    </footer>
  );
}
