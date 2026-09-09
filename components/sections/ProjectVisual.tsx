'use client';

import { motion } from 'framer-motion';
import {
  Factory,
  Boxes,
  BarChart3,
  Package,
  Truck,
  ShieldAlert,
  PhoneCall,
  BrainCircuit,
  Activity,
  Search,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

type ProjectVisualProps = {
  title?: string;
};

function ManufacturingVisual() {
  return (
    <div className="relative h-[260px] min-h-0 overflow-hidden rounded-2xl border border-white/10 bg-[#07111c] sm:h-full sm:min-h-[300px]">
      <div className="absolute inset-0 bg-grid-fine opacity-30" />

      <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-cyan-300">
              <Factory className="h-3.5 w-3.5" />
              ERP // CONTROL CENTER
            </div>
            <div className="mt-1 text-sm font-semibold text-white">
              Manufacturing Operations
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-1 text-[9px] font-mono text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            ONLINE
          </div>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-3">
          <MetricCard
            icon={<Package className="h-4 w-4" />}
            label="Inventory"
            value="ACTIVE"
            detail="Stock control"
          />

          <MetricCard
            icon={<Boxes className="h-4 w-4" />}
            label="Production"
            value="RUNNING"
            detail="Workflow engine"
          />

          <MetricCard
            icon={<Truck className="h-4 w-4" />}
            label="Orders"
            value="TRACKED"
            detail="Order pipeline"
          />

          <MetricCard
            icon={<BarChart3 className="h-4 w-4" />}
            label="Analytics"
            value="READY"
            detail="Business insights"
          />
        </div>

        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.025] p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500">
              OPERATIONS FLOW
            </span>
            <Activity className="h-3.5 w-3.5 text-cyan-300" />
          </div>

          <div className="flex items-center gap-1.5">
            {['ORDER', 'PLAN', 'PRODUCE', 'STOCK', 'SHIP'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0.45 }}
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{
                  duration: 2,
                  delay: index * 0.25,
                  repeat: Infinity,
                }}
                className="flex flex-1 items-center gap-1"
              >
                <div className="h-1.5 flex-1 rounded-full bg-cyan-400/30" />
              </motion.div>
            ))}
          </div>

          <div className="mt-2 flex justify-between text-[7px] font-mono text-slate-600">
            <span>ORDER</span>
            <span>PLAN</span>
            <span>PRODUCE</span>
            <span>STOCK</span>
            <span>SHIP</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TalkShieldVisual() {
  return (
    <div className="relative h-[260px] min-h-0 overflow-hidden rounded-2xl border border-white/10 bg-[#090916] sm:h-full sm:min-h-[300px]">
      <div className="absolute inset-0 bg-grid-fine opacity-25" />

      <div className="absolute -left-16 top-10 h-52 w-52 rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-fuchsia-300">
              <ShieldAlert className="h-3.5 w-3.5" />
              THREAT // CALL ANALYSIS
            </div>
            <div className="mt-1 text-sm font-semibold text-white">
              TalkShield Intelligence
            </div>
          </div>

          <div className="rounded-full border border-fuchsia-400/20 bg-fuchsia-400/5 px-2.5 py-1 text-[9px] font-mono text-fuchsia-300">
            ANALYZING
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
              <PhoneCall className="h-5 w-5 text-cyan-300" />
            </div>

            <div className="flex-1">
              <div className="text-[9px] font-mono uppercase tracking-widest text-slate-500">
                INCOMING CALL
              </div>
              <div className="mt-1 text-sm font-medium text-white">
                Unknown caller
              </div>
            </div>

            <Activity className="h-4 w-4 animate-pulse text-cyan-300" />
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <AnalysisCard
            icon={<Search className="h-4 w-4" />}
            label="Pattern Scan"
            value="ACTIVE"
          />

          <AnalysisCard
            icon={<BrainCircuit className="h-4 w-4" />}
            label="AI Analysis"
            value="RUNNING"
          />
        </div>

        <div className="mt-3 rounded-xl border border-amber-400/10 bg-amber-400/[0.03] p-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-300" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-amber-200">
              THREAT SIGNALS
            </span>
          </div>

          <div className="mt-3 space-y-2">
            {[
              ['CALL PATTERN', 'SCANNING'],
              ['SPAM SIGNAL', 'CHECKING'],
              ['RISK PROFILE', 'ANALYZING'],
            ].map(([label, value], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.18 }}
                className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0"
              >
                <span className="text-[8px] font-mono text-slate-500">
                  {label}
                </span>
                <span className="text-[8px] font-mono text-cyan-300">
                  {value}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4">
          <div className="flex items-center gap-2 text-[8px] font-mono text-slate-600">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/70" />
            CALL INTELLIGENCE PIPELINE READY
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-3">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-cyan-300">{icon}</div>
        <span className="text-[7px] font-mono text-emerald-300/80">
          ●
        </span>
      </div>

      <div className="text-[8px] font-mono uppercase tracking-widest text-slate-500">
        {label}
      </div>

      <div className="mt-1 text-[11px] font-semibold text-white">
        {value}
      </div>

      <div className="mt-1 text-[8px] text-slate-600">
        {detail}
      </div>
    </div>
  );
}

function AnalysisCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-3">
      <div className="flex items-center gap-2 text-fuchsia-300">
        {icon}
        <span className="text-[8px] font-mono text-slate-500">
          {label}
        </span>
      </div>

      <div className="mt-2 text-[10px] font-semibold text-white">
        {value}
      </div>
    </div>
  );
}

export function ProjectVisual({ title = '' }: ProjectVisualProps) {
  const normalized = title.toLowerCase();

  if (
    normalized.includes('manufacturing') ||
    normalized.includes('erp')
  ) {
    return <ManufacturingVisual />;
  }

  if (
    normalized.includes('talkshield') ||
    normalized.includes('talk shield')
  ) {
    return <TalkShieldVisual />;
  }

  return null;
}

