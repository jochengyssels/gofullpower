"use client"

import { motion } from "framer-motion"
import { Calendar, CheckCircle, Flag } from "lucide-react"

export function ImplementationRoadmap() {
  const roadmapSteps = [
    {
      quarter: "Q3 2025",
      title: "Pilot Launch",
      description: "Deploy N8N MPC agents in a controlled pilot with 50 key kiteschools and select partners.",
      tasks: [
        "Begin white-label integration for Kitebrand partners",
        "Refine the dynamic pricing engine",
        "Conduct initial user testing and gather feedback",
      ],
    },
    {
      quarter: "Q1 2026",
      title: "Public Launch",
      description: "Public launch of the AI Powered Kite Travel Agent with extensive user pre-registration.",
      tasks: [
        "Enroll 14,000 pre-registered users",
        "Initiate aggressive marketing campaigns",
        "Roll out premium features for early adopters",
      ],
    },
    {
      quarter: "Q4 2026",
      title: "Scale Operations",
      description: "Scale the platform internationally and prepare for further rounds of investment.",
      tasks: [
        "Prepare for a Series B funding round targeting $14.7M",
        "Begin IPO preparation to capture long-term value",
        "Expand to additional international markets",
      ],
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Implementation Roadmap</h2>
          <p className="text-lg text-gray-600">
            Our strategic roadmap outlines the key milestones for successful implementation and growth of the AI Powered
            Kite Travel Agent.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-200 hidden md:block"></div>

          {roadmapSteps.map((step, index) => (
            <motion.div
              key={step.quarter}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative mb-12 md:mb-24 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
            >
              <div className={`md:flex items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                <div className="md:w-1/2 mb-6 md:mb-0 md:px-8">
                  <div
                    className={`bg-white p-6 rounded-lg shadow-md border border-gray-100 ${index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"} max-w-md`}
                  >
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-purple-100 rounded-full mr-4">
                        <Calendar className="h-5 w-5 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-semibold">
                        {step.quarter}: {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.tasks.map((task, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="hidden md:block md:w-1/2 relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-purple-500 border-4 border-white shadow-lg flex items-center justify-center">
                    <Flag className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
