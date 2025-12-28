import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Minus, Square } from "lucide-react";
import { identity, skills, projects, timeline } from "@/data/portfolioData";

interface TerminalLine {
  type: "input" | "output" | "error";
  content: string;
}

interface FileSystem {
  [key: string]: {
    type: "dir" | "file";
    content?: string;
    children?: string[];
  };
}

const fileSystem: FileSystem = {
  "/": { type: "dir", children: ["home"] },
  "/home": { type: "dir", children: ["ruhan"] },
  "/home/ruhan": { type: "dir", children: ["about.txt", "skills", "projects", "timeline.log", "contact.txt"] },
  "/home/ruhan/about.txt": { 
    type: "file", 
    content: `${identity.name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Title:    ${identity.title}
Location: ${identity.location}
Status:   ${identity.status === "available" ? "🟢 Available" : "🔴 Busy"}

${identity.summary}

Languages: ${identity.languages.join(", ")}
` 
  },
  "/home/ruhan/contact.txt": { 
    type: "file", 
    content: `Contact Information
━━━━━━━━━━━━━━━━━━━━

Email:     ${identity.email}
Phone:     ${identity.phone}
LinkedIn:  ${identity.linkedin}
Portfolio: ${identity.portfolio}
` 
  },
  "/home/ruhan/skills": { type: "dir", children: ["frontend.txt", "backend.txt", "languages.txt", "database.txt", "devops.txt"] },
  "/home/ruhan/skills/frontend.txt": { 
    type: "file", 
    content: skills.filter(s => s.category === "frontend").map(s => `${s.name.padEnd(15)} ${"█".repeat(Math.floor(s.proficiency/10))}${"░".repeat(10-Math.floor(s.proficiency/10))} ${s.proficiency}%`).join("\n") 
  },
  "/home/ruhan/skills/backend.txt": { 
    type: "file", 
    content: skills.filter(s => s.category === "backend").map(s => `${s.name.padEnd(15)} ${"█".repeat(Math.floor(s.proficiency/10))}${"░".repeat(10-Math.floor(s.proficiency/10))} ${s.proficiency}%`).join("\n") 
  },
  "/home/ruhan/skills/languages.txt": { 
    type: "file", 
    content: skills.filter(s => s.category === "language").map(s => `${s.name.padEnd(15)} ${"█".repeat(Math.floor(s.proficiency/10))}${"░".repeat(10-Math.floor(s.proficiency/10))} ${s.proficiency}%`).join("\n") 
  },
  "/home/ruhan/skills/database.txt": { 
    type: "file", 
    content: skills.filter(s => s.category === "database").map(s => `${s.name.padEnd(15)} ${"█".repeat(Math.floor(s.proficiency/10))}${"░".repeat(10-Math.floor(s.proficiency/10))} ${s.proficiency}%`).join("\n") 
  },
  "/home/ruhan/skills/devops.txt": { 
    type: "file", 
    content: skills.filter(s => s.category === "devops").map(s => `${s.name.padEnd(15)} ${"█".repeat(Math.floor(s.proficiency/10))}${"░".repeat(10-Math.floor(s.proficiency/10))} ${s.proficiency}%`).join("\n") 
  },
  "/home/ruhan/projects": { type: "dir", children: projects.map(p => `${p.id}.case`) },
  "/home/ruhan/timeline.log": { 
    type: "file", 
    content: timeline.map(t => `[${t.version}] ${t.date.padEnd(12)} ${t.title}\n         └── ${t.description}\n             ${t.highlights.map(h => `• ${h}`).join("\n             ")}`).join("\n\n") 
  },
};

// Add project files dynamically
projects.forEach(project => {
  fileSystem[`/home/ruhan/projects/${project.id}.case`] = {
    type: "file",
    content: `╔══════════════════════════════════════════════════════════════╗
║  CASE FILE: ${project.codename.padEnd(47)}║
╚══════════════════════════════════════════════════════════════╝

PROJECT: ${project.name}
STATUS:  ${project.status === "completed" ? "🟢 Completed" : "🟡 In Progress"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROBLEM STATEMENT:
${project.problem}

CONSTRAINTS:
${project.constraints.map(c => `  • ${c}`).join("\n")}

DESIGN DECISIONS:
${project.designDecisions.map(d => `  → ${d}`).join("\n")}

IMPLEMENTATION:
${project.implementation.map((i, idx) => `  ${idx + 1}. ${i}`).join("\n")}

OUTCOME:
${project.outcome}

TECHNOLOGIES: ${project.technologies.join(" | ")}
`
  };
});

const manPages: { [key: string]: string } = {
  ls: `LS(1)                      User Commands                      LS(1)

NAME
       ls - list directory contents

SYNOPSIS
       ls [DIRECTORY]

DESCRIPTION
       List information about files and directories.
       If no directory is specified, lists contents of current directory.

EXAMPLES
       ls           List contents of current directory
       ls /home     List contents of /home directory
`,
  cd: `CD(1)                      User Commands                      CD(1)

NAME
       cd - change the working directory

SYNOPSIS
       cd [DIRECTORY]

DESCRIPTION
       Change the current directory to DIRECTORY.
       Use ".." to move to parent directory.

EXAMPLES
       cd /home/ruhan    Change to /home/ruhan
       cd ..             Move up one directory
       cd                Return to home directory
`,
  cat: `CAT(1)                     User Commands                     CAT(1)

NAME
       cat - concatenate files and print on standard output

SYNOPSIS
       cat [FILE]

DESCRIPTION
       Concatenate FILE and print on the standard output.
       Displays the full content of the file.

EXAMPLES
       cat about.txt     Display contents of about.txt
`,
  more: `MORE(1)                    User Commands                    MORE(1)

NAME
       more - file perusal filter for viewing

SYNOPSIS
       more [FILE]

DESCRIPTION
       View file contents page by page (first 10 lines shown).
       Use 'cat' to view full contents.

EXAMPLES
       more timeline.log    View first 10 lines of timeline.log
`,
  less: `LESS(1)                    User Commands                    LESS(1)

NAME
       less - opposite of more

SYNOPSIS
       less [FILE]

DESCRIPTION
       View file contents with scrollable output.
       Shows last 15 lines of the file.

EXAMPLES
       less timeline.log    View last 15 lines of timeline.log
`,
  clear: `CLEAR(1)                   User Commands                   CLEAR(1)

NAME
       clear - clear the terminal screen

SYNOPSIS
       clear

DESCRIPTION
       Clears the terminal display, removing all previous output.
`,
  man: `MAN(1)                     User Commands                     MAN(1)

NAME
       man - an interface to the system reference manuals

SYNOPSIS
       man [COMMAND]

DESCRIPTION
       man is the system's manual pager. Display manual page for COMMAND.

AVAILABLE COMMANDS
       man, ls, cd, cat, more, less, clear

EXAMPLES
       man ls    Display manual for ls command
`,
};

export function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: `Ruhan K.B. Portfolio Terminal v1.0.0` },
    { type: "output", content: `Type 'man' for help or explore with 'ls' and 'cd'\n` },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentPath, setCurrentPath] = useState("/home/ruhan");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const resolvePath = (path: string): string => {
    if (path.startsWith("/")) return path;
    if (path === "..") {
      const parts = currentPath.split("/").filter(Boolean);
      parts.pop();
      return "/" + parts.join("/") || "/";
    }
    if (path === "~" || path === "") return "/home/ruhan";
    return currentPath === "/" ? `/${path}` : `${currentPath}/${path}`;
  };

  const executeCommand = (input: string) => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const newLines: TerminalLine[] = [
      ...lines,
      { type: "input", content: `${currentPath.replace("/home/ruhan", "~")} $ ${trimmedInput}` },
    ];

    const [cmd, ...args] = trimmedInput.split(" ");
    const arg = args.join(" ");

    switch (cmd.toLowerCase()) {
      case "clear":
        setLines([]);
        return;

      case "man":
        if (!arg) {
          newLines.push({ type: "output", content: manPages["man"] });
        } else if (manPages[arg.toLowerCase()]) {
          newLines.push({ type: "output", content: manPages[arg.toLowerCase()] });
        } else {
          newLines.push({ type: "error", content: `No manual entry for ${arg}` });
        }
        break;

      case "ls":
        const lsPath = resolvePath(arg || currentPath);
        const lsTarget = fileSystem[lsPath];
        if (lsTarget?.type === "dir" && lsTarget.children) {
          const output = lsTarget.children.map(child => {
            const childPath = lsPath === "/" ? `/${child}` : `${lsPath}/${child}`;
            const isDir = fileSystem[childPath]?.type === "dir";
            return isDir ? `\x1b[33m${child}/\x1b[0m` : child;
          }).join("  ");
          newLines.push({ type: "output", content: output.replace(/\x1b\[[0-9;]*m/g, '') });
        } else if (lsTarget?.type === "file") {
          newLines.push({ type: "output", content: arg || currentPath.split("/").pop() || "" });
        } else {
          newLines.push({ type: "error", content: `ls: cannot access '${arg}': No such file or directory` });
        }
        break;

      case "cd":
        const cdPath = resolvePath(arg);
        const cdTarget = fileSystem[cdPath];
        if (cdTarget?.type === "dir") {
          setCurrentPath(cdPath);
        } else if (cdTarget?.type === "file") {
          newLines.push({ type: "error", content: `cd: not a directory: ${arg}` });
        } else {
          newLines.push({ type: "error", content: `cd: no such file or directory: ${arg}` });
        }
        break;

      case "cat":
        if (!arg) {
          newLines.push({ type: "error", content: "cat: missing file operand" });
        } else {
          const catPath = resolvePath(arg);
          const catTarget = fileSystem[catPath];
          if (catTarget?.type === "file" && catTarget.content) {
            newLines.push({ type: "output", content: catTarget.content });
          } else if (catTarget?.type === "dir") {
            newLines.push({ type: "error", content: `cat: ${arg}: Is a directory` });
          } else {
            newLines.push({ type: "error", content: `cat: ${arg}: No such file or directory` });
          }
        }
        break;

      case "more":
        if (!arg) {
          newLines.push({ type: "error", content: "more: missing file operand" });
        } else {
          const morePath = resolvePath(arg);
          const moreTarget = fileSystem[morePath];
          if (moreTarget?.type === "file" && moreTarget.content) {
            const moreLines = moreTarget.content.split("\n").slice(0, 10).join("\n");
            newLines.push({ type: "output", content: moreLines + "\n\n... (use 'cat' to view full content)" });
          } else if (moreTarget?.type === "dir") {
            newLines.push({ type: "error", content: `more: ${arg}: Is a directory` });
          } else {
            newLines.push({ type: "error", content: `more: ${arg}: No such file or directory` });
          }
        }
        break;

      case "less":
        if (!arg) {
          newLines.push({ type: "error", content: "less: missing file operand" });
        } else {
          const lessPath = resolvePath(arg);
          const lessTarget = fileSystem[lessPath];
          if (lessTarget?.type === "file" && lessTarget.content) {
            const allLines = lessTarget.content.split("\n");
            const lessLines = allLines.slice(-15).join("\n");
            newLines.push({ type: "output", content: `... (showing last 15 lines)\n\n${lessLines}` });
          } else if (lessTarget?.type === "dir") {
            newLines.push({ type: "error", content: `less: ${arg}: Is a directory` });
          } else {
            newLines.push({ type: "error", content: `less: ${arg}: No such file or directory` });
          }
        }
        break;

      case "pwd":
        newLines.push({ type: "output", content: currentPath });
        break;

      case "whoami":
        newLines.push({ type: "output", content: "ruhan" });
        break;

      case "help":
        newLines.push({ type: "output", content: `Available commands: man, ls, cd, cat, more, less, clear, pwd, whoami, help\n\nTry 'man <command>' for detailed info.` });
        break;

      default:
        newLines.push({ type: "error", content: `${cmd}: command not found. Try 'help' for available commands.` });
    }

    setLines(newLines);
    setCommandHistory(prev => [...prev, trimmedInput]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(currentInput);
      setCurrentInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple autocomplete for current directory
      const parts = currentInput.split(" ");
      const lastPart = parts[parts.length - 1];
      const currentDir = fileSystem[currentPath];
      if (currentDir?.children) {
        const matches = currentDir.children.filter(c => c.startsWith(lastPart));
        if (matches.length === 1) {
          parts[parts.length - 1] = matches[0];
          setCurrentInput(parts.join(" "));
        }
      }
    }
  };

  return (
    <>
      {/* Terminal Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-xl bg-card border border-primary/30 shadow-elevated hover:border-primary/60 transition-all duration-300 ${isOpen && !isMinimized ? "hidden" : ""}`}
      >
        <TerminalIcon className="w-6 h-6 text-primary" />
      </motion.button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-2xl h-[60vh] max-h-[500px] rounded-xl overflow-hidden bg-background border border-primary/30 shadow-elevated"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Title Bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-primary" />
                <span className="font-mono text-sm text-foreground">ruhan@portfolio</span>
                <span className="font-mono text-xs text-muted-foreground">~</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMinimized(true);
                  }}
                  className="p-1 rounded hover:bg-secondary transition-colors"
                >
                  <Minus className="w-4 h-4 text-muted-foreground" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="p-1 rounded hover:bg-destructive/20 transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                </button>
              </div>
            </div>

            {/* Terminal Content */}
            <div
              ref={terminalRef}
              className="h-[calc(100%-44px)] p-4 overflow-y-auto terminal-scrollbar bg-background"
            >
              {lines.map((line, index) => (
                <div
                  key={index}
                  className={`font-mono text-sm leading-relaxed terminal-output ${
                    line.type === "input"
                      ? "text-primary"
                      : line.type === "error"
                      ? "text-destructive"
                      : "text-foreground/80"
                  }`}
                >
                  {line.content}
                </div>
              ))}
              
              {/* Current Input Line */}
              <div className="flex items-center font-mono text-sm text-primary">
                <span>{currentPath.replace("/home/ruhan", "~")} $ </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-foreground caret-primary"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
                <span className="terminal-cursor" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized Indicator */}
      {isOpen && isMinimized && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-xl bg-card border border-primary/30 shadow-elevated hover:border-primary/60 transition-all duration-300 flex items-center gap-2"
        >
          <TerminalIcon className="w-5 h-5 text-primary" />
          <span className="font-mono text-sm text-foreground">Terminal</span>
          <Square className="w-3 h-3 text-muted-foreground" />
        </motion.button>
      )}
    </>
  );
}