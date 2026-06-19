export function LiquidMetalBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #04011a 0%, #0d0330 35%, #080220 60%, #020118 100%)",
        }}
      />
      {/* Purple glow top-left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 20% 25%, rgba(120, 40, 220, 0.22) 0%, transparent 55%)",
        }}
      />
      {/* Blue glow bottom-right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 75%, rgba(30, 80, 200, 0.18) 0%, transparent 55%)",
        }}
      />
      {/* Subtle pink accent center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 55% 45%, rgba(160, 30, 100, 0.1) 0%, transparent 50%)",
        }}
      />
    </div>
  )
}
