import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { LiquidMetalBackground } from "@/components/LiquidMetalBackground"
import { FloatingNavbar } from "@/components/FloatingNavbar"
import { WorldCupBanner } from "@/components/WorldCupBanner"
import { ShinyButton } from "@/components/ui/shiny-button"
import { Feature } from "@/components/ui/feature-with-advantages"
import { BentoPricing } from "@/components/ui/bento-pricing"
import { ContactCard } from "@/components/ui/contact-card"
import { AboutQuote } from "@/components/ui/about-quote"
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { BookingForm } from "@/components/BookingForm"

export function DesktopLayout() {
  const navigate = useNavigate()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const pricingSectionRef = useRef<HTMLDivElement>(null)
  const aboutSectionRef = useRef<HTMLDivElement>(null)
  const contactSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY
      const currentScroll = scrollContainer.scrollLeft
      const containerWidth = scrollContainer.offsetWidth
      const currentSection = Math.round(currentScroll / containerWidth)

      if (currentSection === 2 && pricingSectionRef.current) {
        const pricingSection = pricingSectionRef.current
        const isAtTop = pricingSection.scrollTop === 0
        const isAtBottom = pricingSection.scrollTop + pricingSection.clientHeight >= pricingSection.scrollHeight - 1

        if (delta > 0 && !isAtBottom) return
        if (delta < 0 && !isAtTop) return

        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({ left: 1 * containerWidth, behavior: "smooth" })
          return
        }
        if (delta > 0 && isAtBottom) {
          e.preventDefault()
          scrollContainer.scrollTo({ left: 3 * containerWidth, behavior: "smooth" })
          return
        }
      }

      if (currentSection === 3 && aboutSectionRef.current) {
        const aboutSection = aboutSectionRef.current
        const isAtTop = aboutSection.scrollTop === 0
        const isAtBottom = aboutSection.scrollTop + aboutSection.clientHeight >= aboutSection.scrollHeight - 1

        if (delta > 0 && !isAtBottom) return
        if (delta < 0 && !isAtTop) return

        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({ left: 2 * containerWidth, behavior: "smooth" })
          return
        }
        if (delta > 0 && isAtBottom) {
          e.preventDefault()
          scrollContainer.scrollTo({ left: 4 * containerWidth, behavior: "smooth" })
          return
        }
      }

      if (currentSection === 4 && contactSectionRef.current) {
        const contactSection = contactSectionRef.current
        const isAtTop = contactSection.scrollTop === 0
        const isAtBottom = contactSection.scrollTop + contactSection.clientHeight >= contactSection.scrollHeight - 1

        if (delta > 0 && !isAtBottom) return
        if (delta < 0 && !isAtTop) return

        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({ left: 3 * containerWidth, behavior: "smooth" })
          return
        }
        if (delta > 0 && isAtBottom) {
          e.preventDefault()
          return
        }
      }

      e.preventDefault()

      if (Math.abs(delta) > 10) {
        let targetSection = currentSection
        if (delta > 0) {
          targetSection = Math.min(currentSection + 1, 4)
        } else {
          targetSection = Math.max(currentSection - 1, 0)
        }
        scrollContainer.scrollTo({ left: targetSection * containerWidth, behavior: "smooth" })
      }
    }

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false })
    return () => scrollContainer.removeEventListener("wheel", handleWheel)
  }, [])

  return (
    <main className="relative h-screen overflow-hidden">
      <LiquidMetalBackground />
      <div className="fixed inset-0 z-[5] bg-black/50" />
      <FloatingNavbar />

      <div
        ref={scrollContainerRef}
        className="relative z-10 flex h-screen w-full overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <section id="home" className="flex min-w-full snap-start items-center justify-center px-4 py-16 md:py-20 relative">
          <div className="absolute inset-0 z-0">
            <img
              src="https://cdn.poehali.dev/projects/842b0b6f-f1be-4985-aa20-a468d555c6e1/files/4bccf198-b008-450e-ad52-d6d72ed0a280.jpg"
              alt="G80 Bar"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="mx-auto max-w-4xl relative z-10 w-full">
            <div className="text-center px-2">
              <h1 className="mb-5 text-balance text-4xl sm:text-5xl tracking-tight md:text-6xl lg:text-8xl"
                style={{ textShadow: "0 0 20px #a78bfa, 0 0 40px #7c3aed, 0 0 80px #4f46e5", color: "#fff" }}>
                <span className="font-open-sans-custom not-italic">Lounge</span>{" "}
                <span className="font-serif italic" style={{ textShadow: "0 0 20px #f472b6, 0 0 40px #ec4899, 0 0 80px #be185d", color: "#fdf4ff" }}>Bar</span>{" "}
                <span className="font-open-sans-custom not-italic" style={{ textShadow: "0 0 20px #60a5fa, 0 0 40px #3b82f6, 0 0 80px #1d4ed8", color: "#fff" }}>G80</span>
              </h1>
              <p className="mb-8 mx-auto max-w-lg text-pretty leading-relaxed font-thin font-open-sans-custom tracking-wide text-base md:text-xl"
                style={{ color: "#e2d9f3", textShadow: "0 0 10px rgba(167,139,250,0.4)" }}>
                Авторские коктейли, кальяны и живая атмосфера —{" "}
                <span className="font-serif italic" style={{ color: "#f9a8d4", textShadow: "0 0 10px rgba(244,114,182,0.6)" }}>в самом сердце Донецка</span>
              </p>
              <div className="flex justify-center items-center gap-3 flex-wrap">
                <ShinyButton
                  className="px-6 py-3 text-sm md:text-base cursor-pointer"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })}
                >
                  Забронировать стол
                </ShinyButton>
                <a
                  href="tel:+79494305174"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white text-sm md:text-base font-open-sans-custom hover:bg-white/10 transition-colors"
                >
                  <span>📞</span>
                  <span>Позвонить</span>
                </a>
                <button
                  onClick={() => navigate("/tips")}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-yellow-400/30 bg-yellow-400/10 text-yellow-300 text-sm md:text-base font-open-sans-custom hover:bg-yellow-400/20 transition-colors"
                >
                  <span>💛</span>
                  <span>Чаевые</span>
                </button>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-4xl relative z-10 w-full mt-8 px-2">
            <WorldCupBanner />
          </div>
        </section>

        <section id="features" className="flex min-w-full snap-start items-center justify-center px-3 md:px-4 py-16 md:py-20">
          <div className="mx-auto max-w-7xl w-full">
            <Feature />
          </div>
        </section>

        <section
          id="pricing"
          ref={pricingSectionRef}
          className="relative min-w-full snap-start overflow-y-auto px-3 md:px-4 pt-20 md:pt-24 pb-16 md:pb-20 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 z-0 size-full pointer-events-none",
              "bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]",
              "bg-[size:12px_12px]",
              "opacity-30",
            )}
          />
          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight lg:text-6xl text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom">
                Напитки и кальяны
              </h1>
              <p className="text-gray-300 mt-4 text-sm md:text-base font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
                Полный каталог нашего бара — авторские коктейли, шоты, виски, вина, кальяны и снэки.
              </p>
            </div>
            <BentoPricing />
          </div>
        </section>

        <section
          id="about"
          ref={aboutSectionRef}
          className="relative min-w-full snap-start overflow-y-auto px-3 md:px-4 pt-20 md:pt-24 pb-16 md:pb-20 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 z-0 size-full pointer-events-none",
              "bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]",
              "bg-[size:12px_12px]",
              "opacity-30",
            )}
          />
          <div className="relative z-10 mx-auto w-full max-w-7xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight lg:text-6xl text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom">
                О баре G80
              </h1>
              <p className="text-gray-300 mt-4 text-sm md:text-base font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
                Место, куда хочется возвращаться. Атмосфера, сервис и напитки — на высшем уровне.
              </p>
            </div>
            <AboutQuote />
          </div>
        </section>

        <section
          id="contact"
          ref={contactSectionRef}
          className="relative min-w-full snap-start overflow-y-auto px-3 md:px-4 pt-20 md:pt-24 pb-16 md:pb-20"
        >
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 z-0 size-full pointer-events-none",
              "bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]",
              "bg-[size:12px_12px]",
              "opacity-30",
            )}
          />
          <div className="relative z-10 mx-auto w-full max-w-5xl mt-[5vh]">
            <ContactCard
              title="Приходите в G80"
              description="Забронируйте столик или задайте любой вопрос. Будем рады видеть вас в нашем баре!"
              contactInfo={[
                { icon: MapPinIcon, label: "Адрес", value: "Донецк, ул. Постышева, 120" },
                { icon: PhoneIcon, label: "Телефон", value: "+7 949 430 5174" },
                { icon: SendIcon, label: "Telegram", value: "@vadimbG80" },
                { icon: MailIcon, label: "Режим работы", value: "Пн–Чт: 14:00–23:00 · Пт–Пн: 14:00–06:00" },
              ]}
            >
              <BookingForm />
            </ContactCard>
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 py-2 text-center">
        <p className="text-white/30 text-xs font-open-sans-custom">
          © 2026 Lounge Bar G80 · Разработано Буров Вадим
        </p>
      </div>
    </main>
  )
}
