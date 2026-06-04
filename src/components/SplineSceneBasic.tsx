'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const TYPING_SPEED = 80
const ERASING_SPEED = 40
const PAUSE_DURATION = 2000

export function SplineSceneBasic() {
  const { t } = useTranslation(['home', 'common'])
  const canvasRef = useRef(null)
  const [text, setText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  const words = t('home:hero.specialization', { returnObjects: true }) || ['Web Platforms', 'AI Systems', 'Mobile Apps', 'Digital Products']

  // Particle animation setup
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    let animationFrameId: number
    let particles: any[] = []
    const mouse = { x: null as number | null, y: null as number | null, radius: 200 }

    class Particle {
      x: number
      y: number
      directionX: number
      directionY: number
      size: number
      color: string

      constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
        this.x = x
        this.y = y
        this.directionX = directionX
        this.directionY = directionY
        this.size = size
        this.color = color
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
      }

      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY
        }

        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x
          let dy = mouse.y - this.y
          let distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < mouse.radius + this.size) {
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            const force = (mouse.radius - distance) / mouse.radius
            this.x -= forceDirectionX * force * 5
            this.y -= forceDirectionY * force * 5
          }
        }

        this.x += this.directionX
        this.y += this.directionY
        this.draw()
      }
    }

    function init() {
      particles = []
      let numberOfParticles = (canvas.height * canvas.width) / 9000
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1
        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2)
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2)
        let directionX = (Math.random() * 0.4) - 0.2
        let directionY = (Math.random() * 0.4) - 0.2
        let color = 'rgba(191, 128, 255, 0.8)'
        particles.push(new Particle(x, y, directionX, directionY, size, color))
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    const connect = () => {
      let opacityValue = 1
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
            + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y))
          
          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            opacityValue = 1 - (distance / 20000)
            
            let dx_mouse_a = particles[a].x - mouse.x
            let dy_mouse_a = particles[a].y - mouse.y
            let distance_mouse_a = Math.sqrt(dx_mouse_a*dx_mouse_a + dy_mouse_a*dy_mouse_a)

            if (mouse.x && distance_mouse_a < mouse.radius) {
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`
            } else {
              ctx.strokeStyle = `rgba(200, 150, 255, ${opacityValue})`
            }
            
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
      }
      connect()
    }
    
    const handleMouseMove = (event) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
    }
    
    const handleMouseOut = () => {
      mouse.x = null
      mouse.y = null
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseout', handleMouseOut)

    init()
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Typing animation
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

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2 + 0.3,
        duration: 0.8,
        ease: "easeInOut",
      },
    }),
  }

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Particle background canvas */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full"></canvas>
      
      {/* Content overlay with proper z-index */}
      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 md:py-0">
        
        {/* Badge - visible on all screens */}
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4 sm:mb-6 backdrop-blur-sm"
        >
          <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400" />
          <span className="text-xs sm:text-sm font-medium text-gray-200">
            {t('home:hero.badge')}
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 sm:mb-6 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400"
        >
          {t('home:hero.title')}
        </motion.h1>

        {/* Subheading */}
        <motion.h2
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-4 sm:mb-6 text-gray-300"
        >
          {t('home:hero.subtitle')}
        </motion.h2>

        {/* Typing Animation Text */}
        <motion.p
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-base sm:text-lg text-center text-gray-300 mb-6 sm:mb-8"
        >
          {t('home:hero.description')}{' '}
          <span className="font-semibold text-cyan-300">{text}</span>
          <span className="animate-pulse text-cyan-300">|</span>
        </motion.p>

        {/* Description - hidden on mobile, visible on tablet+ */}
        <motion.p
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="hidden sm:block max-w-2xl text-center text-sm md:text-base lg:text-lg text-gray-400 mb-8 md:mb-10"
        >
          {t('home:hero.description2')}
        </motion.p>

        {/* Buttons - mobile and desktop layout */}
        <motion.div
          custom={4}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <a
            href="#portfolio"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
          >
            View Our Work
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
          <a
            href="#contact"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-300 text-sm sm:text-base whitespace-nowrap text-center"
          >
            Start a Project
          </a>
        </motion.div>
      </div>
    </div>
  )
}
