import { SearchBar } from "@/components/search-bar"
import { Navbar } from "@/components/navbar"
import { AnimatedTitle } from "@/components/animated-title"
import Image from "next/image"

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <Navbar />

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image src="/kitesurfing-sunset.jpg" alt="Kitesurfing at sunset" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <AnimatedTitle />
          <p className="mt-3 text-blue-200 text-lg sm:text-xl font-normal">
            AI-powered wind prediction for ultimate rides
          </p>
        </div>

        <div className="w-full max-w-xl">
          <SearchBar />
        </div>
      </div>
    </main>
  )
}
