import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

function Feature() {
  const menuItems = [
    {
      icon: "GlassWater",
      title: "Авторские коктейли",
      description: "Уникальные рецепты от наших барменов — Passion Storm, Dark Velvet, Midnight Sour и другие.",
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
    <div className="w-full py-20 lg:py-0">
      <div className="container mx-auto px-4">
        <div className="flex gap-4 py-20 flex-col items-start lg:py-0">
          <div>
            <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm">Меню</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-open-sans-custom text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)]">
              Всё что нужно для идеального вечера
            </h2>
            <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-gray-300 font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
              Обширное меню напитков, кальяны и закуски — в атмосфере уютного лаунж-бара.
            </p>
          </div>
          <div className="flex gap-10 pt-12 flex-col w-full">
            <div className="grid grid-cols-2 items-start lg:grid-cols-3 gap-10">
              {menuItems.map((item, i) => (
                <div key={i} className="flex flex-row gap-6 w-full items-start">
                  <Icon name={item.icon} fallback="Star" className="w-5 h-5 mt-1 text-white flex-shrink-0" />
                  <div className="flex flex-col gap-1">
                    <p className="text-white font-open-sans-custom font-medium">{item.title}</p>
                    <p className="text-gray-300 text-sm font-open-sans-custom">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Feature }
