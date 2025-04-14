"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, Search } from "lucide-react"
import Image from "next/image"

export function MarketOpportunity() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Market Opportunity</h2>
          <p className="text-lg text-gray-600">
            Kite tourism is evolving rapidly as more people seek adventure travel experiences that merge sport, culture,
            and exploration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/kitesurfing-paradise.png"
                alt="Kite tourism market opportunity"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-white text-xl font-bold mb-2">$2B+ Potential Market</div>
                <p className="text-white/80">
                  Within the adventure travel sector, the KTA is positioned to capture a sizeable fraction by
                  aggregating disparate planning needs.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-purple-100 rounded-full mr-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">User Trends</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1">•</span>
                  <span>
                    A majority of kite enthusiasts search for destinations based on wind conditions, local support, and
                    unique travel experiences.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1">•</span>
                  <span>
                    Users demand consolidation of fragmented information—from real-time wind forecasts to local travel
                    logistics and gear handling tips.
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 rounded-full mr-4">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Competitive Gap</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  <span>
                    No existing platform provides a fully integrated solution that combines real-time data,
                    hyper-personalized itineraries, and dynamic partner integration.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  <span>
                    The market is ripe for an ecosystem that enhances user experience and monetizes non-addressed
                    spending (up to 63% of kiter spend remains unaddressed).
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-green-100 rounded-full mr-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Opportunity Size</h3>
              </div>
              <p className="text-gray-700">
                With a combined market opportunity potentially exceeding $2B within the adventure travel sector, the KTA
                is positioned to capture a sizeable fraction by aggregating disparate planning needs into a single,
                streamlined experience.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
