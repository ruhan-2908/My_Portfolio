import { useState } from "react";
import { ChevronLeft, ChevronRight, Home, Folder, FileText, List, Grid, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildFileSystem, getItemAtPath } from "../fileSystem";
import { FileSystemItem, AppType } from "../types";

const fileSystem = buildFileSystem();

interface FileManagerAppProps {
  openWindow: (type: AppType, title: string, content?: string) => void;
}

export function FileManagerApp({ openWindow }: FileManagerAppProps) {
  const [currentPath, setCurrentPath] = useState<string[]>(["home", "ruhan"]);
  const [history, setHistory] = useState<string[][]>([["home", "ruhan"]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const currentItem = getItemAtPath(fileSystem, currentPath);
  const items = currentItem?.type === "folder" ? currentItem.children || [] : [];

  const filteredItems = searchQuery 
    ? items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : items;

  const navigateTo = (path: string[]) => {
    const newHistory = [...history.slice(0, historyIndex + 1), path];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPath(path);
    setSelectedItem(null);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(history[historyIndex + 1]);
    }
  };

  const goHome = () => navigateTo(["home", "ruhan"]);

  const handleItemClick = (item: FileSystemItem) => {
    setSelectedItem(item.name);
  };

  const handleItemDoubleClick = (item: FileSystemItem) => {
    if (item.type === "folder") {
      navigateTo([...currentPath, item.name]);
    } else {
      openWindow("texteditor", item.name, item.content);
    }
  };

  const getFileIcon = (item: FileSystemItem) => {
    if (item.type === "folder") {
      return <Folder className="w-full h-full text-[#e95420]" />;
    }
    
    const ext = item.name.split('.').pop()?.toLowerCase();
    let color = "text-white/60";
    
    if (ext === "md") color = "text-blue-400";
    else if (ext === "txt") color = "text-white/60";
    else if (ext === "pdf") color = "text-red-400";
    else if (item.name.startsWith(".")) color = "text-white/40";
    
    return <FileText className={cn("w-full h-full", color)} />;
  };

  const breadcrumbs = currentPath.map((segment, index) => ({
    name: segment,
    path: currentPath.slice(0, index + 1),
  }));

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Toolbar */}
      <div className="h-12 bg-[#2d2d2d] flex items-center gap-2 px-3 border-b border-white/10">
        <button
          onClick={goBack}
          disabled={historyIndex === 0}
          className={cn(
            "p-1.5 rounded-lg hover:bg-white/10 transition-colors",
            historyIndex === 0 && "opacity-40 cursor-not-allowed"
          )}
        >
          <ChevronLeft className="w-5 h-5 text-white/80" />
        </button>
        <button
          onClick={goForward}
          disabled={historyIndex === history.length - 1}
          className={cn(
            "p-1.5 rounded-lg hover:bg-white/10 transition-colors",
            historyIndex === history.length - 1 && "opacity-40 cursor-not-allowed"
          )}
        >
          <ChevronRight className="w-5 h-5 text-white/80" />
        </button>
        <button 
          onClick={goHome} 
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
        >
          <Home className="w-5 h-5 text-white/80" />
        </button>

        {/* Breadcrumb path */}
        <div className="flex-1 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1e1e1e] overflow-hidden">
          {breadcrumbs.map((crumb, i) => (
            <div key={i} className="flex items-center">
              {i > 0 && <span className="text-white/40 mx-1">/</span>}
              <button
                onClick={() => navigateTo(crumb.path)}
                className="text-white/80 text-sm hover:text-white hover:underline transition-colors"
              >
                {crumb.name}
              </button>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-32 pl-8 pr-3 py-1.5 rounded-lg bg-[#1e1e1e] text-white/80 text-sm placeholder:text-white/40 outline-none focus:ring-1 ring-[#e95420]/50"
          />
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 bg-[#1e1e1e] rounded-lg p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-1 rounded transition-colors",
              viewMode === "grid" ? "bg-white/20 text-white" : "text-white/60 hover:text-white"
            )}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-1 rounded transition-colors",
              viewMode === "list" ? "bg-white/20 text-white" : "text-white/60 hover:text-white"
            )}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* File grid/list */}
      <div className="flex-1 p-4 overflow-auto">
        {filteredItems.length === 0 ? (
          <div className="h-full flex items-center justify-center text-white/40">
            {searchQuery ? "No matching files" : "Folder is empty"}
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-5 gap-4">
            {filteredItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleItemClick(item)}
                onDoubleClick={() => handleItemDoubleClick(item)}
                className={cn(
                  "flex flex-col items-center gap-2 p-3 rounded-lg transition-all group",
                  selectedItem === item.name 
                    ? "bg-[#e95420]/30 ring-1 ring-[#e95420]" 
                    : "hover:bg-white/10"
                )}
              >
                <div className="w-12 h-12">
                  {getFileIcon(item)}
                </div>
                <span className={cn(
                  "text-xs text-center break-all line-clamp-2 transition-colors",
                  selectedItem === item.name ? "text-white" : "text-white/80"
                )}>
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {filteredItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleItemClick(item)}
                onDoubleClick={() => handleItemDoubleClick(item)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                  selectedItem === item.name 
                    ? "bg-[#e95420]/30 ring-1 ring-[#e95420]" 
                    : "hover:bg-white/10"
                )}
              >
                <div className="w-6 h-6">
                  {getFileIcon(item)}
                </div>
                <span className="text-sm text-white/80 text-left flex-1">{item.name}</span>
                <span className="text-xs text-white/40">
                  {item.type === "folder" ? "Folder" : item.name.split('.').pop()?.toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="h-8 bg-[#2d2d2d] flex items-center justify-between px-4 border-t border-white/10 text-xs text-white/50">
        <span>{filteredItems.length} items</span>
        <span>/{currentPath.join("/")}</span>
      </div>
    </div>
  );
}
