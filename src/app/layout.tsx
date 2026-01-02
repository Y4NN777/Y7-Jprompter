import type { Metadata, Viewport } from 'next';
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import { Providers } from './providers';
import './globals.css';

// Font configurations
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Y7-Jprompter - Transform Prompts to JSON',
  description:
    'Transform regular prompts into powerful structured JSON prompts that get better AI results. Built with Next.js and Google Gemini AI.',
  keywords: [
    'AI prompts',
    'JSON prompting',
    'prompt engineering',
    'Gemini AI',
    'structured prompts',
    'prompt visualization',
  ],
  authors: [{ name: 'Y7 Labs' }],
  openGraph: {
    title: 'Y7-Jprompter - Transform Prompts to JSON',
    description:
      'Transform regular prompts into powerful structured JSON prompts with visual concept graphs',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Y7-Jprompter - Transform Prompts to JSON',
    description:
      'Transform regular prompts into powerful structured JSON prompts',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2563eb' },
    { media: '(prefers-color-scheme: dark)', color: '#00d9ff' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
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
      <body
        className={`${inter.className} antialiased`}
        style={{
          fontFamily:
            'var(--font-inter), ui-sans-serif, system-ui, sans-serif',
        }}
        suppressHydrationWarning
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
