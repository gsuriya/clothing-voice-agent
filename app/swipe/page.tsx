"use client"

import { useState } from "react"
import { ArrowLeft, ShoppingCart, Filter, Heart, X, Shirt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import SwipeCard from "@/components/swipe-card"

const mockProducts = [
  {
    id: 1,
    image: "/placeholder.svg?height=400&width=300",
    brand: "Zara",
    price: "$89",
    matchScore: 95,
    title: "Autumn Knit Sweater",
    tags: ["Casual", "Cotton", "Sustainable"],
    color: "Burnt Orange",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=400&width=300",
    brand: "H&M",
    price: "$45",
    matchScore: 88,
    title: "Warm Tone Blazer",
    tags: ["Work", "Polyester", "Classic"],
    color: "Deep Brown",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=400&width=300",
    brand: "Uniqlo",
    price: "$65",
    matchScore: 92,
    title: "Cozy Cardigan",
    tags: ["Comfort", "Wool", "Eco-friendly"],
    color: "Golden Yellow",
  },
]

export default function SwipePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showFilter, setShowFilter] = useState(false)
  const [likedCount, setLikedCount] = useState(0)
  const router = useRouter()

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      setLikedCount((prev) => prev + 1)
    }

    if (currentIndex < mockProducts.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setCurrentIndex(0) // Reset to first card
    }
  }

  const handleTryOn = (productId: number) => {
    router.push(`/try-on/${productId}`)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="rounded-full w-10 h-10 glass-dark border border-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          <h1 className="gradient-text font-bold text-lg">Discover</h1>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full w-10 h-10 glass-dark border border-white/20 relative"
          >
            <ShoppingCart className="w-5 h-5 text-white" />
            {likedCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{likedCount}</span>
              </div>
            )}
          </Button>
        </div>
      </div>

      {/* Filter Button */}
      <div className="absolute top-20 right-4 z-20">
        <Button
          onClick={() => setShowFilter(true)}
          className="rounded-full w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 neon-glow"
        >
          <Filter className="w-5 h-5 text-white" />
        </Button>
      </div>

      {/* Card Stack */}
      <div className="absolute inset-0 flex items-center justify-center pt-24 pb-32">
        <div className="relative w-80 h-96">
          {mockProducts.map((product, index) => (
            <SwipeCard
              key={product.id}
              product={product}
              isActive={index === currentIndex}
              onSwipe={handleSwipe}
              onTryOn={() => handleTryOn(product.id)}
              style={{
                zIndex: mockProducts.length - index,
                transform: `translateY(${(index - currentIndex) * 8}px) scale(${1 - (index - currentIndex) * 0.05})`,
                opacity: index <= currentIndex + 2 ? 1 : 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Swipe Actions */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-6">
          <Button
            onClick={() => handleSwipe("left")}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 neon-glow"
          >
            <X className="w-8 h-8 text-white" />
          </Button>

          <Button
            onClick={() => handleTryOn(mockProducts[currentIndex]?.id)}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 neon-glow"
          >
            <Shirt className="w-6 h-6 text-white" />
          </Button>

          <Button
            onClick={() => handleSwipe("right")}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 neon-glow"
          >
            <Heart className="w-8 h-8 text-white" />
          </Button>
        </div>
      </div>

      {/* Match Score Indicator */}
      {mockProducts[currentIndex] && (
        <div className="absolute top-32 left-4 z-20">
          <div className="glass-dark rounded-full px-4 py-2 border border-green-500/30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 font-bold text-sm">{mockProducts[currentIndex].matchScore}% Match</span>
            </div>
          </div>
        </div>
      )}

      {/* Decorative Elements */}
      <div className="absolute top-40 right-8 w-16 h-16 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-xl animate-float" />
      <div
        className="absolute bottom-48 left-8 w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-float"
        style={{ animationDelay: "1s" }}
      />
    </div>
  )
}
