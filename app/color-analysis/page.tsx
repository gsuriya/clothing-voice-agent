"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Sparkles, Palette, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const colorSeasons = {
  "Autumn Warm": {
    colors: ["#8B4513", "#CD853F", "#D2691E", "#FF8C00", "#DAA520", "#B8860B", "#A0522D", "#8B0000"],
    description: "Rich, warm tones that complement your natural coloring",
  },
  "Spring Bright": {
    colors: ["#FF69B4", "#FF1493", "#00CED1", "#32CD32", "#FFD700", "#FF6347", "#9370DB", "#00FA9A"],
    description: "Vibrant, clear colors that enhance your natural glow",
  },
  "Summer Cool": {
    colors: ["#6495ED", "#DDA0DD", "#F0E68C", "#98FB98", "#FFB6C1", "#87CEEB", "#D8BFD8", "#B0E0E6"],
    description: "Soft, cool tones that harmonize with your complexion",
  },
  "Winter Deep": {
    colors: ["#000080", "#8B008B", "#DC143C", "#228B22", "#FF1493", "#4B0082", "#B22222", "#2F4F4F"],
    description: "Bold, dramatic colors that make you shine",
  },
}

export default function ColorAnalysis() {
  const [step, setStep] = useState(1)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<keyof typeof colorSeasons | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (step === 1) {
      // Auto-progress to step 2 after 3 seconds
      const timer = setTimeout(() => {
        setStep(2)
        setIsAnalyzing(true)
      }, 3000)
      return () => clearTimeout(timer)
    } else if (step === 2 && isAnalyzing) {
      // Show result after 4 seconds
      const timer = setTimeout(() => {
        setIsAnalyzing(false)
        setResult("Autumn Warm")
        setStep(3)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [step, isAnalyzing])

  const handleStartBrowsing = () => {
    router.push("/swipe")
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
          <h1 className="gradient-text font-bold text-lg">Color Analysis</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Step 1: Face Positioning */}
      {step === 1 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Face Silhouette Overlay */}
            <div className="w-64 h-80 border-4 border-dashed border-purple-400 rounded-full relative neon-glow">
              <div className="absolute inset-4 border-2 border-pink-400 rounded-full opacity-50" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Eye className="w-8 h-8 text-cyan-400 animate-pulse" />
              </div>
            </div>

            {/* Instructions */}
            <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-80">
              <div className="glass-dark rounded-2xl p-6 border border-purple-500/30 text-center">
                <h2 className="text-white font-bold text-xl mb-2">Perfect! Hold Still</h2>
                <p className="text-white/80 text-sm">Center your face • Good lighting • Stay still</p>
                <div className="flex justify-center mt-4">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Analysis Loading */}
      {step === 2 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-32 h-32 border-4 border-purple-500/30 rounded-full animate-spin">
                <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full neon-glow" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-purple-400 animate-pulse" />
              </div>
            </div>

            <div className="glass-dark rounded-2xl p-6 border border-purple-500/30">
              <h2 className="gradient-text font-bold text-2xl mb-2">Analyzing...</h2>
              <p className="text-white/80 text-sm mb-4">Finding your Korean color season</p>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full animate-shimmer shimmer-bg" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Results */}
      {step === 3 && result && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="w-full max-w-sm">
            <div className="glass-dark rounded-3xl p-6 border border-purple-500/30 neon-glow">
              {/* Season Badge */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full px-4 py-2 mb-4">
                  <Palette className="w-5 h-5 text-white" />
                  <span className="text-white font-bold">{result}</span>
                </div>
                <p className="text-white/80 text-sm">{colorSeasons[result].description}</p>
              </div>

              {/* Color Palette */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">Your Perfect Colors</h3>
                <div className="grid grid-cols-4 gap-2">
                  {colorSeasons[result].colors.map((color, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-xl border-2 border-white/20 shadow-lg"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl h-12 font-semibold neon-glow">
                  View Full Report
                </Button>
                <Button
                  onClick={handleStartBrowsing}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl h-12 font-semibold neon-glow"
                >
                  Start Browsing Clothes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-4 w-24 h-24 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-xl animate-float" />
      <div
        className="absolute bottom-32 left-4 w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-float"
        style={{ animationDelay: "1.5s" }}
      />
    </div>
  )
}
