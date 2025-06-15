"use client"

import { useState } from "react"
import { Mic, MicOff, Volume2, VolumeX, Camera, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import VoiceAssistant from "@/components/voice-assistant"
import { useRouter } from "next/navigation"

export default function CameraHome() {
  const [isMicOn, setIsMicOn] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [isListening, setIsListening] = useState(false)
  const router = useRouter()

  const handleAnalyzeColorTone = () => {
    router.push("/color-analysis")
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Camera Feed Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-pink-900/50 to-cyan-900/50">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=400')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
      </div>

      {/* Voice Assistant Overlay */}
      <VoiceAssistant isListening={isListening} onAnalyze={handleAnalyzeColorTone} />

      {/* Hint Banner */}
      <div className="absolute top-20 left-4 right-4 z-10">
        <div className="glass-dark rounded-2xl p-4 border border-purple-500/30">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <p className="text-white/90 text-sm font-medium">
              Say <span className="gradient-text font-bold">"Analyze my color tone"</span> to start
            </p>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <Button
          onClick={handleAnalyzeColorTone}
          className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 neon-glow animate-pulse-glow border-4 border-white/20"
        >
          <div className="flex flex-col items-center gap-2">
            <Sparkles className="w-8 h-8 text-white" />
            <span className="text-white font-bold text-sm">Analyze</span>
          </div>
        </Button>
      </div>

      {/* Bottom Control Bar */}
      <div className="absolute bottom-24 left-4 right-4 z-20">
        <div className="glass rounded-3xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            {/* Mic Toggle */}
            <Button
              variant="ghost"
              size="lg"
              onClick={() => {
                setIsMicOn(!isMicOn)
                setIsListening(!isMicOn)
              }}
              className={`rounded-full w-14 h-14 ${
                isMicOn ? "bg-gradient-to-r from-green-500 to-emerald-500 neon-glow" : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {isMicOn ? <Mic className="w-6 h-6 text-white" /> : <MicOff className="w-6 h-6 text-white/70" />}
            </Button>

            {/* Speaker Toggle */}
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setIsSpeakerOn(!isSpeakerOn)}
              className={`rounded-full w-14 h-14 ${
                isSpeakerOn ? "bg-gradient-to-r from-blue-500 to-cyan-500 neon-glow" : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {isSpeakerOn ? <Volume2 className="w-6 h-6 text-white" /> : <VolumeX className="w-6 h-6 text-white/70" />}
            </Button>

            {/* Capture Button */}
            <Button
              variant="ghost"
              size="lg"
              className="rounded-full w-14 h-14 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 neon-glow"
            >
              <Camera className="w-6 h-6 text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-32 right-8 w-20 h-20 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-xl animate-float" />
      <div
        className="absolute bottom-40 left-8 w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-float"
        style={{ animationDelay: "1s" }}
      />
    </div>
  )
}
