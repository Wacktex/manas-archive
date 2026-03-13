"use client"

import { useState, useEffect, useCallback } from "react"
import { User, Code, Clock, Headphones, FileQuestion, HelpCircle, Terminal, Sparkles, Coffee, Skull, Zap, Bug, Ghost, Brain } from "lucide-react"

interface DashboardTile {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  hoverText: string
  color: "cyan" | "purple" | "gold"
  secret?: boolean
}

const tiles: DashboardTile[] = [
  {
    id: "about",
    title: "ABOUT ME",
    icon: <User className="w-6 h-6" />,
    description: "Short sarcastic profile. Proceed with low expectations.",
    hoverText: "I warned you about the low expectations.",
    color: "cyan",
  },
  {
    id: "projects",
    title: "PROJECTS",
    icon: <Code className="w-6 h-6" />,
    description: "Things I've built. Some even work. Most of the time.",
    hoverText: "'It works on my machine' is a valid deployment strategy.",
    color: "purple",
  },
  {
    id: "lifelog",
    title: "LIFE LOG",
    icon: <Clock className="w-6 h-6" />,
    description: "Timeline of questionable decisions and occasional wins.",
    hoverText: "Spoiler: The wins are rare but legendary.",
    color: "cyan",
  },
  {
    id: "audio",
    title: "AUDIO NERD",
    icon: <Headphones className="w-6 h-6" />,
    description: "Headphones, music, and unnecessary audio obsession.",
    hoverText: "Yes, I CAN hear the difference. Yes, it matters. Fight me.",
    color: "gold",
  },
  {
    id: "weird",
    title: "WEIRD FILES",
    icon: <FileQuestion className="w-6 h-6" />,
    description: "Random thoughts, memes, chaotic notes. Enter at your own risk.",
    hoverText: "This is where coherence comes to die.",
    color: "purple",
  },
  {
    id: "secret",
    title: "???",
    icon: <HelpCircle className="w-6 h-6" />,
    description: "You shouldn't be able to see this.",
    hoverText: "Okay fine, you can see it. Happy now?",
    color: "gold",
    secret: true,
  },
]

const randomMessages = [
  "Still here? Your persistence is... noted.",
  "Don't you have better things to do? (I don't either)",
  "The archives are watching. They're not impressed.",
  "You're being logged. Just kidding. Maybe. Probably.",
  "Achievement unlocked: Persistent Intruder",
  "Loading sarcasm modules... 100% complete",
  "Your presence has been acknowledged. Reluctantly.",
  "Error: Too much curiosity detected. Please tone it down.",
  "Fun fact: This message serves no purpose.",
  "The void says hi. It doesn't like small talk though.",
  "Coffee break? No? Okay, carry on.",
  "Hovering intensifies...",
  "Have you tried clicking literally everything yet?",
  "The code is judging you. Silently.",
  "Insert inspirational quote here. Or don't.",
  "You've been here for a while. I respect that. Sort of.",
  "This is fine. Everything is fine. *sips coffee*",
  "Entropy is inevitable. So is this message.",
  "The bugs are features. The features are bugs. It's bugs all the way down.",
]

const cornerDecorations = [
  { icon: <Coffee className="w-4 h-4" />, position: "top-2 left-2", color: "#F5A623" },
  { icon: <Skull className="w-4 h-4" />, position: "top-2 right-2", color: "#9B5DE5" },
  { icon: <Bug className="w-4 h-4" />, position: "bottom-2 left-2", color: "#00FFC6" },
  { icon: <Ghost className="w-4 h-4" />, position: "bottom-2 right-2", color: "#F5A623" },
]

const statusMessages = [
  "STATUS: Chaotically stable",
  "STATUS: Mostly functional",
  "STATUS: Works on my machine",
  "STATUS: ¯\\_(ツ)_/¯",
  "STATUS: Powered by caffeine",
  "STATUS: Held together by hope",
  "STATUS: Bugs are features",
  "STATUS: undefined is not a function... wait, yes it is",
]

export function ArchiveDashboard() {
  const [hoveredTile, setHoveredTile] = useState<string | null>(null)
  const [randomMessage, setRandomMessage] = useState("")
  const [showMessage, setShowMessage] = useState(false)
  const [secretRevealed, setSecretRevealed] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [statusMessage, setStatusMessage] = useState(statusMessages[0])
  const [glitchTitle, setGlitchTitle] = useState(false)
  const [showHoverText, setShowHoverText] = useState<string | null>(null)
  const [easterEggFound, setEasterEggFound] = useState(false)

  // Random sarcastic messages
  useEffect(() => {
    const showRandomMessage = () => {
      if (Math.random() > 0.6) {
        setRandomMessage(randomMessages[Math.floor(Math.random() * randomMessages.length)])
        setShowMessage(true)
        setTimeout(() => setShowMessage(false), 5000)
      }
    }

    const interval = setInterval(showRandomMessage, 12000)
    showRandomMessage() // Show one immediately
    return () => clearInterval(interval)
  }, [])

  // Rotate status message
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusMessage(statusMessages[Math.floor(Math.random() * statusMessages.length)])
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // Occasional title glitch
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setGlitchTitle(true)
        setTimeout(() => setGlitchTitle(false), 200)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Keyboard easter egg
  useEffect(() => {
    let buffer = ""
    const handleKeyPress = (e: KeyboardEvent) => {
      buffer += e.key.toLowerCase()
      if (buffer.includes("matrix")) {
        setEasterEggFound(true)
        buffer = ""
        setTimeout(() => setEasterEggFound(false), 5000)
      }
      if (buffer.length > 10) buffer = buffer.slice(-10)
    }
    window.addEventListener("keypress", handleKeyPress)
    return () => window.removeEventListener("keypress", handleKeyPress)
  }, [])

  const handleTileClick = useCallback((tileId: string) => {
    setClickCount(prev => prev + 1)
    
    if (tileId === "secret") {
      setSecretRevealed(true)
    }
    
    // Easter egg for clicking tiles many times
    if (clickCount + 1 === 10) {
      setRandomMessage("Achievement unlocked: 'Clicker Hero' - You've clicked 10 times. Here's your medal: 🏅")
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 4000)
    }
    if (clickCount + 1 === 25) {
      setRandomMessage("25 clicks?! You really are committed to this. I... I don't know what to say.")
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 4000)
    }
  }, [clickCount])

  const handleTileHover = useCallback((tileId: string | null) => {
    setHoveredTile(tileId)
    if (tileId) {
      const tile = tiles.find(t => t.id === tileId)
      if (tile) {
        setTimeout(() => setShowHoverText(tileId), 800)
      }
    } else {
      setShowHoverText(null)
    }
  }, [])

  const getColorClasses = (color: "cyan" | "purple" | "gold", isHovered: boolean) => {
    const colors = {
      cyan: {
        border: isHovered ? "border-[#00FFC6]" : "border-[#00FFC6]/30",
        glow: "shadow-[0_0_40px_rgba(0,255,198,0.4)]",
        text: "text-[#00FFC6]",
        bg: "bg-[#00FFC6]/5",
      },
      purple: {
        border: isHovered ? "border-[#9B5DE5]" : "border-[#9B5DE5]/30",
        glow: "shadow-[0_0_40px_rgba(155,93,229,0.4)]",
        text: "text-[#9B5DE5]",
        bg: "bg-[#9B5DE5]/5",
      },
      gold: {
        border: isHovered ? "border-[#F5A623]" : "border-[#F5A623]/30",
        glow: "shadow-[0_0_40px_rgba(245,166,35,0.4)]",
        text: "text-[#F5A623]",
        bg: "bg-[#F5A623]/5",
      },
    }
    return colors[color]
  }

  return (
    <div className="min-h-screen p-4 md:p-8 relative">
      {/* Easter egg popup */}
      {easterEggFound && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-card border-2 border-[#00FFC6] p-6 rounded-lg animate-glitch">
          <p className="text-[#00FFC6] font-mono text-center text-lg mb-2">
            Wake up, Neo...
          </p>
          <p className="text-muted-foreground font-mono text-center text-xs">
            (Just kidding. This isn&apos;t the Matrix. Or is it?)
          </p>
        </div>
      )}

      {/* Random message popup */}
      {showMessage && (
        <div className="fixed top-4 right-4 z-50 bg-card border border-[#9B5DE5]/50 p-4 rounded-lg animate-in slide-in-from-right-5 fade-in duration-300 max-w-sm">
          <p className="text-[#9B5DE5] font-mono text-sm flex items-center gap-2">
            <Terminal className="w-4 h-4 flex-shrink-0" />
            {randomMessage}
          </p>
        </div>
      )}

      {/* Floating corner decorations */}
      {cornerDecorations.map((dec, i) => (
        <div 
          key={i}
          className={`fixed ${dec.position} opacity-30 hover:opacity-70 transition-opacity cursor-pointer z-40`}
          style={{ color: dec.color }}
          onClick={() => {
            setRandomMessage("You clicked the tiny icon! Here's your reward: nothing. But I appreciate you.")
            setShowMessage(true)
            setTimeout(() => setShowMessage(false), 3000)
          }}
        >
          {dec.icon}
        </div>
      ))}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className={`flex items-center justify-center gap-3 mb-4 ${glitchTitle ? 'animate-glitch' : ''}`}>
            <Sparkles className="w-6 h-6 text-[#F5A623] animate-pulse" />
            <h1 className="text-3xl md:text-4xl font-mono font-bold tracking-wider neon-text text-primary">
              WELCOME TO THE ARCHIVE
            </h1>
            <Brain className="w-6 h-6 text-[#9B5DE5] animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
          <p className="text-muted-foreground font-mono text-sm md:text-base mb-2">
            &quot;You made it in. I&apos;m mildly impressed. Don&apos;t let it go to your head.&quot;
          </p>
          <p className="text-[#9B5DE5]/50 font-mono text-xs">
            (Pro tip: Click everything. Type random words. See what happens.)
          </p>
        </header>

        {/* Tile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {tiles.map((tile) => {
            const isHovered = hoveredTile === tile.id
            const colors = getColorClasses(tile.color, isHovered)
            const showThisHoverText = showHoverText === tile.id && isHovered
            
            return (
              <button
                key={tile.id}
                onClick={() => handleTileClick(tile.id)}
                onMouseEnter={() => handleTileHover(tile.id)}
                onMouseLeave={() => handleTileHover(null)}
                className={`
                  relative p-6 rounded-lg border-2 transition-all duration-300 text-left
                  bg-card/80 backdrop-blur-sm
                  ${colors.border}
                  ${isHovered ? colors.glow : ""}
                  ${isHovered ? "scale-[1.03] -translate-y-2" : ""}
                  ${tile.secret ? "opacity-60 hover:opacity-100" : ""}
                  group
                `}
              >
                {/* Animated corner decorations */}
                <div className={`absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 rounded-tl-lg ${colors.border} transition-all duration-300 ${isHovered ? 'w-12 h-12' : ''}`} />
                <div className={`absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 rounded-br-lg ${colors.border} transition-all duration-300 ${isHovered ? 'w-12 h-12' : ''}`} />
                
                {/* Hover glow effect */}
                {isHovered && (
                  <div className={`absolute inset-0 rounded-lg ${colors.bg} animate-pulse`} style={{ animationDuration: "2s" }} />
                )}
                
                {/* Icon */}
                <div className={`relative ${colors.text} mb-4 transition-all duration-300 ${isHovered ? "scale-125 rotate-6" : ""}`}>
                  {tile.icon}
                  {isHovered && <Zap className="absolute -top-1 -right-1 w-3 h-3 text-[#F5A623] animate-pulse" />}
                </div>
                
                {/* Title */}
                <h2 className={`relative font-mono font-bold text-lg mb-2 ${colors.text} tracking-wide`}>
                  {tile.secret && !secretRevealed ? "???" : tile.title}
                </h2>
                
                {/* Description */}
                <p className="relative text-muted-foreground text-sm font-mono leading-relaxed">
                  {tile.secret && !secretRevealed 
                    ? "This section is classified. Or is it? (It is.)"
                    : tile.description
                  }
                </p>

                {/* Hover text */}
                {showThisHoverText && !tile.secret && (
                  <p className={`absolute bottom-14 left-6 right-6 text-xs font-mono ${colors.text} opacity-70 animate-in fade-in duration-200`}>
                    → {tile.hoverText}
                  </p>
                )}
                
                {/* Hover indicator */}
                <div className={`
                  absolute bottom-3 right-3 text-xs font-mono transition-all duration-300
                  ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}
                  ${colors.text}
                `}>
                  [ENTER] →
                </div>
                
                {/* Secret revealed message */}
                {tile.secret && secretRevealed && (
                  <div className="absolute inset-0 flex items-center justify-center bg-card/95 rounded-lg">
                    <div className="text-center px-4">
                      <p className="text-[#F5A623] font-mono mb-2">
                        You found me! Congratulations!
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        There&apos;s nothing here yet. But your curiosity is noted.
                        <br />
                        <span className="text-[#9B5DE5]/60">(Check back in... never? Maybe never.)</span>
                      </p>
                    </div>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Stats bar */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs font-mono text-muted-foreground/50">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#00FFC6]/50 animate-pulse" />
            Tiles explored: {secretRevealed ? 6 : 5}/6
          </span>
          <span>•</span>
          <span>Clicks: {clickCount}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#9B5DE5]/50 animate-pulse" />
            Chaos level: Maximum
          </span>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center space-y-2">
          <p className="text-muted-foreground/50 text-xs font-mono animate-pulse" style={{ animationDuration: "4s" }}>
            {statusMessage}
          </p>
          <p className="text-muted-foreground/30 text-[10px] font-mono">
            MANAS ARCHIVE v1.0.0-chaos | Last updated: Whenever I felt like it | Uptime: Questionable
          </p>
          <p className="text-[#9B5DE5]/30 text-[10px] font-mono">
            &quot;If you can read this, you&apos;re probably too close to your screen.&quot;
          </p>
        </footer>
      </div>
    </div>
  )
}
