import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { SparklesIcon } from "lucide-react"
import DotPattern from "@/components/ui/dot-pattern"

type MenuCardProps = {
  titleBadge: string
  items: { name: string; desc?: string; price?: string }[]
  className?: string
  featured?: boolean
}

function MenuCard({ titleBadge, items, className, featured }: MenuCardProps) {
  return (
    <div
      className={cn(
        "bg-white/5 border-white/10 relative overflow-hidden rounded-md border-2",
        "backdrop-blur-sm",
        className,
      )}
    >
      <DotPattern width={5} height={5} />
      <div className="flex items-center gap-3 p-3">
        <Badge variant="secondary" className="bg-white/10 text-white border-white/20 font-open-sans-custom text-xs">
          {titleBadge}
        </Badge>
        {featured && (
          <Badge variant="outline" className="bg-white/5 text-white border-white/20 font-open-sans-custom text-xs">
            <SparklesIcon className="me-1 size-3" /> Топ
          </Badge>
        )}
      </div>
      <ul className="text-gray-300 grid gap-2.5 p-3 text-sm font-open-sans-custom">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-white flex-shrink-0">🍸</span>
            <span className="flex-1">
              <span className="text-white font-medium">{item.name}</span>
              {item.desc && <span className="text-gray-400 text-xs"> — {item.desc}</span>}
            </span>
            {item.price && <span className="text-white/70 text-xs font-medium flex-shrink-0">{item.price}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function BentoPricing() {
  return (
    <div className="flex flex-col gap-3 lg:grid lg:grid-cols-8 lg:gap-1.5">

      {/* Авторские коктейли */}
      <div
        className={cn(
          "bg-white/5 border-white/10 relative w-full overflow-hidden rounded-md border-2",
          "backdrop-blur-sm",
          "lg:col-span-5",
        )}
      >
        <DotPattern width={5} height={5} />
        <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
          <div className="from-white/5 to-white/2 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-0 size-full mix-blend-overlay",
                "bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px)]",
                "bg-[size:24px]",
              )}
            />
          </div>
        </div>
        <div className="flex items-center gap-3 p-3">
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20 font-open-sans-custom text-xs">
            АВТОРСКИЕ КОКТЕЙЛИ
          </Badge>
          <Badge variant="outline" className="bg-white/5 text-white border-white/20 font-open-sans-custom text-xs">
            <SparklesIcon className="me-1 size-3" /> Хиты бара
          </Badge>
        </div>
        <ul className="text-gray-300 grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 text-sm font-open-sans-custom">
          {[
            { name: "Lavande Spritz", desc: "лаванда, просекко, лимон", price: "650 ₽" },
            { name: "Cyan Lagoon", desc: "голубой кюрасао, лайм, тоник", price: "600 ₽" },
            { name: "Milk Punch", desc: "молоко, ром, ваниль, специи", price: "700 ₽" },
            { name: "G80 Heart", desc: "малина, роза, джин, личи", price: "750 ₽" },
            { name: "Donbass", desc: "авторский коктейль бара", price: "600 ₽" },
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-white flex-shrink-0">🍸</span>
              <span className="flex-1">
                <span className="text-white font-medium">{item.name}</span>
                <span className="text-gray-400 text-xs"> — {item.desc}</span>
              </span>
              <span className="text-white/70 text-xs font-medium flex-shrink-0">{item.price}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Классические коктейли */}
      <MenuCard
        titleBadge="КЛАССИЧЕСКИЕ КОКТЕЙЛИ"
        className="lg:col-span-3"
        items={[
          { name: "Mojito", desc: "ром, мята, лайм", price: "550 ₽" },
          { name: "Aperol Spritz", desc: "апероль, просекко", price: "600 ₽" },
          { name: "Margarita", desc: "текила, лайм, трипл-сек", price: "550 ₽" },
          { name: "Cosmopolitan", desc: "водка, клюква, лайм", price: "500 ₽" },
          { name: "Long Island", desc: "5 видов алкоголя, кола", price: "700 ₽" },
          { name: "Daiquiri", desc: "ром, лайм, сахар", price: "500 ₽" },
        ]}
      />

      {/* Авторские шоты */}
      <MenuCard
        titleBadge="АВТОРСКИЕ ШОТЫ"
        className="lg:col-span-4"
        featured
        items={[
          { name: "Blow Job", desc: "бейлис, взбитые сливки", price: "450 ₽" },
          { name: "KuniLi", desc: "лаймовый ликёр, мята, ром", price: "450 ₽" },
          { name: "Камшот", desc: "сливочный ликёр, кокос", price: "450 ₽" },
          { name: "Точка G", desc: "гренадин, малина, водка", price: "450 ₽" },
          { name: "БДСМ", desc: "бурбон, дым, специи", price: "450 ₽" },
          { name: "Dirty Talk", desc: "текила, перец, лайм", price: "450 ₽" },
        ]}
      />

      {/* Шоты классические */}
      <MenuCard
        titleBadge="ШОТЫ"
        className="lg:col-span-4"
        items={[
          { name: "Б-52", desc: "калуа, бейлис, куантро", price: "450 ₽" },
          { name: "Ягербомб", desc: "ягермайстер + энергетик", price: "450 ₽" },
          { name: "Самбука", desc: "классика с зёрнами кофе", price: "450 ₽" },
          { name: "Текила", desc: "соль, лайм", price: "450 ₽" },
          { name: "Клубничный взрыв", desc: "малиновый ликёр, водка", price: "450 ₽" },
        ]}
      />

      {/* Виски и коньяки */}
      <div
        className={cn(
          "bg-white/5 border-white/10 relative w-full overflow-hidden rounded-md border-2",
          "backdrop-blur-sm",
          "lg:col-span-3",
        )}
      >
        <DotPattern width={5} height={5} />
        <div className="flex items-center gap-3 p-3">
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20 font-open-sans-custom text-xs">
            ВИСКИ И КОНЬЯКИ
          </Badge>
        </div>
        <ul className="text-gray-300 grid gap-2.5 p-3 text-sm font-open-sans-custom">
          {[
            { name: "Jack Daniel's", type: "виски", shot: "550 ₽", bottle: "6 500 ₽" },
            { name: "Jim Beam", type: "виски", shot: "500 ₽", bottle: "5 500 ₽" },
            { name: "Jameson", type: "виски", shot: "550 ₽", bottle: "8 000 ₽" },
            { name: "Ballantine's", type: "виски", shot: "500 ₽", bottle: "5 000 ₽" },
            { name: "Арарат 5★", type: "коньяк", shot: "250 ₽", bottle: "3 000 ₽" },
            { name: "Арарат 3★", type: "коньяк", shot: "250 ₽", bottle: "3 000 ₽" },
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-white flex-shrink-0">🥃</span>
              <span className="flex-1">
                <span className="text-white font-medium">{item.name}</span>
                <span className="text-gray-400 text-xs"> — {item.type}</span>
              </span>
              <span className="text-right flex-shrink-0">
                <span className="text-white/70 text-xs">{item.shot}</span>
                <span className="text-gray-500 text-xs"> / {item.bottle}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="text-gray-500 text-xs px-3 pb-3 font-open-sans-custom">50 мл / бутылка</p>
      </div>

      {/* Кальяны */}
      <div
        className={cn(
          "bg-white/5 border-white/10 relative w-full overflow-hidden rounded-md border-2",
          "backdrop-blur-sm",
          "lg:col-span-5",
        )}
      >
        <DotPattern width={5} height={5} />
        <div className="flex items-center gap-3 p-3">
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20 font-open-sans-custom text-xs">
            КАЛЬЯНЫ
          </Badge>
          <Badge variant="outline" className="bg-white/5 text-white border-white/20 font-open-sans-custom text-xs">
            <SparklesIcon className="me-1 size-3" /> Премиум доступен
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-4 p-3">
          <div>
            <p className="text-white text-xs font-semibold font-open-sans-custom mb-2">🌿 Обычные — <span className="text-white/70">1 400 ₽</span></p>
            <ul className="text-gray-300 grid gap-2 text-sm font-open-sans-custom">
              {["Два Яблока", "Виноград Мята", "Арбуз", "Клубника Банан", "Лесные ягоды"].map((name, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-white flex-shrink-0">💨</span>
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white text-xs font-semibold font-open-sans-custom mb-2">✨ Премиум — <span className="text-white/70">1 600 ₽</span></p>
            <ul className="text-gray-300 grid gap-2 text-sm font-open-sans-custom">
              {["Белый виноград на молоке", "Тропический коктейль", "Чёрная смородина на льду", "Роза лаванда", "Экзотические фрукты"].map((name, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-white flex-shrink-0">⭐</span>
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Пиво, вина и напитки */}
      <div
        className={cn(
          "bg-white/5 border-white/10 relative w-full overflow-hidden rounded-md border-2",
          "backdrop-blur-sm",
          "lg:col-span-8",
        )}
      >
        <DotPattern width={5} height={5} />
        <div className="flex items-center gap-3 p-3">
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20 font-open-sans-custom text-xs">
            ПИВО, ВИНА И НАПИТКИ
          </Badge>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-3">
          <div>
            <p className="text-white text-xs font-semibold font-open-sans-custom mb-2">🍺 Пиво</p>
            <ul className="text-gray-300 grid gap-2 text-sm font-open-sans-custom">
              {[
                { name: "Corona", price: "350 ₽" },
                { name: "Bud", price: "250 ₽" },
                { name: "Tuborg", price: "300 ₽" },
                { name: "Hoegaarden", price: "400 ₽" },
                { name: "Балтика 0", price: "250 ₽" },
              ].map((item, i) => (
                <li key={i} className="flex items-center justify-between gap-1.5">
                  <span className="flex items-center gap-1.5"><span>🍺</span><span>{item.name}</span></span>
                  <span className="text-white/70 text-xs">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white text-xs font-semibold font-open-sans-custom mb-2">🥂 Шампанское</p>
            <ul className="text-gray-300 grid gap-2 text-sm font-open-sans-custom">
              {[
                { name: "Абрау-Дюрсо брют" },
                { name: "Veuve Alban брют" },
              ].map((item, i) => (
                <li key={i} className="flex items-center justify-between gap-1.5">
                  <span className="flex items-center gap-1.5"><span>🥂</span><span>{item.name}</span></span>
                  <span className="text-white/70 text-xs flex-shrink-0">500 / 2 000 ₽</span>
                </li>
              ))}
            </ul>
            <p className="text-white text-xs font-semibold font-open-sans-custom mt-3 mb-2">🍷 Вина</p>
            <ul className="text-gray-300 grid gap-2 text-sm font-open-sans-custom">
              {[
                { name: "Genatsvale" },
                { name: "Алазанская долина" },
              ].map((item, i) => (
                <li key={i} className="flex items-center justify-between gap-1.5">
                  <span className="flex items-center gap-1.5"><span>🍷</span><span>{item.name}</span></span>
                  <span className="text-white/70 text-xs flex-shrink-0">500 / 2 000 ₽</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-500 text-xs mt-1.5 font-open-sans-custom">бокал / бутылка</p>
          </div>
          <div>
            <p className="text-white text-xs font-semibold font-open-sans-custom mb-2">⚡ Энергетики</p>
            <ul className="text-gray-300 grid gap-2 text-sm font-open-sans-custom">
              {[
                { name: "Red Bull", price: "350 ₽" },
                { name: "Burn", price: "250 ₽" },
                { name: "Adrenaline Rush", price: "350 ₽" },
              ].map((item, i) => (
                <li key={i} className="flex items-center justify-between gap-1.5">
                  <span className="flex items-center gap-1.5"><span>⚡</span><span>{item.name}</span></span>
                  <span className="text-white/70 text-xs">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white text-xs font-semibold font-open-sans-custom mb-2">🥤 Напитки</p>
            <ul className="text-gray-300 grid gap-2 text-sm font-open-sans-custom">
              {["Coca-Cola", "Fanta", "Sprite"].map((name, i) => (
                <li key={i} className="flex items-center justify-between gap-1.5">
                  <span className="flex items-center gap-1.5"><span>🥤</span><span>{name}</span></span>
                  <span className="text-white/70 text-xs">250 ₽</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </div>
  )
}