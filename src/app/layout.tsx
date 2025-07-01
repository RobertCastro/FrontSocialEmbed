import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EmbedSocial - Conecta tu aplicación con TikTok',
  description: 'Obtén y muestra los posts de TikTok de tus cuentas favoritas de manera fácil y profesional. Integra contenido social dinámico en tu aplicación web.',
  keywords: 'TikTok, API, social media, embed, posts, contenido social',
  authors: [{ name: 'EmbedSocial' }],
  openGraph: {
    title: 'EmbedSocial - Conecta tu aplicación con TikTok',
    description: 'Integra contenido de TikTok en tu aplicación web de manera fácil y profesional',
    url: 'https://ccpapp.xyz',
    siteName: 'EmbedSocial',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EmbedSocial - Conecta tu aplicación con TikTok',
    description: 'Integra contenido de TikTok en tu aplicación web',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}