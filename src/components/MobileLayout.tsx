import { LiquidMetalBackground } from "@/components/LiquidMetalBackground"
import { FloatingNavbar } from "@/components/FloatingNavbar"
import { WorldCupBanner } from "@/components/WorldCupBanner"
import { ShinyButton } from "@/components/ui/shiny-button"
import { Feature } from "@/components/ui/feature-with-advantages"
import { BentoPricing } from "@/components/ui/bento-pricing"
import { ContactCard } from "@/components/ui/contact-card"
import { AboutQuote } from "@/components/ui/about-quote"
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon } from "lucide-react"
import { BookingForm } from "@/components/BookingForm"
import { useNavigate } from "react-router-dom"

export function MobileLayout() {
  const navigate = useNavigate()
  return (
    <main className="relative min-h-screen">
      <LiquidMetalBackground />
      <div className="fixed inset-0 z-[5] bg-black/50" />
      <FloatingNavbar />

      <div className="relative z-10 overflow-y-auto">
        {/* Hero */}
        <section id="home" className="relative flex min-h-screen items-center justify-center px-4 pt-20 pb-12">
          <div className="absolute inset-0 z-0">
            <img
              src="https://cdn.poehali.dev/projects/842b0b6f-f1be-4985-aa20-a468d555c6e1/files/4bccf198-b008-450e-ad52-d6d72ed0a280.jpg"
              alt="G80 Bar"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="relative z-10 w-full text-center">
            <h1
              className="mb-4 text-4xl tracking-tight"
              style={{ textShadow: "0 0 20px #a78bfa, 0 0 40px #7c3aed, 0 0 80px #4f46e5", color: "#fff" }}
            >
              <span className="font-open-sans-custom not-italic">Lounge</span>{" "}
              <span className="font-serif italic" style={{ textShadow: "0 0 20px #f472b6, 0 0 40px #ec4899, 0 0 80px #be185d", color: "#fdf4ff" }}>Bar</span>{" "}
              <span className="font-open-sans-custom not-italic" style={{ textShadow: "0 0 20px #60a5fa, 0 0 40px #3b82f6, 0 0 80px #1d4ed8", color: "#fff" }}>G80</span>
            </h1>
            <p
              className="mb-8 mx-auto max-w-sm text-base leading-relaxed font-thin font-open-sans-custom tracking-wide"
              style={{ color: "#e2d9f3", textShadow: "0 0 10px rgba(167,139,250,0.4)" }}
            >
              Авторские коктейли, кальяны и живая атмосфера —{" "}
              <span className="font-serif italic" style={{ color: "#f9a8d4", textShadow: "0 0 10px rgba(244,114,182,0.6)" }}>в самом сердце Донецка</span>
            </p>
            <div className="flex flex-col items-center gap-3">
              <ShinyButton
                className="w-full max-w-xs px-6 py-4 text-base cursor-pointer"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Забронировать стол
              </ShinyButton>
              <a
                href="tel:+79494305174"
                className="w-full max-w-xs flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white text-base font-open-sans-custom"
              >
                <span>📞</span>
                <span>Позвонить</span>
              </a>
              <button
                onClick={() => navigate("/tips")}
                className="w-full max-w-xs flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-yellow-400/30 bg-yellow-400/10 text-yellow-300 text-base font-open-sans-custom hover:bg-yellow-400/20 transition-colors"
              >
                <span>💛</span>
                <span>Оставить чаевые</span>
              </button>
            </div>
          </div>
        </section>

        {/* ЧМ 2026 */}
        <section className="relative px-4 py-8">
          <div className="relative z-10 mx-auto max-w-lg w-full">
            <WorldCupBanner />
          </div>
        </section>

        {/* Меню */}
        <section id="features" className="relative px-4 py-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 size-full pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:12px_12px] opacity-30"
          />
          <div className="relative z-10 mx-auto max-w-lg w-full">
            <Feature />
          </div>
        </section>

        {/* Напитки и кальяны */}
        <section id="pricing" className="relative px-4 py-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 size-full pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:12px_12px] opacity-30"
          />
          <div className="relative z-10 mx-auto w-full max-w-lg">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-white font-open-sans-custom [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)]">
                Напитки и кальяны
              </h2>
              <p className="text-gray-300 mt-3 text-sm font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
                Авторские коктейли, шоты, виски, вина, кальяны и снэки.
              </p>
            </div>
            <BentoPricing />
          </div>
        </section>

        {/* О баре */}
        <section id="about" className="relative px-4 py-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 size-full pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:12px_12px] opacity-30"
          />
          <div className="relative z-10 mx-auto w-full max-w-lg">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-white font-open-sans-custom [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)]">
                О баре G80
              </h2>
              <p className="text-gray-300 mt-3 text-sm font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
                Место, куда хочется возвращаться.
              </p>
            </div>
            <AboutQuote />
          </div>
        </section>

        {/* Контакты */}
        <section id="contact" className="relative px-4 py-16 pb-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 size-full pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:12px_12px] opacity-30"
          />
          <div className="relative z-10 mx-auto w-full max-w-lg">
            <ContactCard
              title="Приходите в G80"
              description="Забронируйте столик или задайте любой вопрос."
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
