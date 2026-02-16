import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const philosophyItems = [
  {
    title: "Простота в каждом шаге",
    description:
      "Выберите комнату, стиль и цветовую палитру — платформа сгенерирует готовый дизайн за минуты. Никаких сложных инструментов.",
  },
  {
    title: "ИИ-дизайнер",
    description:
      "Наш алгоритм учитывает размеры помещения, освещение и ваши предпочтения, чтобы предложить идеальную расстановку мебели и декора.",
  },
  {
    title: "Реалистичная визуализация",
    description:
      "Смотрите на свой будущий интерьер в фотореалистичном 3D. Меняйте материалы, цвета и мебель в реальном времени.",
  },
  {
    title: "Готовые списки покупок",
    description: "Каждый дизайн-проект включает список мебели и декора с ссылками на магазины. От идеи до покупки — один клик.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Как это работает</p>
            <h2 className="text-6xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
              Дизайн с
              <br />
              <HighlightedText>умом</HighlightedText>
            </h2>

            <div className="relative hidden lg:block">
              <img
                src="https://cdn.poehali.dev/projects/fd45224e-a1bb-4a44-9f91-18e6c4bf26eb/files/da33e296-0abf-45cf-8258-a9b323e49418.jpg"
                alt="Современный интерьер гостиной"
                className="opacity-90 relative z-10 w-auto rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              Roomiq — это онлайн-платформа, которая превращает ваши идеи в профессиональные дизайн-проекты интерьера. Без опыта, без дизайнера, без переплат.
            </p>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-muted-foreground/50 text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
