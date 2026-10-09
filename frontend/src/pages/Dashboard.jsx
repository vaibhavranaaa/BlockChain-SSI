import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import {
  ShieldCheck,
  LayoutDashboard,
  Fingerprint,
  Wallet,
  FileCheck2,
  BadgeCheck,
  KeyRound,
  Activity,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  CheckCircle2,
  Shield,
  Clock3,
  Copy,
  Check,
  ExternalLink,
  Lock,
} from "lucide-react"

function Dashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const copyDid = () => {
    navigator.clipboard.writeText("did:ssi:fabric:7f8a91b2c34d90e1")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const navigation = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Identity",
      icon: Fingerprint,
      path: "/identity",
    },
    { name: "Wallet", icon: Wallet, path: "/wallet" },
    {
      name: "Credentials",
      icon: FileCheck2,
      path: "/credentials",
    },
    { name: "Verify", icon: BadgeCheck, path: "/verify" },
    { name: "Authenticate", icon: KeyRound, path: "/authenticate" },
    { name: "Activity", icon: Activity, path: "/activity" },
  ]

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background Cyber Grid Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d12_1px,transparent_1px),linear-gradient(to_bottom,#1f293d12_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute -top-40 left-1/3 h-96 w-[600px] bg-cyan-500/5 blur-[140px] rounded-full" />
      </div>

      {/* Mobile Top Navigation Header */}
      <div className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-800/80 bg-[#060913]/90 backdrop-blur-xl px-5 lg:hidden">
        <Link to="/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-b from-cyan-400 to-blue-600 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            <ShieldCheck size={20} className="stroke-[2.5]" />
          </div>

          <span className="font-extrabold tracking-tight text-white flex items-center gap-1.5 text-base">
            SSI Vault
            <span className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[9px] font-bold text-cyan-400 border border-cyan-500/20">
              v2.4
            </span>
          </span>
        </Link>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-800/60 hover:text-white transition"
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Desktop & Mobile Sidebar */}
      <aside
        className={`fixed bottom-0 left-0 top-0 z-50 flex w-64 flex-col border-r border-slate-800/80 bg-[#060913] transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-20 items-center border-b border-slate-800/80 px-6">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-cyan-400 to-blue-600 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.25)] ring-1 ring-cyan-300/40">
              <ShieldCheck size={22} className="stroke-[2.5]" />
            </div>

            <div>
              <p className="font-extrabold tracking-tight text-white flex items-center gap-1.5 text-base">
                SSI Vault
              </p>

              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Identity Security Platform
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 space-y-1.5 px-4 py-6 overflow-y-auto">
          <p className="mb-3 px-3 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
            // Core Platform
          </p>

          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`group flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
                }`}
              >
                <Icon
                  size={18}
                  className={`transition-colors ${
                    isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-100"
                  }`}
                />

                <span>{item.name}</span>

                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer Controls */}
        <div className="border-t border-slate-800/80 p-4 space-y-1">
          <Link
            to="/settings"
            onClick={() => setSidebarOpen(false)}
            className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
              location.pathname === "/settings"
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
            }`}
          >
            <Settings size={18} />
            Settings
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-400 transition-all hover:bg-red-500/10 hover:text-red-400 hover:border hover:border-red-500/20"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="relative z-10 min-h-screen lg:ml-64">
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-24 lg:px-8 lg:pt-10">
          
          {/* Dashboard Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-slate-800/80 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                <span>Enterprise Dashboard</span>
                <span>/</span>
                <span className="text-slate-400">Security Command</span>
              </div>

              <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-white">
                Identity Overview
              </h1>

              <p className="mt-1.5 text-sm text-slate-400">
                Manage your self-sovereign identity, verifiable credentials, and cryptographic security.
              </p>
            </div>

            {/* Global Identity Status Badge */}
            <div className="flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.1)] shrink-0">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>

              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Identity Active
              </span>
            </div>
          </div>

          {/* Metric Stats Grid */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            
            {/* Identity Status Stat */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 backdrop-blur-md transition-all hover:border-slate-700">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Identity State
                  </p>

                  <p className="mt-2 text-2xl font-black text-white tracking-tight">
                    Active
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-inner">
                  <Fingerprint size={22} />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 font-mono">
                <CheckCircle2 size={14} className="text-cyan-400" />
                <span>Decentralized identity registered</span>
              </div>
            </div>

            {/* Credentials Count Stat */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 backdrop-blur-md transition-all hover:border-slate-700">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Verifiable Credentials
                  </p>

                  <p className="mt-2 text-2xl font-black text-white tracking-tight">
                    0
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shadow-inner">
                  <FileCheck2 size={22} />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 font-mono">
                <Clock3 size={14} className="text-indigo-400" />
                <span>Ready to receive credentials</span>
              </div>
            </div>

            {/* Ledger Security Stat */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 backdrop-blur-md transition-all hover:border-slate-700 sm:col-span-2 xl:col-span-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Ledger Protection
                  </p>

                  <p className="mt-2 text-2xl font-black text-white tracking-tight">
                    Protected
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-inner">
                  <Shield size={22} />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 font-mono">
                <Lock size={14} className="text-emerald-400" />
                <span>Blockchain verification live</span>
              </div>
            </div>

          </div>

          {/* Main Action Grid */}
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            
            {/* Identity Details Card */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md lg:col-span-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Your Decentralized Identity
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Your persistent W3C compliant decentralized identifier (DID)
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Fingerprint size={20} />
                </div>
              </div>

              {/* DID Field Box */}
              <div className="mt-6 rounded-xl border border-slate-800 bg-[#060913]/80 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Decentralized Identifier (DID)
                  </span>

                  <button
                    onClick={copyDid}
                    className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition focus:outline-none"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy DID</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="break-all font-mono text-sm text-cyan-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  did:ssi:fabric:7f8a91b2c34d90e1
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <Link
                  to="/identity"
                  onClick={() => setSidebarOpen(false)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 transition hover:text-cyan-300"
                >
                  View identity details
                  <ChevronRight size={16} />
                </Link>

                <span className="text-xs font-mono text-slate-400">
                  Algorithm: Secp256k1
                </span>
              </div>
            </div>

            {/* Wallet Quick Access Card */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Wallet size={20} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-white tracking-tight">
                  Identity Wallet
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Your identity keys, credential keys, and proof signatures are securely cryptographically held within your wallet.
                </p>
              </div>

              <Link
                to="/wallet"
                onClick={() => setSidebarOpen(false)}
                className="mt-6 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm font-bold text-slate-200 transition-all hover:bg-slate-800 hover:border-slate-700 hover:text-white"
              >
                <span>Open Wallet</span>
                <ChevronRight size={16} className="text-cyan-400" />
              </Link>
            </div>

          </div>

          {/* Activity Logs Section */}
          <div className="mt-6 rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-4">
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">
                  Recent Platform Activity
                </h2>

                <p className="text-xs text-slate-400">
                  Real-time cryptographic audit trail of system actions
                </p>
              </div>

              <Activity size={18} className="text-slate-400" />
            </div>

            <div className="divide-y divide-slate-800/60">
              <div className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-slate-900/50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Fingerprint size={18} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">
                    Decentralized Identity Initialized
                  </p>

                  <p className="mt-0.5 text-xs text-slate-400 truncate">
                    Your decentralized identity was successfully generated and registered to the network.
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-2 shrink-0">
                  <span className="inline-flex items-center rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-bold text-cyan-400 border border-cyan-500/20">
                    Identity Active
                  </span>
                  <span className="text-xs font-mono text-slate-400">Just now</span>
                </div>
              </div>

              <div className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-slate-900/50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck size={18} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">
                    Session Authentication Verified
                  </p>

                  <p className="mt-0.5 text-xs text-slate-400 truncate">
                    JWT access token issued and verified through backend security guards.
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-2 shrink-0">
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                    JWT Active
                  </span>
                  <span className="text-xs font-mono text-slate-400">Active</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  )
}

export default Dashboard