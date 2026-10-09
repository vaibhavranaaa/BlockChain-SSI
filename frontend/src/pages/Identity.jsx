import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  ShieldCheck,
  ArrowLeft,
  Fingerprint,
  Mail,
  User,
  Shield,
  KeyRound,
  CheckCircle2,
  Copy,
  Check,
  Loader2,
  LogOut,
  Lock,
} from "lucide-react"

import api from "../api/axios"

function Identity() {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        navigate("/login")
        return
      }

      try {
        const response = await api.get("/api/user/me")
        setUser(response.data)
      } catch (error) {
        console.error("Failed to fetch identity:", error)

        localStorage.removeItem("token")
        navigate("/login")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [navigate])

  const copyDid = async () => {
    if (!user?.did) return

    await navigator.clipboard.writeText(user.did)

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#060913] text-slate-100 font-sans">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-b from-cyan-400 to-blue-600 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <Loader2 size={24} className="animate-spin stroke-[2.5]" />
          </div>

          <p className="mt-4 text-sm font-mono text-slate-400">
            Loading cryptographic identity...
          </p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="relative min-h-screen bg-[#060913] text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Ambient Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d12_1px,transparent_1px),linear-gradient(to_bottom,#1f293d12_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 h-80 w-[700px] bg-cyan-500/5 blur-[140px] rounded-full" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#060913]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
          >
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

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400"
          >
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 mx-auto max-w-5xl px-5 py-10 lg:px-8">
        
        {/* Back Link */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-cyan-400"
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>

        {/* Page Header */}
        <div className="mt-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-inner">
            <Fingerprint size={26} />
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white">
            Your Identity
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
            View and manage your decentralized identity details. Your identity is cryptographically represented by a unique W3C-standard decentralized identifier (DID) and public key.
          </p>
        </div>

        {/* Status Indicator Bar */}
        <div className="mt-8 flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.08)]">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <p className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                Identity {user.active ? "Active" : "Inactive"}
              </p>

              <p className="mt-0.5 text-xs text-slate-400">
                Your decentralized identity is actively registered on the Hyperledger Fabric ledger.
              </p>
            </div>
          </div>
        </div>

        {/* DID Card */}
        <div className="mt-6 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-white tracking-tight">
                Decentralized Identifier (DID)
              </p>

              <p className="mt-0.5 text-xs text-slate-400">
                Your globally unique persistent identifier
              </p>
            </div>

            <Fingerprint size={20} className="text-cyan-400" />
          </div>

          <div className="mt-5 flex flex-col gap-3 rounded-xl border border-slate-800 bg-[#060913]/90 p-4 sm:flex-row sm:items-center">
            <p className="flex-1 break-all font-mono text-xs leading-relaxed text-cyan-300">
              {user.did}
            </p>

            <button
              onClick={copyDid}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs font-mono text-slate-300 transition hover:bg-slate-800 hover:text-white shrink-0"
            >
              {copied ? (
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
          </div>
        </div>

        {/* Identity & Cryptographic Details */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          
          {/* Account Details Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <User size={19} />
              </div>

              <div>
                <h2 className="text-base font-bold text-white tracking-tight">
                  Account Profile
                </h2>

                <p className="text-xs text-slate-400">
                  Registered identity information
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-slate-800/60 bg-slate-950/60 p-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-400 font-bold">
                  <User size={14} className="text-cyan-400" />
                  Full Name
                </div>

                <p className="mt-1 text-sm font-semibold text-slate-200">
                  {user.name}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800/60 bg-slate-950/60 p-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-400 font-bold">
                  <Mail size={14} className="text-cyan-400" />
                  Email Address
                </div>

                <p className="mt-1 break-all text-sm font-semibold text-slate-200">
                  {user.email}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800/60 bg-slate-950/60 p-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-400 font-bold">
                  <Shield size={14} className="text-cyan-400" />
                  Access Role
                </div>

                <p className="mt-1 text-sm font-semibold text-slate-200">
                  {user.role}
                </p>
              </div>
            </div>
          </div>

          {/* Public Key Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <KeyRound size={19} />
                </div>

                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">
                    Cryptographic Key
                  </h2>

                  <p className="text-xs text-slate-400">
                    Public key for identity signature verification
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-slate-800 bg-[#060913]/90 p-4">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold block mb-2">
                  Public Key (Secp256k1)
                </span>
                <p className="break-all font-mono text-xs leading-relaxed text-slate-300">
                  {user.publicKey}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-slate-400">
              <Lock size={14} className="text-emerald-400" />
              <span>Matching private key secured in vault</span>
            </div>
          </div>

        </div>

        {/* Security Info Banner */}
        <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 backdrop-blur-md">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Shield size={20} />
            </div>

            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Identity Key Isolation
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Your decentralized identity is backed by asymmetric cryptography. The public key displayed above is shared with verifiers to validate digitally signed credentials.
              </p>

              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Your private signing key remains encrypted inside your secure wallet and is never exposed or transferred over the network.
              </p>
            </div>
          </div>
        </div>

      </main>

    </div>
  )
}

export default Identity