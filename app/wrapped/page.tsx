"use client"

import { useState } from "react"
import { ArrowLeft, Share, ChevronRight, Trophy, Palette, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const slides = [
  {
    id: 1,
    type: "cover",
    title: "Your 2025 Style Wrapped",
    subtitle: "🎬 A year of amazing fashion discoveries",
    background: "from-purple-600 via-pink-600 to-red-600",
  },
  {
    id: 2,
    type: "brands",
    title: "Your Top 3 Brands",
    brands: [
      { name: "Zara", purchases: 12, logo: "Z" },
      { name: "H&M", purchases: 8, logo: "H" },
      { name: "Uniqlo", purchases: 6, logo: "U" },
    ],
    background: "from-blue-600 via-purple-600 to-pink-600",
  },
  {
    id: 3,
    type: "color",
    title: "Your Signature Color",
    color: "#D2691E",
    colorName: "Autumn Orange",
    wears: 24,
    background: "from-orange-600 via-red-600 to-pink-600",
  },
  {
    id: 4,
    type: "stats",
    title: "Style Achievements",
    stats: [
      { label: "Virtual Try-Ons", value: 47, icon: Zap },
      { label: "Style Quests Completed", value: 12, icon: Trophy },
      { label: "Community Posts", value: 8, icon: Palette },
    ],
    background: "from-green-600 via-blue-600 to-purple-600",
  },
  {
    id: 5,
    type: "share",
    title: "Share Your Style Journey",
    subtitle: "Show off your amazing fashion year!",
    background: "from-pink-600 via-purple-600 to-indigo-600",
  },
]

export default function WrappedPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "My 2025 Style Wrapped",
        text: "Check out my fashion journey this year!",
        url: window.location.href,
      })
    }
  }

  const slide = slides[currentSlide]

  return (
    <div className={`relative h-screen w-full overflow-hidden bg-gradient-to-br ${slide.background}`}>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="rounded-full w-10 h-10 glass border border-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>

          {/* Progress Dots */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? "bg-white w-6" : "bg-white/40"
                }`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="rounded-full w-10 h-10 glass border border-white/20"
          >
            <Share className="w-5 h-5 text-white" />
          </Button>
        </div>
      </div>

      {/* Slide Content */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        {slide.type === "cover" && (
          <div className="text-center">
            <div className="text-8xl mb-8 animate-float">🎬</div>
            <h1 className="text-4xl font-bold text-white mb-4 neon-text">{slide.title}</h1>
            <p className="text-white/80 text-lg">{slide.subtitle}</p>
          </div>
        )}

        {slide.type === "brands" && (
          <div className="text-center w-full max-w-sm">
            <h1 className="text-3xl font-bold text-white mb-8 neon-text">{slide.title}</h1>
            <div className="space-y-6">
              {slide.brands?.map((brand, index) => (
                <div key={brand.name} className="glass rounded-2xl p-6 border border-white/20 neon-glow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-white/20 to-white/10 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {brand.logo}
                      </div>
                      <div className="text-left">
                        <p className="text-white font-bold text-lg">{brand.name}</p>
                        <p className="text-white/70 text-sm">{brand.purchases} purchases</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white">#{index + 1}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "color" && (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-8 neon-text">{slide.title}</h1>
            <div className="mb-8">
              <div
                className="w-32 h-32 rounded-full mx-auto mb-4 neon-glow animate-pulse-glow border-4 border-white/30"
                style={{ backgroundColor: slide.color }}
              />
              <h2 className="text-2xl font-bold text-white mb-2">{slide.colorName}</h2>
              <p className="text-white/80 text-lg">Worn {slide.wears} times this year</p>
            </div>
          </div>
        )}

        {slide.type === "stats" && (
          <div className="text-center w-full max-w-sm">
            <h1 className="text-3xl font-bold text-white mb-8 neon-text">{slide.title}</h1>
            <div className="space-y-4">
              {slide.stats?.map((stat, index) => (
                <div key={stat.label} className="glass rounded-2xl p-6 border border-white/20 neon-glow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-white/20 to-white/10 rounded-full flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-white font-semibold">{stat.label}</p>
                    </div>
                    <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "share" && (
          <div className="text-center">
            <div className="text-6xl mb-8 animate-float">✨</div>
            <h1 className="text-3xl font-bold text-white mb-4 neon-text">{slide.title}</h1>
            <p className="text-white/80 text-lg mb-8">{slide.subtitle}</p>
            <Button
              onClick={handleShare}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-full px-8 py-4 text-lg font-semibold neon-glow"
            >
              Share Your Wrapped
            </Button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-4">
          {currentSlide > 0 && (
            <Button onClick={prevSlide} variant="ghost" className="rounded-full w-12 h-12 glass border border-white/20">
              <ChevronRight className="w-6 h-6 text-white rotate-180" />
            </Button>
          )}

          {currentSlide < slides.length - 1 && (
            <Button
              onClick={nextSlide}
              className="rounded-full w-12 h-12 bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 border border-white/20"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </Button>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-32 right-8 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float" />
      <div
        className="absolute bottom-32 left-8 w-16 h-16 bg-white/10 rounded-full blur-xl animate-float"
        style={{ animationDelay: "1s" }}
      />
    </div>
  )
}
