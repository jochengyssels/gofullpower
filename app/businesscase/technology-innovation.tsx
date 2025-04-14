"use client"

import { motion } from "framer-motion"
import { Code, Cpu, Database, Wind } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function TechnologyInnovation() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Technology and Innovation</h2>
          <p className="text-lg text-gray-600">
            The innovation behind the AI Powered Kite Travel Agent is built on state-of-the-art technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-t-4 border-t-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-full mr-4">
                    <Cpu className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold">N8N MPC Agents</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>
                      Provide the backbone for automated decision-making by processing over 57 data points per user.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>
                      Optimize itinerary generation in real time by integrating wind condition analysis, local data, and
                      user preferences.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-t-4 border-t-green-500">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-green-100 rounded-full mr-4">
                    <Database className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Dynamic Pricing Engine & Commission Tracking</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span>
                      Handle over 179k+ services ensuring competitive pricing and real-time revenue adjustments.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span>Streamline commission distribution across integrated partners.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-t-4 border-t-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-purple-100 rounded-full mr-4">
                    <Code className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Itinerary Generation Engine</h3>
                </div>
                <div className="bg-gray-900 text-gray-300 p-4 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>{`def generate_itinerary(user_prefs):
    optimized_route = N8N_MPC.optimize(
        route=wind_data + lodging_info
    )
    local_deals = LocalDealsAPI.fetch(budget=user_prefs['budget'])
    difficulty_adjusted = DifficultyCalculator(
        kiter_skill=user_prefs['level']
    )
    return optimized_route, local_deals, difficulty_adjusted`}</pre>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-t-4 border-t-amber-500">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-amber-100 rounded-full mr-4">
                    <Wind className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Competitive Differentiation</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Feature
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          AI Powered KTA
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Competitors
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900">Real-Time Wind Routing</td>
                        <td className="px-4 py-3 text-sm text-gray-900">✓ Advanced N8N MPC automation</td>
                        <td className="px-4 py-3 text-sm text-gray-900">Manual/Outdated systems</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900">Local Deal Integration</td>
                        <td className="px-4 py-3 text-sm text-gray-900">179k+ available local offers</td>
                        <td className="px-4 py-3 text-sm text-gray-900">&lt;50k</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900">Itinerary Revision AI</td>
                        <td className="px-4 py-3 text-sm text-gray-900">11 dynamic adjustment layers</td>
                        <td className="px-4 py-3 text-sm text-gray-900">3 simplistic layers</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900">Emergency Rescheduling</td>
                        <td className="px-4 py-3 text-sm text-gray-900">Average 94-second response</td>
                        <td className="px-4 py-3 text-sm text-gray-900">8+ hours on average</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
