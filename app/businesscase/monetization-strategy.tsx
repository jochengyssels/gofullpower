"use client"

import { motion } from "framer-motion"
import { Building, DollarSign, School, ShoppingBag, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function MonetizationStrategy() {
  const strategies = [
    {
      title: "Kitebrand Partners",
      icon: <ShoppingBag className="h-6 w-6 text-blue-600" />,
      color: "blue",
      valueProps: [
        "White-label KTA integration to enhance brand value and customer stickiness.",
        "Seamless affiliate dashboard for real-time tracking of partner-generated bookings.",
      ],
      revenue: [
        "Commission on Bookings: Earn a 15% commission on every itinerary booked through the KTA.",
        "Projected Revenue: $8.2M in targeted early-stage partnerships.",
      ],
    },
    {
      title: "Kiteschool Owners",
      icon: <School className="h-6 w-6 text-green-600" />,
      color: "green",
      valueProps: [
        "Provide premium SaaS tools that automate bookings, scheduling, and student analytics.",
        "Integrate with local school management systems with over 89% compatibility.",
      ],
      revenue: [
        "Subscription Fee: $299 per month per school.",
        "Projected Revenue: $4.7M by leveraging widespread adoption.",
      ],
    },
    {
      title: "Local Businesses around Kitespots",
      icon: <Building className="h-6 w-6 text-amber-600" />,
      color: "amber",
      valueProps: [
        "Reach a targeted audience through geo-targeted notifications.",
        "Leverage dynamic promotion bidding to match local service providers with travelers.",
      ],
      revenue: [
        "Dynamic CPM Model: Price ranges from $0.25 to $4 per thousand impressions.",
        "Projected Revenue: $3.1M by tapping into local commerce opportunities.",
      ],
    },
    {
      title: "End-Users (Kite Enthusiasts)",
      icon: <Users className="h-6 w-6 text-purple-600" />,
      color: "purple",
      valueProps: [
        "Freemium model offering basic itinerary planning for free.",
        "Premium subscription (KiteTravel Pro) that includes advanced wind alerts, video coaching, and priority customer support.",
      ],
      revenue: [
        "Subscription Fee: $9.99 per month, with approximately 23% of users upgrading.",
        "Projected Revenue: $5.4M from direct consumer monetization.",
      ],
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Monetization Strategy</h2>
          <p className="text-lg text-gray-600">
            The revenue model is segmented into four primary target groups, each with a unique value proposition and
            revenue stream.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {strategies.map((strategy, index) => (
            <motion.div
              key={strategy.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full border-t-4 border-t-${strategy.color}-500`}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-2 bg-${strategy.color}-100 rounded-full mr-4`}>{strategy.icon}</div>
                    <h3 className="text-xl font-semibold">{strategy.title}</h3>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Value Proposition:</h4>
                    <ul className="space-y-2">
                      {strategy.valueProps.map((prop, i) => (
                        <li key={i} className="flex items-start">
                          <span className={`text-${strategy.color}-500 mr-2 mt-1`}>•</span>
                          <span className="text-gray-700">{prop}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Revenue Model:</h4>
                    <ul className="space-y-2">
                      {strategy.revenue.map((rev, i) => (
                        <li key={i} className="flex items-start">
                          <span className={`text-${strategy.color}-500 mr-2 mt-1`}>
                            <DollarSign className="h-4 w-4" />
                          </span>
                          <span className="text-gray-700">{rev}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
