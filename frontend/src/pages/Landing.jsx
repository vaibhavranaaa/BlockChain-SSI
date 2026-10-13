import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  ShieldCheck,
  Fingerprint,
  LockKeyhole,
  Blocks,
  ArrowRight,
  CheckCircle2,
  Shield,
  Sparkles,
  Menu,
  X,
  KeyRound,
  ExternalLink,
} from "lucide-react"

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 font-sans antialiased overflow-hidden">
      {/* Background ambient lighting and grid overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-b from-cyan-500/15 via-blue-600/10 to-transparent blur-[120px] rounded-full opacity-70" />
        <div className="absolute -bottom-40 -left-20 w-[600px] h-[600px] bg-indigo-600/10 blur-[140px] rounded-full" />
        <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-cyan-600/10 blur-[130px] rounded-full" />
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
        />
      </div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800/60">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-105">
              <ShieldCheck size={22} className="stroke-[2.2]" />
            </div>

            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              SSI Vault
              <span className="inline-flex items-center rounded-full bg-cyan-400/10 px-2.5 py-0.5 text-xs font-semibold text-cyan-400 ring-1 ring-inset ring-cyan-400/30">
                Enterprise
              </span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
            <a href="#how-it-works" className="transition-colors hover:text-cyan-400 focus:outline-none focus:text-cyan-400">
              How it works
            </a>
            <a href="#security" className="transition-colors hover:text-cyan-400 focus:outline-none focus:text-cyan-400">
              Security
            </a>
            <a href="#features" className="transition-colors hover:text-cyan-400 focus:outline-none focus:text-cyan-400">
              Features
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Sign in
            </Link>

            <Link
              to="/register"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-semibold text-white rounded-xl group bg-gradient-to-br from-cyan-500 to-blue-600 group-hover:from-cyan-500 group-hover:to-blue-600 hover:text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <span className="relative px-4 py-2 transition-all ease-in duration-75 rounded-[-7px] bg-transparent flex items-center gap-1.5">
                Get Started
                <Sparkles size={14} className="text-cyan-200 animate-pulse" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-2xl px-6 py-6 space-y-4">
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-cyan-400 font-medium"
            >
              How it works
            </a>
            <a
              href="#security"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-cyan-400 font-medium"
            >
              Security
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-cyan-400 font-medium"
            >
              Features
            </a>
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <Link
                to="/login"
                className="w-full text-center py-2 text-slate-300 hover:text-white font-medium"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="w-full text-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-24 md:pt-28 md:pb-32">
          <div className="mx-auto max-w-7xl px-6 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300 backdrop-blur-md shadow-inner shadow-cyan-500/20 mb-8 animate-fade-in">
              <CheckCircle2 size={15} className="text-cyan-400" />
              Blockchain-Backed Identity Platform
            </div>

            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl md:text-7xl leading-[1.08]">
              Own your identity.{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-slate-300 to-cyan-400">
                Verify without compromise.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-300 font-normal">
              SSI Vault grants you absolute control over your digital identity using self-sovereign cryptographic primitives, verifiable credentials, and immutable blockchain ledger state.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row sm:items-center w-full sm:w-auto">
              <Link
                to="/register"
                className="group flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-cyan-500/25 transition-all duration-300 hover:shadow-cyan-500/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                Get Started Free
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              <a
                href="#features"
                className="rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-md px-8 py-4 text-base font-semibold text-slate-200 transition-all hover:bg-slate-800/80 hover:border-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-700"
              >
                Explore Platform
              </a>
            </div>

            {/* Live Interactive/Visual Mockup preview */}
            <div className="mt-16 w-full max-w-4xl rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl p-4 sm:p-6 shadow-2xl shadow-cyan-500/5">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span>SYSTEM_STATUS: HYPERLEDGER_FABRIC_ONLINE</span>
                </div>
                <span className="hidden sm:inline">ZERO-KNOWLEDGE VERIFIED</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/50">
                  <p className="text-xs font-mono text-cyan-400 mb-1">DID IDENTIFIER</p>
                  <p className="text-sm font-semibold text-slate-200 truncate">did:fabric:org1:8f91a...72e</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/50">
                  <p className="text-xs font-mono text-cyan-400 mb-1">CREDENTIAL STATUS</p>
                  <p className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 size={16} /> Active & Validated
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/50">
                  <p className="text-xs font-mono text-cyan-400 mb-1">ENCRYPTION ENGINE</p>
                  <p className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
                    <KeyRound size={16} className="text-indigo-400" /> Ed25519 Signed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Banner */}
        <section className="border-y border-slate-800/80 bg-slate-900/30 backdrop-blur-md">
          <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-slate-800/80 md:grid-cols-3 md:divide-x md:divide-y-0">
            <InfoItem
              icon={<Shield size={24} className="text-cyan-400" />}
              title="Privacy Focused"
              description="Selective disclosure allows you to control exactly what attributes you share."
            />

            <InfoItem
              icon={<LockKeyhole size={24} className="text-cyan-400" />}
              title="Cryptographic Security"
              description="Tamper-proof digitally signed credentials with asymmetric key validation."
            />

            <InfoItem
              icon={<Blocks size={24} className="text-cyan-400" />}
              title="Blockchain Backed"
              description="Decentralized verification status anchored on Hyperledger Fabric framework."
            />
          </div>
        </section>

        {/* Core Features */}
        <section id="features" className="mx-auto max-w-7xl px-6 py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              THE PLATFORM
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Identity infrastructure designed for trust.
            </h2>

            <p className="mt-4 leading-relaxed text-slate-400">
              Manage your decentralized identity, verifiable claims, and zero-knowledge credentials seamlessly from a consolidated dashboard.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<Fingerprint size={24} />}
              title="Self-Sovereign Identity"
              description="Create and control your decentralized identifiers (DIDs) independently without relying on centralized single points of failure."
            />

            <FeatureCard
              icon={<ShieldCheck size={24} />}
              title="Verifiable Credentials"
              description="Issue, exchange, and verify cryptographically signed W3C compliant credentials with built-in instant revocation checks."
            />

            <FeatureCard
              icon={<Blocks size={24} />}
              title="Blockchain Ledger Integrity"
              description="Leverage Hyperledger Fabric enterprise state validation for immutable proof of credential issuance without storing PII on-chain."
            />
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="border-y border-slate-800/80 bg-slate-900/20 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6 py-28">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                HOW IT WORKS
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                From key generation to instant authentication.
              </h2>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-4">
              <Step
                number="01"
                title="Create Identity"
                description="Generate standard-compliant DIDs and persistent private key pairs locally on your secured hardware."
              />

              <Step
                number="02"
                title="Receive Credential"
                description="Trusted enterprise issuers sign and transmit verifiable claims directly into your encrypted vault."
              />

              <Step
                number="03"
                title="Verify Status"
                description="Verifiers query the immutable ledger to validate signature authenticity and active revocation status."
              />

              <Step
                number="04"
                title="Authenticate"
                description="Gain instant passwordless access across supported services without exposing your underlying raw data."
              />
            </div>
          </div>
        </section>

        {/* Security Banner CTA */}
        <section id="security" className="mx-auto max-w-7xl px-6 py-28">
          <div className="relative overflow-hidden rounded-3xl border border-slate-800/90 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-10 md:p-16 shadow-2xl">
            {/* Ambient accent glow inside card */}
            <div className="absolute right-0 top-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 ring-1 ring-cyan-500/30 text-cyan-400 shadow-inner">
                <LockKeyhole size={24} />
              </div>

              <h2 className="mt-8 text-3xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
                Your identity.
                <br />
                Your credentials.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Your absolute control.
                </span>
              </h2>

              <p className="mt-5 text-base leading-relaxed text-slate-300">
                Experience a privacy-focused authentication standard designed for enterprise compliance and ultimate user autonomy.
              </p>

              <Link
                to="/register"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-slate-950 transition-all duration-300 hover:bg-slate-200 shadow-xl shadow-white/5 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white"
              >
                Create Your Identity
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20">
              <ShieldCheck size={16} />
            </div>
            <p>© 2026 SSI Vault. Blockchain-Based Self-Sovereign Identity.</p>
          </div>

          <div className="flex gap-6 font-medium text-slate-400">
            <span className="hover:text-cyan-400 transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-cyan-400 transition-colors cursor-pointer">Security</span>
            <span className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1">
              Documentation <ExternalLink size={12} />
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function InfoItem({ icon, title, description }) {
  return (
    <div className="flex items-start gap-4 px-8 py-8 transition-colors duration-300 hover:bg-slate-900/40">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-800/60 ring-1 ring-slate-700/50 shadow-inner">
        {icon}
      </div>

      <div>
        <p className="text-base font-semibold text-white">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-400">{description}</p>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }){
  return (
    <div className="group rounded-2xl border border-slate-800/80 bg-slate-900/40 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-500/40 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-cyan-500/10">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 ring-1 ring-cyan-500/20 text-cyan-400 transition-all duration-300 group-hover:bg-cyan-500/20 group-hover:scale-110">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-bold text-white tracking-tight">{title}</h3>

      <p className="mt-3 text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  )
}

function Step({ number, title, description }) {
  return (
    <div className="relative border-t border-slate-800/80 pt-6 group">
      <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400 transition-colors group-hover:text-cyan-300">
        {number}
      </span>

      <h3 className="mt-3 text-lg font-bold text-white tracking-tight">{title}</h3>

      <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  )
}