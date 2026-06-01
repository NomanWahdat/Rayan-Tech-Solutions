'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { cn } from '@/lib/utils'

interface DottedSurfaceProps {
  className?: string
}

export function DottedSurface({ className }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<any>(null)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const updateTheme = () => setIsDark(media.matches)
    updateTheme()
    media.addEventListener('change', updateTheme)
    return () => media.removeEventListener('change', updateTheme)
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const SEPARATION = 150
    const AMOUNTX = 40
    const AMOUNTY = 60

    // Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(isDark ? 0x0b0f1f : 0xffffff, 2000, 10000)

    const initialWidth = containerRef.current?.offsetWidth || window.innerWidth
    const initialHeight = containerRef.current?.offsetHeight || window.innerHeight

    const camera = new THREE.PerspectiveCamera(
      60,
      initialWidth / initialHeight,
      1,
      10000
    )
    camera.position.set(0, 355, 1220)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(initialWidth, initialHeight)
    renderer.setClearColor(scene.fog.color, 0)

    containerRef.current.appendChild(renderer.domElement)

    // Create particles
    const positions: number[] = []
    const colors: number[] = []

    const geometry = new THREE.BufferGeometry()

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2
        const y = 0
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2

        positions.push(x, y, z)
        if (isDark) {
          colors.push(0.6, 0.78, 1.0)
        } else {
          colors.push(0.2, 0.2, 0.2)
        }
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 10,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 1 : 0.6,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    let count = 0
    let animationId: number

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      const positionAttribute = geometry.attributes.position
      const positions = positionAttribute.array as Float32Array

      let i = 0
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const index = i * 3

          positions[index + 1] =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50

          i++
        }
      }

      positionAttribute.needsUpdate = true
      renderer.render(scene, camera)
      count += 0.1
    }

    const handleResize = () => {
      const width = containerRef.current?.offsetWidth || window.innerWidth
      const height = containerRef.current?.offsetHeight || window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)
    animate()

    sceneRef.current = {
      scene,
      camera,
      renderer,
      animationId,
    }

    return () => {
      window.removeEventListener('resize', handleResize)

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)
        sceneRef.current.scene.traverse((object: any) => {
          if (object instanceof THREE.Points) {
            object.geometry.dispose()
            if (Array.isArray(object.material)) {
              object.material.forEach((material: any) => material.dispose())
            } else {
              object.material.dispose()
            }
          }
        })

        sceneRef.current.renderer.dispose()

        if (containerRef.current && sceneRef.current.renderer.domElement) {
          containerRef.current.removeChild(sceneRef.current.renderer.domElement)
        }
      }
    }
  }, [isDark])

  return (
    <div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute inset-0 opacity-90 mix-blend-screen',
        className
      )}
    />
  )
}
