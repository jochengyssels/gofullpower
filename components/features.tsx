"use client"
import { useInView } from "react-intersection-observer"
import { Layers, Shield, Zap, BarChart3, Globe, Smartphone } from "lucide-react"

const features = [
  {
    name: "Intuitive Interface",
    description: "Our clean, user-friendly interface makes navigation effortless and enjoyable.",
    icon: Layers,
  },
  {
    name: "Enterprise Security",
    description: "Bank-level encryption and security protocols keep your data safe and protected.",
    icon: Shield,
  },
  {
    name: "Lightning Fast",
    description: "Optimized performance ensures your experience is always smooth and responsive.",
    icon: Zap,
  },
  {
    name: "Advanced Analytics",
    description: "Gain valuable insights with our comprehensive analytics dashboard.",
    icon: BarChart3,
  },
  {
    name: "Global Reach",
    description: "Connect with users worldwide through our distributed network infrastructure.",
    icon: Globe,
  },
  {
    name: "Mobile Optimized",
    description: "Fully responsive design provides a seamless experience across all devices.",
    icon: Smartphone,
  },
]

export function Features() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="features" className="py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Designed for the modern workflow
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to streamline your operations and boost productivity.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className={`relative p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform ${
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-100 text-blue-600 mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
              <p className="mt-2 text-base text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
