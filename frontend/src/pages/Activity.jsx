import { Link } from "react-router-dom"
import {
  ArrowLeft,
  Activity,
  Clock3,
  ShieldCheck,
  FileCheck2,
  KeyRound,
  RefreshCw,
  History,
  ChevronRight,
  Shield,
} from "lucide-react"

const activityTypes = [
  {
    title: "Credential Issuance",
    description: "Review credentials issued to your identity.",
    icon: FileCheck2,
    color: "text-cyan-400",
    background: "bg-cyan-500/10 border-cyan-500/20",
    path: "/credentials",
  },
  {
    title: "Credential Verification",
    description: "Check the validity of a verifiable credential.",
    icon: ShieldCheck,
    color: "text-emerald-400",
    background: "bg-emerald-500/10 border-emerald-500/20",
    path: "/verify",
  },
  {
    title: "Identity Authentication",
    description: "Verify an identity using its credential.",
    icon: KeyRound,
    color: "text-indigo-400",
    background: "bg-indigo-500/10 border-indigo-500/20",
    path: "/authenticate",
  },
]

export default function ActivityPage() {
  return (
    <div className="relative min-h-screen bg-[#060913] px-5 py-8 text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200 sm:px-8">
      
      {/* Background Cyber Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d12_1px,transparent_1px),linear-gradient(to_bottom,#1f293d12_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-10 left-1/3 h-80 w-[600px] bg-cyan-500/5 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        
        {/* Back Link */}
        <Link
          to="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-cyan-400"
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>

        {/* Page Title */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-inner">
            <Activity size={32} />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Activity & Operations
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Review and access your identity-related operations and audit trail.
            </p>
          </div>
        </div>

        {/* API Unconnected State Warning Banner */}
        <div className="mb-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.05)]">
          <div className="flex items-start gap-3.5">
            <Clock3 className="mt-0.5 shrink-0 text-amber-400" size={22} />
            <div>
              <h2 className="text-sm font-bold text-amber-300 tracking-tight uppercase font-mono">
                Activity history not connected
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                Your application does not yet expose a confirmed activity-history
                API. This page will display real events once that functionality
                is implemented.
              </p>
            </div>
          </div>
        </div>

        {/* Operations Title */}
        <div className="mb-4 flex items-center gap-2">
          <Shield size={16} className="text-cyan-400" />
          <h2 className="text-base font-bold text-white tracking-tight">
            Available Operations
          </h2>
        </div>

        {/* Operations Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {activityTypes.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.title}
                to={item.path}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-slate-900/80 hover:shadow-[0_10px_30px_rgba(34,211,238,0.08)]"
              >
                <div>
                  <div
                    className={`mb-5 inline-flex rounded-xl border p-3.5 shadow-inner ${item.background} ${item.color}`}
                  >
                    <Icon size={24} />
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight transition-colors group-hover:text-cyan-300">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-cyan-400 transition-transform group-hover:translate-x-1">
                  <span>Open operation</span>
                  <ChevronRight size={15} />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Audit Trail Standard Information Card */}
        <div className="mt-8 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md">
          <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/80 text-slate-400 border border-slate-700/50">
              <History size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Cryptographic Audit Trail
              </h2>
              <p className="text-xs text-slate-400">
                Audit logging specification guidelines
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-slate-400">
            A future audit trail can record operation type, timestamp, credential
            identifier, and transaction reference. Sensitive credential data
            should not be exposed in activity logs.
          </p>

          <div className="mt-5 flex items-center gap-2 text-xs font-mono text-slate-400">
            <RefreshCw size={14} className="text-cyan-400 animate-spin" />
            <span>Awaiting activity API integration</span>
          </div>
        </div>

      </div>
    </div>
  )
}