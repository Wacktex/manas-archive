import type { Config } from "tailwindcss"

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'Menlo', 'monospace'],
      },
      colors: {
        'neon-cyan': '#00FFC6',
        'purple-glow': '#9B5DE5',
        'gold-magic': '#F5A623',
        'deep-black': '#0a0a0a',
      },
      animation: {
        'float': 'float 15s linear infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'scan-line': 'scan-line 8s linear infinite',
        'glitch': 'glitch 0.5s ease-in-out',
        'rune-glow': 'rune-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
