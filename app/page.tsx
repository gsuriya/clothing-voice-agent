"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, MicOff, Volume2, VolumeX, Camera, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import VoiceAssistant from "@/components/voice-assistant"
import { useRouter } from "next/navigation"

export default function CameraHome() {
  const [isMicOn, setIsMicOn] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [isListening, setIsListening] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [cameraLoading, setCameraLoading] = useState(false)
  const [forceUpdate, setForceUpdate] = useState(0)
  const router = useRouter()

  // Camera and mic refs/state
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const audioStreamRef = useRef<MediaStream | null>(null)

  // Handle mounting
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Camera setup
  useEffect(() => {
    if (!isMounted) return

    async function enableCamera() {
      setCameraLoading(true)
      setCameraError(null)
      
      try {
        console.log("Requesting camera access...")
        
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error("Camera not supported in this browser")
        }

        const constraints = {
          video: {
            facingMode: "user",
            width: { ideal: 1280, min: 640 },
            height: { ideal: 720, min: 480 }
          }
        }

        console.log("Getting user media with constraints:", constraints)
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        console.log("Got media stream:", stream)
        
        // Clear loading state immediately - this should make the video show
        console.log("Setting cameraLoading to false...")
        setCameraLoading(false)
        setCameraError(null)
        setForceUpdate(prev => prev + 1) // Force component re-render
        console.log("Loading state cleared, video should now be visible")
        
        if (videoRef.current) {
          console.log("Setting video source...")
          const video = videoRef.current
          video.srcObject = stream
          
          // Set video properties directly
          video.autoplay = true
          video.playsInline = true
          video.muted = true
          
          // Force load and play
          video.load()
          
          // Try to play the video immediately and repeatedly
          const playVideo = () => {
            video.play()
              .then(() => {
                console.log("Video playing successfully")
                console.log("Video readyState:", video.readyState)
                console.log("Video paused:", video.paused)
                console.log("Video dimensions:", video.videoWidth, "x", video.videoHeight)
              })
              .catch((playError) => {
                console.error("Video play error:", playError)
                // Retry after a short delay
                setTimeout(playVideo, 100)
              })
          }
          
          // Start playing immediately
          playVideo()
          
          // Also try when metadata loads
          video.onloadedmetadata = () => {
            console.log("Metadata loaded, trying to play again...")
            playVideo()
          }

          video.onerror = (e) => {
            console.error("Video element error:", e)
            setCameraError("Video element error")
          }
        }
        
        mediaStreamRef.current = stream
        
        // Check if stream has video tracks
        const videoTracks = stream.getVideoTracks()
        console.log("Video tracks:", videoTracks)
        if (videoTracks.length === 0) {
          throw new Error("No video tracks available")
        }
        
      } catch (err) {
        console.error("Camera error:", err)
        setCameraError(`Camera error: ${err instanceof Error ? err.message : 'Unknown error'}`)
        setCameraLoading(false)
      }
    }

    enableCamera()

    return () => {
      console.log("Cleaning up camera...")
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => {
          track.stop()
          console.log("Stopped track:", track.kind)
        })
      }
    }
  }, [isMounted])

  // Microphone setup/teardown
  useEffect(() => {
    if (!isMounted) return

    async function enableMic() {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          return
        }
        console.log("Requesting microphone access...")
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        audioStreamRef.current = stream
        console.log("Microphone enabled")
      } catch (err) {
        console.error("Microphone error:", err)
      }
    }

    if (isMicOn) {
      enableMic()
    } else {
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach(track => track.stop())
        audioStreamRef.current = null
        console.log("Microphone disabled")
      }
    }

    return () => {
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach(track => track.stop())
        audioStreamRef.current = null
      }
    }
  }, [isMicOn, isMounted])

  const handleAnalyzeColorTone = () => {
    router.push("/color-analysis")
  }

  // Don't render camera-dependent content until mounted
  if (!isMounted) {
    return (
      <div className="relative h-screen w-full overflow-hidden bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white">Loading camera...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Camera Feed Background */}
      {cameraError ? (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-pink-900/50 to-cyan-900/50 flex items-center justify-center">
          <div className="text-white text-center p-4">
            <p className="mb-2">Camera Error:</p>
            <p className="text-sm opacity-75">{cameraError}</p>
            <p className="text-xs mt-2 opacity-50">Please allow camera access and refresh</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-white/20 hover:bg-white/30 text-white border border-white/30"
            >
              Retry
            </Button>
          </div>
        </div>
      ) : cameraLoading ? (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Connecting to camera...</p>
          </div>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            controls={false}
            width="100%"
            height="100%"
            style={{ 
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
              background: "black",
              transform: "scaleX(-1)",
              zIndex: 1,
              display: "block"
            }}
          />
          {/* Debug overlay to see if video is there */}
          <div className="absolute top-4 left-4 z-50 bg-black/50 text-white p-2 rounded text-xs">
            Camera: {mediaStreamRef.current ? 'Connected' : 'Not connected'}
          </div>
        </>
      )}

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
