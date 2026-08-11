export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  status:
    | "active"
    | "maintenance"
    | "archived"
    | "in-development"
    | "deprecated";
  launchDate?: string;
  featured?: boolean;
  category: "productivity" | "health" | "gaming" | "finance";
  features: string[];
  ctaText: string;
  ctaLink: string;
}

export const products: Product[] = [
  {
    id: "kitsano",
    title: "Kitsano",
    description:
      "Intelligent Document Processing (IDP) SaaS platform for digitizing and automating document workflows.",
    image: "/images/kitsano.svg",
    technologies: [
      "SvelteKit",
      "TypeScript",
      "TailwindCSS",
      "PostgreSQL",
      "Terraform",
    ],
    status: "in-development",
    category: "productivity",
    features: [
      "Multi-tenant data isolation",
      "Permission-driven RBAC system",
      "Tenant white-labeling & branding",
      "Automated infrastructure provisioning",
    ],
    ctaText: "Coming Soon!",
    ctaLink: "https://www.schustersoftware.ca",
  },
  {
    id: "tasken",
    title: "Tasken",
    description:
      "Your tasks, at the speed of thought. A fast, minimalist task manager with powerful keyboard controls and instant cloud sync.",
    image: "/images/tasken.svg",
    technologies: [
      "Svelte",
      "SvelteKit",
      "TypeScript",
      "TailwindCSS",
      "PostgreSQL",
    ],
    status: "maintenance",
    featured: true,
    category: "productivity",
    features: [
      "Keyboard shortcut workflow",
      "Instant cross-device sync",
      "100% Free & Open Source",
      "Zen minimalist design",
    ],
    ctaText: "Start Focusing",
    ctaLink: "https://tasken.app",
  },
  {
    id: "statbeat",
    title: "StatBeat",
    description:
      "Make smarter analytical decisions with AI-powered statistical models and real-time data insights",
    image: "/images/statbeat.svg",
    technologies: ["Angular", "LLMs", "NgRx", "RxJS", "NestJS"],
    status: "deprecated",
    featured: true,
    category: "finance",
    features: [
      "AI-powered predictions",
      "Real-time data analysis",
      "Risk assessment tools",
      "Historical data insights",
    ],
    ctaText: "Start Analyzing",
    ctaLink: "https://github.com/nickschuster/betbeat",
  },
  {
    id: "satiate",
    title: "Satiate",
    description:
      "Track calories effortlessly and achieve your nutrition goals with smart meal planning",
    image: "/images/satiate.svg",
    technologies: ["AWS", "React", "Material UI"],
    status: "deprecated",
    featured: true,
    category: "health",
    features: [
      "Smart calorie tracking",
      "Meal planning",
      "Progress analytics",
      "Recipe suggestions",
    ],
    ctaText: "View on GitHub",
    ctaLink: "https://github.com/nickschuster/satiate",
  },
  {
    id: "virtual-whiteboard",
    title: "Virtual Whiteboard",
    description:
      "Collaborate in real-time with an infinitely scalable whiteboard that never slows down",
    image: "/images/whiteboard.svg",
    technologies: ["AWS", "JQuery", "Socket.IO"],
    status: "deprecated",
    featured: true,
    category: "productivity",
    features: [
      "Real-time collaboration",
      "Infinite canvas",
      "Multi-device sync",
      "Drawing tools",
    ],
    ctaText: "View on GitHub",
    ctaLink: "https://github.com/nickschuster/virtual-whiteboard-client",
  },
  {
    id: "quench",
    title: "Quench",
    description:
      "Stay hydrated and healthy with intelligent water intake tracking and reminders",
    image: "/images/quench.svg",
    technologies: ["GCP", "Firebase", "Java", "Android"],
    status: "archived",
    category: "health",
    features: [
      "Daily water goals",
      "Smart reminders",
      "Hydration tracking",
      "Health insights",
    ],
    ctaText: "View on GitHub",
    ctaLink: "https://github.com/nickschuster/quench",
  },
  {
    id: "battlesnake-2020",
    title: "BattleSnake 2020",
    description:
      "BattleSnake 2020 competitor and top 6 finisher in the open division",
    image: "/images/bs.svg",
    technologies: ["Python"],
    status: "archived",
    category: "gaming",
    features: [
      "Competitive AI snake",
      "Top 6 open division finish",
      "Pathfinding heuristics",
    ],
    ctaText: "View on GitHub",
    ctaLink: "https://github.com/nickschuster/battlesnake-2020",
  },
  {
    id: "nine-mens-morris",
    title: "Nine Men's Morris",
    description:
      "The classic board game recreated in PyGame. Play against AI or a friend. Includes a networking server.",
    image: "/images/ninemensmorris.svg",
    technologies: ["Python", "PyGame"],
    status: "archived",
    category: "gaming",
    features: [
      "Classic gameplay",
      "AI opponents",
      "Multiplayer support",
      "Strategy challenges",
    ],
    ctaText: "View on GitHub",
    ctaLink: "https://github.com/nickschuster/nine-mens-morris",
  },
];
