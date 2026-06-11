import { useEffect, useState } from "react"
import { Warp } from "@paper-design/shaders-react"

export function LiquidMetalBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="absolute inset-0 -z-10 bg-[#00042e]" />
  }

  return (
    <div className="absolute inset-0 -z-10">
      <Warp
        style={{ width: "100%", height: "100%" }}
        color1="hsla(255, 100%, 3%, 1)"
        color2="hsla(270, 80%, 18%, 1)"
        color3="hsla(220, 90%, 22%, 1)"
        scale={0.4}
        rotation={0.1}
        speed={0.1}
        proportion={0.3}
        softness={0.9}
        distortion={0.15}
        swirl={0.8}
        swirlIterations={10}
        shapeScale={0.08}
        shape={0}
      />
      {/* Neon overlay glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 30% 60%, rgba(120, 40, 220, 0.18) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(30, 80, 200, 0.15) 0%, transparent 55%)",
        }}
      />
    </div>
  )
}