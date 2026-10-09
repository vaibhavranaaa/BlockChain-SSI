import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ShieldCheck, ArrowLeft, Mail, Lock, Loader2, CheckCircle2, ShieldAlert } from "lucide-react"
import api from "../api/axios"

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (event) => {
    event.preventDefault()

    setError("")

    if (!email || !password) {
      setError("Please enter your email and password.")
      return
    }

    try {
      setLoading(true)

      const response = await api.post("/api/auth/login", {
        email,
        password,
      })

      const token = response.data.message

      if (!token) {
        throw new Error("Login token was not received.")
      }

      localStorage.setItem("token", token)

      navigate("/dashboard")
    } catch (error) {
      console.error(error)

      if (error.response?.data?.message) {
        setError(error.response.data.message)
      } else {
        setError("Unable to sign in. Please check your credentials.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#060913] text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left Side: Enterprise Security Hero Banner */}
        <div className="relative hidden overflow-hidden border-r border-slate-800/80 bg-[#060913] lg:flex flex-col justify-between p-12">
          {/* Cyber Grid & Ambient Glows */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d15_1px,transparent_1px),linear-gradient(to_bottom,#1f293d15_1px,transparent_1px)] bg-[size:3rem_3rem]" />
            <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
            <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
          </div>

          {/* Logo Brand Bar */}
          <div className="relative z-10">
            <Link
              to="/"
              className="flex w-fit items-center gap-3 transition-opacity hover:opacity-90 focus:outline-none"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-cyan-400 to-blue-600 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.3)] ring-1 ring-cyan-300/40">
                <ShieldCheck size={22} className="stroke-[2.5]" />
              </div>

              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                SSI Vault
                <span className="inline-flex items-center rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-400 ring-1 ring-inset ring-cyan-500/30">
                  Enterprise
                </span>
              </span>
            </Link>
          </div>

          {/* Hero Main Content */}
          <div className="relative z-10 max-w-lg my-auto">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-cyan-400">
              <CheckCircle2 size={14} className="text-cyan-400" />
              Self-Sovereign Authentication
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-white xl:text-5xl">
              Your identity,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
                under your sovereign control.
              </span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-slate-400">
              Access your decentralized identity vault, verify W3C credentials, and manage cryptographic authentication with zero-trust security.
            </p>

            {/* Micro Security telemetry badge */}
            <div className="mt-10 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-xl">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Ledger Node: Active</span>
                </div>
                <span className="text-cyan-400 font-semibold">256-bit ECDSA Enabled</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="relative z-10 text-xs font-mono text-slate-500">
            © 2026 SSI Vault. Cryptographic Identity Infrastructure.
          </div>
        </div>


        {/* Right Side: Authentication Form */}
        <div className="relative flex items-center justify-center px-6 py-12 lg:px-12">
          {/* Subtle bg radial glow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

          <div className="relative z-10 w-full max-w-md">

            {/* Mobile Back Button */}
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-cyan-400 lg:hidden"
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>


            {/* Header */}
            <div className="mb-8">
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-b from-cyan-400 to-blue-600 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.25)] lg:hidden">
                <ShieldCheck size={24} className="stroke-[2.5]" />
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                Welcome back
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Sign in with your registered email to access your SSI Vault.
              </p>
            </div>


            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-500 focus:bg-slate-900 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
              </div>


              {/* Password Input */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-300"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-cyan-400 transition hover:text-cyan-300 focus:outline-none"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-500 focus:bg-slate-900 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
              </div>


              {/* Error Message Display */}
              {error && (
                <div className="flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400">
                  <ShieldAlert size={18} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}


              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_25px_rgba(34,211,238,0.25)] transition-all hover:shadow-[0_0_35px_rgba(34,211,238,0.4)] hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <span>Sign in</span>
                )}
              </button>

            </form>


            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-800" />
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                SECURE ACCESS PORTAL
              </span>
              <div className="h-px flex-1 bg-slate-800" />
            </div>


            <p className="text-center text-sm text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-cyan-400 transition hover:text-cyan-300 hover:underline"
              >
                Create one
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Login