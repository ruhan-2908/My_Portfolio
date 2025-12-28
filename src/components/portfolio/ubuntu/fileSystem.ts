import { identity, skills, projects, timeline } from "@/data/portfolioData";
import { FileSystemItem } from "./types";

export const buildFileSystem = (): FileSystemItem => ({
  name: "home",
  type: "folder",
  children: [
    {
      name: "ruhan",
      type: "folder",
      children: [
        {
          name: "About.txt",
          type: "file",
          icon: "file-text",
          content: `╔══════════════════════════════════════════════════════════════╗
║                      ABOUT RUHAN K.B.                        ║
╚══════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────┐
│  Name        : ${identity.name.padEnd(44)}│
│  Title       : ${identity.title.padEnd(44)}│
│  Location    : ${identity.location.padEnd(44)}│
│  Status      : ${identity.status.toUpperCase().padEnd(44)}│
└─────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${identity.summary}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Languages: ${identity.languages.join(" | ")}

[EOF]
`,
        },
        {
          name: "Resume.pdf",
          type: "file",
          icon: "file-pdf",
          content: `╔══════════════════════════════════════════════════════════════╗
║                        RESUME                                ║
║                      Ruhan K.B.                              ║
╚══════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────┐
│                    CONTACT INFORMATION                      │
├─────────────────────────────────────────────────────────────┤
│  Email     : ${identity.email.padEnd(46)}│
│  Phone     : ${identity.phone.padEnd(46)}│
│  LinkedIn  : ${identity.linkedin.padEnd(46)}│
│  Location  : ${identity.location.padEnd(46)}│
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      EDUCATION                              │
├─────────────────────────────────────────────────────────────┤
│  B.E. Computer Science & Engineering                        │
│  PSG College of Technology, Coimbatore                      │
│  2022 - Present                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                       SKILLS                                │
├─────────────────────────────────────────────────────────────┤
${skills.map(s => `│  • ${s.name.padEnd(20)} [${'█'.repeat(Math.floor(s.proficiency/10))}${'░'.repeat(10-Math.floor(s.proficiency/10))}] ${s.proficiency}%       │`).join('\n')}
└─────────────────────────────────────────────────────────────┘

[Press 'q' to exit]
`,
        },
        {
          name: "Skills",
          type: "folder",
          children: [
            {
              name: "Backend.md",
              type: "file",
              content: `# 🔧 Backend Technologies

## Core Competencies

${skills
  .filter((s) => s.category === "backend")
  .map((s) => `### ${s.name}\n- Proficiency: ${'★'.repeat(Math.floor(s.proficiency/20))}${'☆'.repeat(5-Math.floor(s.proficiency/20))} (${s.proficiency}%)\n- Status: ${s.proficiency >= 80 ? '🟢 Advanced' : s.proficiency >= 60 ? '🟡 Intermediate' : '🔵 Learning'}`)
  .join("\n\n")}

---

## Architecture Expertise
- ✅ RESTful API Design
- ✅ Authentication & Authorization (JWT, OAuth)
- ✅ Database Integration (SQL & NoSQL)
- ✅ Microservice Architecture Patterns
- ✅ Server-Side Rendering

## Best Practices
- Clean Code Principles
- SOLID Design Patterns
- Test-Driven Development
- API Versioning
- Error Handling & Logging
`,
            },
            {
              name: "Frontend.md",
              type: "file",
              content: `# 🎨 Frontend Technologies

## Core Competencies

${skills
  .filter((s) => s.category === "frontend")
  .map((s) => `### ${s.name}\n- Proficiency: ${'★'.repeat(Math.floor(s.proficiency/20))}${'☆'.repeat(5-Math.floor(s.proficiency/20))} (${s.proficiency}%)\n- Status: ${s.proficiency >= 80 ? '🟢 Advanced' : s.proficiency >= 60 ? '🟡 Intermediate' : '🔵 Learning'}`)
  .join("\n\n")}

---

## UI/UX Expertise
- ✅ Component-driven Development
- ✅ Responsive Design (Mobile-first)
- ✅ State Management (Redux, Context)
- ✅ Modern CSS (Tailwind, Styled Components)
- ✅ Animation & Micro-interactions

## Accessibility
- WCAG 2.1 Compliance
- Semantic HTML
- ARIA Labels
- Keyboard Navigation
`,
            },
            {
              name: "Tools.md",
              type: "file",
              content: `# 🛠️ Development Tools & Languages

## DevOps & Tools

${skills
  .filter((s) => s.category === "devops")
  .map((s) => `### ${s.name}\n- Proficiency: ${'★'.repeat(Math.floor(s.proficiency/20))}${'☆'.repeat(5-Math.floor(s.proficiency/20))} (${s.proficiency}%)`)
  .join("\n\n")}

---

## Programming Languages

${skills
  .filter((s) => s.category === "language")
  .map((s) => `### ${s.name}\n- Proficiency: ${'★'.repeat(Math.floor(s.proficiency/20))}${'☆'.repeat(5-Math.floor(s.proficiency/20))} (${s.proficiency}%)`)
  .join("\n\n")}

---

## Development Environment
- **IDE**: VS Code, IntelliJ IDEA
- **Terminal**: Bash, Zsh
- **Version Control**: Git, GitHub
- **Containers**: Docker
- **CI/CD**: GitHub Actions
`,
            },
            {
              name: "Databases.md",
              type: "file",
              content: `# 🗄️ Database Technologies

## Core Competencies

${skills
  .filter((s) => s.category === "database")
  .map((s) => `### ${s.name}\n- Proficiency: ${'★'.repeat(Math.floor(s.proficiency/20))}${'☆'.repeat(5-Math.floor(s.proficiency/20))} (${s.proficiency}%)\n- Type: ${s.name.includes('Mongo') ? 'NoSQL (Document)' : 'SQL (Relational)'}`)
  .join("\n\n")}

---

## Database Design
- ✅ Schema Design & Normalization
- ✅ Query Optimization
- ✅ Indexing Strategies
- ✅ Data Modeling
- ✅ Migrations & Seeding
`,
            },
          ],
        },
        {
          name: "Projects",
          type: "folder",
          children: projects.map((project) => ({
            name: project.name,
            type: "folder" as const,
            children: [
              {
                name: "README.md",
                type: "file" as const,
                content: `# 🚀 ${project.name}

> ${project.description}

**Codename:** \`${project.codename}\`
**Status:** ${project.status === 'completed' ? '✅ Completed' : project.status === 'in-progress' ? '🔄 In Progress' : '📋 Planned'}

---

## 📋 Problem Statement

${project.problem}

---

## ⚠️ Constraints

${project.constraints.map((c) => `- ${c}`).join("\n")}

---

## 🎯 Design Decisions

${project.designDecisions.map((d, i) => `${i + 1}. ${d}`).join("\n")}

---

## ⚙️ Implementation

${project.implementation.map((i) => `✓ ${i}`).join("\n")}

---

## 📊 Outcome

> ${project.outcome}

---

## 🛠️ Tech Stack

\`\`\`
${project.technologies.join(" | ")}
\`\`\`

---

*Last updated: ${new Date().toLocaleDateString()}*
`,
              },
              {
                name: "ARCHITECTURE.md",
                type: "file" as const,
                content: `# 🏗️ Architecture Overview - ${project.name}

## System Design

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   React     │  │   Redux/    │  │   Axios/    │         │
│  │   Frontend  │  │   Context   │  │   Fetch     │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
└─────────┼────────────────┼────────────────┼─────────────────┘
          │                │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────┐
│                      API LAYER                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              REST API / GraphQL                      │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│                     SERVER LAYER                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Express/  │  │    Auth     │  │   Business  │         │
│  │   Spring    │  │   Middleware│  │   Logic     │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
└─────────┼────────────────┼────────────────┼─────────────────┘
          │                │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────┐
│                     DATA LAYER                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           MongoDB / MySQL Database                   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## Key Components

${project.technologies.map(t => `- **${t}**: Core technology`).join('\n')}
`,
              },
              {
                name: "TechStack.txt",
                type: "file" as const,
                content: `╔══════════════════════════════════════════════════════════════╗
║                    TECHNOLOGY STACK                          ║
║                      ${project.name.padEnd(36)}║
╚══════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────┐
│                     TECHNOLOGIES                            │
├─────────────────────────────────────────────────────────────┤
${project.technologies.map((t) => `│  ► ${t.padEnd(55)}│`).join("\n")}
└─────────────────────────────────────────────────────────────┘

Status: ${project.status.toUpperCase()}

[EOF]
`,
              },
            ],
          })),
        },
        {
          name: "Experience",
          type: "folder",
          children: [
            {
              name: "Timeline.md",
              type: "file",
              content: `# 📅 Professional Timeline

${timeline
  .map(
    (t) => `
## ${t.version} - ${t.title}
**${t.date}** | *${t.type.charAt(0).toUpperCase() + t.type.slice(1)}*

${t.description}

### Key Highlights
${t.highlights.map((h) => `- ${h}`).join("\n")}

---`
  )
  .join("\n")}
`,
            },
            {
              name: "Certifications.txt",
              type: "file",
              content: `╔══════════════════════════════════════════════════════════════╗
║                     CERTIFICATIONS                           ║
╚══════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────┐
│  📜 In Progress                                             │
├─────────────────────────────────────────────────────────────┤
│  • Full Stack Web Development                               │
│  • Cloud Computing Fundamentals                             │
│  • Advanced JavaScript Patterns                             │
└─────────────────────────────────────────────────────────────┘

[EOF]
`,
            },
          ],
        },
        {
          name: "Contact.txt",
          type: "file",
          content: `╔══════════════════════════════════════════════════════════════╗
║                   CONTACT INFORMATION                        ║
╚══════════════════════════════════════════════════════════════╝

  ┌─────────────────────────────────────────────────────────┐
  │                                                         │
  │   📧 Email    : ${identity.email.padEnd(40)}│
  │   📱 Phone    : ${identity.phone.padEnd(40)}│
  │   💼 LinkedIn : ${identity.linkedin.padEnd(40)}│
  │   🌐 Portfolio: ${identity.portfolio.padEnd(40)}│
  │   📍 Location : ${identity.location.padEnd(40)}│
  │                                                         │
  └─────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    STATUS: 🟢 ${identity.status.toUpperCase()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

     Feel free to reach out for opportunities,
     collaborations, or just to say hello!

     Response time: Usually within 24 hours

[EOF]
`,
        },
        {
          name: ".bashrc",
          type: "file",
          content: `# ~/.bashrc: executed by bash(1) for non-login shells.

# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# Alias definitions
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias cls='clear'
alias ..='cd ..'
alias ...='cd ../..'

# Custom prompt
PS1='\\[\\033[01;32m\\]\\u@ubuntu\\[\\033[00m\\]:\\[\\033[01;34m\\]\\w\\[\\033[00m\\]\\$ '

# Welcome message
echo "Welcome back, ${identity.name}!"
echo "Today is $(date)"
`,
        },
        {
          name: ".vimrc",
          type: "file",
          content: `" Vim configuration file

set number
set relativenumber
set tabstop=2
set shiftwidth=2
set expandtab
set autoindent
set smartindent
syntax on
set background=dark
set mouse=a
set clipboard=unnamedplus

" Key mappings
nnoremap <C-s> :w<CR>
nnoremap <C-q> :q<CR>

" Status line
set laststatus=2
set statusline=%F%m%r%h%w\\ [%l,%c]
`,
        },
      ],
    },
  ],
});

export const getItemAtPath = (fileSystem: FileSystemItem, path: string[]): FileSystemItem | null => {
  let current: FileSystemItem | undefined = fileSystem;
  for (const segment of path) {
    if (current?.type !== "folder" || !current.children) return null;
    current = current.children.find((c) => c.name === segment);
    if (!current) return null;
  }
  return current || null;
};
