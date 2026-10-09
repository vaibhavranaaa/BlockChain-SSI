import { useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  ShieldCheck,
  FileCheck2,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Loader2,
  Lock,
  AlertOctagon,
  Copy,
  Check,
  ShieldAlert,
} from "lucide-react"

import api from "../api/axios"

function Credentials() {
  const [credentialId, setCredentialId] = useState("")
  const [credential, setCredential] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")
  const [copiedField, setCopiedField] = useState(null)

  const copyToClipboard = async (text, fieldName) => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(fieldName)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const issueCredential = async () => {
    setLoading(true)
    setMessage("")

    try {
      const response = await api.post("/api/credentials/issue")

      setCredential(response.data.data)
      setCredentialId(response.data.data.id)

      setMessage(response.data.message)
      setMessageType("success")
    } catch (error) {
      console.error("Failed to issue credential:", error)

      setMessage("Failed to issue credential")
      setMessageType("error")
    } finally {
      setLoading(false)
    }
  }

  const verifyCredential = async () => {
    if (!credentialId) {
      setMessage("Enter a credential ID first")
      setMessageType("error")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const response = await api.get(
        `/api/credentials/verify/${credentialId}`
      )

      if (response.data.data === true) {
        setMessage("Credential is valid and verified")
        setMessageType("success")
      } else {
        setMessage("Credential verification failed")
        setMessageType("error")
      }
    } catch (error) {
      console.error("Verification failed:", error)

      setMessage("Failed to verify credential")
      setMessageType("error")
    } finally {
      setLoading(false)
    }
  }

  const revokeCredential = async () => {
    if (!credentialId) {
      setMessage("Enter a credential ID first")
      setMessageType("error")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const response = await api.put(`/api/credentials/revoke/${credentialId}`)

      if (response.data.data === true) {
        setMessage("Credential revoked successfully")
        setMessageType("success")
      } else {
        setMessage("Credential revocation failed")
        setMessageType("error")
      }
    } catch (error) {
      console.error("Failed to revoke credential:", error)

      if (error.response?.status === 403) {
        setMessage("Only ISSUER or ADMIN can revoke credentials")
      } else {
        setMessage("Failed to revoke credential")
      }

      setMessageType("error")
    } finally {
      setLoading(false)
    }
  }

  const tamperTest = async () => {
    if (!credentialId) {
      setMessage("Enter a credential ID first")
      setMessageType("error")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const response = await api.get(
        `/api/credentials/tamper-test/${credentialId}`
      )

      if (response.data.data === false) {
        setMessage("Tampering detected successfully")
        setMessageType("success")
      } else {
        setMessage("Credential tampering was not detected")
        setMessageType("error")
      }
    } catch (error) {
      console.error("Tamper test failed:", error)

      setMessage("Failed to perform tamper test")
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
        <div className="absolute top-10 right-1/4 h-80 w-[600px] bg-cyan-500/5 blur-[140px] rounded-full" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#060913]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-cyan-400 to-blue-600 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.25)] ring-1 ring-cyan-300/40">
              <ShieldCheck size={22} className="stroke-[2.5]" />
            </div>

            <div>
              <h1 className="font-extrabold tracking-tight text-white text-base">
                Verifiable Credentials
              </h1>

              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Cryptographic Issuance & Verification
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
      <main className="relative z-10 mx-auto max-w-5xl px-6 py-10">
        
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-inner">
            <FileCheck2 size={26} />
          </div>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white">
            Your Verifiable Credentials
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Issue, verify, revoke, and inspect W3C verifiable credentials signed with cryptographic signatures.
          </p>
        </div>

        {/* Global Feedback Banner */}
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
              <XCircle size={18} className="shrink-0 text-red-400" />
            )}

            <span>{message}</span>
          </div>
        )}

        {/* Primary Action Grid */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* Issue Credential Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-inner">
                  <FileCheck2 size={22} />
                </div>

                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Issue Credential
                  </h3>

                  <p className="text-xs text-slate-400">
                    Create a new digitally signed verifiable credential
                  </p>
                </div>
              </div>

              <p className="mb-6 text-xs text-slate-400 leading-relaxed">
                Generate an authenticated credential signed by your decentralized identifier key pair and register the hash proof to the network.
              </p>
            </div>

            <button
              onClick={issueCredential}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 py-3.5 text-xs font-bold text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.25)] transition hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Issue Credential</span>
              )}
            </button>
          </div>

          {/* Verify & Revoke Credential Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-inner">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Verify or Revoke
                </h3>

                <p className="text-xs text-slate-400">
                  Verify validity or revoke issued credentials
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="mb-1.5 block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Target Credential ID
                </label>
                <input
                  type="text"
                  value={credentialId}
                  onChange={(e) => setCredentialId(e.target.value)}
                  placeholder="Enter credential ID e.g. cred-12345"
                  className="w-full rounded-xl border border-slate-800 bg-[#060913]/90 px-4 py-3 font-mono text-xs text-cyan-300 placeholder:text-slate-600 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={verifyCredential}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 px-4 py-3 text-xs font-bold text-emerald-400 transition hover:bg-emerald-500/30 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <span>Verify</span>
                  )}
                </button>

                <button
                  onClick={revokeCredential}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-xl bg-red-500/20 border border-red-500/30 px-4 py-3 text-xs font-bold text-red-400 transition hover:bg-red-500/30 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <span>Revoke</span>
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Issued Credential Inspector Panel */}
        {credential && (
          <div className="mt-6 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md">
            <div className="mb-6 flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={20} className="text-cyan-400" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  Credential Inspection Data
                </h3>
              </div>

              <span className="inline-flex items-center rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-cyan-400 border border-cyan-500/20">
                W3C Format
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              
              <div className="rounded-xl border border-slate-800/60 bg-[#060913]/80 p-3.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Credential ID
                  </span>
                  <button
                    onClick={() => copyToClipboard(credential.id, "id")}
                    className="text-slate-400 hover:text-cyan-400 transition"
                  >
                    {copiedField === "id" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="break-all font-mono text-xs text-slate-200">
                  {credential.id}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800/60 bg-[#060913]/80 p-3.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Credential Type
                  </span>
                  <button
                    onClick={() => copyToClipboard(credential.type, "type")}
                    className="text-slate-400 hover:text-cyan-400 transition"
                  >
                    {copiedField === "type" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="font-mono text-xs text-slate-200">
                  {credential.type}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800/60 bg-[#060913]/80 p-3.5 sm:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Issuer DID
                  </span>
                  <button
                    onClick={() => copyToClipboard(credential.issuer, "issuer")}
                    className="text-slate-400 hover:text-cyan-400 transition"
                  >
                    {copiedField === "issuer" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="break-all font-mono text-xs text-cyan-300">
                  {credential.issuer}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800/60 bg-[#060913]/80 p-3.5 sm:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Holder DID
                  </span>
                  <button
                    onClick={() => copyToClipboard(credential.holder, "holder")}
                    className="text-slate-400 hover:text-cyan-400 transition"
                  >
                    {copiedField === "holder" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="break-all font-mono text-xs text-cyan-300">
                  {credential.holder}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800/60 bg-[#060913]/80 p-3.5 sm:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Cryptographic Hash (SHA-256)
                  </span>
                  <button
                    onClick={() => copyToClipboard(credential.credentialHash, "hash")}
                    className="text-slate-400 hover:text-cyan-400 transition"
                  >
                    {copiedField === "hash" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="break-all font-mono text-xs text-slate-400">
                  {credential.credentialHash}
                </p>
              </div>

            </div>

            {/* Tamper Simulation Action */}
            <div className="mt-6 border-t border-slate-800/80 pt-5">
              <button
                onClick={tamperTest}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-3 text-xs font-mono font-bold text-amber-400 transition hover:bg-amber-500/20 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <RefreshCw size={16} />
                )}
                <span>Run Cryptographic Tamper Test</span>
              </button>
            </div>

          </div>
        )}

      </main>

    </div>
  )
}

export default Credentials