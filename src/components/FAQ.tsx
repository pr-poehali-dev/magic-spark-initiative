import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Нужен ли опыт в дизайне?",
    answer:
      "Нет, Roomiq создан для всех. Наш ИИ-помощник проведёт вас через весь процесс — от выбора стиля до финального рендера. Вы просто отвечаете на вопросы о своих предпочтениях.",
  },
  {
    question: "Сколько времени занимает создание проекта?",
    answer:
      "Базовый дизайн комнаты генерируется за 2–5 минут. Вы можете дорабатывать его сколько угодно — менять мебель, цвета, материалы и планировку в реальном времени.",
  },
  {
    question: "Можно ли использовать свой план квартиры?",
    answer:
      "Да! Загрузите фото плана или нарисуйте комнату прямо в приложении. Roomiq автоматически определит размеры и предложит варианты расстановки.",
  },
  {
    question: "Мебель в проекте — реальная?",
    answer:
      "Да, мы используем каталоги реальных магазинов-партнёров. Каждый предмет мебели в вашем проекте можно купить — мы добавляем ссылки и актуальные цены.",
  },
  {
    question: "Есть ли бесплатная версия?",
    answer:
      "Да, бесплатный тариф позволяет создать до 3 проектов комнат. Для неограниченного доступа и дополнительных функций — подписка от 990 ₽/мес.",
  },
  {
    question: "Как получить итоговый проект?",
    answer:
      "Готовый дизайн можно скачать в PDF с размерами, списком мебели и цветовой палитрой. Также доступен экспорт 3D-модели для передачи строителям или дизайнерам.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
