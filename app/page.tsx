"use client"

import { useState } from "react"
import { FloatingBackground } from "@/components/floating-background"
import { AccessGate } from "@/components/access-gate"
import { ArchiveDashboard } from "@/components/archive-dashboard"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <FloatingBackground />
      
      <div className="relative z-10">
        {isAuthenticated ? (
          <ArchiveDashboard />
        ) : (
          <AccessGate onAccessGranted={() => setIsAuthenticated(true)} />
        )}
      </div>
    </main>
  )
}
