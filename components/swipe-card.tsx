"use client"

import type React from "react"

import { useState } from "react"
import { Heart, X, Shirt, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Product {
  id: number
  image: string
  brand: string
  price: string
  matchScore: number
  title: string
  tags: string[]
  color: string
}

interface SwipeCardProps {
  product: Product
  isActive: boolean
  onSwipe: (direction: "left" | "right") => void
  onTryOn: () => void
  style?: React.CSSProperties
}

export default function SwipeCard({ product, isActive, onSwipe, onTryOn, style }: SwipeCardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isActive) return
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isActive) return
    setDragOffset(e.clientX - window.innerWidth / 2)
  }

  const handleMouseUp = () => {
    if (!isDragging || !isActive) return

    if (Math.abs(dragOffset) > 100) {
      onSwipe(dragOffset > 0 ? "right" : "left")
    }

    setIsDragging(false)
    setDragOffset(0)
  }

  return (
    <div
      className={`absolute inset-0 cursor-grab ${isDragging ? "cursor-grabbing" : ""}`}
      style={{
        ...style,
        transform: `${style?.transform || ""} translateX(${dragOffset}px) rotate(${dragOffset * 0.1}deg)`,
        opacity: isActive ? 1 - Math.abs(dragOffset) * 0.002 : style?.opacity,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="glass-dark rounded-3xl border border-white/20 overflow-hidden h-full neon-glow">
        {/* Product Image */}
        <div className="relative h-64 overflow-hidden">
          <img src={product.image || "/placeholder.svg"} alt={product.title} className="w-full h-full object-cover" />

          {/* Match Score Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 neon-glow">
              <Star className="w-3 h-3 mr-1" />
              {product.matchScore}%
            </Badge>
          </div>

          {/* Virtual Try-On Button */}
          <Button
            onClick={onTryOn}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 neon-glow"
          >
            <Shirt className="w-5 h-5 text-white" />
          </Button>

          {/* Swipe Indicators */}
          {isDragging && (
            <>
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                  dragOffset > 50 ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="bg-green-500/80 rounded-full p-4 neon-glow">
                  <Heart className="w-8 h-8 text-white fill-current" />
                </div>
              </div>
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                  dragOffset < -50 ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="bg-red-500/80 rounded-full p-4 neon-glow">
                  <X className="w-8 h-8 text-white" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-white font-bold text-lg">{product.title}</h3>
              <p className="text-white/80 text-sm">{product.brand}</p>
            </div>
            <p className="text-white font-bold text-xl gradient-text">{product.price}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-white/10 text-white/80 border border-white/20 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Color Info */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-white/30" style={{ backgroundColor: product.color }} />
            <span className="text-white/70 text-sm">Perfect for your color season</span>
          </div>
        </div>
      </div>
    </div>
  )
}
