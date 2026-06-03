"use client"

import { useState, useEffect } from "react"
import { Home, LayoutDashboard, Copy, Check, Plus } from "lucide-react"
import Image from "next/image"
import { config } from "@/lib/config"

export default function TokenPage() {
  const [countdown, setCountdown] = useState(90)
  const [copied, setCopied] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev > 0) return prev - 1
        return 90
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(config.tokenCA)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const faqItems = [
    {
      question: "DO I NEED TO STAKE OR CLAIM ANYTHING?",
      answer: `No. HYPE token rewards are automatically deposited to your wallet every 90 seconds. Just hold ${config.tokenName} and receive rewards — no actions required. Your deposits compound automatically.`
    },
    {
      question: "WHAT IS THE REWARD TOKEN?",
      answer: "Rewards are paid in HYPE tokens. Trading fees are claimed as SOL, then automatically swapped to HYPE via Jupiter and distributed to your wallet every 90 seconds. The vault never sleeps."
    },
    {
      question: "HOW DO I BECOME ELIGIBLE FOR DISTRIBUTIONS?",
      answer: "You need a HYPE token account in your wallet. The easiest way: buy any amount of HYPE on pump.fun or Jupiter. Once you have a HYPE account, you'll receive distributions automatically as long as you hold $HYPEBANK. We don't create accounts for you — this keeps the vault running efficiently without spending SOL on rent fees."
    },
    {
      question: "HOW IS MY SHARE CALCULATED?",
      answer: `Your share is proportional to your ${config.tokenName} balance at each snapshot relative to total eligible supply. 50% of HYPE is distributed to all holders every 90 seconds. The other 50% is reserved for diamond hands — holders who haven't sold for 1+ hour — distributed every hour.`
    },
    {
      question: "IS THERE A MINIMUM TO QUALIFY?",
      answer: `Yes. You must hold a minimum amount of ${config.tokenName} tokens to qualify for HYPE distributions. This ensures rewards go to real depositors who believe in the bank.`
    },
    {
      question: "WHAT ARE DIAMOND HANDS REWARDS?",
      answer: "50% of every cycle's HYPE is set aside for diamond hands holders — wallets that have held for 1+ hour without selling a single token. This pool accumulates and is distributed every hour. Hold strong, earn more."
    }
  ]

  const flowSteps = [
    {
      number: "01",
      title: "FEES ACCUMULATE",
      description: `Every buy and sell of ${config.tokenName} generates trading fees on pump.fun that accrue to the creator vault automatically. The more volume, the bigger the vault.`
    },
    {
      number: "02",
      title: "CLAIM & SWAP",
      description: "Every 90 seconds the engine claims SOL fees from pump.fun and swaps them for HYPE tokens automatically. No human required. The bank runs itself, 24/7."
    },
    {
      number: "03",
      title: "50/50 SPLIT",
      description: "50% of HYPE goes instantly to all holders. The other 50% accumulates in the diamond hands pool — distributed every hour only to wallets that haven't sold for 1h+."
    },
    {
      number: "04",
      title: "DIAMOND HANDS BONUS",
      description: "Every hour, the accumulated diamond hands pool is distributed exclusively to loyal holders who held without selling. Hold longer, earn more."
    }
  ]
  const marqueeText = "★ HYPE DISTRIBUTIONS EVERY 90 SECONDS ● 50/50 SPLIT: INSTANT + DIAMOND HANDS ● HOLD 1H+ FOR BONUS REWARDS ● THE VAULT NEVER SLEEPS ● "

  return (
    <div className="min-h-screen bg-background">

      {/* ── Header ────────────────────────────────────────────────────────────── */}
      <header className="border-b border-[#2a6b5a] bg-[#072722]/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <nav className="hidden sm:flex items-center gap-1">
            <a
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#78d1bd] text-[#072722] font-bold text-sm rounded-lg hover:bg-[#78d1bd]/90 transition-colors"
            >
              <Home className="w-4 h-4" />
              HOME
            </a>
            <a
              href="/dashboard"
              className="flex items-center gap-1.5 px-3 py-1.5 text-[#7fa89b] font-bold text-sm hover:text-[#e8f5f3] hover:bg-[#78d1bd]/10 rounded-lg transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              DASHBOARD
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={`https://pump.fun/coin/${config.tokenCA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 bg-[#0f4a42] hover:bg-[#2a6b5a] rounded-lg transition-colors"
              aria-label="Buy on Pump.fun"
            >
              <Image src="/pumpfun-icon.png" alt="Pump.fun" width={20} height={20} />
            </a>
            {config.twitterUrl && (
              <a
                href={config.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 bg-[#0f4a42] text-[#7fa89b] hover:bg-[#2a6b5a] hover:text-[#e8f5f3] rounded-lg transition-colors"
                aria-label={`Follow ${config.tokenName} on X`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        {/* ── Hero Section ───────────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-[300px_1fr] gap-4">

          {/* Left Card — Logo */}
          <div className="bg-[#0f4a42]/60 rounded-xl border border-[#2a6b5a] p-6 flex flex-col justify-between min-h-[280px] backdrop-blur-xl">
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/hypebank-logo.png"
                alt="HYPEBANK"
                width={200}
                height={200}
                className="rounded-xl"
              />
              <h1 className="text-5xl font-black leading-none text-white mt-1 tracking-wider">
>HYPEBANK<
              </h1>
              <p className="text-sm font-black text-white/40 tracking-widest">DEPOSIT TODAY. INVEST IN TOMORROW.</p>
            </div>
            <div className="space-y-3 mt-4">
              <div className="inline-flex items-center gap-2 bg-[#78d1bd]/10 text-[#78d1bd] text-xs font-bold px-3 py-1.5 rounded-full border border-[#78d1bd]/30">
                <span className="w-2 h-2 bg-[#78d1bd] rounded-full animate-pulse" />
                STATUS: DISTRIBUTING
              </div>
              <p className="text-sm text-white/50">
                {config.tokenDescription}
              </p>
              <p className="text-sm text-white font-medium">
                NEXT DROP IN{" "}
                <span className="bg-[#0f4a42] text-[#78d1bd] font-mono font-bold px-2 py-0.5 rounded text-xs border border-[#2a6b5a]">
                  {formatCountdown(countdown)}
                </span>
              </p>
            </div>
          </div>

          {/* Right Card — Hero BG */}
          <div
            className="relative rounded-xl p-8 flex flex-col justify-center overflow-hidden bg-cover bg-center min-h-[280px] border border-[#2a6b5a]"
            style={{ backgroundImage: "url('/hypebank-hero-bg.jpg')" }}
          >
            <div className="absolute inset-0 bg-[#072722]/70 rounded-xl" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                THE BANK<br />IS ALWAYS OPEN 🏦
              </h2>
              <p className="text-white/70 text-sm max-w-md mb-5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                Every 90 seconds, trading fees are claimed and swapped to HYPE tokens. 50% distributed instantly to all holders. 50% reserved for diamond hands who hold 1h+ without selling.
              </p>
              <a
                href="/dashboard"
                className="inline-block bg-[#78d1bd] text-[#072722] font-bold px-6 py-3 rounded-lg hover:bg-[#78d1bd]/90 transition-colors whitespace-nowrap"
              >
                LIVE DASHBOARD →
              </a>
            </div>
          </div>
        </div>

        {/* ── SOL Section ────────────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-4">

          {/* Reward Token Card */}
          <div className="bg-[#0f4a42]/60 rounded-xl border border-[#2a6b5a] p-6 backdrop-blur-xl">
            <p className="text-xs font-bold text-[#7fa89b] mb-2 uppercase tracking-wide">REWARD TOKEN</p>
            <h3 className="text-5xl md:text-6xl font-black text-white mb-4">
              HY<span className="text-[#7fa89b]">PE</span>
            </h3>
            <p className="text-sm text-white/50">
              Rewards are paid in HYPE tokens. Fees are claimed as SOL, auto-swapped on pump.fun, and distributed to your wallet every 90 seconds.
            </p>
          </div>

          {/* Why HYPEBANK Card */}
          <div className="bg-[#0f4a42]/60 rounded-xl border border-[#2a6b5a] p-6 backdrop-blur-xl">
            <h3 className="text-2xl font-black mb-4 text-white">WHY $HYPEBANK?</h3>
            <p className="text-sm text-white/50 mb-4">
              {"HYPEBANK runs a dual-engine revenue share. Hold the token, earn HYPE automatically — 50% distributed every 90 seconds to all holders, 50% reserved for diamond hands who hold 1h+ without selling. No staking, no claiming. The bank does the work for you."}
            </p>
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-between bg-[#0f4a42] border border-[#2a6b5a] rounded-lg p-3 font-mono text-xs hover:bg-[#2a6b5a] transition-colors text-white"
            >
              <span className="truncate">{config.tokenCA || "Token CA — Coming Soon"}</span>
              {copied
                ? <Check className="w-4 h-4 text-[#78d1bd] flex-shrink-0 ml-2" />
                : <Copy className="w-4 h-4 flex-shrink-0 ml-2 text-white/40" />
              }
            </button>
            <p className="text-xs text-white/30 mt-1.5 font-semibold">CONTRACT ADDRESS</p>
          </div>
        </div>

        {/* ── The Flow Section ───────────────────────────────────────────────── */}
        <div className="bg-[#0f4a42]/60 rounded-xl border border-[#2a6b5a] p-6 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#2a6b5a]">
            <span className="w-1 h-7 bg-[#78d1bd] rounded-full" />
            <h3 className="text-3xl font-black text-white">THE FLOW</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {flowSteps.map((step) => (
              <div key={step.number} className="border-l-2 border-[#78d1bd]/30 pl-4">
                <span className="text-xs font-mono text-white/30">{step.number}</span>
                <h4 className="text-lg font-black mb-2 text-white">{step.title}</h4>
                <p className="text-sm text-white/50">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ Section ────────────────────────────────────────────────────── */}
        <div className="bg-[#0f4a42]/60 rounded-xl border border-[#2a6b5a] p-6 backdrop-blur-xl">
          <h3 className="text-2xl font-black mb-4 text-white">FAQ</h3>
          <div className="space-y-1">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-[#2a6b5a] last:border-b-0">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between py-3.5 text-left font-bold text-sm text-white hover:text-white/70 transition-colors"
                >
                  {item.question}
                  <Plus className={`w-5 h-5 flex-shrink-0 ml-2 transition-transform text-white/40 ${openFaq === index ? "rotate-45" : ""}`} />
                </button>
                {openFaq === index && (
                  <p className="pb-4 text-sm text-white/50 leading-relaxed">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Marquee ────────────────────────────────────────────────────────── */}
        <div className="bg-[#78d1bd] rounded-xl overflow-hidden">
          <div className="py-3 flex">
            <div className="animate-marquee flex whitespace-nowrap">
              <span className="font-bold text-sm mx-4 text-[#072722]">{marqueeText}</span>
              <span className="font-bold text-sm mx-4 text-[#072722]">{marqueeText}</span>
            </div>
          </div>
        </div>

        {/* ── Banner ───────────────────────────────────────────────────────── */}
        <div className="bg-[#0f4a42]/60 rounded-xl border border-[#2a6b5a] overflow-hidden p-8 text-center backdrop-blur-xl">
          <p className="text-3xl md:text-4xl font-black text-white mb-3">
            🏦 THE BANK IS ALWAYS OPEN 🏦
          </p>
          <p className="text-lg font-bold text-white/50 mb-2">
            Deposit today. Your future self will thank you.
          </p>
          <p className="text-sm font-black text-white/30 tracking-widest">
            HOLD $HYPEBANK → EARN HYPE AUTOMATICALLY
          </p>
        </div>
      </main>

      {/* ── Footer ────────────────────────────────────────────────────────────── */}
      <footer className="bg-[#072722] border-t border-[#2a6b5a] mt-6">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/hypebank-logo.png"
              alt="HYPEBANK"
              width={24}
              height={24}
              className="rounded"
            />
            <p className="text-white/50 text-sm font-bold">
              HYPEBANK © 2026 · BUILT ON SOLANA
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href="/dashboard" className="text-white/50 text-sm font-bold hover:text-white transition-colors">
              DASHBOARD
            </a>
            {config.twitterUrl && (
              <a
                href={config.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/50 text-sm font-bold hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                FOLLOW
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}
