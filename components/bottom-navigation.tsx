"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Sparkles, Users, BarChart3 } from "lucide-react"

const navItems = [
  { href: "/", icon: Home, label: "Camera" },
  { href: "/swipe", icon: Sparkles, label: "Swipe" },
  { href: "/community", icon: Users, label: "Community" },
  { href: "/wrapped", icon: BarChart3, label: "Wrapped" },
]

export default function BottomNavigation() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md z-30">
      <div className="glass-dark border-t border-white/10 px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                  isActive ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 neon-glow" : "hover:bg-white/10"
                }`}
              >
                <Icon
                  className={`w-6 h-6 ${isActive ? "text-purple-400" : "text-white/70"}`}
                  fill={isActive ? "currentColor" : "none"}
                />
                <span className={`text-xs font-medium ${isActive ? "gradient-text" : "text-white/70"}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
