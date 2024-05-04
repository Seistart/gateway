import { Hero, HomeMarquee, PopularProjects, Trending } from "@/components/home"
import { Collaborators, Faqs } from "@/components/shared"

export default function HomePage() {
  return (
    <div>
      <Hero />
      <HomeMarquee />
      <PopularProjects />
      <Trending />
      <Collaborators />
      <Faqs />
    </div>
  )
}
