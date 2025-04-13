"use client"

import { useEffect, useRef } from "react"
import { Wind } from "lucide-react"

type RegionalWindChartProps = {
  region: string
}

export function RegionalWindChart({ region }: RegionalWindChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Generate random data based on region
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const windData = generateWindData(region)

    // Draw chart
    drawChart(ctx, canvas.width, canvas.height, months, windData)

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current) return
      const canvas = canvasRef.current
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const ctx = canvas.getContext("2d")
      if (ctx) {
        drawChart(ctx, canvas.width, canvas.height, months, windData)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [region])

  // Generate random wind data based on region
  const generateWindData = (region: string) => {
    const data = []

    // Different wind patterns based on region
    if (region.includes("Europe") || region.includes("Spain") || region.includes("Greece")) {
      // Mediterranean pattern: stronger in summer
      for (let i = 0; i < 12; i++) {
        data.push(i >= 4 && i <= 8 ? 15 + Math.random() * 10 : 8 + Math.random() * 7)
      }
    } else if (region.includes("Africa") || region.includes("Morocco") || region.includes("South Africa")) {
      // African pattern: strong in spring and fall
      for (let i = 0; i < 12; i++) {
        data.push((i >= 2 && i <= 4) || (i >= 8 && i <= 10) ? 18 + Math.random() * 8 : 10 + Math.random() * 8)
      }
    } else if (region.includes("Asia") || region.includes("Thailand") || region.includes("Vietnam")) {
      // Asian pattern: monsoon seasons
      for (let i = 0; i < 12; i++) {
        data.push(i >= 5 && i <= 9 ? 20 + Math.random() * 7 : 5 + Math.random() * 5)
      }
    } else if (region.includes("America") || region.includes("Brazil") || region.includes("Dominican")) {
      // American pattern: consistent trade winds
      for (let i = 0; i < 12; i++) {
        data.push(15 + Math.random() * 10)
      }
    } else {
      // Default global pattern
      for (let i = 0; i < 12; i++) {
        data.push(10 + Math.random() * 15)
      }
    }

    return data
  }

  // Draw the chart
  const drawChart = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    labels: string[],
    data: number[],
  ) => {
    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Chart dimensions
    const padding = { top: 20, right: 20, bottom: 30, left: 40 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    // Scale factors
    const maxValue = Math.max(...data) * 1.1
    const xScale = chartWidth / (labels.length - 1)
    const yScale = chartHeight / maxValue

    // Draw grid lines
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + chartHeight - (i * chartHeight) / 5
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width - padding.right, y)
      ctx.stroke()
    }

    // Draw axes labels
    ctx.fillStyle = "#6b7280"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"

    // X-axis labels (months)
    labels.forEach((label, i) => {
      const x = padding.left + i * xScale
      ctx.fillText(label, x, height - padding.bottom + 15)
    })

    // Y-axis labels (wind speed)
    ctx.textAlign = "right"
    for (let i = 0; i <= 5; i++) {
      const value = (i * maxValue) / 5
      const y = padding.top + chartHeight - (i * chartHeight) / 5
      ctx.fillText(`${Math.round(value)}`, padding.left - 5, y + 3)
    }

    // Y-axis title
    ctx.save()
    ctx.translate(15, height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.textAlign = "center"
    ctx.fillText("Wind Speed (knots)", 0, 0)
    ctx.restore()

    // Draw line
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(padding.left, padding.top + chartHeight - data[0] * yScale)

    // Draw line segments
    for (let i = 1; i < data.length; i++) {
      const x = padding.left + i * xScale
      const y = padding.top + chartHeight - data[i] * yScale
      ctx.lineTo(x, y)
    }
    ctx.stroke()

    // Draw area under the line
    ctx.fillStyle = "rgba(59, 130, 246, 0.2)"
    ctx.lineTo(padding.left + (data.length - 1) * xScale, padding.top + chartHeight)
    ctx.lineTo(padding.left, padding.top + chartHeight)
    ctx.closePath()
    ctx.fill()

    // Draw data points
    ctx.fillStyle = "#3b82f6"
    for (let i = 0; i < data.length; i++) {
      const x = padding.left + i * xScale
      const y = padding.top + chartHeight - data[i] * yScale
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  return (
    <div className="relative h-[150px] w-full">
      <div className="absolute top-0 left-0 flex items-center text-gray-500 text-xs">
        <Wind className="h-3 w-3 mr-1" />
        <span>Wind statistics for {region}</span>
      </div>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
