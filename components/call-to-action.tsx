"use client"

import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CallToAction() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`max-w-3xl mx-auto text-center transform transition-all duration-700 ease-out ${
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to get started?</h2>
          <p className="mt-4 text-xl text-blue-100">
            Join thousands of satisfied customers who have transformed their digital experience.
          </p>
          <div className="mt-8 flex justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 transition-colors">
              Start your free trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
