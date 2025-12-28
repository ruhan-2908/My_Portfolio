import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu, HardDrive, MemoryStick, Activity } from "lucide-react";
import { skills, projects } from "@/data/portfolioData";

export function SystemMonitorApp() {
  const [cpuHistory, setCpuHistory] = useState<number[]>(Array(30).fill(20));
  const [memHistory, setMemHistory] = useState<number[]>(Array(30).fill(45));

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuHistory(prev => {
        const newValue = Math.min(100, Math.max(5, prev[prev.length - 1] + (Math.random() - 0.5) * 30));
        return [...prev.slice(1), newValue];
      });
      setMemHistory(prev => {
        const newValue = Math.min(90, Math.max(30, prev[prev.length - 1] + (Math.random() - 0.5) * 10));
        return [...prev.slice(1), newValue];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderGraph = (data: number[], color: string) => {
    const height = 60;
    const width = 200;
    const points = data.map((value, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - (value / 100) * height;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={width} height={height} className="mt-2">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.5" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <polygon
          points={`0,${height} ${points} ${width},${height}`}
          fill={`url(#gradient-${color})`}
        />
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
      </svg>
    );
  };

  const currentCpu = cpuHistory[cpuHistory.length - 1];
  const currentMem = memHistory[memHistory.length - 1];

  return (
    <div className="h-full bg-[#1e1e1e] p-4 overflow-auto">
      <h2 className="text-white font-medium mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-[#e95420]" />
        System Monitor
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {/* CPU */}
        <div className="bg-[#2d2d2d] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-4 h-4 text-[#4e9a06]" />
            <span className="text-white/80 text-sm">CPU Usage</span>
          </div>
          <div className="text-2xl font-bold text-[#4e9a06]">{currentCpu.toFixed(1)}%</div>
          {renderGraph(cpuHistory, "#4e9a06")}
        </div>

        {/* Memory */}
        <div className="bg-[#2d2d2d] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <MemoryStick className="w-4 h-4 text-[#729fcf]" />
            <span className="text-white/80 text-sm">Memory</span>
          </div>
          <div className="text-2xl font-bold text-[#729fcf]">{currentMem.toFixed(1)}%</div>
          {renderGraph(memHistory, "#729fcf")}
        </div>

        {/* Skills loaded */}
        <div className="bg-[#2d2d2d] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <HardDrive className="w-4 h-4 text-[#e95420]" />
            <span className="text-white/80 text-sm">Skills Loaded</span>
          </div>
          <div className="text-2xl font-bold text-[#e95420]">{skills.length}</div>
          <div className="mt-2 space-y-1">
            {skills.slice(0, 5).map(skill => (
              <div key={skill.name} className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.proficiency}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-[#e95420] rounded-full"
                  />
                </div>
                <span className="text-xs text-white/50 w-16 truncate">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="bg-[#2d2d2d] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-[#77216f]" />
            <span className="text-white/80 text-sm">Active Projects</span>
          </div>
          <div className="text-2xl font-bold text-[#77216f]">{projects.length}</div>
          <div className="mt-2 space-y-2">
            {projects.map(project => (
              <div key={project.id} className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  project.status === 'completed' ? 'bg-green-500' : 
                  project.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-500'
                }`} />
                <span className="text-xs text-white/70 truncate">{project.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Processes */}
      <div className="mt-4 bg-[#2d2d2d] rounded-xl p-4">
        <h3 className="text-white/80 text-sm mb-3">Running Processes</h3>
        <div className="space-y-2 text-xs font-mono">
          <div className="grid grid-cols-4 text-white/40 border-b border-white/10 pb-1">
            <span>PID</span>
            <span>NAME</span>
            <span>CPU</span>
            <span>MEM</span>
          </div>
          {[
            { pid: 1, name: "portfolio", cpu: 12.5, mem: 8.2 },
            { pid: 42, name: "react-dom", cpu: 5.3, mem: 15.4 },
            { pid: 108, name: "framer-motion", cpu: 3.1, mem: 4.8 },
            { pid: 256, name: "tailwindcss", cpu: 0.8, mem: 2.1 },
            { pid: 512, name: "typescript", cpu: 1.2, mem: 3.5 },
          ].map(proc => (
            <div key={proc.pid} className="grid grid-cols-4 text-white/70">
              <span>{proc.pid}</span>
              <span>{proc.name}</span>
              <span>{proc.cpu}%</span>
              <span>{proc.mem}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
