"use client"

import { useEffect, useRef } from "react"

export function AnimatedTitle() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !textRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const textElement = textRef.current
    const textRect = textElement.getBoundingClientRect()

    // Set canvas dimensions to match the text element
    canvas.width = textRect.width
    canvas.height = textRect.height
    canvas.style.width = `${textRect.width}px`
    canvas.style.height = `${textRect.height}px`

    // Position the canvas over the text
    canvas.style.position = "absolute"
    canvas.style.left = "0"
    canvas.style.top = "0"
    canvas.style.pointerEvents = "none"

    // Create particles for the animation
    const particles: Particle[] = []
    const particleCount = 50

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 0.5 - 0.25
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.3})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation variables
    let time = 0
    const amplitude = 2 // Wave amplitude
    const frequency = 0.05 // Wave frequency

    // Animation function
    function animate() {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Apply wave effect to text
      time += 0.05
      const waveY = Math.sin(time) * amplitude

      // Apply transform to the text element
      textElement.style.transform = `translateY(${waveY}px)`

      // Continue animation
      requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current || !textRef.current) return

      const newRect = textRef.current.getBoundingClientRect()
      const canvas = canvasRef.current

      canvas.width = newRect.width
      canvas.height = newRect.height
      canvas.style.width = `${newRect.width}px`
      canvas.style.height = `${newRect.height}px`
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="relative inline-block">
      <h1 ref={textRef} className="text-white text-4xl sm:text-5xl md:text-6xl font-light tracking-tight">
        full power
      </h1>
      <canvas ref={canvasRef} />
    </div>
  )
}
