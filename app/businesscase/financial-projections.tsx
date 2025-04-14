"use client"

import { motion } from "framer-motion"
import { BarChart, TrendingUp, Users } from "lucide-react"

export function FinancialProjections() {
  const financialData = [
    { year: "2025", mau: 412, arpu: 18.7, margin: 68 },
    { year: "2026", mau: 1100, arpu: 24.9, margin: 73 },
    { year: "2027", mau: 2300, arpu: 31.4, margin: 79 },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Financial Projections</h2>
          <p className="text-lg text-gray-600">
            Implementation of N8N MPC agents results in a 40% reduction in operational costs compared to manual trip
            planning, contributing directly to improved margins and scaling potential.
          </p>
        </div>

        <div className="overflow-x-auto mb-12">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metric
                </th>
                {financialData.map((data) => (
                  <th
                    key={data.year}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {data.year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Monthly Active Users (MAU)
                </td>
                {financialData.map((data) => (
                  <td key={data.year} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.mau}k
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ARPU</td>
                {financialData.map((data) => (
                  <td key={data.year} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${data.arpu}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Gross Margin</td>
                {financialData.map((data) => (
                  <td key={data.year} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.margin}%
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-blue-50 rounded-lg p-6"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-full mr-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">User Growth</h3>
            </div>
            <div className="text-4xl font-bold text-blue-700 mb-2">2.3M</div>
            <p className="text-gray-700">Monthly active users by 2027, starting from 412k in 2025</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-green-50 rounded-lg p-6"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-100 rounded-full mr-4">
                <BarChart className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Revenue Growth</h3>
            </div>
            <div className="text-4xl font-bold text-green-700 mb-2">$31.40</div>
            <p className="text-gray-700">ARPU by 2027, increasing from $18.70 in 2025</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-purple-50 rounded-lg p-6"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-100 rounded-full mr-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold">Margin Improvement</h3>
            </div>
            <div className="text-4xl font-bold text-purple-700 mb-2">79%</div>
            <p className="text-gray-700">Gross margin by 2027, up from 68% in 2025</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
