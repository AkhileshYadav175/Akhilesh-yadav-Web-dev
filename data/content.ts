export interface NavLink {
  label: string;
  href: string;
}

export interface ProjectItem {
  id: string;
  num: string;
  status: string;
  isLive?: boolean;
  thumbType: "t1" | "t2" | "t3" | "t4";
  title: string;
  subtitle: string;
  backTag: string;
  backTitle: string;
  backDesc: string;
  chips: string[];
  links: { label: string; href: string }[];
  stringLen: number;
}

export interface ProcessStep {
  filename: string;
  num: string;
  title: string;
  description: string;
  codeHtml: string;
}

export interface SkillCategory {
  num: string;
  title: string;
  tools: string[];
}

export interface ExperienceItem {
  period: string;
  isCurrent?: boolean;
  role: string;
  company: string;
  desc: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export const siteContent = {
  meta: {
    title: "Akhilesh Yadav — Full Stack Developer",
    description:
      "Akhilesh Yadav — Full Stack & Frontend Developer. React, Next.js, Node.js and cloud media systems.",
  },
  nav: {
    brand: "Akhilesh Yadav",
    links: [
      { label: "Work", href: "#work" },
      { label: "Process", href: "#process" },
      { label: "Skills", href: "#skills" },
      { label: "Experience", href: "#experience" },
      { label: "Contact", href: "#contact" },
    ] as NavLink[],
    cta: {
      label: "Let's talk",
      href: "#contact",
    },
  },
  hero: {
    tag: "Portfolio — 2026",
    titleLines: [
      { text: "Full stack", isSoft: false },
      { text: "developer,", isSoft: false },
      { text: "building for", isSoft: true },
      { text: "the real web.", isSoft: true },
    ],
    lead: {
      greeting: "Hi, I'm",
      highlightName: "Akhilesh",
      rest: ". For 8+ months I've been shipping LMS and ERP portals to live production — with cloud video on Cloudflare R2 & HLS.",
    },
    ctas: {
      primary: { label: "Get in touch", href: "#contact" },
      secondary: { label: "Download CV", href: "#", download: true },
    },
    badge: {
      lanyardText: "AKHILESH · DEV · AKHILESH · DEV · AKHILESH",
      front: {
        category: "Developer ID",
        serial: "№ 0001",
        initials: "AY",
        avatarNote: "[ add your 3D avatar here ]",
        name: "Akhilesh Yadav",
        role: "Full Stack Developer",
        countryCode: "RJ · IN",
      },
      back: {
        tag: "Access · All stacks",
        name: "Akhilesh Yadav",
        kv: [
          { key: "Frontend", value: "React · Next.js" },
          { key: "Backend", value: "Node · Express" },
          { key: "Media", value: "R2 · HLS" },
          { key: "Live prod.", value: "8+ months" },
          { key: "Status", value: "Open to work" },
        ],
        location: "Rajasthan,\nIndia",
      },
      flipHint: "Hover the card to flip ↺",
    },
    bottomMeta: [
      "8+ mo live production",
      "LMS + ERP portals",
      "MERN + Next.js",
    ],
    scrollPrompt: "Scroll to explore ↓",
  },
  work: {
    tag: "Work — 01",
    heading: {
      line1: "Selected work,",
      line2: "built for production.",
    },
    sideNote: "Hover a card to flip it and see the stack, my role and the links.",
    projects: [
      {
        id: "lms-portal",
        num: "01",
        status: "Live",
        isLive: true,
        thumbType: "t1",
        title: "LMS Portal",
        subtitle: "Learning platform · EdTech",
        backTag: "01 · In production",
        backTitle: "LMS Portal",
        backDesc: "[One line: courses, students, video lessons — what it does and for whom.]",
        chips: ["Next.js", "Node.js", "HLS", "R2"],
        links: [
          { label: "Live ↗", href: "#" },
          { label: "Code ↗", href: "#" },
        ],
        stringLen: 70,
      },
      {
        id: "erp-portal",
        num: "02",
        status: "Live",
        isLive: true,
        thumbType: "t2",
        title: "ERP Portal",
        subtitle: "Operations dashboard · Business",
        backTag: "02 · In production",
        backTitle: "ERP Portal",
        backDesc: "[One line: modules — attendance, fees, reports, user roles.]",
        chips: ["React", "Express", "MongoDB"],
        links: [
          { label: "Live ↗", href: "#" },
          { label: "Code ↗", href: "#" },
        ],
        stringLen: 120,
      },
      {
        id: "video-streaming",
        num: "03",
        status: "Cloud",
        isLive: false,
        thumbType: "t3",
        title: "Video Streaming",
        subtitle: "Cloudflare R2 + HLS pipeline",
        backTag: "03 · Media system",
        backTitle: "Video Streaming Pipeline",
        backDesc: "[One line: upload → transcode → adaptive HLS delivery from R2.]",
        chips: ["Cloudflare R2", "HLS", "Node.js"],
        links: [
          { label: "Case study ↗", href: "#" },
        ],
        stringLen: 85,
      },
      {
        id: "portfolio-2026",
        num: "04",
        status: "You're here",
        isLive: false,
        thumbType: "t4",
        title: "This Portfolio",
        subtitle: "Interactive site · 2026",
        backTag: "04 · Designed & built by me",
        backTitle: "Portfolio 2026",
        backDesc: "Hand-built with GSAP ScrollTrigger, Lenis smooth scroll and CSS 3D transforms — no templates.",
        chips: ["GSAP", "Lenis", "CSS 3D"],
        links: [
          { label: "Code ↗", href: "#" },
        ],
        stringLen: 105,
      },
    ] as ProjectItem[],
  },
  process: {
    tag: "Process — 02",
    heading: {
      line1: "How I work —",
      line2: "four rules I build by.",
    },
    steps: [
      {
        filename: "discover.md",
        num: "1",
        title: "Discover",
        description: "Understand the users, the goal and the constraints before writing a single line of code.",
        codeHtml: `<div class="fn"><span>discover.md</span><span>01</span></div><br><span class="c1"># goal</span><br>- who uses it?<br>- what must it do?<br><span class="c2">- constraints &amp; deadline</span>`,
      },
      {
        filename: "schema.ts",
        num: "2",
        title: "Design the system",
        description: "Plan the data model, API contracts and UI flows so the build stays simple.",
        codeHtml: `<div class="fn"><span>schema.ts</span><span>02</span></div><br><span class="c1">type</span> Course = {<br>&nbsp;&nbsp;id: <span class="c2">string</span><br>&nbsp;&nbsp;lessons: <span class="c3">Lesson[]</span><br>}`,
      },
      {
        filename: "page.tsx",
        num: "3",
        title: "Build in small pieces",
        description: "Ship reviewed, tested increments with React, Next.js and Node.js.",
        codeHtml: `<div class="fn"><span>page.tsx</span><span>03</span></div><br><span class="c1">export default</span> <span class="c2">fn</span>() {<br>&nbsp;&nbsp;<span class="c3">return</span> &lt;Dashboard /&gt;<br>}<br>✓ reviewed · ✓ tested`,
      },
      {
        filename: "deploy.yml",
        num: "4",
        title: "Launch & iterate",
        description: "Deploy, watch real usage and keep improving speed and UX.",
        codeHtml: `<div class="fn"><span>deploy.yml</span><span>04</span></div><br><span class="c1">on:</span> push<br><span class="c2">build</span> → <span class="c2">test</span> → <span class="c3">deploy</span><br>status: <span class="c2">● live</span>`,
      },
    ] as ProcessStep[],
  },
  skills: {
    tag: "Skills — 03",
    heading: {
      line1: "The stack",
      line2: "I ship with.",
    },
    categories: [
      {
        num: "01",
        title: "Frontend",
        tools: ["React", "Next.js", "JavaScript", "HTML & CSS", "Responsive UI"],
      },
      {
        num: "02",
        title: "Backend",
        tools: ["Node.js", "Express", "MongoDB", "REST APIs", "Auth"],
      },
      {
        num: "03",
        title: "Cloud & Media",
        tools: ["Cloudflare R2", "HLS Streaming", "Deployment", "Git"],
      },
    ] as SkillCategory[],
  },
  experience: {
    tag: "Experience — 04",
    heading: {
      line1: "Where I've",
      line2: "shipped code.",
    },
    items: [
      {
        period: "[START] — Present",
        isCurrent: true,
        role: "Full Stack Developer",
        company: "[COMPANY NAME]",
        desc: "Building and maintaining LMS and ERP portals in live production on MERN + Next.js, with video delivery on Cloudflare R2 and HLS.",
      },
      {
        period: "[START] — [END]",
        isCurrent: false,
        role: "[PREVIOUS ROLE]",
        company: "[COMPANY / INTERNSHIP]",
        desc: "[What you built and learned there.]",
      },
      {
        period: "[YEAR]",
        isCurrent: false,
        role: "[DEGREE / COURSE]",
        company: "[INSTITUTE]",
        desc: "",
      },
    ] as ExperienceItem[],
  },
  contact: {
    tag: "Contact — 05",
    heading: {
      line1: "Have an idea?",
      line2: "Let's build it.",
    },
    email: "yadavakhil415@gmail.com",
    emailDisplay: "yadavakhil415@gmail.com",
    socials: [
      { label: "GitHub", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Resume", href: "#" },
    ] as SocialLink[],
  },
  footer: {
    copyright: "© 2026 Akhilesh Yadav",
    location: "Designed & developed by me · Rajasthan, India",
    backToTop: "Back to top ↑",
  },
};

