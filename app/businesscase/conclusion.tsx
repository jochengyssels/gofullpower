"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Conclusion() {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Conclusion
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg mb-8 text-purple-100"
          >
            The AI Powered Kite Travel Agent is positioned to redefine kite tourism by delivering an unmatched travel
            planning experience. By addressing the fragmented needs of kite travelers—integrating real-time wind data,
            hyper-personalized itineraries, and community-driven insights—the solution not only streamlines planning but
            also unlocks significant new revenue streams for stakeholders.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg mb-12 text-purple-100"
          >
            This business case demonstrates that with robust technology, a clear monetization strategy across diverse
            stakeholder groups, and an aggressive yet feasible roadmap, the AI Powered Kite Travel Agent will capture
            substantial market share while delivering exceptional value for kite enthusiasts, business partners, and
            investors alike.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50">
              Learn More About Our Solution
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
