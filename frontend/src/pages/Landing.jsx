import React from "react"
import { Link } from "react-router-dom"
import {
  ShieldCheck,
  Fingerprint,
  LockKeyhole,
  Blocks,
  ArrowRight,
  CheckCircle2,
  Shield,
  Cpu,
} from "lucide-react"

function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 font-sans antialiased">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-cyan-500/10 via-indigo-500/5 to-transparent blur-3xl rounded-full opacity-60" />
      </div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 ring-1 ring-white/20">
              <ShieldCheck size={22} className="stroke-[2.2]" />
            </div>

            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              SSI Vault
              <span className="inline-flex items-center rounded-md bg-cyan-400/10 px-2 py-0.5 text-xs font-medium text-cyan-400 ring-1 ring-inset ring-cyan-400/20">
                Enterprise
              </span>
            </span>
          </div>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-400 md:flex">
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

          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="hidden rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white sm:block focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Sign in
            </a>

            <a
              href="/register"
              className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:brightness-110 hover:shadow-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              Get Started
            </a>
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-28 md:pt-32 md:pb-36">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <div className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300 backdrop-blur-sm shadow-inner">
              <CheckCircle2 size={15} className="text-cyan-400" />
              Blockchain-backed identity platform
            </div>

            <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-[1.1]">
              Own your identity.{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-400 to-slate-500">
                Verify without compromise.
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-400 font-normal">
              SSI Vault gives you a secure digital identity built around
              self-sovereign identity, verifiable credentials, and
              blockchain-backed authentication.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row sm:items-center">
              <a
                href="/register"
                className="group flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                Get Started
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#features"
                className="rounded-xl border border-slate-800 bg-slate-900/60 px-7 py-3.5 text-base font-semibold text-slate-200 transition-all hover:bg-slate-800/80 hover:border-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-700"
              >
                Explore the platform
              </a>
            </div>
          </div>
        </section>

        {/* Feature Highlights Banner */}
        <section className="border-y border-slate-800/80 bg-slate-900/40 backdrop-blur-sm">
          <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-slate-800/80 md:grid-cols-3 md:divide-x md:divide-y-0">
            <InfoItem
              icon={<Shield size={24} className="text-cyan-400" />}
              title="Privacy focused"
              description="Control what you share"
            />

            <InfoItem
              icon={<LockKeyhole size={24} className="text-cyan-400" />}
              title="Cryptographic security"
              description="Digitally signed credentials"
            />

            <InfoItem
              icon={<Blocks size={24} className="text-cyan-400" />}
              title="Blockchain backed"
              description="Tamper-resistant verification"
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
              Manage your decentralized identity, credentials and
              authentication from one secure platform.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<Fingerprint size={24} />}
              title="Self-Sovereign Identity"
              description="Create and manage your decentralized identity without relying on a centralized identity provider."
            />

            <FeatureCard
              icon={<ShieldCheck size={24} />}
              title="Verifiable Credentials"
              description="Issue, verify and manage digitally signed credentials with cryptographic integrity."
            />

            <FeatureCard
              icon={<Blocks size={24} />}
              title="Blockchain Verification"
              description="Use Hyperledger Fabric to maintain tamper-resistant credential status and verification records."
            />
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="border-y border-slate-800/80 bg-slate-900/30">
          <div className="mx-auto max-w-7xl px-6 py-28">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                HOW IT WORKS
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                From identity to authentication.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-4">
              <Step
                number="01"
                title="Create Identity"
                description="Generate a decentralized identity and cryptographic key pair."
              />

              <Step
                number="02"
                title="Receive Credential"
                description="An authorized issuer provides a digitally signed credential."
              />

              <Step
                number="03"
                title="Verify"
                description="Credential integrity and blockchain status are checked."
              />

              <Step
                number="04"
                title="Authenticate"
                description="A valid identity and credential can be used for secure access."
              />
            </div>
          </div>
        </section>

        {/* Security Banner CTA */}
        <section id="security" className="mx-auto max-w-7xl px-6 py-28">
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-10 md:p-16 shadow-2xl">
            {/* Ambient accent glow inside card */}
            <div className="absolute right-0 top-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 ring-1 ring-cyan-500/30 text-cyan-400 shadow-inner">
                <LockKeyhole size={24} />
              </div>

              <h2 className="mt-8 text-3xl font-bold tracking-tight text-white sm:text-4xl leading-tight">
                Your identity.
                <br />
                Your credentials.
                <br />
                <span className="text-cyan-400">Your control.</span>
              </h2>

              <p className="mt-5 text-base leading-relaxed text-slate-300">
                Experience a privacy-focused authentication model built
                around decentralized identity and blockchain technology.
              </p>

              <a
                href="/register"
                className="mt-8 flex w-fit items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-slate-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
              >
                Create your identity
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 SSI Vault. Blockchain-Based Self-Sovereign Identity.</p>

          <div className="flex gap-6 font-medium">
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Security</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Documentation</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function InfoItem({ icon, title, description }) {
  return (
    <div className="flex items-center gap-4 px-8 py-8 transition-colors hover:bg-slate-900/30">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-800/60 ring-1 ring-slate-700/50">
        {icon}
      </div>

      <div>
        <p className="text-base font-semibold text-white">{title}</p>
        <p className="mt-0.5 text-sm text-slate-400">{description}</p>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group rounded-2xl border border-slate-800/80 bg-slate-900/40 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-cyan-500/5">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 ring-1 ring-cyan-500/20 text-cyan-400 transition-colors group-hover:bg-cyan-500/20">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-bold text-white tracking-tight">{title}</h3>

      <p className="mt-3 text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  )
}

function Step({ number, title, description }) {
  return (
    <div className="border-t border-slate-800/80 pt-6">
      <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
        {number}
      </span>

      <h3 className="mt-3 text-lg font-bold text-white tracking-tight">{title}</h3>

      <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  )
}

export default Landing