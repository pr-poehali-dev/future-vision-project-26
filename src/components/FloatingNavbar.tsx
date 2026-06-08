import { useState } from "react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

export function FloatingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })
    }
    setMenuOpen(false)
  }

  const navLinks = [
    { id: "features", label: "Меню" },
    { id: "pricing", label: "Напитки" },
    { id: "about", label: "О баре" },
    { id: "contact", label: "Контакты" },
  ]

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 px-3 py-3 md:px-4 md:py-4">
      <div className="mx-auto max-w-7xl rounded-2xl border-2 border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm md:px-6 md:py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => scrollToSection("home")} className="cursor-pointer">
            <span
              className="font-semibold text-lg md:text-xl font-open-sans-custom tracking-tight"
              style={{ color: "#fff", textShadow: "0 0 10px #a78bfa, 0 0 20px #7c3aed" }}
            >
              G80
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-open-sans-custom text-gray-300 transition-colors hover:text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => scrollToSection("contact")}
              className="hidden md:flex bg-white text-black hover:bg-gray-100 font-open-sans-custom text-sm"
            >
              Забронировать стол
            </Button>

            {/* Burger button */}
            <button
              className="flex md:hidden items-center justify-center w-9 h-9 rounded-lg bg-white/10 text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Меню"
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="mt-3 flex flex-col gap-1 border-t border-white/10 pt-3 md:hidden">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-open-sans-custom text-gray-200 hover:bg-white/10 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("contact")}
              className="mt-2 w-full bg-white text-black hover:bg-gray-100 font-open-sans-custom text-sm"
            >
              Забронировать стол
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}