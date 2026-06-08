import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

function Feature() {
  const menuItems = [
    {
      icon: "GlassWater",
      title: "Авторские коктейли",
      description: "Уникальные рецепты от наших барменов — Lavande Spritz, Cyan Lagoon, G80 Heart и другие.",
    },
    {
      icon: "Wine",
      title: "Классические коктейли",
      description: "Mojito, Aperol Spritz, Margarita, Cosmopolitan, Long Island — всё что вы любите.",
    },
    {
      icon: "Flame",
      title: "Авторские шоты",
      description: "Эксклюзивные шоты от наших барменов — яркие вкусы, которых нет нигде больше.",
    },
    {
      icon: "Zap",
      title: "Шоты",
      description: "Б-52, Самбука, Текила, Ягербомб, Клубничный взрыв — быстро и ярко.",
    },
    {
      icon: "Wind",
      title: "Кальяны",
      description: "Обычные и премиум кальяны с широким выбором вкусов. Мягкий дым, идеальная тяга.",
    },
    {
      icon: "UtensilsCrossed",
      title: "Снэки",
      description: "Орешки, сыр косичка, чипсы, вяленое мясо — всё для идеального вечера.",
    },
  ]

  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <div className="flex gap-4 py-8 flex-col items-start">
          <div>
            <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm">Меню</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-2xl md:text-4xl lg:text-5xl tracking-tighter lg:max-w-xl font-open-sans-custom text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)]">
              Всё что нужно для идеального вечера
            </h2>
            <p className="text-base max-w-xl leading-relaxed tracking-tight text-gray-300 font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
              Обширное меню напитков, кальяны и закуски — в атмосфере уютного лаунж-бара.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 w-full">
            {menuItems.map((item, i) => (
              <div key={i} className="flex flex-row gap-4 w-full items-start bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                  <Icon name={item.icon} fallback="Star" className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-white font-open-sans-custom font-semibold text-sm">{item.title}</p>
                  <p className="text-gray-300 text-xs font-open-sans-custom leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { Feature }
