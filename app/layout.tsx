import type React from "react"
import type { Metadata } from "next"
import { Public_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const publicSans = Public_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],  // Add weights you need
  variable: "--font-sans"  // ← Makes it work with your @theme CSS vars
})

export const metadata: Metadata = {
  title: "Can Code Help Heal Post-Industrial Cities?",
  description: "Explore civic tech solutions through an interactive mayor simulation game",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${publicSans.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
