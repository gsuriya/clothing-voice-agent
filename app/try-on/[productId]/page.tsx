"use client"

import { useState } from "react"
import { ArrowLeft, ShoppingBag, RotateCcw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

const sizes = ["XS", "S", "M", "L", "XL"]

export default function TryOnPage({ params }: { params: { productId: string } }) {
  const [selectedSize, setSelectedSize] = useState("M")
  const [showOverlay, setShowOverlay] = useState(true)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const router = useRouter()

  const handleAddToCart = () => {
    setIsConfirmed(true)
    setTimeout(() => {
      router.push("/swipe")
    }, 2000)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Camera Feed Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-pink-900/50 to-cyan-900/50">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=400')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
      </div>

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
          <h1 className="gradient-text font-bold text-lg">Virtual Try-On</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowOverlay(!showOverlay)}
            className="rounded-full w-10 h-10 glass-dark border border-white/20"
          >
            <RotateCcw className="w-5 h-5 text-white" />
          </Button>
        </div>
      </div>

      {/* AR Overlay - Garment */}
      {showOverlay && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            {/* Garment Overlay */}
            <div className="w-48 h-64 bg-gradient-to-br from-orange-600/80 to-red-600/80 rounded-2xl border-4 border-white/30 neon-glow animate-float">
              <div className="absolute inset-4 bg-gradient-to-br from-orange-500/60 to-red-500/60 rounded-xl" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-lg">
                Autumn Sweater
              </div>
            </div>

            {/* Fit Indicators */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center neon-glow">
              <Check className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      )}

      {/* Size Selector */}
      <div className="absolute bottom-40 left-4 right-4 z-20">
        <div className="glass-dark rounded-2xl p-4 border border-purple-500/30">
          <h3 className="text-white font-semibold mb-3">Select Size</h3>
          <div className="flex gap-2 mb-4">
            {sizes.map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedSize(size)}
                className={`rounded-full ${
                  selectedSize === size
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 neon-glow"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {size}
              </Button>
            ))}
          </div>

          <div className="text-center">
            <p className="text-white/80 text-sm mb-3">Looks good?</p>
            <Button
              onClick={handleAddToCart}
              disabled={isConfirmed}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl h-12 font-semibold neon-glow"
            >
              {isConfirmed ? (
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Added to Cart!
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart - $89
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="absolute top-24 left-4 right-4 z-20">
        <div className="glass-dark rounded-2xl p-4 border border-purple-500/30">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-white font-bold text-lg">Autumn Knit Sweater</h2>
              <p className="text-white/80 text-sm">Zara • $89</p>
            </div>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">95% Match</Badge>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-32 right-8 w-20 h-20 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-xl animate-float" />
      <div
        className="absolute bottom-60 left-8 w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-float"
        style={{ animationDelay: "1s" }}
      />
    </div>
  )
}
