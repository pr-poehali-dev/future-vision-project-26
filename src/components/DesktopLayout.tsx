import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { LiquidMetalBackground } from "@/components/LiquidMetalBackground"
import { FloatingNavbar } from "@/components/FloatingNavbar"
import { WorldCupBanner } from "@/components/WorldCupBanner"
import { ShinyButton } from "@/components/ui/shiny-button"
import { Feature } from "@/components/ui/feature-with-advantages"
import { BentoPricing } from "@/components/ui/bento-pricing"
import { ServicesMenu } from "@/components/ui/services-menu"
import { ContactCard } from "@/components/ui/contact-card"
import { AboutQuote } from "@/components/ui/about-quote"
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon } from "lucide-react"
import { BookingForm } from "@/components/BookingForm"

function SectionHeading({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-12 text-center">
      <div className="flex items-center justify-center gap-3 mb-5">
        <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.5))" }} />
        <span className="text-[10px] tracking-[0.4em] uppercase font-open-sans-custom font-normal" style={{ color: "rgba(168,85,247,0.65)" }}>{label}</span>
        <div className="h-px w-16" style={{ background: "linear-gradient(90deg, rgba(168,85,247,0.5), transparent)" }} />
      </div>
      <h2 className="text-4xl lg:text-5xl font-open-sans-custom font-bold tracking-tight text-white mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="font-open-sans-custom font-normal text-base" style={{ color: "rgba(200,190,230,0.6)" }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

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

      if (currentSection === 3 && pricingSectionRef.current) {
        const pricingSection = pricingSectionRef.current
        const isAtTop = pricingSection.scrollTop === 0
        const isAtBottom = pricingSection.scrollTop + pricingSection.clientHeight >= pricingSection.scrollHeight - 1
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

      if (currentSection === 4 && aboutSectionRef.current) {
        const aboutSection = aboutSectionRef.current
        const isAtTop = aboutSection.scrollTop === 0
        const isAtBottom = aboutSection.scrollTop + aboutSection.clientHeight >= aboutSection.scrollHeight - 1
        if (delta > 0 && !isAtBottom) return
        if (delta < 0 && !isAtTop) return
        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({ left: 3 * containerWidth, behavior: "smooth" })
          return
        }
        if (delta > 0 && isAtBottom) {
          e.preventDefault()
          scrollContainer.scrollTo({ left: 5 * containerWidth, behavior: "smooth" })
          return
        }
      }

      if (currentSection === 5 && contactSectionRef.current) {
        const contactSection = contactSectionRef.current
        const isAtTop = contactSection.scrollTop === 0
        const isAtBottom = contactSection.scrollTop + contactSection.clientHeight >= contactSection.scrollHeight - 1
        if (delta > 0 && !isAtBottom) return
        if (delta < 0 && !isAtTop) return
        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({ left: 4 * containerWidth, behavior: "smooth" })
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
        if (delta > 0) targetSection = Math.min(currentSection + 1, 5)
        else targetSection = Math.max(currentSection - 1, 0)
        scrollContainer.scrollTo({ left: targetSection * containerWidth, behavior: "smooth" })
      }
    }

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false })
    return () => scrollContainer.removeEventListener("wheel", handleWheel)
  }, [])

  return (
    <main className="relative h-screen overflow-hidden">
      <LiquidMetalBackground />
      <div className="fixed inset-0 z-[5]" style={{ background: "rgba(6, 2, 22, 0.58)" }} />
      <FloatingNavbar />

      <div
        ref={scrollContainerRef}
        className="relative z-10 flex h-screen w-full overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >

        {/* ── Home ─────────────────────────────────────── */}
        <section id="home" className="flex min-w-full snap-start items-center justify-center px-10 py-20 relative">
          <div className="absolute inset-0 z-0">
            <img
              src="https://cdn.poehali.dev/projects/842b0b6f-f1be-4985-aa20-a468d555c6e1/bucket/a2f7818f-ebc5-49ee-940c-7a3771b641df.jpeg"
              alt="G80 Bar"
              className="w-full h-full object-cover"
              style={{ opacity: 0.15 }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,2,22,0.5) 0%, rgba(14,4,42,0.2) 50%, rgba(6,2,22,0.7) 100%)" }} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 z-10 neon-divider" />

          <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-2 gap-16 items-center">

            {/* Left — заголовок и кнопки */}
            <div className="flex flex-col items-start">
              <div className="mb-5">
                <span
                  className="text-[10px] tracking-[0.45em] uppercase font-open-sans-custom font-normal px-5 py-1.5 rounded-full neon-pulse"
                  style={{
                    color: "rgba(216,180,254,0.85)",
                    border: "1px solid rgba(168,85,247,0.3)",
                    background: "rgba(168,85,247,0.07)",
                  }}
                >
                  Донецк
                </span>
              </div>

              <h1 className="mb-5 text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] leading-[1.0] tracking-tight">
                <span className="font-open-sans-custom neon-purple">Lounge</span>{" "}
                <span className="font-serif italic block" style={{ color: "#fdf4ff", textShadow: "0 0 16px rgba(244,114,182,0.65), 0 0 40px rgba(236,72,153,0.3)" }}>Bar</span>
                <span className="font-open-sans-custom neon-blue">G80</span>
              </h1>

              <p className="mb-9 text-[1rem] leading-relaxed font-open-sans-custom font-light max-w-sm" style={{ color: "rgba(220,210,245,0.7)" }}>
                Авторские коктейли, кальяны и живая атмосфера —{" "}
                <span className="font-serif italic" style={{ color: "rgba(249,168,212,0.8)" }}>в самом сердце Донецка</span>
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <ShinyButton
                  className="px-7 py-3 text-sm cursor-pointer"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })}
                >
                  Забронировать стол
                </ShinyButton>
                <a href="tel:+79494305174" className="btn-ghost text-sm px-5 py-3">
                  <span>📞</span><span>Позвонить</span>
                </a>
                <button onClick={() => navigate("/tips")} className="btn-ghost text-sm px-5 py-3">
                  <span>💛</span><span>Чаевые</span>
                </button>
              </div>
            </div>

            {/* Right — плашка бассейн */}
            <div className="flex flex-col gap-4">
              <a
                href="https://donetsk.qtickets.events/241451-project-x-vecherinka-s-basseynom-glavnyy-gost-goody"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card group flex items-center gap-4 px-6 py-5"
              >
                <span className="text-3xl shrink-0">🏊</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-open-sans-custom font-semibold text-base leading-tight">Тусовка у бассейна</p>
                  <p className="font-open-sans-custom font-normal text-xs mt-1" style={{ color: "rgba(216,180,254,0.65)" }}>Купить билет — нажми сюда</p>
                </div>
                <span className="shrink-0 text-white/25 group-hover:text-white/70 transition-colors text-lg">→</span>
              </a>

              {/* Подсказка навигации */}
              <div className="text-center mt-4">
                <p className="font-open-sans-custom font-normal text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
                  Прокрути вниз для навигации →
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── ЧМ 2026 ──────────────────────────────────── */}
        <section id="worldcup" className="flex min-w-full snap-start items-center justify-center px-10 py-20 relative">
          <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(16, 60, 20, 0.15) 0%, transparent 70%)" }} />
          <div className="relative z-10 w-full max-w-3xl mx-auto">
            <SectionHeading
              label="Спорт в баре"
              title="Чемпионат мира 2026"
              subtitle="Смотрим все матчи в G80 Lounge Bar"
            />
            <WorldCupBanner />
          </div>
        </section>

        {/* ── Меню ─────────────────────────────────────── */}
        <section id="features" className="flex min-w-full snap-start items-center justify-center px-10 py-20">
          <div className="mx-auto max-w-7xl w-full">
            <SectionHeading label="Заведение" title="Меню" subtitle="Всё, что мы предлагаем" />
            <Feature />
          </div>
        </section>

        {/* ── Напитки ──────────────────────────────────── */}
        <section
          id="pricing"
          ref={pricingSectionRef}
          className="relative min-w-full snap-start overflow-y-auto px-10 pt-24 pb-20 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="relative z-10 mx-auto w-full max-w-6xl">
            <SectionHeading
              label="Барная карта"
              title="Напитки и кальяны"
              subtitle="Авторские коктейли, шоты, виски, вина, кальяны и снэки"
            />
            <BentoPricing />
          </div>
        </section>

        {/* ── О баре ───────────────────────────────────── */}
        <section
          id="about"
          ref={aboutSectionRef}
          className="relative min-w-full snap-start overflow-y-auto px-10 pt-24 pb-20 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="relative z-10 mx-auto w-full max-w-7xl">
            <SectionHeading
              label="История"
              title="О баре G80"
              subtitle="Место, куда хочется возвращаться — атмосфера, сервис и напитки на высшем уровне"
            />
            <AboutQuote />
          </div>
        </section>

        {/* ── Контакты ─────────────────────────────────── */}
        <section
          id="contact"
          ref={contactSectionRef}
          className="relative min-w-full snap-start overflow-y-auto px-10 pt-24 pb-20 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <SectionHeading label="Связь" title="Приходите в G80" />
            <ContactCard
              title=""
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

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-20 py-2 text-center">
        <p className="font-open-sans-custom font-normal text-xs" style={{ color: "rgba(255,255,255,0.18)" }}>
          © 2026 Lounge Bar G80 · Разработано Буров Вадим
        </p>
      </div>
    </main>
  )
}
