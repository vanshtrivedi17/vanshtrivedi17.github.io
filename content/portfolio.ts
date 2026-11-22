export const profile = {
  name: "Vansh Trivedi",
  fullName: "Vansh Jigesh Trivedi",
  subtitle: "University of Toronto · Computer Science",
  bio: "I’m Vansh Jigesh Trivedi. I study Computer Science at U of T in Toronto, Ontario, and earned my IB Diploma at Fountainhead School in Surat, India.",
  intro: "I founded and built Leher, a startup networking platform that reached 100+ users and secured 8+ international startup partnerships. At U of T, I contribute to UTESCA’s live website and research systematic trading strategies with the Quantitative Finance Club.",
  email: "vansh.trivedi17@gmail.com",
  linkedin: "https://www.linkedin.com/in/vansh-trivedi-928486260/",
  github: "https://github.com/vanshtrivedi17",
  location: "Toronto, Ontario",
  site: "https://vanshtrivedi17.github.io/",
  portrait: { src: "/linkedin-portrait.webp", width: 560, height: 700 },
};

export const navigation = [
  ["work", "Work"], ["research", "Research"], ["experience", "Experience"],
  ["education", "Education"], ["contact", "Contact"],
];

export const leher = {
  title: "Leher",
  context: "Founder · January 2025–January 2026",
  website: "https://leher.web.app/",
  summary: "A startup networking platform that helps aspiring entrepreneurs discover early-stage startups and find potential co-founders.",
  contribution: "I built authentication, onboarding, and co-founder matching with Next.js, Supabase, and PostgreSQL. I led deployment, user acquisition, and partnerships, and used founder feedback to improve discovery.",
  results: [["100+", "users"], ["8+", "startup partnerships"]],
  steps: [
    { title: "Discover", summary: "Explore early-stage startups." },
    { title: "Match", summary: "Find potential co-founders." },
    { title: "Connect", summary: "Start a conversation." },
  ],
};

export const pathfinding = {
  title: "Comparing Pathfinding Algorithms on a Changing Grid",
  context: "IB Computer Science Extended Essay · 2026",
  summary: "For my IB Computer Science Extended Essay, I wrote a 4,000-word paper comparing Dijkstra’s algorithm, A*, and D* Lite. I implemented all three in Python and measured computation time, memory usage, and nodes explored as obstacles changed on a 30 × 30 grid.",
  results: [
    ["Dijkstra", "107.56 ms", "125.9 kB", "717.8"],
    ["A*", "6.77 ms", "69.6 kB", "403.0"],
    ["D* Lite", "4.50 ms", "9.0 kB", "243.1"],
  ],
  takeaway: "On my dynamic 30 × 30 grid, D* Lite recorded the lowest mean computation time, memory usage, and number of nodes explored. A* also cut mean computation time from 107.56 ms to 6.77 ms compared with Dijkstra.",
};

export const otherProjects = [
  {
    title: "Standout",
    context: "MobiOffice Software Innovations · 2025",
    summary: "Independently designed and built Standout, a platform for students to showcase university applications and résumés.",
  },
  {
    title: "Voithos",
    context: "Independent project · 2025",
    summary: "I built an AI-assisted accessibility prototype exploring communication and daily-routine support for autistic children and their families. I explored accessible interfaces and adaptive prompts.",
  },
  {
    title: "Satyam Tiffin Service",
    context: "Digital Strategy Consultant · 2024",
    summary: "I built a website and established branding, a Google presence, and social channels for a local food service that took orders by phone. Sign-ups grew from roughly 5–7 to 30–50 in under six months.",
  },
];

export const research = {
  organization: "Quantitative Finance Club, University of Toronto",
  role: "Research Associate · November 2026–present",
  threads: [
    { title: "Adaptive Momentum and Mean Reversion Across Market Regimes", summary: "I’m investigating how momentum and mean-reversion strategies behave under different market conditions and when switching between them may be useful." },
    { title: "Systematic Trading Strategies", summary: "I’m investigating how pairs trading, mean reversion, and moving-average crossovers can be expressed as systematic trading rules." },
  ],
};

export const experience = [
  {
    organization: "University of Toronto Engineering Students Consulting Association (UTESCA)",
    role: "First-Year Web Intern",
    dates: "November 2026–present",
    summary: "I contribute to UTESCA’s live website on a student web team, working on website improvements in a shared GitHub codebase.",
  },
  {
    organization: "MobiOffice Software Innovations",
    role: "Web Development Intern",
    dates: "May–June 2025",
    summary: "My technical SEO work helped move most target keywords from around page 11 to page 1 in Google results. I also built responsive interfaces from Figma designs, maintained code in GitHub, and updated XML sitemaps, robots.txt, and analytics integrations.",
  },
  {
    organization: "Eastern Techno Solutions, now Kombee",
    role: "Technical SEO Intern",
    dates: "May–June 2024",
    summary: "I audited and optimized 20+ client websites and produced 20+ SEO reports covering keyword relevance, visibility, and technical improvements.",
  },
];

export const education = [
  { school: "University of Toronto, St. George", details: "Computer Science · September 2026–present", extra: "Selected first-year coursework (including in-progress or scheduled courses): CSC110, CSC111, MAT148, MAT149, MAT223, and STA130." },
  { school: "Fountainhead School", details: "IB Diploma · Surat, India · 2024–2026", extra: "38/45 diploma score · Physics HL: 7" },
];

export const leadership = [
  { title: "Founder & President, Computer Science Club", context: "Fountainhead School · 2023–2026", metric: "20+ members recruited", summary: "I started my school’s first Computer Science Club and led programming workshops and peer mentorship." },
  { title: "PyWars", context: "Interschool Python competition", metric: "150+ participants", summary: "I led technical operations for the competition." },
];

export const xerox = {
  amount: "$20,000",
  title: "Xerox Award for Innovation & Information Technology",
  context: "University of Rochester · Scholarship award",
};

export const recognition = [
  "IIT Madras Data Science & AI Certification · 86% on the final project (Honors)",
  "Savvy Global Fellowship · International entrepreneurship fellowship",
  "Pearson BTEC Level 3 IT qualification · Distinction",
  "Fountainhead School Lakshya Scholarship · Academic and leadership excellence",
];

export const skills = [
  ["Web development", "JavaScript, HTML/CSS, React, Next.js, REST APIs"],
  ["Data and research", "Python, SQL, Supabase, PostgreSQL"],
  ["Design and delivery", "Git/GitHub, Figma, technical SEO"],
];
