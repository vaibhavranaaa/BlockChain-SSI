import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  UserRound,
  ShieldCheck,
  KeyRound,
  ArrowLeft,
  LoaderCircle,
  Copy,
  Check,
  Lock,
  ShieldAlert,
} from "lucide-react"
import api from "../api/axios"

function SettingsPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [copiedDid, setCopiedDid] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/api/user/me")
        setUser(response.data?.data ?? response.data)
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load account information.")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const copyDid = async () => {
    if (!user?.did) return
    try {
      await navigator.clipboard.writeText(user.did)
      setCopiedDid(true)
      setTimeout(() => setCopiedDid(false), 2000)
    } catch (err) {
      console.error("Failed to copy DID:", err)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#060913] px-5 py-8 text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200 sm:px-8">
      
      {/* Background Cyber Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d12_1px,transparent_1px),linear-gradient(to_bottom,#1f293d12_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-10 left-1/3 h-80 w-[600px] bg-cyan-500/5 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        
        {/* Back Link */}
        <Link
          to="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-cyan-400"
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            Account Preferences
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-white">
            Account Settings
          </h1>
          <p className="mt-1.5 text-sm text-slate-400">
            Manage your profile details and review your identity security status.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 text-slate-400 backdrop-blur-md">
            <LoaderCircle className="animate-spin text-cyan-400" size={20} />
            <span className="text-xs font-mono">Loading account information...</span>
          </div>
        ) : error ? (
          <div className="flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm font-semibold text-red-400 backdrop-blur-md">
            <ShieldAlert size={20} className="shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Profile Information Section */}
            <section className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md">
              <div className="mb-6 flex items-center gap-3 border-b border-slate-800/80 pb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-inner">
                  <UserRound size={21} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">
                    Profile Information
                  </h2>
                  <p className="text-xs text-slate-400">
                    Your registered enterprise account details
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-800/60 bg-[#060913]/80 p-3.5">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Full Name
                  </p>
                  <p className="mt-1 break-words text-sm font-semibold text-slate-200">
                    {user?.name || "Not available"}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800/60 bg-[#060913]/80 p-3.5">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Email Address
                  </p>
                  <p className="mt-1 break-words text-sm font-semibold text-slate-200">
                    {user?.email || "Not available"}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800/60 bg-[#060913]/80 p-3.5">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Account Role
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-200">
                    {user?.role || "Not available"}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800/60 bg-[#060913]/80 p-3.5">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Account Status
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className={`relative flex h-2 w-2`}>
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${user?.active ? "bg-emerald-400 opacity-75" : "bg-amber-400 opacity-75"}`} />
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${user?.active ? "bg-emerald-500" : "bg-amber-500"}`} />
                    </span>
                    <span className={`text-sm font-semibold ${user?.active ? "text-emerald-400" : "text-amber-400"}`}>
                      {user?.active ? "Active" : "Inactive or unavailable"}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Identity & Security Section */}
            <section className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md">
              <div className="mb-5 flex items-center gap-3 border-b border-slate-800/80 pb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-inner">
                  <ShieldCheck size={21} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">
                    Identity & Security
                  </h2>
                  <p className="text-xs text-slate-400">
                    Review your persistent decentralized identifier
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800/60 bg-[#060913]/80 p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Decentralized Identifier (DID)
                  </span>

                  {user?.did && (
                    <button
                      onClick={copyDid}
                      className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition"
                    >
                      {copiedDid ? (
                        <>
                          <Check size={14} className="text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                <p className="break-all font-mono text-xs leading-relaxed text-cyan-300">
                  {user?.did || "No DID available"}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-slate-400 pt-2">
                <Lock size={14} className="text-emerald-400" />
                <span>JWT-based session authentication active</span>
              </div>
            </section>

            {/* Password & Access Management Section */}
            <section className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shadow-inner">
                  <KeyRound size={21} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">
                    Password & Security Controls
                  </h2>
                  <p className="text-xs text-slate-400">
                    Credentials & access key management
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800/60 bg-[#060913]/60 p-4">
                <p className="text-xs leading-relaxed text-slate-400">
                  Password changes are not connected yet. They should be enabled
                  after a secure backend endpoint is implemented.
                </p>
              </div>
            </section>

          </div>
        )}

      </div>
    </div>
  )
}

export default SettingsPage