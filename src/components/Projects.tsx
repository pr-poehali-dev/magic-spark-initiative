import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Скандинавская гостиная",
    category: "Гостиная",
    location: "42 м² · Светлый стиль",
    year: "3 мин",
    image: "https://cdn.poehali.dev/projects/fd45224e-a1bb-4a44-9f91-18e6c4bf26eb/files/da33e296-0abf-45cf-8258-a9b323e49418.jpg",
  },
  {
    id: 2,
    title: "Минималистичная кухня",
    category: "Кухня",
    location: "18 м² · Мрамор и дерево",
    year: "2 мин",
    image: "https://cdn.poehali.dev/projects/fd45224e-a1bb-4a44-9f91-18e6c4bf26eb/files/2545f497-ffed-4efa-bd02-69fadc21586b.jpg",
  },
  {
    id: 3,
    title: "Уютная спальня",
    category: "Спальня",
    location: "24 м² · Тёплые тона",
    year: "2 мин",
    image: "https://cdn.poehali.dev/projects/fd45224e-a1bb-4a44-9f91-18e6c4bf26eb/files/d96b7b01-a8b5-45a4-be1b-684348965ded.jpg",
  },
  {
    id: 4,
    title: "Лофт-студия",
    category: "Студия",
    location: "56 м² · Индустриальный стиль",
    year: "4 мин",
    image: "/images/hously-4.png",
  },
]

interface ProjectsProps {
  onSignUp?: () => void
}

export function Projects({ onSignUp }: ProjectsProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(projects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Созданные в Roomiq</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Примеры интерьеров</h2>
          </div>
          <button
            onClick={onSignUp}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
          >
            Создать свой дизайн
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === project.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {project.category} · {project.location}
                  </p>
                </div>
                <span className="text-muted-foreground/60 text-sm">{project.year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}