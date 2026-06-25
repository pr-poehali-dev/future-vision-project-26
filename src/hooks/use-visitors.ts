import { useEffect, useState } from "react"

const VISITORS_URL = "https://functions.poehali.dev/7bf1d74b-fd3b-4ff4-b04e-10724edc25b3"

export type VisitorStats = {
  total: number
  today: number
  week: number
  month: number
  daily: { date: string; count: number }[]
}

async function fetchWithTimeout(url: string, options: RequestInit = {}, ms = 5000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), ms)
  try {
    const res = await fetch(url, { ...options, signal: controller.signal })
    clearTimeout(id)
    return res
  } catch (e) {
    clearTimeout(id)
    throw e
  }
}

// Глобальный кеш — чтобы не делать два запроса при рендере
let cachedTotal: number | null = null

export function useTrackVisit() {
  useEffect(() => {
    // Отправляем визит и сохраняем total в кеш
    fetchWithTimeout(VISITORS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: window.location.pathname }),
    })
      .then((r) => r.json())
      .then((data) => {
        const parsed = typeof data === "string" ? JSON.parse(data) : data
        if (parsed.total !== undefined) cachedTotal = parsed.total
      })
      .catch(() => {})
  }, [])
}

export function useVisitorStats() {
  const [stats, setStats] = useState<VisitorStats | null>(null)
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    fetchWithTimeout(VISITORS_URL)
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

export function useVisitorTotal() {
  const [total, setTotal] = useState<number | null>(cachedTotal)

  useEffect(() => {
    if (cachedTotal !== null) { setTotal(cachedTotal); return }
    fetchWithTimeout(VISITORS_URL)
      .then((r) => r.json())
      .then((data) => {
        const parsed = typeof data === "string" ? JSON.parse(data) : data
        cachedTotal = parsed.total
        setTotal(parsed.total)
      })
      .catch(() => {})
  }, [])

  return total
}
