"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Terminal, Lock, Unlock, AlertTriangle, CheckCircle, Skull, Zap, Coffee } from "lucide-react"

interface AccessGateProps {
  onAccessGranted: () => void
}

const failureMessages = [
  "Wrong. Either you barely know me or you're guessing.",
  "This is getting embarrassing... for you.",
  "Nope. Try harder. Or don't. I literally don't care.",
  "Access denied. Your confidence is tragically misplaced.",
  "Incorrect. Maybe we're not as close as you thought?",
  "That was painful to watch. Like, physically painful.",
  "Error: Friendship.exe has stopped responding.",
  "You sure you know this person? Because the evidence suggests otherwise.",
  "Wow. Just... wow. That's impressively wrong.",
  "My disappointment is immeasurable and my day is ruined.",
  "I've seen smarter guesses from a random number generator.",
  "The password was friendship all along. Just kidding, that's wrong too.",
  "Fascinating. Wrong, but fascinating.",
  "Have you considered that maybe we've never met?",
  "Even my autocomplete could do better.",
  "Achievement unlocked: 'I Have No Idea What I'm Doing'",
  "Your answers are bad and you should feel bad.",
  "That guess just made the CPU cringe. The CPU. It doesn't even have feelings.",
  "Loading sympathy... ERROR: file not found.",
  "sudo grant_access_to_this_person? Permission denied.",
]

const processingMessages = [
  "Consulting the ancient algorithms...",
  "Asking the magic 8-ball...",
  "Running friendship.exe...",
  "Checking with my therapist...",
  "Validating your existence...",
  "Calculating disappointment levels...",
  "Analyzing poor life choices...",
  "Scanning for traces of intelligence...",
  "Loading patience.dll... FAILED",
  "Consulting Stack Overflow...",
  "git pull origin reality",
  "npm install hope",
  "Querying the database of souls...",
  "Pinging the void...",
  "Compiling regrets...",
]

const idleComments = [
  "Still thinking? Take your time. I have literally nothing better to do.",
  "The form is judging you silently.",
  "Fun fact: Every second you hesitate, a developer loses a bracket.",
  "Tick tock. The void doesn't wait forever.",
  "I can hear you breathing. It's unsettling.",
  "The cursor is blinking. Much like my interest.",
  "Have you tried turning your brain off and on again?",
  "This silence is awkward for both of us.",
  "The void whispers: 'just guess something already'",
  "Your indecision is noted and will be used against you.",
]

const successMessages = [
  "Well... color me surprised. Access granted.",
  "Against all odds, you made it. I'm mildly impressed.",
  "Fine. You win this round. Enter if you dare.",
  "The prophecy was true. You DO know me.",
  "Achievement unlocked: 'Actually Knows This Person'",
  "Welcome, fellow chaos gremlin.",
]

export function AccessGate({ onAccessGranted }: AccessGateProps) {
  const [dogBreed, setDogBreed] = useState("")
  const [goodCook, setGoodCook] = useState(false)
  const [exactlyPhrase, setExactlyPhrase] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"error" | "success" | "">("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingText, setProcessingText] = useState("")
  const [logoClicks, setLogoClicks] = useState(0)
  const [showSecret, setShowSecret] = useState(false)
  const [idleComment, setIdleComment] = useState("")
  const [glitchEffect, setGlitchEffect] = useState(false)
  const [typedChars, setTypedChars] = useState("")
  const [showChaosMode, setShowChaosMode] = useState(false)

  // Idle comment timer
  useEffect(() => {
    const showIdleComment = () => {
      if (!isProcessing && Math.random() > 0.5) {
        setIdleComment(idleComments[Math.floor(Math.random() * idleComments.length)])
        setTimeout(() => setIdleComment(""), 5000)
      }
    }
    const interval = setInterval(showIdleComment, 20000)
    return () => clearInterval(interval)
  }, [isProcessing])

  // Listen for easter eggs
  useEffect(() => {
    let buffer = ""
    const handleKeyPress = (e: KeyboardEvent) => {
      buffer += e.key.toLowerCase()
      setTypedChars(prev => (prev + e.key).slice(-20))
      
      if (buffer.includes("egg")) {
        setShowSecret(true)
        buffer = ""
        setTimeout(() => setShowSecret(false), 4000)
      }
      if (buffer.includes("chaos")) {
        setShowChaosMode(true)
        buffer = ""
        setTimeout(() => setShowChaosMode(false), 5000)
      }
      if (buffer.includes("sudo")) {
        setMessage("Nice try. This isn't that kind of terminal.")
        setMessageType("error")
        buffer = ""
        setTimeout(() => { setMessage(""); setMessageType("") }, 3000)
      }
      if (buffer.includes("help")) {
        setMessage("Help? In THIS economy? Good luck.")
        setMessageType("error")
        buffer = ""
        setTimeout(() => { setMessage(""); setMessageType("") }, 3000)
      }
      if (buffer.length > 15) buffer = buffer.slice(-15)
    }
    window.addEventListener("keypress", handleKeyPress)
    return () => window.removeEventListener("keypress", handleKeyPress)
  }, [])

  const handleLogoClick = () => {
    const newClicks = logoClicks + 1
    setLogoClicks(newClicks)
    setGlitchEffect(true)
    setTimeout(() => setGlitchEffect(false), 300)
    
    if (newClicks === 3) {
      setMessage("Keep clicking. I dare you.")
      setMessageType("error")
    } else if (newClicks === 5) {
      setMessage("You found a secret! But it won't help you get in. Nothing will.")
      setMessageType("success")
    } else if (newClicks >= 7) {
      setMessage("Okay, that's enough. You're scaring me.")
      setMessageType("error")
      setLogoClicks(0)
    }
    
    if (newClicks >= 5) {
      setTimeout(() => {
        setMessage("")
        setMessageType("")
      }, 3000)
      setLogoClicks(0)
    }
  }

  const handleSubmit = useCallback(async () => {
    setIsProcessing(true)
    setMessage("")
    
    // Cycle through processing messages
    const processInterval = setInterval(() => {
      setProcessingText(processingMessages[Math.floor(Math.random() * processingMessages.length)])
    }, 800)
    
    await new Promise(resolve => setTimeout(resolve, 2500 + Math.random() * 1500))
    clearInterval(processInterval)
    
    const dogCorrect = dogBreed.toLowerCase().trim() === "beagle"
    const cookCorrect = goodCook === true
    const phraseCorrect = exactlyPhrase.toLowerCase().trim() === "eggjactly"
    
    const allCorrect = dogCorrect && cookCorrect && phraseCorrect
    await fetch("/api/log-access", {
      method: "POST",
      headers: {
      "Content-Type": "application/json"
     },
      body: JSON.stringify({
       result: allCorrect ? "PASSED" : "FAILED",
       userAgent: navigator.userAgent
      })
   })
    if (allCorrect) {
      setMessage(successMessages[Math.floor(Math.random() * successMessages.length)])
      setMessageType("success")
      setGlitchEffect(true)
      setTimeout(() => {
        setGlitchEffect(false)
        onAccessGranted()
      }, 2500)
    } else {
      setAttempts(prev => prev + 1)
      setMessage(failureMessages[Math.floor(Math.random() * failureMessages.length)])
      setMessageType("error")
      setGlitchEffect(true)
      setTimeout(() => setGlitchEffect(false), 500)
    }
    
    setIsProcessing(false)
    setProcessingText("")
  }, [dogBreed, goodCook, exactlyPhrase, attempts, onAccessGranted])

  const getAttemptComment = () => {
    if (attempts === 0) return null
    if (attempts === 1) return "(One down. Infinity to go.)"
    if (attempts === 2) return "(Persistence: admirable. Accuracy: questionable.)"
    if (attempts === 3) return "(At this point, I'm rooting for you. Kinda.)"
    if (attempts >= 4) return "(Fine. I'll let you in. This is just sad.)"
    return null
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Easter egg popup */}
      {showSecret && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-card border border-[#F5A623] p-6 rounded-lg animate-glitch">
          <p className="text-[#F5A623] font-mono text-center">
            You found the egg! The secret password is... &quot;friendship&quot;
            <br />
            <span className="text-xs text-muted-foreground">(Just kidding. That&apos;s not even a field. Pay attention.)</span>
          </p>
        </div>
      )}

      {/* Chaos mode popup */}
      {showChaosMode && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-card border-2 border-[#9B5DE5] p-6 rounded-lg animate-glitch">
          <p className="chaos-text font-mono text-center text-xl font-bold mb-2">
            C H A O S  M O D E  A C T I V A T E D
          </p>
          <p className="text-[#9B5DE5] font-mono text-center text-sm">
            Just kidding. There is no chaos mode. This IS the chaos mode.
          </p>
        </div>
      )}

      {/* Idle comment */}
      {idleComment && (
        <div className="fixed bottom-4 left-4 z-40 bg-card/90 border border-[#9B5DE5]/30 p-3 rounded-lg max-w-xs animate-in slide-in-from-left-5">
          <p className="text-[#9B5DE5]/70 font-mono text-xs flex items-center gap-2">
            <Coffee className="w-3 h-3" />
            {idleComment}
          </p>
        </div>
      )}

      {/* Terminal Panel */}
      <div className={`w-full max-w-lg relative ${glitchEffect ? 'animate-glitch' : ''}`}>
        {/* Glow effect behind panel */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#00FFC6]/20 via-[#9B5DE5]/20 to-[#F5A623]/20 rounded-lg blur-xl opacity-50 animate-pulse" />
        
        <div className="relative bg-card/95 backdrop-blur-sm border border-border rounded-lg overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/80 animate-pulse" style={{ animationDuration: "3s" }} />
              <div className="w-3 h-3 rounded-full bg-[#F5A623]/80 animate-pulse" style={{ animationDuration: "2.5s" }} />
              <div className="w-3 h-3 rounded-full bg-[#00FFC6]/80 animate-pulse" style={{ animationDuration: "2s" }} />
            </div>
            <div className="flex-1 text-center">
              <span className="text-xs text-muted-foreground font-mono">
                identity_verification.exe — {attempts > 0 ? `ATTEMPT ${attempts + 1}` : "AWAITING INPUT"}
              </span>
            </div>
            <Zap className="w-3 h-3 text-[#F5A623] animate-pulse" />
          </div>
          
          <div className="p-6 space-y-6">
            {/* Logo/Title */}
            <div 
              className="text-center cursor-pointer select-none group"
              onClick={handleLogoClick}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Terminal className="w-6 h-6 text-primary group-hover:animate-spin" style={{ animationDuration: "2s" }} />
                <h1 className="text-2xl md:text-3xl font-mono font-bold tracking-wider neon-text text-primary">
                  MANAS ARCHIVE
                </h1>
                <Skull className="w-5 h-5 text-[#9B5DE5] opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center justify-center gap-2 text-destructive">
                <AlertTriangle className="w-4 h-4 animate-pulse" />
                <p className="text-sm font-mono">Unauthorized access detected. Again.</p>
              </div>
            </div>
            
            {/* Intro text */}
            <div className="text-center space-y-2">
              <p className="text-muted-foreground text-sm font-mono leading-relaxed">
                &quot;If you&apos;re here, you either know me or you&apos;re hopelessly lost. Let&apos;s find out which.&quot;
              </p>
              <p className="text-[#9B5DE5]/60 text-xs font-mono">
                (Hint: Being wrong is a personality trait here, not a bug.)
              </p>
            </div>
            
            {/* Questions */}
            <div className="space-y-5">
              {/* Question 1 */}
              <div className="space-y-2">
                <Label htmlFor="dog-breed" className="text-sm font-mono text-primary flex items-center gap-2">
                  <span className="text-muted-foreground">[01]</span>
                  What breed of dog do I have?
                  <span className="text-[#9B5DE5]/40 text-xs">(not a trick question... or is it?)</span>
                </Label>
                <Input
                  id="dog-breed"
                  value={dogBreed}
                  onChange={(e) => setDogBreed(e.target.value)}
                  placeholder="Enter breed... if you dare"
                  className="font-mono bg-input border-border focus:border-primary focus:ring-primary/20"
                />
              </div>
              
              {/* Question 2 */}
              <div className="space-y-2">
                <Label className="text-sm font-mono text-primary flex items-center gap-2">
                  <span className="text-muted-foreground">[02]</span>
                  Am I a good cook?
                  <span className="text-[#F5A623]/40 text-xs">(choose wisely)</span>
                </Label>
                <div className="flex items-center gap-4 p-3 bg-input rounded-md border border-border">
                  <span className={`text-sm font-mono transition-all ${!goodCook ? 'text-primary scale-110' : 'text-muted-foreground'}`}>
                    No {!goodCook && "✓"}
                  </span>
                  <Switch
                    checked={goodCook}
                    onCheckedChange={setGoodCook}
                    className="data-[state=checked]:bg-primary"
                  />
                  <span className={`text-sm font-mono transition-all ${goodCook ? 'text-primary scale-110' : 'text-muted-foreground'}`}>
                    Yes {goodCook && "(bold choice)"}
                  </span>
                </div>
              </div>
              
              {/* Question 3 */}
              <div className="space-y-2">
                <Label htmlFor="exactly-phrase" className="text-sm font-mono text-primary flex items-center gap-2">
                  <span className="text-muted-foreground">[03]</span>
                  What do I say instead of &quot;exactly&quot;?
                </Label>
                <Input
                  id="exactly-phrase"
                  value={exactlyPhrase}
                  onChange={(e) => setExactlyPhrase(e.target.value)}
                  placeholder="Enter phrase... (I believe in you. Barely.)"
                  className="font-mono bg-input border-border focus:border-primary focus:ring-primary/20"
                />
              </div>
            </div>
            
            {/* Processing message */}
            {isProcessing && processingText && (
              <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50 border border-border font-mono text-sm text-muted-foreground">
                <span className="animate-spin">◌</span>
                <span className="typing-cursor pr-1">{processingText}</span>
              </div>
            )}
            
            {/* Message display */}
            {message && !isProcessing && (
              <div className={`flex items-center gap-2 p-3 rounded-md font-mono text-sm ${
                messageType === "error" 
                  ? "bg-destructive/10 border border-destructive/30 text-destructive" 
                  : "bg-primary/10 border border-primary/30 text-primary"
              }`}>
                {messageType === "error" ? (
                  <Lock className="w-4 h-4 flex-shrink-0 animate-pulse" />
                ) : (
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                )}
                <span>{message}</span>
              </div>
            )}
            
            {/* Submit button */}
            <Button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="w-full font-mono bg-primary text-primary-foreground hover:bg-primary/90 relative overflow-hidden group"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="animate-pulse">JUDGING</span>
                  <span className="animate-spin">◌</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {messageType === "success" ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  {attempts === 0 ? "ATTEMPT ACCESS" : `TRY AGAIN (ATTEMPT ${attempts + 1})`}
                </span>
              )}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Button>
            
            {/* Attempts counter */}
            {attempts > 0 && (
              <p className="text-center text-xs text-muted-foreground font-mono space-y-1">
                <span>Failed attempts: {attempts}</span>
                <br />
                <span className="text-[#9B5DE5]/60">{getAttemptComment()}</span>
              </p>
            )}

            {/* Hidden typed chars display */}
            {typedChars.length > 5 && (
              <p className="text-center text-[8px] text-muted-foreground/30 font-mono">
                {typedChars}
              </p>
            )}
          </div>
          
          {/* Footer */}
          <div className="px-6 py-3 border-t border-border bg-muted/30">
            <p className="text-[10px] text-muted-foreground/50 font-mono text-center">
              v1.0.0-beta.probably | Bugs: Yes | Features: Debatable | Cookies: Maybe
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
