import { useEffect, useState } from "react"

const VISITORS_URL = "https://functions.poehali.dev/7bf1d74b-fd3b-4ff4-b04e-10724edc25b3"

export type VisitorStats = {
  total: number
  today: number
  week: number
  month: number
  daily: { date: string; count: number }[]
}

export function useTrackVisit() {
  useEffect(() => {
    fetch(VISITORS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: window.location.pathname }),
    }).catch(() => {})
  }, [])
}

export function useVisitorStats() {
  const [stats, setStats] = useState<VisitorStats | null>(null)
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    fetch(VISITORS_URL)
      .then((r) => r.json())
      .then((data) => {
        const parsed = typeof data === "string" ? JSON.parse(data) : data
        setStats(parsed)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  return { stats, loading, reload: load }
}
