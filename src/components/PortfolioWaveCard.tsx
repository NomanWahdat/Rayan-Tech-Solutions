import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

interface PortfolioWaveCardProps {
  title: string
  description: string
  tech: string[]
  demoLink?: string
  githubLink?: string
  featured?: boolean
}

export function PortfolioWaveCard({
  title,
  description,
  tech,
  demoLink,
  githubLink,
  featured = false,
}: PortfolioWaveCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let time = 0
    const waveData = Array.from({ length: 8 }).map(() => ({
      value: Math.random() * 0.5 + 0.1,
      targetValue: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.02 + 0.01,
    }))

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function updateWaveData() {
      waveData.forEach((data) => {
        if (Math.random() < 0.01) data.targetValue = Math.random() * 0.7 + 0.1
        const diff = data.targetValue - data.value
        data.value += diff * data.speed
      })
    }

    function draw() {
      ctx.fillStyle = 'rgba(10, 14, 39, 0.8)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      waveData.forEach((data, i) => {
        const freq = data.value * 7
        ctx.beginPath()
        for (let x = 0; x < canvas.width; x++) {
          const nx = (x / canvas.width) * 2 - 1
          const px = nx + i * 0.04 + freq * 0.03
          const py =
            Math.sin(px * 10 + time) * Math.cos(px * 2) * freq * 0.1 * ((i + 1) / 8)
          const y = (py + 1) * (canvas.height / 2)
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        const intensity = Math.min(1, freq * 0.3)
        const r = 59 + intensity * 100
        const g = 130 + intensity * 125
        const b = 246
        ctx.lineWidth = 1.5 + i * 0.3
        ctx.strokeStyle = `rgba(${r},${g},${b},0.8)`
        ctx.shadowColor = `rgba(${r},${g},${b},0.6)`
        ctx.shadowBlur = 8
        ctx.stroke()
        ctx.shadowBlur = 0
      })
    }

    function animate() {
      time += 0.02
      updateWaveData()
      draw()
      requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    animate()

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-2xl border ${
        featured
          ? 'border-blue-500 ring-2 ring-blue-500/30 shadow-2xl shadow-blue-500/20'
          : 'border-gray-700 hover:border-blue-500/50'
      } transition-all duration-300 group`}
    >
      {/* Wave Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-64"
        style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%)' }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 p-6 bg-gradient-to-b from-black/50 to-black/80 h-full flex flex-col">
        {/* Header */}
        <div className="mb-4">
          {featured && (
            <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium mb-2 border border-blue-500/30">
              Featured Project
            </span>
          )}
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 flex-grow line-clamp-2">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="px-2 py-1 bg-gray-900 text-gray-300 text-xs rounded border border-gray-700 group-hover:border-blue-500/50 transition-colors"
            >
              {t}
            </span>
          ))}
          {tech.length > 3 && (
            <span className="px-2 py-1 bg-gray-900 text-gray-400 text-xs rounded border border-gray-700">
              +{tech.length - 3}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3 mt-4">
          {demoLink && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium border border-blue-500/30 hover:bg-blue-500/30 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              Live
            </motion.a>
          )}
          {githubLink && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-700 transition-all"
            >
              <Github className="w-4 h-4" />
              Code
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
