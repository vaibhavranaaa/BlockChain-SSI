import { useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  KeyRound,
  CheckCircle2,
  XCircle,
  Mail,
  ShieldCheck,
  Loader2,
  Lock,
  ShieldAlert,
} from "lucide-react"

import api from "../api/axios"

function Authenticate() {
  const [email, setEmail] = useState("")
  const [credentialId, setCredentialId] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")

  const authenticateIdentity = async () => {
    if (!email || !credentialId) {
      setMessage("Enter email and credential ID")
      setMessageType("error")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const response = await api.post("/api/authenticate", {
        email: email,
        credentialId: credentialId,
      })

      if (response.data.authenticated === true) {
        setMessage("Identity authenticated successfully")
        setMessageType("success")
      } else {
        setMessage("Authentication failed")
        setMessageType("error")
      }
    } catch (error) {
      console.error("Authentication failed:", error)

      if (error.response?.status === 403) {
        setMessage("Authentication access denied")
      } else if (error.response?.status === 404) {
        setMessage("Authentication endpoint not found")
      } else {
        setMessage("Authentication request failed")
      }

      setMessageType("error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#060913] text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background Cyber Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d12_1px,transparent_1px),linear-gradient(to_bottom,#1f293d12_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 h-80 w-[600px] bg-cyan-500/5 blur-[140px] rounded-full" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#060913]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-cyan-400 to-blue-600 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.25)] ring-1 ring-cyan-300/40">
              <KeyRound size={22} className="stroke-[2.5]" />
            </div>

            <div>
              <h1 className="font-extrabold tracking-tight text-white text-base">
                Authenticate
              </h1>

              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Cryptographic Identity Verification
              </p>
            </div>
          </div>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            <ArrowLeft size={16} />
            <span>Dashboard</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-3xl px-6 py-10">
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-inner">
            <KeyRound size={26} />
          </div>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white">
            Authenticate Identity
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Verify a user's identity and credential authorization state against the zero-trust security framework.
          </p>
        </div>

        {/* Status Message Banner */}
        {message && (
          <div
            className={`mb-6 flex items-center gap-3 rounded-xl border px-4 py-3.5 text-sm font-semibold backdrop-blur-md shadow-lg ${
              messageType === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                : "border-red-500/30 bg-red-500/10 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
            }`}
          >
            {messageType === "success" ? (
              <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
            ) : (
              <ShieldAlert size={18} className="shrink-0 text-red-400" />
            )}

            <span>{message}</span>
          </div>
        )}

        {/* Authentication Card */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md sm:p-8">
          <div className="mb-6 border-b border-slate-800/80 pb-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Lock size={20} />
            </div>

            <h3 className="text-base font-bold text-white tracking-tight">
              Authentication Request
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Provide the subject's registered email address and associated verifiable credential identifier.
            </p>
          </div>

          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="mb-1.5 block text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                User Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full rounded-xl border border-slate-800 bg-[#060913]/90 py-3.5 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
            </div>

            {/* Credential ID Field */}
            <div>
              <label className="mb-1.5 block text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Verifiable Credential ID
              </label>

              <div className="relative">
                <ShieldCheck
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="text"
                  value={credentialId}
                  onChange={(e) => setCredentialId(e.target.value)}
                  placeholder="cred-10293847"
                  className="w-full rounded-xl border border-slate-800 bg-[#060913]/90 py-3.5 pl-11 pr-4 font-mono text-sm text-cyan-300 placeholder:text-slate-600 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={authenticateIdentity}
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 py-3.5 text-xs font-bold text-slate-950 shadow-[0_0_25px_rgba(34,211,238,0.25)] transition hover:shadow-[0_0_35px_rgba(34,211,238,0.4)] hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Authenticating Identity...</span>
                </>
              ) : (
                <span>Authenticate Identity</span>
              )}
            </button>
          </div>
        </div>

      </main>

    </div>
  )
}

export default Authenticate