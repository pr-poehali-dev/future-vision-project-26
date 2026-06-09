import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const BOOKING_URL = "https://functions.poehali.dev/a419d7df-39e9-4f81-801e-5ced1af35d89"

export function BookingForm() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState("")
  const [guests, setGuests] = useState("")
  const [comment, setComment] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) return
    setStatus("loading")
    try {
      const res = await fetch(BOOKING_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, date, guests, comment }),
      })
      if (res.ok) {
        setStatus("success")
        setName(""); setPhone(""); setDate(""); setGuests(""); setComment("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const inputCls = "bg-white/10 border-white/20 text-white placeholder:text-gray-400"

  if (status === "success") {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-4 py-8 text-center">
        <span className="text-4xl">🥃</span>
        <p className="text-white font-open-sans-custom text-lg font-semibold">Заявка отправлена!</p>
        <p className="text-gray-300 font-open-sans-custom text-sm">Мы свяжемся с вами в ближайшее время.</p>
        <Button onClick={() => setStatus("idle")} variant="outline" className="border-white/20 text-white hover:bg-white/10 font-open-sans-custom">
          Новая заявка
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full space-y-3">
      <div className="flex flex-col gap-1.5">
        <Label className="text-white font-open-sans-custom text-sm">Имя *</Label>
        <Input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ваше имя" className={inputCls} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label className="text-white font-open-sans-custom text-sm">Телефон *</Label>
        <Input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+7 949 000 00 00" className={inputCls} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label className="text-white font-open-sans-custom text-sm">Дата и время</Label>
        <Input type="text" value={date} onChange={e => setDate(e.target.value)} placeholder="Например: 15 июня, 20:00" className={inputCls} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label className="text-white font-open-sans-custom text-sm">Количество гостей</Label>
        <Input type="text" value={guests} onChange={e => setGuests(e.target.value)} placeholder="Например: 4" className={inputCls} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label className="text-white font-open-sans-custom text-sm">Комментарий</Label>
        <Textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Пожелания, повод..." className={inputCls} />
      </div>
      {status === "error" && (
        <p className="text-red-400 text-xs font-open-sans-custom">Ошибка отправки. Попробуйте ещё раз.</p>
      )}
      <Button
        onClick={handleSubmit}
        disabled={status === "loading" || !name.trim() || !phone.trim()}
        className="w-full bg-white text-black hover:bg-gray-100 font-open-sans-custom"
      >
        {status === "loading" ? "Отправляем..." : "Забронировать стол"}
      </Button>
    </div>
  )
}
