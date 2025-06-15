"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VoiceAssistantProps {
  isListening: boolean
  onAnalyze: () => void
}

export default function VoiceAssistant({ isListening, onAnalyze }: VoiceAssistantProps) {
  const [showBubble, setShowBubble] = useState(true)

  return (
    <div className="absolute top-24 left-4 z-20">
      {/* Voice Bubble */}
      <div className={`relative ${isListening ? "animate-pulse-glow" : "animate-float"}`}>
        <div className="glass-dark rounded-full p-4 border border-purple-500/30 neon-glow">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isListening ? "bg-green-400 animate-pulse" : "bg-purple-400"}`} />
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Speech Bubble */}
        {showBubble && (
          <div className="absolute top-full left-0 mt-2 w-64">
            <div className="glass-dark rounded-2xl p-4 border border-purple-500/30">
              <p className="text-white/90 text-sm mb-3">
                {isListening ? "I'm listening... 👂" : "Hi! I'm your AI stylist. Try saying:"}
              </p>
              {!isListening && (
                <Button
                  onClick={onAnalyze}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl text-sm font-semibold neon-glow"
                >
                  "Analyze my color tone"
                </Button>
              )}
            </div>
            {/* Arrow */}
            <div className="absolute -top-2 left-6 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black/20" />
          </div>
        )}
      </div>
    </div>
  )
}
