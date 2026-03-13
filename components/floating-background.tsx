"use client"

import { useEffect, useState, useCallback } from "react"

const dadJokes = [
  "Why do programmers hate nature? Too many bugs.",
  "I cook. Sometimes intentionally.",
  "I told my wife she was drawing her eyebrows too high. She looked surprised.",
  "I'm reading a book about anti-gravity. It's impossible to put down.",
  "Why don't scientists trust atoms? Because they make up everything!",
  "I used to hate facial hair, but then it grew on me.",
  "What do you call a fake noodle? An impasta.",
  "I'm on a seafood diet. I see food and I eat it.",
  "Why did the scarecrow win an award? He was outstanding in his field.",
  "I would tell you a construction joke, but I'm still working on it.",
  "What do you call a fish without eyes? A fsh.",
  "I'm afraid for the calendar. Its days are numbered.",
  "Why don't eggs tell jokes? They'd crack each other up.",
  "I only know 25 letters of the alphabet. I don't know y.",
  "What do you call a bear with no teeth? A gummy bear.",
  "Did you hear about the claustrophobic astronaut? He just needed a little space.",
  "I told my computer I needed a break, and now it won't stop sending me vacation ads.",
  "Parallel lines have so much in common. It's a shame they'll never meet.",
  "I'm reading a book on the history of glue. I can't put it down.",
  "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
]

const sarcasticInsults = [
  "Confidence level: unjustified.",
  "That guess hurt my brain.",
  "Still loading... like your IQ.",
  "Error 404: Competence not found.",
  "Processing... your poor life choices.",
  "Access denied. Try being smarter.",
  "Your guess was statistically impressive. Impressively wrong.",
  "Even my bugs have better ideas.",
  "Loading patience... timeout exceeded.",
  "Brain.exe has stopped responding.",
  "Ah yes, the classic 'I have no idea what I'm doing' energy.",
  "You're not wrong. You're just not right either.",
  "Bold strategy. Let's see how this plays out.",
  "That's... certainly a choice you made.",
  "I've seen better attempts from my random number generator.",
  "Fascinating. Wrong, but fascinating.",
  "Achievement unlocked: Consistent Failure.",
  "Your persistence is admirable. Your accuracy, less so.",
  "I'm not saying you're wrong, but Google would.",
  "Have you tried... literally anything else?",
  "Buffering enthusiasm...",
  "sudo make me_care",
  "git commit -m 'gave up'",
  "rm -rf your_confidence",
]

const sarcasticThoughts = [
  "Sometimes I wonder if anyone reads these...",
  "If you're reading this, you have too much free time.",
  "This floating text serves no purpose. Much like this website.",
  "Fun fact: You can't unsee this.",
  "I put way too much effort into this.",
  "Yes, this is intentionally chaotic.",
  "The matrix has you... or something.",
  "Hello from the void.",
  "Is this art? Probably not.",
  "Touch grass (after visiting all sections).",
  "Coffee is just bean soup.",
  "Debugging is like being a detective in a crime movie where you are also the murderer.",
  "It works on my machine.",
  "There are only 10 types of people...",
  "// TODO: Add meaning to life",
  "/* This code is provided as-is with no warranty */",
  "Why are you still reading these?",
]

const runeSymbols = ["◇", "◆", "⬡", "⬢", "△", "▽", "☆", "★", "◎", "◉", "⊕", "⊗", "⌘", "⏣", "⏥", "⎔", "⟁", "⟐", "⟡", "⧫", "⬟", "⯃", "⯂", "⎈", "✧", "✦", "⁂", "※", "⌬"]
const codeSymbols = ["{ }", "< />", "[ ]", "&&", "||", "=>", "++", "--", "!=", "===", "0x", "//", "/*", "*/", "fn()", ":::", ">>>", "<<<", "</>", "{...}", "null", "void", "async", "await", "true", "false", "NaN", "undefined"]
const magicRunes = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛊ", "ᛏ", "ᛒ", "ᛖ", "ᛗ", "ᛚ", "ᛜ", "ᛞ", "ᛟ"]
const binaryStrings = ["01001000", "01100101", "01101100", "01110000", "00101110", "10101010", "11110000", "00001111"]

interface FloatingElement {
  id: number
  text: string
  x: number
  y: number
  duration: number
  delay: number
  type: "joke" | "insult" | "thought" | "rune" | "code" | "magic" | "binary"
  size?: "sm" | "md" | "lg"
}

interface CircuitLine {
  id: number
  startX: number
  startY: number
  horizontal: boolean
  length: number
  delay: number
  color: "cyan" | "purple" | "gold"
}

interface GlowOrb {
  id: number
  x: number
  y: number
  size: number
  color: "cyan" | "purple" | "gold"
  delay: number
}

export function FloatingBackground() {
  const [elements, setElements] = useState<FloatingElement[]>([])
  const [circuits, setCircuits] = useState<CircuitLine[]>([])
  const [orbs, setOrbs] = useState<GlowOrb[]>([])
  const [matrixRain, setMatrixRain] = useState<{id: number; x: number; chars: string[]}[]>([])

  const generateElements = useCallback(() => {
    const newElements: FloatingElement[] = []
    let id = 0
    
    // More dad jokes
    for (let i = 0; i < 6; i++) {
      newElements.push({
        id: id++,
        text: dadJokes[Math.floor(Math.random() * dadJokes.length)],
        x: Math.random() * 75 + 5,
        y: Math.random() * 100,
        duration: 25 + Math.random() * 20,
        delay: Math.random() * 15,
        type: "joke",
        size: Math.random() > 0.7 ? "md" : "sm"
      })
    }
    
    // More sarcastic insults
    for (let i = 0; i < 6; i++) {
      newElements.push({
        id: id++,
        text: sarcasticInsults[Math.floor(Math.random() * sarcasticInsults.length)],
        x: Math.random() * 75 + 10,
        y: Math.random() * 100,
        duration: 22 + Math.random() * 18,
        delay: Math.random() * 12,
        type: "insult",
        size: Math.random() > 0.6 ? "md" : "sm"
      })
    }

    // Sarcastic thoughts
    for (let i = 0; i < 4; i++) {
      newElements.push({
        id: id++,
        text: sarcasticThoughts[Math.floor(Math.random() * sarcasticThoughts.length)],
        x: Math.random() * 70 + 15,
        y: Math.random() * 100,
        duration: 30 + Math.random() * 15,
        delay: Math.random() * 20,
        type: "thought",
        size: "sm"
      })
    }
    
    // Regular rune symbols
    for (let i = 0; i < 12; i++) {
      newElements.push({
        id: id++,
        text: runeSymbols[Math.floor(Math.random() * runeSymbols.length)],
        x: Math.random() * 90 + 5,
        y: Math.random() * 100,
        duration: 15 + Math.random() * 10,
        delay: Math.random() * 8,
        type: "rune",
        size: Math.random() > 0.5 ? "lg" : "md"
      })
    }

    // Magic runes (Norse style)
    for (let i = 0; i < 10; i++) {
      newElements.push({
        id: id++,
        text: magicRunes[Math.floor(Math.random() * magicRunes.length)],
        x: Math.random() * 90 + 5,
        y: Math.random() * 100,
        duration: 18 + Math.random() * 12,
        delay: Math.random() * 10,
        type: "magic",
        size: Math.random() > 0.3 ? "lg" : "md"
      })
    }
    
    // Code symbols
    for (let i = 0; i < 14; i++) {
      newElements.push({
        id: id++,
        text: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
        x: Math.random() * 90 + 5,
        y: Math.random() * 100,
        duration: 16 + Math.random() * 12,
        delay: Math.random() * 8,
        type: "code",
        size: Math.random() > 0.6 ? "md" : "sm"
      })
    }

    // Binary strings
    for (let i = 0; i < 6; i++) {
      newElements.push({
        id: id++,
        text: binaryStrings[Math.floor(Math.random() * binaryStrings.length)],
        x: Math.random() * 85 + 5,
        y: Math.random() * 100,
        duration: 20 + Math.random() * 15,
        delay: Math.random() * 12,
        type: "binary",
        size: "sm"
      })
    }
    
    setElements(newElements)
  }, [])

  const generateCircuits = useCallback(() => {
    const newCircuits: CircuitLine[] = []
    const colors: ("cyan" | "purple" | "gold")[] = ["cyan", "purple", "gold"]
    
    for (let i = 0; i < 15; i++) {
      newCircuits.push({
        id: i,
        startX: Math.random() * 100,
        startY: Math.random() * 100,
        horizontal: Math.random() > 0.5,
        length: 50 + Math.random() * 150,
        delay: Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }
    setCircuits(newCircuits)
  }, [])

  const generateOrbs = useCallback(() => {
    const newOrbs: GlowOrb[] = []
    const colors: ("cyan" | "purple" | "gold")[] = ["cyan", "purple", "gold"]
    
    for (let i = 0; i < 8; i++) {
      newOrbs.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 100 + Math.random() * 200,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 4
      })
    }
    setOrbs(newOrbs)
  }, [])

  const generateMatrixRain = useCallback(() => {
    const columns: {id: number; x: number; chars: string[]}[] = []
    for (let i = 0; i < 8; i++) {
      const chars = []
      for (let j = 0; j < 15; j++) {
        chars.push(Math.random() > 0.5 
          ? String.fromCharCode(0x30A0 + Math.random() * 96)
          : Math.random() > 0.5 ? "0" : "1"
        )
      }
      columns.push({ id: i, x: Math.random() * 100, chars })
    }
    setMatrixRain(columns)
  }, [])

  useEffect(() => {
    generateElements()
    generateCircuits()
    generateOrbs()
    generateMatrixRain()
    
    const elementInterval = setInterval(generateElements, 35000)
    const circuitInterval = setInterval(generateCircuits, 20000)
    const orbInterval = setInterval(generateOrbs, 45000)
    const matrixInterval = setInterval(generateMatrixRain, 25000)
    
    return () => {
      clearInterval(elementInterval)
      clearInterval(circuitInterval)
      clearInterval(orbInterval)
      clearInterval(matrixInterval)
    }
  }, [generateElements, generateCircuits, generateOrbs, generateMatrixRain])

  const getColorValue = (color: "cyan" | "purple" | "gold") => {
    const colors = { cyan: "#00FFC6", purple: "#9B5DE5", gold: "#F5A623" }
    return colors[color]
  }

  const getElementClasses = (el: FloatingElement) => {
    const sizeClasses = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-xl"
    }
    const size = el.size || "sm"

    switch (el.type) {
      case "joke":
        return `text-[#00FFC6]/50 ${sizeClasses[size]} font-mono max-w-[220px] whitespace-normal italic`
      case "insult":
        return `text-[#9B5DE5]/50 ${sizeClasses[size]} font-mono max-w-[200px] whitespace-normal`
      case "thought":
        return `text-[#F5A623]/40 ${sizeClasses[size]} font-mono max-w-[180px] whitespace-normal opacity-60`
      case "rune":
        return `text-[#F5A623]/40 ${sizeClasses[size === "lg" ? "lg" : "md"]} animate-rune-pulse`
      case "magic":
        return `text-[#9B5DE5]/60 text-2xl animate-magic-glow`
      case "code":
        return `text-[#00FFC6]/30 ${sizeClasses[size]} font-mono`
      case "binary":
        return `text-[#00FFC6]/20 ${sizeClasses[size]} font-mono tracking-wider`
      default:
        return ""
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated glow orbs */}
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full animate-pulse-glow"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: getColorValue(orb.color),
            opacity: orb.color === "gold" ? 0.08 : 0.12,
            animationDelay: `${orb.delay}s`,
            filter: "blur(40px)",
            transform: "translate(-50%, -50%)"
          }}
        />
      ))}
      
      {/* Animated circuit lines */}
      <svg className="absolute inset-0 w-full h-full">
        {circuits.map((circuit) => (
          <g key={circuit.id}>
            <line
              x1={`${circuit.startX}%`}
              y1={`${circuit.startY}%`}
              x2={circuit.horizontal ? `${Math.min(circuit.startX + circuit.length / 10, 100)}%` : `${circuit.startX}%`}
              y2={circuit.horizontal ? `${circuit.startY}%` : `${Math.min(circuit.startY + circuit.length / 10, 100)}%`}
              stroke={getColorValue(circuit.color)}
              strokeWidth="1"
              opacity="0.15"
              strokeDasharray="5,10"
              className="animate-circuit-flow"
              style={{ animationDelay: `${circuit.delay}s` }}
            />
            {/* Circuit node */}
            <circle
              cx={`${circuit.startX}%`}
              cy={`${circuit.startY}%`}
              r="3"
              fill={getColorValue(circuit.color)}
              opacity="0.3"
              className="animate-node-pulse"
              style={{ animationDelay: `${circuit.delay + 0.5}s` }}
            />
          </g>
        ))}
      </svg>

      {/* Matrix rain columns */}
      {matrixRain.map((column) => (
        <div
          key={column.id}
          className="absolute flex flex-col text-[10px] font-mono animate-matrix-fall opacity-20"
          style={{ left: `${column.x}%` }}
        >
          {column.chars.map((char, i) => (
            <span 
              key={i} 
              className="text-[#00FFC6]"
              style={{ opacity: 1 - (i * 0.06) }}
            >
              {char}
            </span>
          ))}
        </div>
      ))}
      
      {/* Scanline effect */}
      <div className="absolute inset-0 scanline-overlay" />
      
      {/* Moving scan line */}
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FFC6]/40 to-transparent animate-scan-line" />
      
      {/* Secondary scan line */}
      <div 
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9B5DE5]/30 to-transparent animate-scan-line"
        style={{ animationDelay: "4s", animationDuration: "12s" }}
      />
      
      {/* Floating elements */}
      {elements.map((el) => (
        <div
          key={el.id}
          className={`absolute whitespace-nowrap animate-float ${getElementClasses(el)}`}
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            animationDuration: `${el.duration}s`,
            animationDelay: `${el.delay}s`,
          }}
        >
          {el.text}
        </div>
      ))}
      
      {/* Circuit grid background */}
      <div className="absolute inset-0 circuit-bg opacity-40" />
      
      {/* Hexagon pattern overlay */}
      <div className="absolute inset-0 hexagon-pattern opacity-20" />

      {/* Corner rune decorations */}
      <div className="absolute top-4 left-4 text-[#F5A623]/30 text-4xl animate-rune-glow">ᛟ</div>
      <div className="absolute top-4 right-4 text-[#9B5DE5]/30 text-4xl animate-rune-glow" style={{ animationDelay: "1s" }}>ᚠ</div>
      <div className="absolute bottom-4 left-4 text-[#00FFC6]/30 text-4xl animate-rune-glow" style={{ animationDelay: "2s" }}>ᛏ</div>
      <div className="absolute bottom-4 right-4 text-[#F5A623]/30 text-4xl animate-rune-glow" style={{ animationDelay: "0.5s" }}>ᛗ</div>
    </div>
  )
}
