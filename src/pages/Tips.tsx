import { LiquidMetalBackground } from "@/components/LiquidMetalBackground"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Icon from "@/components/ui/icon"

const AMOUNTS = [100, 200, 300, 500, 1000]

const RECIPIENTS = [
  {
    id: "waiter",
    name: "Вадим Б.",
    phone: "+7 949 798-17-86",
    phoneRaw: "+79497981786",
    bank: "Т-Банк",
    bankColor: "text-yellow-300",
    bankBg: "bg-yellow-400/20 border-yellow-400/30",
    btnColor: "bg-yellow-400 hover:bg-yellow-300 text-black",
    emoji: "🥃",
    label: "Официант",
    hint: "Если вам понравилось обслуживание — поблагодарите официанта.",
  },
  {
    id: "hookah",
    name: "Даниил Р.",
    phone: "+7 949 040-52-69",
    phoneRaw: "+79490405269",
    bank: "СберБанк",
    bankColor: "text-green-300",
    bankBg: "bg-green-500/20 border-green-500/30",
    btnColor: "bg-green-500 hover:bg-green-400 text-white",
    emoji: "💨",
    label: "Кальянщик",
    hint: "Если понравился кальян — чаевые сюда.",
  },
]

function TipCard({ recipient }: { recipient: typeof RECIPIENTS[0] }) {
  const [selected, setSelected] = useState<number | null>(300)
  const [custom, setCustom] = useState("")
  const [copied, setCopied] = useState(false)

  const amount = custom ? parseInt(custom) || 0 : selected || 0

  const copyPhone = () => {
    navigator.clipboard.writeText(recipient.phoneRaw)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 flex flex-col gap-5">
      {/* Получатель */}
      <div className="flex items-center gap-3 pb-4 border-b border-white/10">
        <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-lg ${recipient.bankBg}`}>
          {recipient.emoji}
        </div>
        <div>
          <p className="text-white font-open-sans-custom font-semibold text-sm">{recipient.name}</p>
          <p className="text-gray-400 font-open-sans-custom text-xs">{recipient.phone}</p>
        </div>
        <div className="ml-auto">
          <span className={`text-xs border rounded-full px-2 py-0.5 font-open-sans-custom ${recipient.bankBg} ${recipient.bankColor}`}>
            {recipient.bank}
          </span>
        </div>
      </div>

      {/* Подсказка */}
      <p className="text-gray-400 font-open-sans-custom text-xs leading-relaxed -mt-1">
        {recipient.hint}
      </p>

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

      {/* Инструкция */}
      <div className="rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col gap-2">
        <p className="text-gray-300 font-open-sans-custom text-xs font-semibold uppercase tracking-wider">Как перевести</p>
        <div className="flex items-start gap-2">
          <span className="text-white/50 font-open-sans-custom text-xs font-bold mt-0.5">1.</span>
          <p className="text-gray-300 font-open-sans-custom text-xs">Откройте приложение своего банка</p>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-white/50 font-open-sans-custom text-xs font-bold mt-0.5">2.</span>
          <p className="text-gray-300 font-open-sans-custom text-xs">Перейдите в «Переводы» → «По номеру телефона»</p>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-white/50 font-open-sans-custom text-xs font-bold mt-0.5">3.</span>
          <p className="text-gray-300 font-open-sans-custom text-xs">
            Введите номер{amount > 0 ? ` и сумму ${amount} ₽` : ""}
          </p>
        </div>
      </div>

      {/* Кнопка копирования */}
      <button
        onClick={copyPhone}
        className={`w-full flex items-center justify-center gap-2 rounded-xl py-4 font-open-sans-custom font-semibold text-base active:scale-95 transition-all ${recipient.btnColor}`}
      >
        {copied ? (
          <><Icon name="Check" size={18} />Номер скопирован!</>
        ) : (
          <><Icon name="Copy" size={18} />Скопировать номер</>
        )}
      </button>

      <p className="text-center text-gray-500 font-open-sans-custom text-xs">
        {recipient.phoneRaw} · {recipient.name}
      </p>
    </div>
  )
}

export default function Tips() {
  const [activeTab, setActiveTab] = useState<"waiter" | "hookah">("waiter")
  const navigate = useNavigate()

  const active = RECIPIENTS.find(r => r.id === activeTab)!

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
            Перевод по номеру телефона в любом банке.
          </p>
        </div>

        {/* Табы */}
        <div className="w-full flex rounded-xl overflow-hidden border border-white/10 bg-white/5">
          {RECIPIENTS.map(r => (
            <button
              key={r.id}
              onClick={() => setActiveTab(r.id as "waiter" | "hookah")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-open-sans-custom font-semibold transition-all ${
                activeTab === r.id
                  ? "bg-white/15 text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              <span>{r.emoji}</span>
              <span>{r.label}</span>
            </button>
          ))}
        </div>

        {/* Карточка */}
        <TipCard key={activeTab} recipient={active} />

        <p className="text-white/20 text-xs font-open-sans-custom text-center">
          © 2026 Lounge Bar G80
        </p>
      </div>
    </main>
  )
}
