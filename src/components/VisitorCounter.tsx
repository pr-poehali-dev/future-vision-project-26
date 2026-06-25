import { useVisitorTotal } from "@/hooks/use-visitors"

export function VisitorCounter() {
  const total = useVisitorTotal()

  if (total === null) return null

  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-open-sans-custom"
      style={{
        background: "rgba(168,85,247,0.08)",
        border: "1px solid rgba(168,85,247,0.2)",
        color: "rgba(216,180,254,0.7)",
      }}
    >
      <span style={{ color: "#a78bfa" }}>👁</span>
      <span>{total.toLocaleString("ru-RU")} посетителей</span>
    </div>
  )
}
