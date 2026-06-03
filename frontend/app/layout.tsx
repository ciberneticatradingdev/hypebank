import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { config } from '@/lib/config'

const geist = Geist({
  subsets: ["latin"],
  variable: '--font-geist'
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: '--font-geist-mono'
})

export const metadata: Metadata = {
  title: `HYPEBANK — Deposit Today. Earn Tomorrow.`,
  description: config.tokenDescription,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'HYPEBANK — Deposit Today. Earn Tomorrow.',
    description: 'Hold $HYPEBANK, earn HYPE tokens automatically on Solana. 50% instant + 50% diamond hands. The vault is always open. 🏦',
    images: [{ url: '/og-image.jpg', width: 1200, height: 1200, alt: 'HYPEBANK' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HYPEBANK — Deposit Today. Earn Tomorrow.',
    description: 'Hold $HYPEBANK, earn HYPE tokens automatically on Solana. 🏦',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
