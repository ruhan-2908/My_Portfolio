import { useState, useEffect } from "react";
import { Save, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TextEditorAppProps {
  content?: string;
}

export function TextEditorApp({ content }: TextEditorAppProps) {
  const [text, setText] = useState(content || "");
  const [copied, setCopied] = useState(false);
  const [lineNumbers, setLineNumbers] = useState(true);

  const lines = text.split('\n');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Syntax highlighting for markdown
  const highlightLine = (line: string) => {
    // Headers
    if (line.startsWith('# ')) {
      return <span className="text-[#e95420] font-bold text-lg">{line}</span>;
    }
    if (line.startsWith('## ')) {
      return <span className="text-[#e95420] font-semibold">{line}</span>;
    }
    if (line.startsWith('### ')) {
      return <span className="text-[#ff8c5a]">{line}</span>;
    }
    // Code blocks
    if (line.startsWith('```') || line.startsWith('`')) {
      return <span className="text-[#4e9a06] bg-[#1e1e1e] px-1 rounded">{line}</span>;
    }
    // Bullets
    if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('• ')) {
      return <span className="text-white/80">{line}</span>;
    }
    // Checkmarks
    if (line.includes('✓') || line.includes('✅')) {
      return <span className="text-[#4e9a06]">{line}</span>;
    }
    // Box drawing characters
    if (line.includes('╔') || line.includes('║') || line.includes('╚') || line.includes('┌') || line.includes('│') || line.includes('└')) {
      return <span className="text-[#77216f]">{line}</span>;
    }
    // Bold markers
    if (line.includes('**')) {
      return <span className="text-white">{line.replace(/\*\*(.*?)\*\*/g, '$1')}</span>;
    }
    // Status indicators
    if (line.includes('🟢') || line.includes('🔄') || line.includes('✅')) {
      return <span className="text-[#4e9a06]">{line}</span>;
    }
    if (line.includes('🔵') || line.includes('📋')) {
      return <span className="text-[#3465a4]">{line}</span>;
    }
    return <span className="text-white/80">{line}</span>;
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Toolbar */}
      <div className="h-10 bg-[#2d2d2d] flex items-center justify-between px-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLineNumbers(!lineNumbers)}
            className={cn(
              "px-2 py-1 rounded text-xs transition-colors",
              lineNumbers ? "bg-white/20 text-white" : "text-white/60 hover:text-white"
            )}
          >
            Lines
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[#4e9a06]" />
                <span className="text-[#4e9a06]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor content */}
      <div className="flex-1 overflow-auto font-mono text-sm">
        <div className="flex min-h-full">
          {/* Line numbers */}
          {lineNumbers && (
            <div className="sticky left-0 bg-[#252525] border-r border-white/10 px-3 py-3 text-right select-none">
              {lines.map((_, i) => (
                <div key={i} className="text-white/30 h-5 leading-5">
                  {i + 1}
                </div>
              ))}
            </div>
          )}
          
          {/* Content */}
          <div className="flex-1 p-3">
            <pre className="whitespace-pre-wrap break-words">
              {lines.map((line, i) => (
                <div key={i} className="h-5 leading-5">
                  {highlightLine(line)}
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="h-6 bg-[#2d2d2d] flex items-center justify-between px-3 border-t border-white/10 text-xs text-white/40">
        <span>{lines.length} lines</span>
        <span>{text.length} characters</span>
      </div>
    </div>
  );
}
