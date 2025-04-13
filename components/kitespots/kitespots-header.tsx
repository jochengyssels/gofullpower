"use client"

import Image from "next/image"
import { Wind } from "@/components/icons"
import { motion } from "framer-motion"

export function KitespotsHeader() {
  return (
    <div className="relative h-[350px] w-full overflow-hidden">
      {/* Background Image with a more impressive kitesurfing shot */}
      <Image src="/kitesurfing-hero.jpg" alt="Kitesurfing aerial view" fill priority className="object-cover" />

      {/* Animated wave overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg
          className="absolute bottom-0 left-0 right-0 w-full"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            initial={{ opacity: 0.3, y: 20 }}
            animate={{
              opacity: 0.6,
              y: 0,
              transition: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                duration: 5,
              },
            }}
            fill="#3B82F6"
            fillOpacity="0.3"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></motion.path>
        </svg>
      </div>

      {/* Enhanced gradient overlay with more vibrant colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-800/60 to-blue-700/40" />

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
          Discover <span className="text-blue-300">Kitespots</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-xl text-blue-50 leading-relaxed"
        >
          Explore the world's best kiteboarding destinations with AI-powered wind predictions and community insights
        </motion.p>

        {/* Added visual element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center mt-8 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20"
        >
          <Wind className="h-5 w-5 text-blue-300 mr-2" />
          <span className="text-white">Find your perfect spot based on wind, water, and skill level</span>
        </motion.div>
      </div>
    </div>
  )
}
