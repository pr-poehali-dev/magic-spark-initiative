import { useState } from "react"
import { Header } from "../components/Header"
import { Hero } from "../components/Hero"
import { Philosophy } from "../components/Philosophy"
import { Projects } from "../components/Projects"
import { Expertise } from "../components/Expertise"
import { FAQ } from "../components/FAQ"
import { CallToAction } from "../components/CallToAction"
import { Footer } from "../components/Footer"
import { SignUpDialog } from "../components/SignUpDialog"

export default function Index() {
  const [signUpOpen, setSignUpOpen] = useState(false)

  return (
    <main className="min-h-screen">
      <Header onSignUp={() => setSignUpOpen(true)} />
      <Hero />
      <Philosophy />
      <Projects onSignUp={() => setSignUpOpen(true)} />
      <Expertise />
      <FAQ />
      <CallToAction onSignUp={() => setSignUpOpen(true)} />
      <Footer />
      <SignUpDialog open={signUpOpen} onOpenChange={setSignUpOpen} />
    </main>
  )
}
