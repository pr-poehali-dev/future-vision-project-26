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
import { useNavigate } from "react-router-dom"

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.4))" }} />
      <span className="text-[10px] tracking-[0.35em] uppercase font-open-sans-custom font-normal" style={{ color: "rgba(168,85,247,0.7)" }}>
        {children}
      </span>
      <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(168,85,247,0.4), transparent)" }} />
    </div>
  )
}

export function MobileLayout() {
  const navigate = useNavigate()

  return (
    <main className="relative min-h-screen">
      <LiquidMetalBackground />
      <div className="fixed inset-0 z-[5]" style={{ background: "rgba(6, 2, 22, 0.6)" }} />
      <FloatingNavbar />

      <div className="relative z-10 overflow-y-auto">

        {/* ── Hero ──────────────────────────────────────── */}
        <section id="home" className="relative flex min-h-screen items-center justify-center px-5 pt-24 pb-16">
          <div className="absolute inset-0 z-0">
            <img
              src="https://cdn.poehali.dev/projects/842b0b6f-f1be-4985-aa20-a468d555c6e1/bucket/a2f7818f-ebc5-49ee-940c-7a3771b641df.jpeg"
              alt="G80 Bar"
              className="w-full h-full object-cover"
              style={{ opacity: 0.18 }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,2,22,0.5) 0%, rgba(14,4,42,0.25) 50%, rgba(6,2,22,0.75) 100%)" }} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 z-10 neon-divider" />

          <div className="relative z-10 w-full text-center">
            {/* Badge */}
            <div className="mb-5 flex justify-center">
              <span
                className="text-[10px] tracking-[0.45em] uppercase font-open-sans-custom font-normal px-5 py-1.5 rounded-full neon-pulse"
                style={{
                  color: "rgba(216,180,254,0.9)",
                  border: "1px solid rgba(168,85,247,0.35)",
                  background: "rgba(168,85,247,0.08)",
                }}
              >
                Донецк
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-5 text-[2.6rem] leading-[1.1] tracking-tight">
              <span className="font-open-sans-custom neon-purple">Lounge</span>{" "}
              <span className="font-serif italic" style={{ color: "#fdf4ff", textShadow: "0 0 16px rgba(244,114,182,0.7), 0 0 40px rgba(236,72,153,0.4)" }}>Bar</span>{" "}
              <span className="font-open-sans-custom neon-blue">G80</span>
            </h1>

            {/* Subtitle */}
            <p className="mb-10 mx-auto max-w-[280px] text-[0.95rem] leading-relaxed font-open-sans-custom font-light" style={{ color: "rgba(220,210,245,0.75)" }}>
              Авторские коктейли, кальяны и живая атмосфера —{" "}
              <span className="font-serif italic" style={{ color: "rgba(249,168,212,0.85)" }}>в самом сердце Донецка</span>
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col items-center gap-3 w-full max-w-xs mx-auto">
              <ShinyButton
                className="w-full px-6 py-4 text-base cursor-pointer"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Забронировать стол
              </ShinyButton>
              <a
                href="tel:+79494305174"
                className="btn-ghost w-full justify-center text-base"
              >
                <span>📞</span>
                <span>Позвонить</span>
              </a>
              <button
                onClick={() => navigate("/tips")}
                className="btn-ghost w-full justify-center text-base"
              >
                <span>💛</span>
                <span>Оставить чаевые</span>
              </button>
            </div>
          </div>
        </section>

        {/* ── Анонсы ───────────────────────────────────── */}
        <section className="relative px-5 pt-10 pb-6">
          <div className="mx-auto max-w-lg w-full flex flex-col gap-3">
            <a
              href="https://donetsk.qtickets.events/241451-project-x-vecherinka-s-basseynom-glavnyy-gost-goody"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card group w-full flex items-center gap-4 px-5 py-4"
            >
              <span className="text-2xl shrink-0">🏊</span>
              <div className="flex-1 min-w-0">
                <p className="text-white font-open-sans-custom font-semibold text-sm leading-tight">Тусовка у бассейна</p>
                <p className="font-open-sans-custom font-normal text-xs mt-0.5" style={{ color: "rgba(216,180,254,0.7)" }}>Купить билет — нажми сюда</p>
              </div>
              <span className="shrink-0 text-white/30 group-hover:text-white/70 transition-colors">→</span>
            </a>
          </div>
        </section>

        {/* ── ЧМ 2026 ──────────────────────────────────── */}
        <section id="worldcup" className="relative px-5 py-6">
          <div className="mx-auto max-w-lg w-full">
            <WorldCupBanner />
          </div>
        </section>

        <div className="section-divider mx-5" />

        {/* ── Меню ─────────────────────────────────────── */}
        <section id="features" className="relative px-5 py-16">
          <div className="mx-auto max-w-lg w-full">
            <SectionLabel>Меню заведения</SectionLabel>
            <Feature />
          </div>
        </section>

        <div className="section-divider mx-5" />

        {/* ── Напитки и кальяны ────────────────────────── */}
        <section id="pricing" className="relative px-5 py-16">
          <div className="mx-auto w-full max-w-lg">
            <SectionLabel>Барная карта</SectionLabel>
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-open-sans-custom font-bold tracking-tight text-white mb-2">
                Напитки и кальяны
              </h2>
              <p className="font-open-sans-custom font-normal text-sm" style={{ color: "rgba(200,190,230,0.6)" }}>
                Авторские коктейли, шоты, виски, вина и снэки
              </p>
            </div>
            <BentoPricing />
          </div>
        </section>

        <div className="section-divider mx-5" />

        {/* ── Функции ──────────────────────────────────── */}
        <section id="services" className="relative px-5 py-16">
          <div className="mx-auto w-full max-w-lg">
            <SectionLabel>Возможности</SectionLabel>
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-open-sans-custom font-bold tracking-tight text-white mb-2">
                Для вашего вечера
              </h2>
              <p className="font-open-sans-custom font-normal text-sm" style={{ color: "rgba(200,190,230,0.6)" }}>
                Дополнительные услуги и развлечения
              </p>
            </div>
            <ServicesMenu />
          </div>
        </section>

        <div className="section-divider mx-5" />

        {/* ── О баре ───────────────────────────────────── */}
        <section id="about" className="relative px-5 py-16">
          <div className="mx-auto w-full max-w-lg">
            <SectionLabel>История</SectionLabel>
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-open-sans-custom font-bold tracking-tight text-white mb-2">
                О баре G80
              </h2>
              <p className="font-open-sans-custom font-normal text-sm" style={{ color: "rgba(200,190,230,0.6)" }}>
                Место, куда хочется возвращаться
              </p>
            </div>
            <AboutQuote />
          </div>
        </section>

        <div className="section-divider mx-5" />

        {/* ── Контакты ─────────────────────────────────── */}
        <section id="contact" className="relative px-5 py-16 pb-24">
          <div className="mx-auto w-full max-w-lg">
            <SectionLabel>Связь</SectionLabel>
            <ContactCard
              title="Приходите в G80"
              description="Забронируйте столик или задайте любой вопрос. Будем рады видеть вас!"
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

        {/* Footer */}
        <div className="py-4 text-center border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <p className="font-open-sans-custom font-normal text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            © 2026 Lounge Bar G80 · Разработано Буров Вадим
          </p>
        </div>

      </div>
    </main>
  )
}
