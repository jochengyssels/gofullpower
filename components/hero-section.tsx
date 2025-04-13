"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white pointer-events-none" aria-hidden="true" />

      {/* Animated wave shapes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl">
        <div className="relative">
          <div
            className={`absolute -top-16 -left-16 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob ${
              isVisible ? "opacity-20" : "opacity-0"
            } transition-opacity duration-1000 delay-300`}
            style={{ animationDelay: "0ms" }}
          />
          <div
            className={`absolute -top-8 -right-16 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 ${
              isVisible ? "opacity-20" : "opacity-0"
            } transition-opacity duration-1000 delay-500`}
            style={{ animationDelay: "2000ms" }}
          />
          <div
            className={`absolute top-16 left-32 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 ${
              isVisible ? "opacity-20" : "opacity-0"
            } transition-opacity duration-1000 delay-700`}
            style={{ animationDelay: "4000ms" }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            } transition-all duration-700 ease-out`}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Transform Your Digital</span>
              <span className="block text-blue-600 mt-2">Experience</span>
            </h1>
          </div>

          <div
            className={`mt-6 max-w-2xl mx-auto transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            } transition-all duration-700 ease-out delay-150`}
          >
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Elevate your online presence with our intuitive platform. Designed for simplicity, built for performance.
            </p>
          </div>

          <div
            className={`mt-10 max-w-md mx-auto transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            } transition-all duration-700 ease-out delay-300`}
          >
            <form className="sm:flex">
              <div className="min-w-0 flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Button className="w-full flex items-center justify-center px-5 py-3">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
            <p className="mt-3 text-sm text-gray-500">Start your free 14-day trial. No credit card required.</p>
          </div>
        </div>

        <div
          className={`mt-16 max-w-5xl mx-auto transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          } transition-all duration-1000 ease-out delay-500`}
        >
          <div className="relative rounded-xl shadow-2xl overflow-hidden">
            <Image
              src="/modern-dashboard-blue.png"
              alt="Dashboard Preview"
              width={1200}
              height={600}
              className="w-full h-auto"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
