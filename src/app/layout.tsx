import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Y7-Jprompter - Master JSON Prompting',
  description: 'Transform regular prompts into powerful structured JSON prompts that get better AI results. Built with Next.js and Google Gemini AI.',
  keywords: ['AI prompts', 'JSON prompting', 'prompt engineering', 'Gemini AI', 'structured prompts'],
  authors: [{ name: 'PromptForge Team' }],
  openGraph: {
    title: 'Y7-Jprompter - Master JSON Prompting',
    description: 'Transform regular prompts into powerful structured JSON prompts',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Y7-Jprompter - Master JSON Prompting',
    description: 'Transform regular prompts into powerful structured JSON prompts',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563eb',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FK6683R9YL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FK6683R9YL');
          `}
        </Script>
      </head>
      <body className={`${inter.className} antialiased`}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
