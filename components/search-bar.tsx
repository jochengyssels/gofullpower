"use client"

import { Search, MapPin, School } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

// Placeholder phrases to cycle through
const placeholders = [
  "golden kite window: ai calculated optimal timeframe",
  "machine learning weather predictions per spot",
  "search spots, schools and ratings",
  "AI travel planner based on your needs",
  "search a kitespot",
]

export function SearchBar() {
  const router = useRouter()
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [currentPlaceholder, setCurrentPlaceholder] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [showAutocomplete, setShowAutocomplete] = useState(false)
  const [kitespotSuggestions, setKitespotSuggestions] = useState<any[]>([])
  const [kiteschoolSuggestions, setKiteschoolSuggestions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close autocomplete
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowAutocomplete(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Animated placeholder effect with 1.5x speed
  useEffect(() => {
    let timeout: NodeJS.Timeout
    const currentText = placeholders[placeholderIndex]

    if (isTyping) {
      if (currentPlaceholder.length < currentText.length) {
        timeout = setTimeout(() => {
          setCurrentPlaceholder(currentText.slice(0, currentPlaceholder.length + 1))
        }, 67) // 100ms / 1.5 = ~67ms for 1.5x speed
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, 1333) // 2000ms / 1.5 = ~1333ms for 1.5x speed
      }
    } else {
      if (currentPlaceholder.length > 0) {
        timeout = setTimeout(() => {
          setCurrentPlaceholder(currentPlaceholder.slice(0, currentPlaceholder.length - 1))
        }, 33) // 50ms / 1.5 = ~33ms for 1.5x speed
      } else {
        timeout = setTimeout(() => {
          setPlaceholderIndex((placeholderIndex + 1) % placeholders.length)
          setIsTyping(true)
        }, 333) // 500ms / 1.5 = ~333ms for 1.5x speed
      }
    }

    return () => clearTimeout(timeout)
  }, [currentPlaceholder, isTyping, placeholderIndex])

  // Fetch suggestions from Supabase
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputValue.length < 2) {
        setKitespotSuggestions([])
        setKiteschoolSuggestions([])
        setShowAutocomplete(false)
        return
      }

      setIsLoading(true)
      const supabase = createClient()

      // Fetch kitespots
      const { data: kitespots } = await supabase
        .from("kitespots_with_images")
        .select("id, name, location, country")
        .ilike("name", `%${inputValue}%`)
        .order("name")
        .limit(5)

      // Fetch kiteschools
      const { data: kiteschools } = await supabase
        .from("kiteschools")
        .select("id, company_name, location, country")
        .ilike("company_name", `%${inputValue}%`)
        .order("company_name")
        .limit(5)

      setKitespotSuggestions(kitespots || [])
      setKiteschoolSuggestions(kiteschools || [])
      setShowAutocomplete((kitespots && kitespots.length > 0) || (kiteschools && kiteschools.length > 0))
      setIsLoading(false)
    }

    const debounceTimer = setTimeout(() => {
      if (inputValue.length >= 2) {
        fetchSuggestions()
      }
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [inputValue])

  const handleSuggestionClick = (type: string, id: string) => {
    if (type === "kitespot") {
      router.push(`/kitespots/${id}`)
    } else if (type === "kiteschool") {
      router.push(`/kiteschools/${id}`)
    }
    setShowAutocomplete(false)
  }

  return (
    <div
      ref={searchRef}
      className={`
        relative flex items-center w-full transition-all duration-300 ease-in-out
        ${isFocused ? "transform scale-105" : ""}
      `}
    >
      <div className="relative w-full">
        <input
          type="text"
          placeholder={isFocused ? "" : currentPlaceholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="
            w-full h-14 pl-5 pr-12
            bg-white/10 backdrop-blur-md
            border border-white/20
            text-white placeholder-blue-200/70
            rounded-full
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
            transition-all duration-300
            text-base
          "
          onFocus={() => {
            setIsFocused(true)
            if (inputValue.length > 0) {
              setShowAutocomplete(true)
            }
          }}
          onBlur={() => setIsFocused(false)}
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          {isLoading ? (
            <div className="h-5 w-5 border-2 border-blue-200 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Search className="h-5 w-5 text-blue-200" />
          )}
        </div>
      </div>

      {/* Autocomplete dropdown */}
      {showAutocomplete && (
        <div
          className="
          absolute top-full left-0 right-0 mt-2
          bg-black/70 backdrop-blur-md
          border border-white/10
          rounded-xl overflow-hidden
          shadow-lg
          z-50
          transition-all duration-300 ease-in-out
          animate-in fade-in slide-in-from-top-5
        "
        >
          {kitespotSuggestions.length > 0 || kiteschoolSuggestions.length > 0 ? (
            <ul className="py-2">
              {/* Kitespots Section */}
              {kitespotSuggestions.length > 0 && (
                <>
                  <li className="px-4 py-1 text-xs text-blue-300 uppercase font-semibold">Kitespots</li>
                  {kitespotSuggestions.map((spot) => (
                    <li
                      key={`spot-${spot.id}`}
                      className="px-4 py-2 hover:bg-white/10 cursor-pointer transition-colors"
                      onClick={() => handleSuggestionClick("kitespot", spot.id)}
                    >
                      <div className="flex items-center">
                        <span className="mr-2">
                          <MapPin className="h-4 w-4 text-blue-400" />
                        </span>
                        <div className="text-base text-white">
                          {spot.name} <span className="text-blue-200/70">({spot.country})</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}

              {/* Kiteschools Section */}
              {kiteschoolSuggestions.length > 0 && (
                <>
                  <li className="px-4 py-1 text-xs text-green-300 uppercase font-semibold mt-2">Kiteschools</li>
                  {kiteschoolSuggestions.map((school) => (
                    <li
                      key={`school-${school.id}`}
                      className="px-4 py-2 hover:bg-white/10 cursor-pointer transition-colors"
                      onClick={() => handleSuggestionClick("kiteschool", school.id)}
                    >
                      <div className="flex items-center">
                        <span className="mr-2">
                          <School className="h-4 w-4 text-green-400" />
                        </span>
                        <div className="text-base text-white">
                          {school.company_name} <span className="text-green-200/70">({school.country})</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          ) : (
            <div className="px-4 py-3 text-blue-200/70">No results found</div>
          )}
        </div>
      )}
    </div>
  )
}
