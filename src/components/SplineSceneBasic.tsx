'use client'

import { useState, useEffect, useCallback } from 'react'
import { SplineScene } from './ui/splite'
import { Card } from './ui/card'
import { Spotlight } from './ui/spotlight'

const TYPING_SPEED = 80
const ERASING_SPEED = 40
const PAUSE_DURATION = 2000

export function SplineSceneBasic() {
  const [text, setText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  const words = ['Web Platforms', 'AI Systems', 'Mobile Apps', 'Digital Products']

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < words[wordIndex].length) {
        setText(prev => prev + words[wordIndex][charIndex])
        setCharIndex(prev => prev + 1)
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION)
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1))
        setCharIndex(prev => prev - 1)
      } else {
        setWordIndex(prev => (prev + 1) % words.length)
        setIsTyping(true)
      }
    }
  }, [charIndex, isTyping, wordIndex, words])

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    )
    return () => clearTimeout(timeout)
  }, [handleTyping])

  return (
    <div>
      <Card className="w-full h-[550px] md:h-[520px] relative overflow-hidden !border-0 !rounded-2xl">
        {/* soft blended glow behind the hero to mix page colors without a hard border */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700/10 via-purple-600/8 to-indigo-900/6 filter blur-2xl opacity-60"></div>
        </div>

       <div className="w-full h-full bg-black/[0.96] rounded-2xl relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

       <div className="flex flex-col md:flex-row h-full">
        {/* Left hero content */}
        <div className="w-full md:flex-1 p-4 md:p-10 relative z-10 flex flex-col justify-between md:justify-center">
          
          {/* Heading - only visible on desktop */}
          <div className="hidden md:block space-y-2">
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-2">
              <span className="relative inline-block">
                <span className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-cyan-300 blur-2xl opacity-20"></span>
                <span className="relative bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent block">Rayan Tech Solutions</span>
              </span>
              <span className="text-white block text-3xl lg:text-4xl mt-2">Software House for Visionary Teams</span>
            </h1>
            {/* Typing animation for service type */}
            <p className="text-lg text-gray-400">We specialize in: <span className="font-semibold text-blue-400">{text}</span><span className="animate-pulse">|</span></p>
          </div>

          <p className="hidden md:block text-sm md:text-base lg:text-lg text-gray-300 max-w-xl mt-4">
            We build conversion-ready platforms, AI systems, and digital products for businesses across Afghanistan and beyond. Strategy, design, and engineering ship together.
          </p>

          <div className="hidden md:block mt-6">
            <div className="flex flex-wrap gap-3 mb-0">
              {['Web Platforms', 'AI Systems', 'Mobile Apps', 'E-Commerce'].map((chip) => (
                <span
                  key={chip}
                  className="px-4 py-2 rounded-full text-xs font-medium text-white/80 border border-white/15 bg-white/5"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Mobile buttons - positioned at bottom */}
          <div className="flex flex-col gap-2 md:mt-6">
            <a href="#portfolio" className="px-4 py-2 md:py-3 md:px-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold text-sm md:text-base text-center hover:shadow-lg hover:shadow-blue-500/40 transition-all">View Our Work</a>
            <a href="#contact" className="px-4 py-2 md:py-3 md:px-6 bg-white/10 rounded-full text-white font-semibold border border-white/20 text-sm md:text-base text-center hover:bg-white/20 transition-all">Start a Project</a>
          </div>

        </div>

        {/* Right content - Spline scene */}
        <div className="w-full md:flex-1 relative flex">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
        </div>
             </div>
            </Card>
    </div>
  )
}
