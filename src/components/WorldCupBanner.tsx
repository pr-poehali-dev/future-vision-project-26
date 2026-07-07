type Match = {
  date: string
  day: string
  time: string
  team1: string
  team2: string
  stage: string
  result?: string
}

const matches: Match[] = [
  // Результаты 1/16
  { date: "28 июня", day: "Вс", time: "22:00", team1: "🇿🇦 ЮАР", team2: "🇨🇦 Канада", stage: "1/16", result: "0:1" },
  { date: "29 июня", day: "Пн", time: "20:00", team1: "🇧🇷 Бразилия", team2: "🇯🇵 Япония", stage: "1/16", result: "2:1" },
  { date: "29 июня", day: "Пн", time: "23:30", team1: "🇩🇪 Германия", team2: "🇵🇾 Парагвай", stage: "1/16", result: "1:1 (3:4 пен)" },
  { date: "30 июня", day: "Вт", time: "04:00", team1: "🇳🇱 Нидерланды", team2: "🇲🇦 Марокко", stage: "1/16", result: "1:1 (2:3 пен)" },
  { date: "30 июня", day: "Вт", time: "20:00", team1: "🇨🇮 Кот-д'Ивуар", team2: "🇳🇴 Норвегия", stage: "1/16", result: "1:2" },
  { date: "1 июля", day: "Ср", time: "00:00", team1: "🇫🇷 Франция", team2: "🇸🇪 Швеция", stage: "1/16", result: "3:0" },
  { date: "1 июля", day: "Ср", time: "04:00", team1: "🇲🇽 Мексика", team2: "🇪🇨 Эквадор", stage: "1/16", result: "2:0" },
  { date: "1 июля", day: "Ср", time: "19:00", team1: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Англия", team2: "🇨🇩 ДР Конго", stage: "1/16", result: "2:1" },
  { date: "1 июля", day: "Ср", time: "23:00", team1: "🇧🇪 Бельгия", team2: "🇸🇳 Сенегал", stage: "1/16", result: "3:2 д.в." },
  { date: "2 июля", day: "Чт", time: "03:00", team1: "🇺🇸 США", team2: "🇧🇦 Босния", stage: "1/16", result: "2:0" },
  { date: "2 июля", day: "Чт", time: "22:00", team1: "🇪🇸 Испания", team2: "🇦🇹 Австрия", stage: "1/16", result: "3:0" },
  { date: "3 июля", day: "Пт", time: "02:00", team1: "🇵🇹 Португалия", team2: "🇭🇷 Хорватия", stage: "1/16", result: "2:1" },
  { date: "3 июля", day: "Пт", time: "06:00", team1: "🇨🇭 Швейцария", team2: "🇩🇿 Алжир", stage: "1/16", result: "2:0" },
  { date: "3 июля", day: "Сб", time: "21:00", team1: "🇦🇺 Австралия", team2: "🇪🇬 Египет", stage: "1/16", result: "1:1 (2:4 пен)" },
  { date: "4 июля", day: "Вс", time: "01:00", team1: "🇦🇷 Аргентина", team2: "🇨🇻 Кабо-Верде", stage: "1/16", result: "3:2 д.в." },
  { date: "4 июля", day: "Вс", time: "04:30", team1: "🇨🇴 Колумбия", team2: "🇬🇭 Гана", stage: "1/16", result: "1:0" },
  // 1/8 финала
  { date: "4 июля", day: "Вс", time: "20:00", team1: "🇨🇦 Канада", team2: "🇲🇦 Марокко", stage: "1/8", result: "0:3" },
  { date: "5 июля", day: "Пн", time: "00:00", team1: "🇵🇾 Парагвай", team2: "🇫🇷 Франция", stage: "1/8", result: "0:1" },
  { date: "5 июля", day: "Пн", time: "23:00", team1: "🇧🇷 Бразилия", team2: "🇳🇴 Норвегия", stage: "1/8", result: "1:2" },
  { date: "6 июля", day: "Вт", time: "03:00", team1: "🇲🇽 Мексика", team2: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Англия", stage: "1/8", result: "2:3" },
  { date: "6 июля", day: "Пн", time: "22:00", team1: "🇵🇹 Португалия", team2: "🇪🇸 Испания", stage: "1/8", result: "0:1" },
  { date: "7 июля", day: "Вт", time: "03:00", team1: "🇧🇪 Бельгия", team2: "🇺🇸 США", stage: "1/8", result: "4:1" },
  { date: "7 июля", day: "Вт", time: "19:00", team1: "🇦🇷 Аргентина", team2: "🇪🇬 Египет", stage: "1/8", result: "?" },
  { date: "7 июля", day: "Вт", time: "23:00", team1: "🇨🇭 Швейцария", team2: "🇨🇴 Колумбия", stage: "1/8", result: "?" },
  // 1/4 финала
  { date: "9 июля", day: "Чт", time: "23:00", team1: "🇫🇷 Франция", team2: "🇲🇦 Марокко", stage: "1/4" },
  { date: "10 июля", day: "Пт", time: "22:00", team1: "🇪🇸 Испания", team2: "🇧🇪 Бельгия", stage: "1/4" },
  { date: "12 июля", day: "Вс", time: "00:00", team1: "🇳🇴 Норвегия", team2: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Англия", stage: "1/4" },
  { date: "12 июля", day: "Вс", time: "04:00", team1: "Победитель (Арг/Ег)", team2: "Победитель (Швейц/Кол)", stage: "1/4" },
]

const stageColors: Record<string, string> = {
  "1/16": "bg-indigo-500/20 text-indigo-300",
  "1/8":  "bg-purple-500/20 text-purple-300",
  "1/4":  "bg-pink-500/20 text-pink-300",
}

export function WorldCupBanner() {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md">
      <div className="px-4 py-3 flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-green-900/40 via-black/0 to-yellow-900/40">
        <span className="text-2xl">⚽</span>
        <div className="flex-1">
          <p className="text-white font-open-sans-custom font-bold text-base leading-tight">Чемпионат мира 2026</p>
          <p className="text-green-300 text-xs font-open-sans-custom">Идёт плей-офф! Смотрим все матчи в G80</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/20 border border-red-400/30">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-red-300 text-xs font-open-sans-custom font-medium">LIVE</span>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[50vh] divide-y divide-white/5" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.15) transparent" }}>
        {matches.map((m, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors">
            <div className="w-14 shrink-0 text-center">
              <p className="text-white/50 text-xs font-open-sans-custom">{m.day}</p>
              <p className="text-white text-xs font-open-sans-custom font-medium">{m.date}</p>
              <p className="text-yellow-300 text-xs font-open-sans-custom">{m.time}</p>
            </div>
            <div className="flex-1 flex items-center justify-between gap-2 min-w-0">
              <span className="text-white text-sm font-open-sans-custom truncate">{m.team1}</span>
              {m.result ? (
                <span className={`shrink-0 text-xs font-bold font-open-sans-custom px-2 py-0.5 rounded ${m.result === "?" ? "text-white/30" : "text-yellow-300"}`}>{m.result === "?" ? "vs" : m.result}</span>
              ) : (
                <span className="text-white/40 text-xs font-open-sans-custom shrink-0">vs</span>
              )}
              <span className="text-white text-sm font-open-sans-custom truncate text-right">{m.team2}</span>
            </div>
            <span className={`shrink-0 px-2 h-6 rounded-full flex items-center justify-center text-xs font-bold font-open-sans-custom ${stageColors[m.stage] || "bg-white/10 text-white/60"}`}>
              {m.stage}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}