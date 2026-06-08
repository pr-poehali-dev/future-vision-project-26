import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { SparklesIcon } from "lucide-react"
import DotPattern from "@/components/ui/dot-pattern"

type MenuCardProps = {
  titleBadge: string
  items: { name: string; desc?: string }[]
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
          <Badge variant="outline" className="hidden lg:flex bg-white/5 text-white border-white/20 font-open-sans-custom text-xs">
            <SparklesIcon className="me-1 size-3" /> Топ
          </Badge>
        )}
      </div>
      <ul className="text-gray-300 grid gap-2 p-3 text-xs font-open-sans-custom">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-white mt-0.5">🍸</span>
            <span>
              <span className="text-white font-medium">{item.name}</span>
              {item.desc && <span className="text-gray-400"> — {item.desc}</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function BentoPricing() {
  return (
    <div className="grid grid-cols-1 gap-1.5 md:grid-cols-2 lg:grid-cols-8">

      {/* Авторские коктейли — большая карточка */}
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
          <Badge variant="outline" className="hidden lg:flex bg-white/5 text-white border-white/20 font-open-sans-custom text-xs">
            <SparklesIcon className="me-1 size-3" /> Хиты бара
          </Badge>
        </div>
        <div className="flex flex-col p-3 lg:flex-row gap-4">
          <ul className="text-gray-300 grid gap-2 text-xs lg:w-[50%] font-open-sans-custom">
            {[
              { name: "Passion Storm", desc: "манго, маракуйя, ром" },
              { name: "Dark Velvet", desc: "бурбон, вишня, биттер" },
              { name: "Midnight Sour", desc: "джин, лимон, яичный белок" },
              { name: "Smoky Negroni", desc: "копчёный джин, кампари, вермут" },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-white mt-0.5">🍸</span>
                <span>
                  <span className="text-white font-medium">{item.name}</span>
                  <span className="text-gray-400"> — {item.desc}</span>
                </span>
              </li>
            ))}
          </ul>
          <ul className="text-gray-300 grid gap-2 text-xs lg:w-[50%] font-open-sans-custom">
            {[
              { name: "G80 Special", desc: "секретный рецепт бара" },
              { name: "Velvet Rose", desc: "клубника, личи, шампанское" },
              { name: "Spicy Mango", desc: "текила, манго, чили" },
              { name: "Arctic Sling", desc: "водка, мята, огурец, тоник" },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-white mt-0.5">🍸</span>
                <span>
                  <span className="text-white font-medium">{item.name}</span>
                  <span className="text-gray-400"> — {item.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Классические коктейли */}
      <MenuCard
        titleBadge="КЛАССИЧЕСКИЕ КОКТЕЙЛИ"
        className="lg:col-span-3"
        items={[
          { name: "Mojito", desc: "ром, мята, лайм" },
          { name: "Aperol Spritz", desc: "апероль, просекко" },
          { name: "Margarita", desc: "текила, лайм, трипл-сек" },
          { name: "Cosmopolitan", desc: "водка, клюква, лайм" },
          { name: "Long Island", desc: "5 видов алкоголя, кола" },
          { name: "Daiquiri", desc: "ром, лайм, сахар" },
        ]}
      />

      {/* Авторские шоты */}
      <MenuCard
        titleBadge="АВТОРСКИЕ ШОТЫ"
        className="lg:col-span-4"
        featured
        items={[
          { name: "G80 Shot", desc: "фирменный рецепт" },
          { name: "Tropical Bomb", desc: "ром, кокос, ананас" },
          { name: "Dark Matter", desc: "бурбон, мёд, апельсин" },
          { name: "Red Dragon", desc: "водка, арбуз, чили" },
        ]}
      />

      {/* Шоты классические */}
      <MenuCard
        titleBadge="ШОТЫ"
        className="lg:col-span-4"
        items={[
          { name: "Б-52", desc: "калуа, бейлис, куантро" },
          { name: "Ягербомб", desc: "ягермайстер + энергетик" },
          { name: "Самбука", desc: "классика с зёрнами кофе" },
          { name: "Текила", desc: "соль, лайм" },
          { name: "Клубничный взрыв", desc: "малиновый ликёр, водка" },
        ]}
      />

      {/* Виски и коньяки */}
      <MenuCard
        titleBadge="ВИСКИ И КОНЬЯКИ"
        className="lg:col-span-3"
        items={[
          { name: "Jack Daniel's", desc: "Tennessee Whiskey" },
          { name: "Jameson", desc: "Irish Whiskey" },
          { name: "Glenfiddich 12", desc: "Single Malt Scotch" },
          { name: "Hennessy VS", desc: "коньяк" },
          { name: "Rémy Martin VSOP", desc: "коньяк" },
        ]}
      />

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
          <Badge variant="outline" className="hidden lg:flex bg-white/5 text-white border-white/20 font-open-sans-custom text-xs">
            <SparklesIcon className="me-1 size-3" /> Премиум доступен
          </Badge>
        </div>
        <div className="flex flex-col p-3 lg:flex-row gap-4">
          <div className="lg:w-[50%]">
            <p className="text-white text-xs font-semibold font-open-sans-custom mb-2">🌿 Обычные</p>
            <ul className="text-gray-300 grid gap-2 text-xs font-open-sans-custom">
              {["Два Яблока", "Виноград Мята", "Арбуз", "Клубника Банан", "Лесные ягоды"].map((name, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-white">💨</span>
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-[50%]">
            <p className="text-white text-xs font-semibold font-open-sans-custom mb-2">✨ Премиум</p>
            <ul className="text-gray-300 grid gap-2 text-xs font-open-sans-custom">
              {["Белый виноград на молоке", "Тропический коктейль", "Чёрная смородина на льду", "Роза лаванда", "Экзотические фрукты"].map((name, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-white">⭐</span>
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Пиво и напитки */}
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
        <div className="flex flex-col p-3 lg:flex-row gap-6">
          <div className="lg:w-[25%]">
            <p className="text-white text-xs font-semibold font-open-sans-custom mb-2">🍺 Пиво</p>
            <ul className="text-gray-300 grid gap-1.5 text-xs font-open-sans-custom">
              {["Heineken", "Corona", "Budweiser", "Stella Artois", "Живое тёмное"].map((name, i) => (
                <li key={i} className="flex items-center gap-2"><span>🍺</span><span>{name}</span></li>
              ))}
            </ul>
          </div>
          <div className="lg:w-[25%]">
            <p className="text-white text-xs font-semibold font-open-sans-custom mb-2">🥂 Шампанское и вина</p>
            <ul className="text-gray-300 grid gap-1.5 text-xs font-open-sans-custom">
              {["Просекко", "Асти", "Белое сухое", "Красное полусладкое", "Розовое"].map((name, i) => (
                <li key={i} className="flex items-center gap-2"><span>🥂</span><span>{name}</span></li>
              ))}
            </ul>
          </div>
          <div className="lg:w-[25%]">
            <p className="text-white text-xs font-semibold font-open-sans-custom mb-2">⚡ Энергетики</p>
            <ul className="text-gray-300 grid gap-1.5 text-xs font-open-sans-custom">
              {["Red Bull", "Monster", "Gorilla", "Adrenaline Rush"].map((name, i) => (
                <li key={i} className="flex items-center gap-2"><span>⚡</span><span>{name}</span></li>
              ))}
            </ul>
          </div>
          <div className="lg:w-[25%]">
            <p className="text-white text-xs font-semibold font-open-sans-custom mb-2">🥤 Прохладительные и снэки</p>
            <ul className="text-gray-300 grid gap-1.5 text-xs font-open-sans-custom">
              {["Coca-Cola", "Fanta", "Sprite", "Орешки", "Сыр косичка", "Чипсы"].map((name, i) => (
                <li key={i} className="flex items-center gap-2"><span>🥤</span><span>{name}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </div>
  )
}
