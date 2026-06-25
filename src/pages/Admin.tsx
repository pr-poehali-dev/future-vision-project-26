import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Icon from "@/components/ui/icon"
import { useVisitorStats } from "@/hooks/use-visitors"

const MENU_URL = "https://functions.poehali.dev/7d21c12e-b792-4122-b83e-b8fe70fe4794"

const CATEGORIES: Record<string, string> = {
  cocktails_author: "Авторские коктейли",
  cocktails_classic: "Классические коктейли",
  shots_author: "Авторские шоты",
  shots_classic: "Шоты",
  whiskey: "Виски и коньяки",
  hookah: "Кальяны обычные",
  hookah_premium: "Кальяны премиум",
  beer: "Пиво",
  wine: "Вина и шампанское",
  energy: "Энергетики",
  drinks: "Напитки",
}

type MenuItem = {
  id: number
  category: string
  name: string
  description: string | null
  price: number | null
  price_bottle: number | null
  price_glass: number | null
  sort_order: number
}

type EditForm = Omit<MenuItem, "id"> & { id?: number }

const emptyForm = (): EditForm => ({
  category: "cocktails_author",
  name: "",
  description: "",
  price: null,
  price_bottle: null,
  price_glass: null,
  sort_order: 0,
})

export default function Admin() {
  const [password, setPassword] = useState("")
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState(false)
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState("cocktails_author")
  const [editItem, setEditItem] = useState<EditForm | null>(null)
  const [saving, setSaving] = useState(false)
  const [savedPassword, setSavedPassword] = useState("")
  const { stats, loading: statsLoading, reload: reloadStats } = useVisitorStats()

  const fetchItems = async (pwd: string) => {
    setLoading(true)
    const res = await fetch(MENU_URL, { headers: { "X-Admin-Password": pwd } })
    const data = await res.json()
    setItems(data.items || [])
    setLoading(false)
  }

  const handleLogin = async () => {
    const res = await fetch(MENU_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Admin-Password": password },
      body: JSON.stringify({ category: "_check_", name: "_check_" }),
    })
    if (res.status === 401) {
      setAuthError(true)
      return
    }
    setSavedPassword(password)
    setAuthed(true)
    fetchItems(password)
  }

  const save = async () => {
    if (!editItem) return
    setSaving(true)
    const method = editItem.id ? "PUT" : "POST"
    await fetch(MENU_URL, {
      method,
      headers: { "Content-Type": "application/json", "X-Admin-Password": savedPassword },
      body: JSON.stringify(editItem),
    })
    await fetchItems(savedPassword)
    setEditItem(null)
    setSaving(false)
  }

  const deleteItem = async (id: number) => {
    if (!confirm("Удалить позицию?")) return
    await fetch(MENU_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "X-Admin-Password": savedPassword },
      body: JSON.stringify({ id }),
    })
    await fetchItems(savedPassword)
  }

  const filtered = items.filter(i => i.category === activeCategory)

  if (!authed) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <div className="text-center mb-6">
            <p className="text-3xl mb-2">🥃</p>
            <h1 className="text-white text-xl font-bold">G80 Админ-панель</h1>
            <p className="text-gray-400 text-sm mt-1">Управление меню</p>
          </div>
          <div className="space-y-4">
            <div>
              <Label className="text-white text-sm">Пароль</Label>
              <Input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setAuthError(false) }}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                placeholder="Введите пароль"
              />
              {authError && <p className="text-red-400 text-xs mt-1">Неверный пароль</p>}
            </div>
            <Button onClick={handleLogin} className="w-full bg-white text-black hover:bg-gray-100">
              Войти
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/40 backdrop-blur-sm px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🥃</span>
          <div>
            <h1 className="text-white font-bold text-lg">G80 Админ-панель</h1>
            <p className="text-gray-400 text-xs">Управление меню</p>
          </div>
        </div>
        <Button
          size="sm"
          onClick={() => setEditItem(emptyForm())}
          className="bg-white text-black hover:bg-gray-100 text-sm"
        >
          + Добавить
        </Button>
      </div>

      <div className="flex h-[calc(100vh-65px)]">
        {/* Sidebar */}
        <div className="w-56 border-r border-white/10 bg-black/20 overflow-y-auto flex-shrink-0">
          <button
            onClick={() => setActiveCategory("__stats__")}
            className={`w-full text-left px-4 py-3 text-sm border-b border-white/10 transition-colors flex items-center gap-2
              ${activeCategory === "__stats__" ? "bg-purple-500/20 text-purple-300" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
          >
            <span>📊</span><span>Статистика</span>
          </button>
          {Object.entries(CATEGORIES).map(([key, label]) => {
            const count = items.filter(i => i.category === key).length
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`w-full text-left px-4 py-3 text-sm border-b border-white/5 transition-colors flex items-center justify-between gap-2
                  ${activeCategory === key ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
              >
                <span>{label}</span>
                <span className="text-xs bg-white/10 rounded-full px-2 py-0.5 flex-shrink-0">{count}</span>
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">

          {activeCategory === "__stats__" ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-semibold text-lg">Статистика посетителей</h2>
                <button onClick={reloadStats} className="text-xs text-gray-400 hover:text-white px-3 py-1 rounded bg-white/5 border border-white/10">
                  Обновить
                </button>
              </div>
              {statsLoading ? (
                <p className="text-gray-400">Загрузка...</p>
              ) : stats ? (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: "За сегодня", value: stats.today },
                      { label: "За неделю", value: stats.week },
                      { label: "За месяц", value: stats.month },
                      { label: "Всего", value: stats.total },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                        <p className="text-3xl font-bold text-purple-300">{value.toLocaleString("ru-RU")}</p>
                        <p className="text-gray-400 text-xs mt-1">{label}</p>
                      </div>
                    ))}
                  </div>
                  {stats.daily.length > 0 && (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className="text-white text-sm font-semibold mb-3">По дням (последние 30 дней)</p>
                      <div className="flex flex-col gap-1.5">
                        {stats.daily.map(({ date, count }) => {
                          const max = Math.max(...stats.daily.map(d => d.count))
                          const pct = max > 0 ? (count / max) * 100 : 0
                          return (
                            <div key={date} className="flex items-center gap-3 text-xs">
                              <span className="text-gray-500 w-24 flex-shrink-0">{date}</span>
                              <div className="flex-1 bg-white/5 rounded-full h-2">
                                <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${pct}%` }} />
                              </div>
                              <span className="text-gray-300 w-6 text-right">{count}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500">Нет данных</p>
              )}
            </div>
          ) : (
          <>
          <h2 className="text-white font-semibold text-lg mb-4">{CATEGORIES[activeCategory]}</h2>

          {loading ? (
            <p className="text-gray-400">Загрузка...</p>
          ) : filtered.length === 0 ? (
            <p className="text-gray-500 text-sm">Нет позиций в этой категории</p>
          ) : (
            <div className="grid gap-2">
              {filtered.map(item => (
                <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{item.name}</p>
                    {item.description && <p className="text-gray-400 text-xs truncate">{item.description}</p>}
                  </div>
                  <div className="text-right flex-shrink-0 text-sm text-gray-300 space-y-0.5">
                    {item.price && <p>{item.price} ₽</p>}
                    {item.price_bottle && <p className="text-xs text-gray-500">бут. {item.price_bottle} ₽</p>}
                    {item.price_glass && <p className="text-xs text-gray-500">бок. {item.price_glass} ₽</p>}
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => setEditItem({ ...item })}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Icon name="Pencil" size={14} />
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 transition-colors text-red-400"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          </>
          )}
        </div>
      </div>

      {/* Edit modal */}
      {editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-md p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-bold text-lg">{editItem.id ? "Редактировать" : "Добавить позицию"}</h3>
              <button onClick={() => setEditItem(null)} className="text-gray-400 hover:text-white">
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <Label className="text-white text-sm">Категория</Label>
                <select
                  value={editItem.category}
                  onChange={e => setEditItem({ ...editItem, category: e.target.value })}
                  className="mt-1 w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 text-sm"
                >
                  {Object.entries(CATEGORIES).map(([key, label]) => (
                    <option key={key} value={key} className="bg-gray-900">{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-white text-sm">Название *</Label>
                <Input
                  value={editItem.name}
                  onChange={e => setEditItem({ ...editItem, name: e.target.value })}
                  className="mt-1 bg-white/10 border-white/20 text-white"
                />
              </div>

              <div>
                <Label className="text-white text-sm">Состав / описание</Label>
                <Input
                  value={editItem.description || ""}
                  onChange={e => setEditItem({ ...editItem, description: e.target.value })}
                  className="mt-1 bg-white/10 border-white/20 text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label className="text-white text-xs">Цена, ₽</Label>
                  <Input
                    type="number"
                    value={editItem.price ?? ""}
                    onChange={e => setEditItem({ ...editItem, price: e.target.value ? Number(e.target.value) : null })}
                    className="mt-1 bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white text-xs">Бутылка, ₽</Label>
                  <Input
                    type="number"
                    value={editItem.price_bottle ?? ""}
                    onChange={e => setEditItem({ ...editItem, price_bottle: e.target.value ? Number(e.target.value) : null })}
                    className="mt-1 bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white text-xs">Бокал, ₽</Label>
                  <Input
                    type="number"
                    value={editItem.price_glass ?? ""}
                    onChange={e => setEditItem({ ...editItem, price_glass: e.target.value ? Number(e.target.value) : null })}
                    className="mt-1 bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={() => setEditItem(null)} variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                Отмена
              </Button>
              <Button onClick={save} disabled={saving || !editItem.name} className="flex-1 bg-white text-black hover:bg-gray-100">
                {saving ? "Сохраняю..." : "Сохранить"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}