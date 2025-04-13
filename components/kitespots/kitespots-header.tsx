import Image from "next/image"

export function KitespotsHeader() {
  return (
    <div className="relative h-[300px] w-full overflow-hidden">
      {/* Background Image */}
      <Image src="/kitesurfing-aerial.jpg" alt="Kitesurfing aerial view" fill priority className="object-cover" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl font-light mb-4 text-white">Discover Kitespots</h1>
        <p className="max-w-2xl mx-auto text-blue-100">
          Explore the world's best kiteboarding destinations with AI-powered wind predictions and community insights
        </p>
      </div>
    </div>
  )
}
