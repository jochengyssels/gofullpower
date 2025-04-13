"use client"

import { useEffect, useRef } from "react"

type PredictabilityChartProps = {
  data: number[]
}

export function PredictabilityChart({ data }: PredictabilityChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Draw chart
    drawChart(ctx, canvas.width, canvas.height, data)

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current) return
      const canvas = canvasRef.current
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const ctx = canvas.getContext("2d")
      if (ctx) {
        drawChart(ctx, canvas.width, canvas.height, data)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [data])

  // Draw the chart
  const drawChart = (ctx: CanvasRenderingContext2D, width: number, height: number, data: number[]) => {
    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Chart dimensions
    const barWidth = width / data.length - 4
    const maxBarHeight = height - 10

    // Get day labels
    const today = new Date()
    const dayLabels = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      return date.toLocaleDateString("en-US", { weekday: "short" }).substring(0, 2)
    })

    // Draw bars
    data.forEach((value, index) => {
      const x = index * (barWidth + 4) + 2
      const barHeight = (value / 100) * maxBarHeight
      const y = height - barHeight - 5

      // Get color based on predictability
      const getColor = (value: number) => {
        if (value >= 70) return "#22c55e" // green-500
        if (value >= 40) return "#f59e0b" // amber-500
        return "#ef4444" // red-500
      }

      // Draw bar
      ctx.fillStyle = getColor(value)
      ctx.beginPath()
      ctx.roundRect(x, y, barWidth, barHeight, 3)
      ctx.fill()

      // Draw day label
      ctx.fillStyle = "#6b7280" // gray-500
      ctx.font = "8px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(dayLabels[index], x + barWidth / 2, height - 2)

      // Draw percentage on top of bar
      if (barHeight > 15) {
        ctx.fillStyle = "#ffffff"
        ctx.font = "8px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(`${Math.round(value)}%`, x + barWidth / 2, y + 10)
      }
    })
  }

  return <canvas ref={canvasRef} className="w-full h-[60px]" />
}
