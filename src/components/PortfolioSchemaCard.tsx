'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PortfolioSchemaCardProps {
  badge: string
  title: string
  description: string
  tech: string[]
  image: string
  href?: string
  github?: string
  statusLabel: string
  featured?: boolean
  className?: string
}

export function PortfolioSchemaCard({
  badge,
  title,
  description,
  tech,
  image,
  href,
  github,
  statusLabel,
  featured,
  className,
}: PortfolioSchemaCardProps) {
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

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const updateWaveData = () => {
      waveData.forEach((data) => {
        if (Math.random() < 0.01) data.targetValue = Math.random() * 0.7 + 0.1
        const diff = data.targetValue - data.value
        data.value += diff * data.speed
      })
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(8, 10, 18, 1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      waveData.forEach((data, i) => {
        const freq = data.value * 7
        ctx.beginPath()
        for (let x = 0; x < canvas.width; x++) {
          const nx = (x / canvas.width) * 2 - 1
          const px = nx + i * 0.04 + freq * 0.03
          const py =
            Math.sin(px * 10 + time) * Math.cos(px * 2) * freq * 0.1 * ((i + 1) / 8)
          const y = (py + 1) * canvas.height / 2
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        const intensity = Math.min(1, freq * 0.3)
        const r = 79 + intensity * 100
        const g = 70 + intensity * 130
        const b = 229
        ctx.lineWidth = 1 + i * 0.3
        ctx.strokeStyle = `rgba(${r},${g},${b},0.55)`
        ctx.shadowColor = `rgba(${r},${g},${b},0.5)`
        ctx.shadowBlur = 6
        ctx.stroke()
        ctx.shadowBlur = 0
      })
    }

    let animationId = 0
    const animate = () => {
      time += 0.02
      updateWaveData()
      draw()
      animationId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={cn(
        'relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent',
        featured && 'ring-1 ring-blue-500/40 shadow-2xl shadow-blue-500/20',
        className
      )}
    >
      <div className="relative h-56 overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-transparent">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-contain p-0 m-0"
          style={{
            maxHeight: '100%',
            maxWidth: '100%'
          }}
        />
        <div className="absolute inset-0 bg-black/20 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium text-indigo-200 bg-indigo-500/20 border border-indigo-400/30">
            {badge}
          </span>
          <span className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded-full border border-white/10">
            {statusLabel}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/70 text-sm mb-5 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {tech.slice(0, 4).map((item) => {
            const keyName = item.toLowerCase().replace(/[^a-z0-9]/g, '-')
            const iconSrc = `/icons/${keyName}.svg`
            return (
              <span
                key={item}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200"
              >
                <img
                  src={iconSrc}
                  alt={item}
                  className="w-4 h-4 inline-block"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement
                    img.style.display = 'none'
                  }}
                />
                <span>{item}</span>
              </span>
            )
          })}
        </div>

        <div className="flex gap-3">
          {href && href !== '#' && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-xs font-semibold text-white"
            >
              <ExternalLink className="h-4 w-4" />
              Live
            </a>
          )}
          {github && github !== '#' && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs text-gray-200"
            >
              <Github className="h-4 w-4" />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
