import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import DotPattern from "@/components/ui/dot-pattern"

type ServiceItem = {
  icon: string
  name: string
  desc?: string
  price: string
  unit?: string
}

const services: ServiceItem[] = [
  {
    icon: "⏰",
    name: "Продление работы",
    desc: "Заведение работает дополнительный час",
    price: "15 000 ₽",
    unit: "/ час",
  },
  {
    icon: "🏛️",
    name: "Нижний зал",
    desc: "Аренда нижнего зала целиком",
    price: "25 000 ₽",
    unit: "/ мероприятие",
  },
  {
    icon: "🔑",
    name: "Снять заведение",
    desc: "Всё заведение в вашем распоряжении",
    price: "55 000 ₽",
    unit: "/ мероприятие",
  },
  {
    icon: "🎮",
    name: "Игровая приставка",
    desc: "PlayStation / Xbox, любые игры",
    price: "500 ₽",
    unit: "/ час",
  },
  {
    icon: "✨",
    name: "Мини ВИП-комната",
    desc: "Уютное приватное пространство",
    price: "700 ₽",
    unit: "/ час",
  },
  {
    icon: "👑",
    name: "ВИП-комната",
    desc: "Просторная VIP-зона с полным сервисом",
    price: "900 ₽",
    unit: "/ час",
  },
]

export function ServicesMenu() {
  return (
    <div className="flex flex-col gap-3">
      {/* Крупные услуги (аренда) */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {services.slice(0, 3).map((item, i) => (
          <div
            key={i}
            className={cn(
              "relative overflow-hidden rounded-md border-2 neon-card transition-all duration-300",
              "bg-white/5 border-white/10 backdrop-blur-sm",
              i === 2 && "border-purple-500/30",
            )}
          >
            <DotPattern width={5} height={5} />
            {i === 2 && (
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at top right, rgba(139,92,246,0.12) 0%, transparent 70%)" }}
              />
            )}
            <div className="relative p-4 flex flex-col gap-2">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-white font-semibold font-open-sans-custom text-sm leading-tight">{item.name}</p>
                {item.desc && <p className="text-gray-400 text-xs mt-0.5 font-open-sans-custom">{item.desc}</p>}
              </div>
              <div className="mt-auto pt-2 border-t border-white/10">
                <span
                  className="text-lg font-extrabold font-open-sans-custom"
                  style={{ color: i === 2 ? "#c084fc" : "#a78bfa", textShadow: "0 0 12px rgba(167,139,250,0.5)" }}
                >
                  {item.price}
                </span>
                {item.unit && <span className="text-gray-500 text-xs ml-1 font-open-sans-custom">{item.unit}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Почасовые услуги */}
      <div
        className={cn(
          "relative overflow-hidden rounded-md border-2 neon-card",
          "bg-white/5 border-white/10 backdrop-blur-sm",
        )}
      >
        <DotPattern width={5} height={5} />
        <div className="flex items-center gap-3 p-3">
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20 font-open-sans-custom text-xs">
            ПОЧАСОВЫЕ УСЛУГИ
          </Badge>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 pt-0 text-sm font-open-sans-custom">
          {services.slice(3).map((item, i) => (
            <li key={i} className="flex items-center gap-3 p-2 rounded-lg bg-white/3 border border-white/5">
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium leading-tight">{item.name}</p>
                {item.desc && <p className="text-gray-400 text-xs mt-0.5 truncate">{item.desc}</p>}
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-purple-300 font-bold text-sm" style={{ textShadow: "0 0 8px rgba(167,139,250,0.5)" }}>
                  {item.price}
                </p>
                {item.unit && <p className="text-gray-500 text-xs">{item.unit}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
