import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import BottomNavigation from "@/components/bottom-navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StyleAI - Your Personal Fashion Stylist",
  description: "AI-powered fashion styling with color analysis and virtual try-on",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen`}>
        <div className="max-w-md mx-auto relative min-h-screen bg-gradient-to-br from-slate-900/95 via-purple-900/95 to-slate-900/95">
          {children}
          <BottomNavigation />
        </div>
      </body>
    </html>
  )
}
