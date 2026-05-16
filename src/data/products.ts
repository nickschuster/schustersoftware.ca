export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  status: "active" | "maintenance" | "archived" | "in-development";
  launchDate?: string;
  featured?: boolean;
  category: "productivity" | "health" | "gaming" | "finance";
  features: string[];
  ctaText: string;
  ctaLink: string;
}

export const products: Product[] = [
  {
    id: "betbeat",
    title: "BetBeat",
    description:
      "Make smarter betting decisions with AI-powered statistical analysis and real-time insights",
    image: "/images/bb.png",
    technologies: ["Angular", "LLMs", "NgRx", "RxJS", "NestJS"],
    github: "https://github.com/nickschuster/betbeat",
    status: "active",
    featured: true,
    category: "finance",
    features: [
      "AI-powered predictions",
      "Real-time odds analysis",
      "Risk assessment tools",
      "Historical data insights",
    ],
    ctaText: "Start Analyzing",
    ctaLink: "https://betbeat.schustersoftware.ca",
  },
  {
    id: "satiate",
    title: "Satiate",
    description:
      "Track calories effortlessly and achieve your nutrition goals with smart meal planning",
    image: "/images/s.png",
    technologies: ["AWS", "React", "Material UI"],
    github: "https://github.com/nickschuster/satiate",
    status: "active",
    featured: true,
    category: "health",
    features: [
      "Smart calorie tracking",
      "Meal planning",
      "Progress analytics",
      "Recipe suggestions",
    ],
    ctaText: "Track Your Meals",
    ctaLink: "https://satiate.schustersoftware.ca",
  },
  {
    id: "virtual-whiteboard",
    title: "Virtual Whiteboard",
    description:
      "Collaborate in real-time with an infinitely scalable whiteboard that never slows down",
    image: "/images/vw.png",
    technologies: ["AWS", "JQuery", "Socket.IO"],
    github: "https://github.com/nickschuster/virtual-whiteboard-client",
    status: "active",
    featured: true,
    category: "productivity",
    features: [
      "Real-time collaboration",
      "Infinite canvas",
      "Multi-device sync",
      "Drawing tools",
    ],
    ctaText: "Start Drawing",
    ctaLink: "https://whiteboard.schustersoftware.ca",
  },
  {
    id: "quench",
    title: "Quench",
    description:
      "Stay hydrated and healthy with intelligent water intake tracking and reminders",
    image: "/images/q.png",
    technologies: ["GCP", "Firebase", "Java", "Android"],
    github: "https://github.com/nickschuster/quench",
    status: "maintenance",
    category: "health",
    features: [
      "Daily water goals",
      "Smart reminders",
      "Hydration tracking",
      "Health insights",
    ],
    ctaText: "Download App",
    ctaLink:
      "https://play.google.com/store/apps/details?id=com.schustersoftware.quench",
  },
  {
    id: "nine-mens-morris",
    title: "Nine Men's Morris",
    description:
      "Challenge friends or play against AI in this classic strategy board game",
    image: "/images/nmb.png",
    technologies: ["Python", "PyGame"],
    github: "https://github.com/nickschuster/nine-mens-morris",
    status: "maintenance",
    category: "gaming",
    features: [
      "Classic gameplay",
      "AI opponents",
      "Multiplayer support",
      "Strategy challenges",
    ],
    ctaText: "Play Now",
    ctaLink: "https://github.com/nickschuster/nine-mens-morris/releases",
  },
  {
    id: "battlesnake",
    title: "Battle Snake",
    description:
      "Compete in automated snake battles with strategic AI algorithms",
    image: "/images/bs.png",
    technologies: ["Python"],
    github: "https://github.com/nickschuster/battlesnake-2020",
    status: "maintenance",
    category: "gaming",
    features: [
      "AI battles",
      "Tournament ready",
      "Custom strategies",
      "Real-time competition",
    ],
    ctaText: "Watch Battles",
    ctaLink: "https://github.com/nickschuster/battlesnake-2020",
  },
];
