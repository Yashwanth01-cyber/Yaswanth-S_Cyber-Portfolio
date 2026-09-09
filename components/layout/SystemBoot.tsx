"use client";

import { useEffect, useState } from "react";
import { Activity, ShieldCheck, Terminal } from "lucide-react";

export function SystemBoot() {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1800;

    const update = (now: number) => {
      const elapsed = now - start;
      const value = Math.min(100, Math.round((elapsed / duration) * 100));

      setProgress(value);

      if (value < 100) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, []);

  const enterPortfolio = () => {
    setIsExiting(true);

    window.setTimeout(() => {
      setBootComplete(true);
    }, 700);
  };

  if (bootComplete) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#030712] text-white transition-all duration-700 ${
        isExiting ? "pointer-events-none opacity-0 scale-[1.02]" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute left-[15%] top-[20%] h-[300px] w-[300px] rounded-full bg-violet-500/10 blur-[100px]" />
        <div className="absolute bottom-[10%] right-[10%] h-[260px] w-[260px] rounded-full bg-pink-500/10 blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative w-[min(92vw,760px)]">
        <div className="mb-8 flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-cyan-300/70">
          <span>YASWANTH.OS</span>
          <span>Digital Identity System</span>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl sm:p-10">
          <div className="mb-10 flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
              <Terminal className="h-5 w-5 text-cyan-300" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
                Cyber Intelligence Interface
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
                Initializing Identity
              </h1>
            </div>
          </div>

          <div className="space-y-4 font-mono text-xs sm:text-sm">
            <div className="flex items-center justify-between text-white/60">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                SECURITY CORE
              </span>
              <span className="text-emerald-400">ONLINE</span>
            </div>

            <div className="flex items-center justify-between text-white/60">
              <span className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-cyan-400" />
                INTELLIGENCE ENGINE
              </span>
              <span className="text-cyan-400">READY</span>
            </div>

            <div className="flex items-center justify-between text-white/60">
              <span className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-violet-400" />
                DIGITAL INTERFACE
              </span>
              <span className="text-violet-400">LOADED</span>
            </div>
          </div>

          <div className="mt-10">
            <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              <span>System initialization</span>
              <span>{progress}%</span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 transition-[width] duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
              <span className="text-cyan-400">root@yaswanth</span>
              <span>:</span>
              <span>~/digital-identity</span>
              <span className="terminal-cursor ml-1">_</span>
            </div>

            <button
              type="button"
              onClick={enterPortfolio}
              disabled={progress < 100}
              className="group relative overflow-hidden rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200 transition-all hover:border-cyan-300/60 hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="relative z-10">Enter Portfolio</span>
              <span className="absolute inset-y-0 left-0 w-0 bg-cyan-300/10 transition-all duration-500 group-hover:w-full" />
            </button>
          </div>
        </div>

        <div className="mt-5 text-center font-mono text-[9px] uppercase tracking-[0.25em] text-white/20">
          Secure interface • Identity verified • System ready
        </div>
      </div>
    </div>
  );
}
