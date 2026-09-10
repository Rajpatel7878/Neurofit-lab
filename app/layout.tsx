import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NeuroFit Labs — VR Brain Training',
  description:
    'Advanced VR brain training with real-time performance tracking and AI-powered cognitive enhancement',
  keywords: 'brain training, VR, cognitive enhancement, EEG, neurotechnology, AI coaching',
  openGraph: {
    title: 'NeuroFit Labs — VR Brain Training',
    description:
      'Advanced VR brain training with real-time performance tracking and AI-powered cognitive enhancement',
    type: 'website',
    siteName: 'NeuroFit Labs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeuroFit Labs — VR Brain Training',
    description: 'Advanced VR brain training powered by neuroscience and AI',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#00AEEF',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            style: {
              fontFamily: 'var(--font-geist-sans)',
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
