'use client'

import React from 'react'
import { SplineScene } from './ui/splite'
import { Card } from './ui/card'
import { Spotlight } from './ui/spotlight'

export function SplineSceneBasic() {
  return (
    <div>
      <Card className="w-full h-[520px] relative overflow-hidden !border-0 !rounded-2xl">
        {/* soft blended glow behind the hero to mix page colors without a hard border */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700/10 via-purple-600/8 to-indigo-900/6 filter blur-2xl opacity-60"></div>
        </div>

       <div className="w-full h-full bg-black/[0.96] rounded-2xl relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

       <div className="flex h-full">
        {/* Left hero content (requested copy inside the hero) */}
        <div className="flex-1 p-10 relative z-10 flex flex-col justify-center">
          

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-2">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent block">Rayan Tech Solutions</span>
            <span className="text-white block text-3xl md:text-4xl">Software House for Visionary Teams</span>
          </h1>

          <p className="text-lg text-gray-300 max-w-xl mt-4">
            We build conversion-ready platforms, AI systems, and digital products for businesses across Afghanistan and beyond. Strategy, design, and engineering ship together.
          </p>

          <div className="mt-6">
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

          <div className="mt-6 flex gap-4">
            <a href="#portfolio" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold">View Our Work</a>
            <a href="#contact" className="px-6 py-3 bg-white/10 rounded-full text-white font-semibold border border-white/20">Start a Project</a>
          </div>

          
        </div>

        {/* Right content - Spline scene */}
        <div className="flex-1 relative">
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
