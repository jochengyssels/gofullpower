import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export function createClient() {
  const cookieStore = cookies()

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
        // Add request timeout to prevent hanging requests
        global: {
          fetch: (...args) => {
            // @ts-ignore - args type is complex
            const [url, options] = args
            return fetch(url, {
              ...options,
              // Add a timeout of 10 seconds
              signal: AbortSignal.timeout(10000), // 10 seconds
            })
          },
        },
      },
    )

    return supabase
  } catch (error) {
    console.error("Error creating Supabase client:", error)
    throw new Error("Failed to initialize Supabase client")
  }
}
