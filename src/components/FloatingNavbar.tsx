import { useState, useEffect } from "react"
import Icon from "@/components/ui/icon"

export function FloatingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })
    }
    setMenuOpen(false)
  }

  const navLinks = [
    { id: "worldcup", label: "⚽ ЧМ 2026" },
    { id: "features", label: "Меню" },
    { id: "pricing", label: "Напитки" },
    { id: "services", label: "Функции" },
    { id: "about", label: "О баре" },
    { id: "contact", label: "Контакты" },
  ]

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 pb-2">
      <div
        className="mx-auto max-w-7xl rounded-2xl px-5 py-3 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(8, 4, 28, 0.85)"
            : "rgba(8, 4, 28, 0.6)",
          border: "1px solid rgba(168, 85, 247, 0.2)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: scrolled
            ? "0 4px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,85,247,0.1)"
            : "0 2px 16px rgba(0,0,0,0.3)",
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollToSection("home")} className="cursor-pointer group">
            <span
              className="font-open-sans-custom text-xl tracking-widest transition-all duration-300"
              style={{
                color: "#e9d5ff",
                textShadow: "0 0 8px rgba(168,85,247,0.8), 0 0 20px rgba(168,85,247,0.4)",
                letterSpacing: "0.15em",
              }}
            >
              G80
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-open-sans-custom font-normal text-white/55 hover:text-white/95 transition-all duration-200 hover:tracking-wide"
                style={{ letterSpacing: "0.02em" }}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Book button */}
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-open-sans-custom font-semibold text-white transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, rgba(168,85,247,0.3) 0%, rgba(56,189,248,0.2) 100%)",
                border: "1px solid rgba(168,85,247,0.45)",
                boxShadow: "0 0 12px rgba(168,85,247,0.15)",
              }}
            >
              Забронировать стол
            </button>

            {/* Burger */}
            <button
              className="flex md:hidden items-center justify-center w-9 h-9 rounded-xl text-white/70 hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Меню"
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={18} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="mt-3 flex flex-col gap-1 border-t pt-3 md:hidden" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="w-full text-left px-3 py-3 rounded-xl text-sm font-open-sans-custom font-normal text-white/65 hover:text-white hover:bg-white/6 transition-all"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="mt-2 w-full py-3 rounded-xl text-sm font-open-sans-custom font-semibold text-white transition-all"
              style={{
                background: "linear-gradient(135deg, rgba(168,85,247,0.3) 0%, rgba(56,189,248,0.2) 100%)",
                border: "1px solid rgba(168,85,247,0.4)",
              }}
            >
              Забронировать стол
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
