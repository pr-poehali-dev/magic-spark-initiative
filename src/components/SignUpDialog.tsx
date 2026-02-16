import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

interface SignUpDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignUpDialog({ open, onOpenChange }: SignUpDialogProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  const handleClose = (value: boolean) => {
    onOpenChange(value)
    if (!value) {
      setTimeout(() => {
        setName("")
        setEmail("")
        setSubmitted(false)
      }, 300)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Check" size={32} className="text-green-600" />
            </div>
            <DialogHeader className="items-center">
              <DialogTitle className="text-2xl">Добро пожаловать!</DialogTitle>
              <DialogDescription className="text-base mt-2">
                Мы отправили ссылку для входа на {email}. Проверьте почту и начните создавать интерьеры.
              </DialogDescription>
            </DialogHeader>
            <Button
              onClick={() => handleClose(false)}
              className="mt-6 w-full"
              size="lg"
            >
              Отлично
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Создайте аккаунт</DialogTitle>
              <DialogDescription className="text-base">
                3 бесплатных проекта без ограничений. Начните дизайн прямо сейчас.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div>
                <Input
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
              <Button type="submit" className="w-full h-12 text-sm tracking-wide" size="lg">
                Начать бесплатно
                <Icon name="ArrowRight" size={16} />
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-2">
              Нажимая кнопку, вы соглашаетесь с условиями использования и политикой конфиденциальности
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
