import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  Fingerprint,
  KeyRound,
  ShieldCheck,
  Copy,
  RefreshCw,
  Loader2,
  AlertTriangle,
  Lock,
  Check,
} from "lucide-react"
import api from "../api/axios"

export default function Wallet() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [copiedIndex, setCopiedIndex] = useState(null)

  useEffect(() => {
    const fetchIdentity = async () => {
      try {
        const response = await api.get("/api/user/me")
        setUser(response.data)
      } catch (err) {
        console.error("Wallet load error:", err)
        setError("Unable to load your wallet. Please log in again.")
      } finally {
        setLoading(false)
      }
    }

    fetchIdentity()
  }, [])

  const copyToClipboard = async (value, index = null) => {
    if (!value) return

    try {
      await navigator.clipboard.writeText(value)
      if (index !== null) {
        setCopiedIndex(index)
        setTimeout(() => setCopiedIndex(null), 2000)
      } else {
        alert("Copied to clipboard!")
      }
    } catch {
      alert("Unable to copy. Please copy the value manually.")
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#060913] text-slate-100 font-sans">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-b from-cyan-400 to-blue-600 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <Loader2 size={24} className="animate-spin stroke-[2.5]" />
          </div>
          <p className="mt-4 text-sm font-mono text-slate-400">
            Loading your identity wallet...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#060913] p-6 text-slate-100 font-sans">
        <div className="w-full max-w-md rounded-2xl border border-red-500/30 bg-slate-900/80 p-8 text-center backdrop-blur-xl shadow-2xl">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
            <AlertTriangle size={24} />
          </div>
          <p className="text-sm font-medium text-red-400">{error}</p>
          <Link
            to="/login"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-2.5 text-xs font-bold text-slate-950 shadow-lg transition hover:brightness-110"
          >
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  const details = [
    { label: "Name", value: user?.name || "Not available" },
    { label: "Email", value: user?.email || "Not available" },
    { label: "Role", value: user?.role || "Not available" },
    { label: "DID", value: user?.did || "Not available" },
    { label: "Public Key", value: user?.publicKey || "Not available" },
  ]

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
            <Fingerprint size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Identity Wallet
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Manage and view your decentralized identity credentials.
            </p>
          </div>
        </div>

        {/* Top Status Cards Grid */}
        <div className="mb-6 grid gap-5 sm:grid-cols-2">
          
          {/* Account Status Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md">
            <div className="mb-4 flex items-center gap-3 text-emerald-400">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <ShieldCheck size={22} />
              </div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Account Status
              </h2>
            </div>
            <p className="text-2xl font-black text-emerald-400 tracking-tight">
              {user?.active ? "Active" : "Inactive"}
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Your active status reported from the identity service.
            </p>
          </div>

          {/* Identity DID Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3 text-cyan-400">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <KeyRound size={22} />
                </div>
                <h2 className="text-base font-bold text-white tracking-tight">
                  Identifier (DID)
                </h2>
              </div>
              <p className="break-all font-mono text-xs leading-relaxed text-cyan-300 bg-[#060913]/80 p-3 rounded-xl border border-slate-800">
                {user?.did || "No DID assigned"}
              </p>
            </div>

            <button
              onClick={() => copyToClipboard(user?.did)}
              disabled={!user?.did}
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs font-mono font-semibold text-cyan-300 transition hover:bg-slate-800 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Copy size={14} />
              <span>Copy DID</span>
            </button>
          </div>

        </div>

        {/* Detailed Wallet Table */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md">
          <div className="mb-6 flex items-center justify-between border-b border-slate-800/80 pb-4">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Wallet Details
            </h2>
            <RefreshCw size={18} className="text-slate-500" />
          </div>

          <div className="space-y-4">
            {details.map((item, index) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-800/60 bg-slate-950/60 p-4 transition-colors hover:border-slate-800"
              >
                <p className="mb-1 text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  {item.label}
                </p>
                <div className="flex items-start justify-between gap-4">
                  <p className="break-all font-mono text-xs leading-relaxed text-slate-200">
                    {item.value}
                  </p>
                  {item.value !== "Not available" && (
                    <button
                      onClick={() => copyToClipboard(item.value, index)}
                      className="shrink-0 text-slate-400 hover:text-cyan-400 transition"
                      title={`Copy ${item.label}`}
                    >
                      {copiedIndex === index ? (
                        <Check size={16} className="text-emerald-400" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Private Key Notice */}
        <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-xs font-mono text-amber-300/90 backdrop-blur-md">
          <Lock size={15} className="shrink-0 text-amber-400" />
          <span>
            Your private key is protected and is never displayed or transferred on this page.
          </span>
        </div>

      </div>
    </div>
  )
}