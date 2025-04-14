"use client"

import { motion } from "framer-motion"
import { BarChart, Globe, TrendingUp, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ExecutiveSummary() {
  const highlights = [
    {
      title: "Market Opportunity",
      icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
      points: [
        "An estimated $137M kite tourism market growing at 18% CAGR.",
        "High user engagement with over 89% of kiters planning multiple international trips per year.",
        "A substantial upsell potential of an average of $214 per traveler.",
      ],
    },
    {
      title: "Technology & Innovation",
      icon: <Globe className="h-6 w-6 text-blue-500" />,
      points: [
        "Integration of N8N MPC Agents for real-time, data-driven itinerary optimization.",
        "Automated partner commission tracking and a dynamic pricing engine for 179k+ services.",
        "Comprehensive analysis of 57 data points per user to tailor trip itineraries in real time.",
      ],
    },
    {
      title: "Monetization Strategy",
      icon: <BarChart className="h-6 w-6 text-green-500" />,
      points: [
        "Kitebrand Partners: White-label KTA integration with a 15% commission on bookings.",
        "Kiteschool Owners: Premium SaaS tools subscription at $299/mo, providing automated booking and student analytics.",
        "Local Businesses: Geo-targeted dynamic promotion bidding generating targeted CPM revenue.",
        "End-Users: Freemium model with premium features at $9.99/mo, with a projected 23% uptake.",
      ],
    },
    {
      title: "Financial Projections & ROI",
      icon: <Users className="h-6 w-6 text-amber-500" />,
      points: [
        "Rapid user growth: MAU targets of 412k in 2025, scaling to 2.3M by 2027.",
        "Gross margins improving from 68% in 2025 to 79% by 2027 with an estimated 63% overall ROI for stakeholders.",
      ],
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Executive Summary</h2>
          <p className="text-lg text-gray-600">
            The AI Powered Kite Travel Agent (KTA) is a transformative solution designed to serve the increasingly
            sophisticated needs of kite enthusiasts worldwide. By leveraging N8N MPC Agents and advanced AI itinerary
            optimization, the KTA will offer a truly personalized travel planning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className="h-full border-t-4"
                style={{
                  borderTopColor:
                    index === 0 ? "#a855f7" : index === 1 ? "#3b82f6" : index === 2 ? "#22c55e" : "#f59e0b",
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4 p-2 rounded-full bg-gray-100">{highlight.icon}</div>
                    <h3 className="text-xl font-semibold">{highlight.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {highlight.points.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
