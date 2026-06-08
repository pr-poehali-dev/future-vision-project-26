import { LiquidMetalBackground } from "@/components/LiquidMetalBackground"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Icon from "@/components/ui/icon"

const AMOUNTS = [100, 200, 300, 500, 1000]
const PHONE = "+79497981786"
const PHONE_DIGITS = "79497981786"
const NAME = "Вадим Б."

export default function Tips() {
  const [selected, setSelected] = useState<number | null>(300)
  const [custom, setCustom] = useState("")
  const navigate = useNavigate()

  const amount = custom ? parseInt(custom) || 0 : selected || 0

  const tinkoffUrl = `https://www.tbank.ru/cf/tips/?phone=${PHONE_DIGITS}${amount ? `&amount=${amount}` : ""}`

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <LiquidMetalBackground />
      <div className="fixed inset-0 z-[5] bg-black/60" />

      <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center gap-6">

        {/* Назад */}
        <button
          onClick={() => navigate("/")}
          className="self-start flex items-center gap-1.5 text-white/50 hover:text-white/80 transition-colors text-sm font-open-sans-custom"
        >
          <Icon name="ArrowLeft" size={16} />
          Назад
        </button>

        {/* Заголовок */}
        <div className="text-center">
          <div className="text-5xl mb-3">🥃</div>
          <h1
            className="text-3xl font-open-sans-custom font-extrabold text-white mb-2"
            style={{ textShadow: "0 0 20px #a78bfa, 0 0 40px #7c3aed" }}
          >
            Чаевые
          </h1>
          <p className="text-gray-300 font-open-sans-custom text-sm leading-relaxed">
            Если вам понравилось — поблагодарите официанта.<br />
            Перевод напрямую на карту Т-Банк.
          </p>
        </div>

        {/* Карточка */}
        <div className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 flex flex-col gap-5">

          {/* Получатель */}
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <div className="w-10 h-10 rounded-full bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center text-lg">
              👤
            </div>
            <div>
              <p className="text-white font-open-sans-custom font-semibold text-sm">{NAME}</p>
              <p className="text-gray-400 font-open-sans-custom text-xs">{PHONE}</p>
            </div>
            <div className="ml-auto">
              <span className="text-xs bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 rounded-full px-2 py-0.5 font-open-sans-custom">
                Т-Банк
              </span>
            </div>
          </div>

          {/* Суммы */}
          <div>
            <p className="text-gray-400 font-open-sans-custom text-xs mb-3">Выберите сумму</p>
            <div className="grid grid-cols-5 gap-2">
              {AMOUNTS.map((a) => (
                <button
                  key={a}
                  onClick={() => { setSelected(a); setCustom("") }}
                  className={`rounded-xl py-2.5 text-sm font-open-sans-custom font-semibold transition-all ${
                    selected === a && !custom
                      ? "bg-white text-black"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Своя сумма */}
          <div>
            <p className="text-gray-400 font-open-sans-custom text-xs mb-2">Или введите свою</p>
            <div className="relative">
              <input
                type="number"
                value={custom}
                onChange={e => { setCustom(e.target.value); setSelected(null) }}
                placeholder="Сумма в рублях"
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-gray-500 rounded-xl px-4 py-3 text-sm font-open-sans-custom outline-none focus:border-white/40 pr-8"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₽</span>
            </div>
          </div>

          {/* Итог */}
          {amount > 0 && (
            <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 flex items-center justify-between">
              <span className="text-gray-400 font-open-sans-custom text-sm">К переводу</span>
              <span className="text-white font-open-sans-custom font-extrabold text-xl">{amount} ₽</span>
            </div>
          )}

          {/* Кнопка оплаты */}
          <a
            href={tinkoffUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full flex items-center justify-center gap-2 rounded-xl py-4 font-open-sans-custom font-semibold text-base transition-all ${
              amount > 0
                ? "bg-yellow-400 text-black hover:bg-yellow-300 active:scale-95"
                : "bg-white/10 text-white/30 pointer-events-none"
            }`}
          >
            <span>💳</span>
            {amount > 0 ? `Перевести ${amount} ₽` : "Укажите сумму"}
          </a>

          <p className="text-center text-gray-500 font-open-sans-custom text-xs">
            Откроется приложение или сайт Т-Банка
          </p>
        </div>

        <p className="text-white/20 text-xs font-open-sans-custom text-center">
          © 2026 Lounge Bar G80
        </p>
      </div>
    </main>
  )
}
