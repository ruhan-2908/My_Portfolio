export interface Identity {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  summary: string;
  languages: string[];
  status: "available" | "busy" | "unavailable";
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "database" | "devops" | "language";
  proficiency: number; // 1-100
  yearsExperience?: number;
}

export interface Project {
  id: string;
  name: string;
  codename: string;
  description: string;
  problem: string;
  constraints: string[];
  designDecisions: string[];
  implementation: string[];
  outcome: string;
  technologies: string[];
  status: "completed" | "in-progress" | "planned";
  links?: {
    live?: string;
    github?: string;
  };
}

export interface TimelineEvent {
  version: string;
  title: string;
  date: string;
  description: string;
  type: "education" | "project" | "experience" | "achievement";
  highlights: string[];
}

export const identity: Identity = {
  name: "Ruhan K.B.",
  title: "Full Stack Developer",
  location: "Coimbatore, Tamil Nadu",
  email: "ruhankb29@gmail.com",
  phone: "+91 9597689386",
  linkedin: "linkedin.com/in/ruhan29",
  portfolio: "https://ruhan-2908.github.io/My_Portfolio/",
  summary: "Aspiring Full-Stack Developer pursuing B.E. in Computer Science and Engineering at PSG College of Technology. Building scalable web applications using the MERN stack and Spring Boot with expertise in RESTful API design, authentication mechanisms, and responsive UI development.",
  languages: ["English", "Tamil", "Hindi"],
  status: "available",
};

export const skills: Skill[] = [
  { name: "React.js", category: "frontend", proficiency: 85 },
  { name: "JavaScript", category: "language", proficiency: 88 },
  { name: "TypeScript", category: "language", proficiency: 75 },
  { name: "Node.js", category: "backend", proficiency: 82 },
  { name: "Express.js", category: "backend", proficiency: 80 },
  { name: "Spring Boot", category: "backend", proficiency: 75 },
  { name: "Java", category: "language", proficiency: 88 },
  { name: "Python", category: "language", proficiency: 70 },
  { name: "MongoDB", category: "database", proficiency: 80 },
  { name: "MySQL", category: "database", proficiency: 85 },
  { name: "Git & GitHub", category: "devops", proficiency: 95 },
  { name: "Docker", category: "devops", proficiency: 65 },
  { name: "Tailwind CSS", category: "frontend", proficiency: 70 },
  { name: "REST APIs", category: "backend", proficiency: 85 },
];

export const projects: Project[] = [
  {
    id: "cravelane",
    name: "CraveLane",
    codename: "CASE_FOOD_001",
    description: "Online Food Delivery Platform",
    problem: "Users needed a seamless, secure platform to order food with real-time tracking and instant menu updates without compromising on user experience or data security.",
    constraints: [
      "Must handle concurrent order requests",
      "Real-time data synchronization required",
      "Secure authentication mandatory",
      "Responsive across all devices",
    ],
    designDecisions: [
      "Chose MERN stack for unified JavaScript ecosystem",
      "Implemented JWT for stateless, scalable authentication",
      "Used WebSocket patterns for real-time tracking",
      "MongoDB for flexible menu schema design",
    ],
    implementation: [
      "Built React frontend with component-driven architecture",
      "Designed RESTful API with Express.js backend",
      "Implemented secure JWT-based authentication flow",
      "Created real-time order tracking system",
      "Optimized database queries for menu operations",
    ],
    outcome: "Delivered a fully functional food delivery platform with secure authentication, real-time order tracking, and seamless user interaction that handles concurrent orders efficiently.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "JWT"],
    status: "completed",
  },
  {
    id: "asyncshop",
    name: "Async Shop",
    codename: "CASE_ECOM_002",
    description: "E-Commerce Web Application",
    problem: "Building a scalable e-commerce solution that handles complex product management, secure transactions, and automated payment workflows while maintaining enterprise-grade security.",
    constraints: [
      "Enterprise-level security requirements",
      "Automated payment processing needed",
      "Scalable product catalog system",
      "Performance optimization critical",
    ],
    designDecisions: [
      "Selected Spring Boot for robust backend architecture",
      "React for dynamic, interactive UI",
      "MySQL for structured product data",
      "Microservice-ready architecture design",
    ],
    implementation: [
      "Developed Spring Boot backend with layered architecture",
      "Built React frontend with state management",
      "Integrated secure authentication workflows",
      "Implemented product tracking system",
      "Automated payment processing integration",
    ],
    outcome: "Created a production-ready e-commerce platform currently undergoing upgrades for improved performance and additional integrations.",
    technologies: ["Java", "Spring Boot", "React", "MySQL"],
    status: "completed",
  },
];

export const timeline: TimelineEvent[] = [
  {
    version: "v3.0",
    title: "Full Stack Development",
    date: "2024 - Present",
    description: "Pursuing B.E. in Computer Science at PSG College of Technology",
    type: "education",
    highlights: [
      "Building production-ready applications",
      "Mastering enterprise frameworks",
      "Advanced system design concepts",
    ],
  },
  {
    version: "v2.5",
    title: "Smart India Hackathon",
    date: "2024",
    description: "Presented innovative concept for gamified learning environment",
    type: "achievement",
    highlights: [
      "Idea development and presentation",
      "Initial UI direction and prototyping",
      "Team collaboration experience",
    ],
  },
  {
    version: "v2.0",
    title: "Web Development Internship",
    date: "2024",
    description: "SkillCraft - Individual internship focused on React development",
    type: "experience",
    highlights: [
      "Built responsive mini-project",
      "Enhanced UI/UX skills",
      "Front-end performance optimization",
    ],
  },
  {
    version: "v1.5",
    title: "First Full Stack Projects",
    date: "2023-2024",
    description: "Built CraveLane and Async Shop applications",
    type: "project",
    highlights: [
      "MERN stack mastery",
      "Spring Boot introduction",
      "Database design skills",
    ],
  },
  {
    version: "v1.0",
    title: "Foundation",
    date: "2022 - 2024",
    description: "Higher Secondary Education at Trinity Matriculation School",
    type: "education",
    highlights: [
      "Mathematics & Computer Science focus",
      "Programming fundamentals",
      "Algorithmic thinking",
    ],
  }
];

export const roleEmphasis = {
  recruiter: {
    focus: ["identity", "skills", "experience"],
    metrics: true,
    technicalDepth: "medium",
  },
  developer: {
    focus: ["projects", "skills", "timeline"],
    metrics: true,
    technicalDepth: "high",
  },
  peer: {
    focus: ["projects", "timeline", "growth"],
    metrics: false,
    technicalDepth: "high",
  },
};
