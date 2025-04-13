"use client"

import { useEffect } from "react"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

type KitespotGalleryProps = {
  mainImage: string
  additionalImages: string[]
}

export function KitespotGallery({ mainImage, additionalImages }: KitespotGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const allImages = [mainImage, ...additionalImages]

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "auto"
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return

      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen])

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {allImages.slice(0, 8).map((image, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Kitespot image ${index + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={prevImage}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image
              src={allImages[currentImageIndex] || "/placeholder.svg"}
              alt={`Kitespot image ${currentImageIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={nextImage}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
            {currentImageIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </div>
  )
}
