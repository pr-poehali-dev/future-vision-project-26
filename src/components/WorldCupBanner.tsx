import { useState } from "react"

const matches = [
  // 16 июня
  { date: "16 июня", day: "Пн", time: "22:00", team1: "🇫🇷 Франция", team2: "🇸🇳 Сенегал", group: "I" },
  // 17 июня
  { date: "17 июня", day: "Вт", time: "01:00", team1: "🇮🇶 Ирак", team2: "🇳🇴 Норвегия", group: "J" },
  { date: "17 июня", day: "Вт", time: "04:00", team1: "🇦🇷 Аргентина", team2: "🇩🇿 Алжир", group: "D" },
  { date: "17 июня", day: "Вт", time: "07:00", team1: "🇦🇹 Австрия", team2: "🇯🇴 Иордания", group: "K" },
  { date: "17 июня", day: "Вт", time: "20:00", team1: "🇵🇹 Португалия", team2: "🇨🇩 ДР Конго", group: "H" },
  { date: "17 июня", day: "Вт", time: "23:00", team1: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Англия", team2: "🇭🇷 Хорватия", group: "B" },
  // 18 июня
  { date: "18 июня", day: "Ср", time: "02:00", team1: "🇬🇭 Гана", team2: "🇵🇦 Панама", group: "A" },
  { date: "18 июня", day: "Ср", time: "05:00", team1: "🇺🇿 Узбекистан", team2: "🇨🇴 Колумбия", group: "L" },
  { date: "18 июня", day: "Ср", time: "19:00", team1: "🇨🇿 Чехия", team2: "🇿🇦 ЮАР", group: "F" },
  { date: "18 июня", day: "Ср", time: "22:00", team1: "🇨🇭 Швейцария", team2: "🇧🇦 Босния", group: "A" },
  // 19 июня
  { date: "19 июня", day: "Чт", time: "01:00", team1: "🇨🇦 Канада", team2: "🇶🇦 Катар", group: "A" },
  { date: "19 июня", day: "Чт", time: "04:00", team1: "🇲🇽 Мексика", team2: "🇰🇷 Южная Корея", group: "F" },
  { date: "19 июня", day: "Чт", time: "22:00", team1: "🇺🇸 США", team2: "🇦🇺 Австралия", group: "D" },
  // 20 июня
  { date: "20 июня", day: "Пт", time: "01:00", team1: "🏴󠁧󠁢󠁳󠁣󠁴󠁿 Шотландия", team2: "🇲🇦 Марокко", group: "C" },
  { date: "20 июня", day: "Пт", time: "03:30", team1: "🇧🇷 Бразилия", team2: "🇭🇹 Гаити", group: "C" },
  { date: "20 июня", day: "Пт", time: "06:00", team1: "🇹🇷 Турция", team2: "🇵🇾 Парагвай", group: "D" },
  { date: "20 июня", day: "Пт", time: "20:00", team1: "🇳🇱 Нидерланды", team2: "🇸🇪 Швеция", group: "F" },
  { date: "20 июня", day: "Пт", time: "23:00", team1: "🇩🇪 Германия", team2: "🇨🇮 Кот-д'Ивуар", group: "E" },
  // 21 июня
  { date: "21 июня", day: "Сб", time: "03:00", team1: "🇪🇨 Эквадор", team2: "🇨🇼 Кюрасао", group: "E" },
  { date: "21 июня", day: "Сб", time: "07:00", team1: "🇹🇳 Тунис", team2: "🇯🇵 Япония", group: "F" },
  { date: "21 июня", day: "Сб", time: "19:00", team1: "🇪🇸 Испания", team2: "🇸🇦 Саудовская Аравия", group: "H" },
  { date: "21 июня", day: "Сб", time: "22:00", team1: "🇧🇪 Бельгия", team2: "🇮🇷 Иран", group: "G" },
  // 22 июня
  { date: "22 июня", day: "Вс", time: "01:00", team1: "🇺🇾 Уругвай", team2: "🇨🇻 Кабо-Верде", group: "H" },
  { date: "22 июня", day: "Вс", time: "04:00", team1: "🇸🇳 Сенегал", team2: "🇮🇶 Ирак", group: "I" },
  // 23 июня
  { date: "23 июня", day: "Пн", time: "02:00", team1: "🇳🇴 Норвегия", team2: "🇫🇷 Франция", group: "I" },
  { date: "23 июня", day: "Пн", time: "22:00", team1: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Англия", team2: "🇬🇭 Гана", group: "B" },
]

const groupColors: Record<string, string> = {
  A: "bg-purple-500/20 text-purple-300",
  B: "bg-blue-500/20 text-blue-300",
  C: "bg-green-500/20 text-green-300",
  D: "bg-yellow-500/20 text-yellow-300",
  E: "bg-orange-500/20 text-orange-300",
  F: "bg-pink-500/20 text-pink-300",
  G: "bg-cyan-500/20 text-cyan-300",
  H: "bg-red-500/20 text-red-300",
  I: "bg-indigo-500/20 text-indigo-300",
  J: "bg-teal-500/20 text-teal-300",
  K: "bg-lime-500/20 text-lime-300",
  L: "bg-amber-500/20 text-amber-300",
}

export function WorldCupBanner() {
  const [expanded, setExpanded] = useState(false)

  const visibleMatches = expanded ? matches : matches.slice(0, 5)

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md">
      <div className="px-4 py-3 flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-green-900/40 via-black/0 to-yellow-900/40">
        <span className="text-2xl">⚽</span>
        <div className="flex-1">
          <p className="text-white font-open-sans-custom font-bold text-base leading-tight">Чемпионат мира 2026</p>
          <p className="text-green-300 text-xs font-open-sans-custom">Смотрим все матчи в G80 Lounge Bar</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/20 border border-red-400/30">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-red-300 text-xs font-open-sans-custom font-medium">LIVE</span>
        </div>
      </div>

      <div className="divide-y divide-white/5">
        {visibleMatches.map((m, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors">
            <div className="w-14 shrink-0 text-center">
              <p className="text-white/50 text-xs font-open-sans-custom">{m.day}</p>
              <p className="text-white text-xs font-open-sans-custom font-medium">{m.date}</p>
              <p className="text-yellow-300 text-xs font-open-sans-custom">{m.time}</p>
            </div>
            <div className="flex-1 flex items-center justify-between gap-2 min-w-0">
              <span className="text-white text-sm font-open-sans-custom truncate">{m.team1}</span>
              <span className="text-white/40 text-xs font-open-sans-custom shrink-0">vs</span>
              <span className="text-white text-sm font-open-sans-custom truncate text-right">{m.team2}</span>
            </div>
            <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-open-sans-custom ${groupColors[m.group] || "bg-white/10 text-white/60"}`}>
              {m.group}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full py-2.5 text-center text-sm text-white/50 hover:text-white/80 font-open-sans-custom transition-colors border-t border-white/10 hover:bg-white/5"
      >
        {expanded ? "Скрыть ▲" : `Показать все ${matches.length} матчей ▼`}
      </button>
    </div>
  )
}
