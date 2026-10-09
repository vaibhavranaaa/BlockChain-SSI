import { useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  BadgeCheck,
  Search,
  ShieldCheck,
  XCircle,
  LoaderCircle,
  ShieldAlert,
  Blocks,
} from "lucide-react"
import api from "../api/axios"

export default function Verify() {
  const [credentialId, setCredentialId] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")

  const handleVerify = async (event) => {
    event.preventDefault()

    if (!credentialId.trim()) {
      setError("Please enter a credential ID.")
      setResult(null)
      return
    }

    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await api.get(
        `/api/credentials/verify/${encodeURIComponent(credentialId.trim())}`
      )

      const valid = response.data?.data === true

      setResult({
        valid,
        message: valid
          ? "Credential verification successful."
          : "Credential is invalid, revoked, or failed verification.",
      })
    } catch (err) {
      if (err.response?.status === 404) {
        setError("Credential not found.")
      } else if (err.response?.status === 401 || err.response?.status === 403) {
        setError("Access denied. Please log in again.")
      } else {
        setError("Unable to verify the credential. Please check your connection and try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#060913] px-5 py-8 text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200 sm:px-8">
      
      {/* Background Cyber Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d12_1px,transparent_1px),linear-gradient(to_bottom,#1f293d12_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 h-80 w-[600px] bg-cyan-500/5 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        
        {/* Back Link */}
        <Link
          to="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-cyan-400"
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>

        {/* Page Title Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-inner">
            <ShieldCheck size={32} />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Verify Credential
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Check cryptographic signatures, blockchain ledger records, and revocation status.
            </p>
          </div>
        </div>

        {/* Verification Form Card */}
        <form
          onSubmit={handleVerify}
          className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md sm:p-8"
        >
          <label
            htmlFor="credentialId"
            className="mb-2 block text-xs font-mono font-bold uppercase tracking-wider text-slate-300"
          >
            Credential ID
          </label>

          <input
            id="credentialId"
            type="text"
            value={credentialId}
            onChange={(event) => {
              setCredentialId(event.target.value)
              setError("")
              setResult(null)
            }}
            placeholder="Enter credential ID (e.g. cred-10293)"
            className="w-full rounded-xl border border-slate-800 bg-[#060913]/90 px-4 py-3.5 font-mono text-sm text-cyan-300 placeholder:text-slate-600 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 px-5 py-3.5 font-bold text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.25)] transition hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <LoaderCircle size={19} className="animate-spin" />
            ) : (
              <Search size={19} />
            )}
            <span>{loading ? "Verifying Credential..." : "Verify Credential"}</span>
          </button>

          {/* Error Banner */}
          {error && (
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm font-semibold text-red-400 backdrop-blur-md">
              <ShieldAlert size={20} className="shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Result Banner */}
          {result && (
            <div
              className={`mt-5 rounded-xl border p-5 backdrop-blur-md ${
                result.valid
                  ? "border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                  : "border-red-500/30 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
              }`}
            >
              <div className="flex items-start gap-3.5">
                {result.valid ? (
                  <BadgeCheck className="shrink-0 text-emerald-400" size={26} />
                ) : (
                  <XCircle className="shrink-0 text-red-400" size={26} />
                )}

                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">
                    {result.valid ? "Credential Validated" : "Verification Failed"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-300">
                    {result.message}
                  </p>
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Footer Note */}
        <div className="mt-5 flex items-center gap-2 text-xs font-mono text-slate-500">
          <Blocks size={14} className="text-slate-400" />
          <span>Verification evaluates ledger proofs via Hyperledger Fabric node APIs.</span>
        </div>

      </div>
    </div>
  )
}