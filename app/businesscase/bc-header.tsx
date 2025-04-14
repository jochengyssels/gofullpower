"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { TrendingUp } from "lucide-react"

export function BusinessCaseHeader() {
  return (
    <div className="relative h-[350px] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/ai-strategy-session.png"
        alt="Business case for AI Powered Kite Travel Agent"
        fill
        priority
        className="object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-purple-800/60 to-purple-700/40" />

      {/* Animated particles effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.3,
              scale: Math.random() * 1 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * 20 - 10 + "%"],
              opacity: [null, Math.random() * 0.3 + 0.2],
              transition: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                duration: Math.random() * 5 + 3,
              },
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-6 text-white"
        >
          AI Powered <span className="text-purple-300">Kite Travel Agent</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-xl text-purple-50 leading-relaxed"
        >
          Revolutionizing Kite Tourism Through AI-Driven Itinerary Personalization
        </motion.p>

        {/* Added visual element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center mt-8 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20"
        >
          <TrendingUp className="h-5 w-5 text-purple-300 mr-2" />
          <span className="text-white">$137M market growing at 18% CAGR</span>
        </motion.div>
      </div>
    </div>
  )
}
