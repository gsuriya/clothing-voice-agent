"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share, Plus, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const mockPosts = [
  {
    id: 1,
    user: {
      name: "StyleQueen",
      avatar: "/placeholder.svg?height=40&width=40",
      handle: "@stylequeen",
    },
    image: "/placeholder.svg?height=400&width=300",
    caption: "Loving this autumn color palette! 🍂✨",
    likes: 234,
    comments: 18,
    timeAgo: "2h",
    products: [
      { name: "Zara Sweater", price: "$89", x: 30, y: 40 },
      { name: "H&M Jeans", price: "$45", x: 60, y: 70 },
    ],
    earned: true,
  },
  {
    id: 2,
    user: {
      name: "FashionGuru",
      avatar: "/placeholder.svg?height=40&width=40",
      handle: "@fashionguru",
    },
    image: "/placeholder.svg?height=400&width=300",
    caption: "Perfect match for my color season! 💫",
    likes: 189,
    comments: 12,
    timeAgo: "4h",
    products: [{ name: "Uniqlo Cardigan", price: "$65", x: 45, y: 35 }],
    earned: false,
  },
]

export default function CommunityPage() {
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const handleLike = (postId: number) => {
    setLikedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-20 p-4 glass-dark border-b border-white/10">
        <div className="flex items-center justify-between">
          <h1 className="gradient-text font-bold text-xl">Community</h1>
          <Button
            size="sm"
            className="rounded-full w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 neon-glow"
          >
            <Plus className="w-5 h-5 text-white" />
          </Button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6 p-4">
        {mockPosts.map((post) => (
          <div key={post.id} className="glass-dark rounded-3xl border border-white/10 overflow-hidden">
            {/* Post Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border-2 border-purple-500/50">
                  <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                    {post.user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-semibold text-sm">{post.user.name}</p>
                  <p className="text-white/60 text-xs">
                    {post.user.handle} • {post.timeAgo}
                  </p>
                </div>
              </div>
              {post.earned && (
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 animate-pulse">
                  <Star className="w-3 h-3 mr-1" />
                  Earned 10%
                </Badge>
              )}
            </div>

            {/* Post Image with Product Tags */}
            <div className="relative">
              <img src={post.image || "/placeholder.svg"} alt="Outfit post" className="w-full h-80 object-cover" />

              {/* Product Tags */}
              {post.products.map((product, index) => (
                <div
                  key={index}
                  className="absolute w-6 h-6 bg-white rounded-full border-2 border-purple-500 cursor-pointer neon-glow animate-pulse"
                  style={{
                    left: `${product.x}%`,
                    top: `${product.y}%`,
                    animationDelay: `${index * 0.5}s`,
                  }}
                >
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 glass-dark rounded-lg px-2 py-1 text-xs text-white whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                    {product.name} - {product.price}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/20" />
                  </div>
                </div>
              ))}
            </div>

            {/* Post Caption */}
            <div className="p-4">
              <p className="text-white/90 text-sm mb-3">{post.caption}</p>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 ${
                      likedPosts.includes(post.id) ? "text-pink-400" : "text-white/70 hover:text-pink-400"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${likedPosts.includes(post.id) ? "fill-current" : ""}`} />
                    <span className="text-sm">{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-white/70 hover:text-cyan-400"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{post.comments}</span>
                  </Button>

                  <Button variant="ghost" size="sm" className="text-white/70 hover:text-green-400">
                    <Share className="w-5 h-5" />
                  </Button>
                </div>

                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full text-xs neon-glow"
                >
                  <ShoppingBag className="w-4 h-4 mr-1" />
                  Shop Look
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Affiliate Earnings Banner */}
      <div className="fixed bottom-24 left-4 right-4 z-20">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-4 neon-glow animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm">🎉 You earned a 10% discount at Zara!</p>
              <p className="text-white/90 text-xs">Someone bought through your post</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
