import { createBrowserClient } from "@supabase/ssr"

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (supabaseClient) return supabaseClient

  supabaseClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
      },
      global: {
        fetch: (...args) => {
          return fetch(...args)
        },
      },
      // Add reasonable timeouts to prevent hanging requests
      realtime: {
        timeout: 10000, // 10 seconds
      },
    },
  )

  return supabaseClient
}
