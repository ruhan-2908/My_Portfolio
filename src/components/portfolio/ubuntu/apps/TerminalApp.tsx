import { useState, useEffect, useRef, useCallback } from "react";
import { identity, skills, projects, timeline } from "@/data/portfolioData";
import { buildFileSystem, getItemAtPath } from "../fileSystem";
import { cn } from "@/lib/utils";

const fileSystem = buildFileSystem();

export function TerminalApp() {
  const [output, setOutput] = useState<Array<{ text: string; type: 'input' | 'output' | 'error' | 'success' }>>([
    { text: "Ubuntu 24.04 LTS (Portfolio Edition)", type: 'output' },
    { text: `Welcome, ${identity.name}!`, type: 'success' },
    { text: "Type 'help' for available commands.\n", type: 'output' },
  ]);
  const [input, setInput] = useState("");
  const [currentPath, setCurrentPath] = useState<string[]>(["home", "ruhan"]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addOutput = useCallback((text: string, type: 'input' | 'output' | 'error' | 'success' = 'output') => {
    setOutput(prev => [...prev, { text, type }]);
  }, []);

  const commands: Record<string, (args: string[]) => string | { text: string; type: 'output' | 'error' | 'success' }> = {
    help: () => `
╔═══════════════════════════════════════════════════════════════╗
║                    AVAILABLE COMMANDS                         ║
╠═══════════════════════════════════════════════════════════════╣
║  Navigation                                                   ║
║    ls [dir]      List directory contents                      ║
║    cd <dir>      Change directory (use .. for parent)         ║
║    pwd           Print working directory                      ║
║    tree          Display directory tree                       ║
║                                                               ║
║  Files                                                        ║
║    cat <file>    Display file contents                        ║
║    head <file>   Show first 10 lines                          ║
║    tail <file>   Show last 10 lines                           ║
║    wc <file>     Word/line count                              ║
║                                                               ║
║  System                                                       ║
║    whoami        Display current user                         ║
║    hostname      Display hostname                             ║
║    date          Display current date/time                    ║
║    uptime        System uptime                                ║
║    neofetch      Display system info                          ║
║    uname -a      System information                           ║
║                                                               ║
║  Utilities                                                    ║
║    echo <text>   Print text to terminal                       ║
║    clear         Clear terminal screen                        ║
║    history       Show command history                         ║
║    cowsay <msg>  Make a cow say something                     ║
║    fortune       Display a random fortune                     ║
║    matrix        Enter the matrix                             ║
║                                                               ║
║  Portfolio                                                    ║
║    skills        List all skills                              ║
║    projects      List all projects                            ║
║    contact       Show contact information                     ║
║    experience    Show work experience                         ║
╚═══════════════════════════════════════════════════════════════╝`,
    
    pwd: () => `/${currentPath.join("/")}`,
    
    whoami: () => ({ text: "ruhan", type: 'success' as const }),
    
    hostname: () => "ubuntu-portfolio",
    
    date: () => new Date().toString(),
    
    uptime: () => {
      const hours = Math.floor(Math.random() * 100) + 1;
      return ` ${new Date().toLocaleTimeString()} up ${hours} hours, 1 user, load average: 0.00, 0.01, 0.05`;
    },
    
    "uname": (args) => {
      if (args.includes("-a")) {
        return "Linux ubuntu-portfolio 6.5.0-44-generic #44-Ubuntu SMP x86_64 GNU/Linux";
      }
      return "Linux";
    },

    history: () => commandHistory.length === 0 
      ? "No commands in history" 
      : commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`).join('\n'),

    echo: (args) => args.join(' '),

    cowsay: (args) => {
      const message = args.join(' ') || 'Moo!';
      const line = '_'.repeat(message.length + 2);
      return `
 ${line}
< ${message} >
 ${'-'.repeat(message.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
    },

    fortune: () => {
      const fortunes = [
        "A good programmer looks both ways before crossing a one-way street.",
        "There are only 10 types of people: those who understand binary and those who don't.",
        "It works on my machine!",
        "Code never lies, comments sometimes do.",
        "First, solve the problem. Then, write the code.",
        "The best error message is the one that never shows up.",
        "Simplicity is the soul of efficiency.",
      ];
      return fortunes[Math.floor(Math.random() * fortunes.length)];
    },

    matrix: () => {
      const chars = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ";
      let result = '';
      for (let i = 0; i < 10; i++) {
        let line = '';
        for (let j = 0; j < 60; j++) {
          line += chars[Math.floor(Math.random() * chars.length)];
        }
        result += line + '\n';
      }
      return { text: result, type: 'success' as const };
    },

    neofetch: () => ({ text: `
\x1b[32m       .-/+oossssoo+/-.               \x1b[0mruhan@portfolio
\x1b[32m    \`:+ssssssssssssssssss+:\`           \x1b[0m----------------
\x1b[32m  -+ssssssssssssssssssyyssss+-         \x1b[33mOS:\x1b[0m Ubuntu Portfolio Edition
\x1b[32m/ssssssssssshdmmNNmmyNMMMMhssssss/     \x1b[33mKernel:\x1b[0m JavaScript ES2024
\x1b[32m+ssssssssshmydMMMMMMMNddddyssssssss+   \x1b[33mShell:\x1b[0m Portfolio/3.0
\x1b[32m/sssssssshNMMMyhhyyyyhmNMMMNhssssssss/ \x1b[33mResolution:\x1b[0m Dynamic
\x1b[32m.ssssssssdMMMNhsssssssssshNMMMdssssss. \x1b[33mDE:\x1b[0m GNOME Portfolio
\x1b[32m+sssshhhyNMMNyssssssssssssyNMMMysssss  \x1b[33mTerminal:\x1b[0m Ubuntu Term
\x1b[32mossyNMMMNyMMhsssssssssssssshmmmhsssso  \x1b[33mCPU:\x1b[0m Full Stack Developer
\x1b[32mossyNMMMNyMMhsssssssssssssshmmmhsssso  \x1b[33mMemory:\x1b[0m ${skills.length} Skills Loaded
\x1b[32m+sssshhhyNMMNyssssssssssssyNMMMysssss  \x1b[33mProjects:\x1b[0m ${projects.length} Active
\x1b[32m.ssssssssdMMMNhsssssssssshNMMMdssssss. \x1b[33mStatus:\x1b[0m ${identity.status}
\x1b[32m /sssssssshNMMMyhhyyyyhdNMMMNhssssss/
\x1b[32m  +sssssssssdmydMMMMMMMMddddyssssss+
\x1b[32m   /ssssssssssshdmNNNNmyNMMMMhsssss/
\x1b[32m    .ossssssssssssssssssdMMMNyssso.
\x1b[32m      -+sssssssssssssssssyyyssss+-
\x1b[32m        \`:+ssssssssssssssssss+:\`
\x1b[32m            .-/+oossssoo+/-.
`, type: 'success' as const }),

    tree: () => {
      const buildTree = (item: ReturnType<typeof getItemAtPath>, prefix = ""): string => {
        if (!item) return "";
        let result = item.name + "\n";
        if (item.type === "folder" && item.children) {
          item.children.forEach((child, i) => {
            const isLast = i === item.children!.length - 1;
            const connector = isLast ? "└── " : "├── ";
            const extension = isLast ? "    " : "│   ";
            result += prefix + connector + buildTree(child, prefix + extension);
          });
        }
        return result;
      };
      const current = getItemAtPath(fileSystem, currentPath);
      return current ? buildTree(current) : "Error: Cannot read directory";
    },
    
    ls: (args) => {
      const showAll = args.includes("-a") || args.includes("-la") || args.includes("-al");
      const showLong = args.includes("-l") || args.includes("-la") || args.includes("-al");
      
      const targetPath = args.find(a => !a.startsWith("-"));
      const path = targetPath ? [...currentPath, targetPath] : currentPath;
      const item = getItemAtPath(fileSystem, path);
      
      if (!item || item.type !== "folder" || !item.children) {
        return { text: `ls: cannot access '${targetPath || '.'}': No such file or directory`, type: 'error' as const };
      }
      
      let items = item.children;
      if (showAll) {
        items = [{ name: ".", type: "folder" as const }, { name: "..", type: "folder" as const }, ...items];
      }
      
      if (showLong) {
        const now = new Date();
        return items.map(c => {
          const isDir = c.type === "folder";
          const perms = isDir ? "drwxr-xr-x" : "-rw-r--r--";
          const size = isDir ? "4096" : String(c.content?.length || 0).padStart(5);
          const date = `${now.toLocaleString('en-US', { month: 'short' })} ${now.getDate().toString().padStart(2)} ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
          return `${perms}  1 ruhan ruhan ${size} ${date} ${isDir ? `\x1b[34m${c.name}/\x1b[0m` : c.name}`;
        }).join('\n');
      }
      
      return items
        .map((c) => (c.type === "folder" ? `\x1b[34m${c.name}/\x1b[0m` : c.name))
        .join("  ");
    },
    
    clear: () => {
      setOutput([]);
      return "";
    },

    skills: () => {
      const grouped = skills.reduce((acc, s) => {
        if (!acc[s.category]) acc[s.category] = [];
        acc[s.category].push(s);
        return acc;
      }, {} as Record<string, typeof skills>);

      let result = "\n╔═══════════════════════════════════════════════════════════════╗\n";
      result += "║                      TECHNICAL SKILLS                         ║\n";
      result += "╠═══════════════════════════════════════════════════════════════╣\n";
      
      Object.entries(grouped).forEach(([category, categorySkills]) => {
        result += `║  ${category.toUpperCase().padEnd(59)}║\n`;
        categorySkills.forEach(s => {
          const bar = '█'.repeat(Math.floor(s.proficiency / 10)) + '░'.repeat(10 - Math.floor(s.proficiency / 10));
          result += `║    ${s.name.padEnd(20)} [${bar}] ${String(s.proficiency).padStart(3)}%       ║\n`;
        });
        result += "║                                                               ║\n";
      });
      
      result += "╚═══════════════════════════════════════════════════════════════╝";
      return { text: result, type: 'success' as const };
    },

    projects: () => {
      let result = "\n╔═══════════════════════════════════════════════════════════════╗\n";
      result += "║                       PROJECTS                                ║\n";
      result += "╠═══════════════════════════════════════════════════════════════╣\n";
      
      projects.forEach(p => {
        const status = p.status === 'completed' ? '✅' : p.status === 'in-progress' ? '🔄' : '📋';
        result += `║  ${status} ${p.name.padEnd(56)}║\n`;
        result += `║     ${p.description.padEnd(56)}║\n`;
        result += `║     Tech: ${p.technologies.join(', ').padEnd(49)}║\n`;
        result += "║                                                               ║\n";
      });
      
      result += "╚═══════════════════════════════════════════════════════════════╝";
      return { text: result, type: 'success' as const };
    },

    contact: () => ({ text: `
╔═══════════════════════════════════════════════════════════════╗
║                    CONTACT INFORMATION                        ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║   📧 Email     : ${identity.email.padEnd(43)}║
║   📱 Phone     : ${identity.phone.padEnd(43)}║
║   💼 LinkedIn  : ${identity.linkedin.padEnd(43)}║
║   📍 Location  : ${identity.location.padEnd(43)}║
║                                                               ║
║   Status: 🟢 ${identity.status.toUpperCase().padEnd(48)}║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝`, type: 'success' as const }),

    experience: () => {
      let result = "\n╔═══════════════════════════════════════════════════════════════╗\n";
      result += "║                       EXPERIENCE                              ║\n";
      result += "╠═══════════════════════════════════════════════════════════════╣\n";
      
      timeline.forEach(t => {
        result += `║  ${t.version} - ${t.title.padEnd(51)}║\n`;
        result += `║  ${t.date.padEnd(59)}║\n`;
        result += `║  ${t.description.substring(0, 57).padEnd(59)}║\n`;
        result += "║                                                               ║\n";
      });
      
      result += "╚═══════════════════════════════════════════════════════════════╝";
      return result;
    },

    cat: (args) => {
      const filename = args[0];
      if (!filename) {
        return { text: "cat: missing operand\nUsage: cat <filename>", type: 'error' as const };
      }
      const item = getItemAtPath(fileSystem, [...currentPath, filename]);
      if (!item) {
        return { text: `cat: ${filename}: No such file or directory`, type: 'error' as const };
      }
      if (item.type === "folder") {
        return { text: `cat: ${filename}: Is a directory`, type: 'error' as const };
      }
      return item.content || "";
    },

    head: (args) => {
      const filename = args[0];
      if (!filename) {
        return { text: "head: missing operand", type: 'error' as const };
      }
      const item = getItemAtPath(fileSystem, [...currentPath, filename]);
      if (!item || item.type !== "file") {
        return { text: `head: ${filename}: No such file`, type: 'error' as const };
      }
      const lines = (item.content || "").split('\n');
      return lines.slice(0, 10).join('\n');
    },

    tail: (args) => {
      const filename = args[0];
      if (!filename) {
        return { text: "tail: missing operand", type: 'error' as const };
      }
      const item = getItemAtPath(fileSystem, [...currentPath, filename]);
      if (!item || item.type !== "file") {
        return { text: `tail: ${filename}: No such file`, type: 'error' as const };
      }
      const lines = (item.content || "").split('\n');
      return lines.slice(-10).join('\n');
    },

    wc: (args) => {
      const filename = args[0];
      if (!filename) {
        return { text: "wc: missing operand", type: 'error' as const };
      }
      const item = getItemAtPath(fileSystem, [...currentPath, filename]);
      if (!item || item.type !== "file") {
        return { text: `wc: ${filename}: No such file`, type: 'error' as const };
      }
      const content = item.content || "";
      const lines = content.split('\n').length;
      const words = content.split(/\s+/).filter(Boolean).length;
      const chars = content.length;
      return `  ${lines}  ${words}  ${chars} ${filename}`;
    },
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    // Add to history
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    // Show the command
    addOutput(`ruhan@ubuntu:${currentPath.slice(2).join("/") || "~"}$ ${trimmedCmd}`, 'input');

    const parts = trimmedCmd.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let result: string | { text: string; type: 'output' | 'error' | 'success' };

    if (command === "cd") {
      const target = args[0];
      if (!target || target === "~") {
        setCurrentPath(["home", "ruhan"]);
        result = "";
      } else if (target === "..") {
        if (currentPath.length > 1) {
          setCurrentPath(currentPath.slice(0, -1));
        }
        result = "";
      } else if (target === "/") {
        setCurrentPath([]);
        result = "";
      } else if (target.startsWith("/")) {
        const newPath = target.split("/").filter(Boolean);
        const item = getItemAtPath(fileSystem, newPath);
        if (item && item.type === "folder") {
          setCurrentPath(newPath);
          result = "";
        } else {
          result = { text: `cd: ${target}: No such directory`, type: 'error' as const };
        }
      } else {
        const newPath = [...currentPath, target];
        const item = getItemAtPath(fileSystem, newPath);
        if (item && item.type === "folder") {
          setCurrentPath(newPath);
          result = "";
        } else {
          result = { text: `cd: ${target}: No such directory`, type: 'error' as const };
        }
      }
    } else if (commands[command]) {
      result = commands[command](args);
    } else if (trimmedCmd) {
      result = { text: `${command}: command not found. Type 'help' for available commands.`, type: 'error' as const };
    } else {
      result = "";
    }

    if (command !== "clear" && result) {
      if (typeof result === 'string') {
        addOutput(result, 'output');
      } else {
        addOutput(result.text, result.type);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple tab completion for files/folders
      const parts = input.split(' ');
      const lastPart = parts[parts.length - 1];
      if (lastPart) {
        const item = getItemAtPath(fileSystem, currentPath);
        if (item?.type === "folder" && item.children) {
          const matches = item.children.filter(c => 
            c.name.toLowerCase().startsWith(lastPart.toLowerCase())
          );
          if (matches.length === 1) {
            parts[parts.length - 1] = matches[0].name;
            setInput(parts.join(' '));
          } else if (matches.length > 1) {
            addOutput(`ruhan@ubuntu:~$ ${input}`, 'input');
            addOutput(matches.map(m => m.name).join('  '), 'output');
          }
        }
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setOutput([]);
    }
  };

  const getPromptPath = () => {
    if (currentPath.length <= 2) return "~";
    return currentPath.slice(2).join("/");
  };

  return (
    <div 
      className="h-full bg-[#300a24] p-2 font-mono text-sm overflow-hidden flex flex-col cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div 
        ref={outputRef}
        className="flex-1 overflow-auto whitespace-pre-wrap"
      >
        {output.map((line, i) => (
          <div 
            key={i} 
            className={cn(
              line.type === 'input' && 'text-white',
              line.type === 'output' && 'text-white/90',
              line.type === 'error' && 'text-red-400',
              line.type === 'success' && 'text-green-400',
            )}
            dangerouslySetInnerHTML={{ 
              __html: line.text
                .replace(/\x1b\[32m/g, '<span class="text-green-400">')
                .replace(/\x1b\[33m/g, '<span class="text-yellow-400">')
                .replace(/\x1b\[34m/g, '<span class="text-blue-400">')
                .replace(/\x1b\[0m/g, '</span>')
            }}
          />
        ))}
      </div>
      
      <div className="flex items-center text-white/90 shrink-0 mt-1">
        <span className="text-[#4e9a06]">ruhan</span>
        <span className="text-white">@</span>
        <span className="text-[#06989a]">ubuntu</span>
        <span className="text-white">:</span>
        <span className="text-[#3465a4]">{getPromptPath()}</span>
        <span className="text-white">$ </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-white/90 caret-white"
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
