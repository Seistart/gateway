import { Project } from "@/database/schemas/projects.schema"
import { useEffect, useState } from "react"

export const useFilteredProjects = (initialProjects: Project[]) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [projects, setProjects] = useState(initialProjects)
  const [filteredProjects, setFilteredProjects] = useState(initialProjects)

  useEffect(() => {
    setProjects(initialProjects)
  }, [initialProjects])

  useEffect(() => {
    const searchTermsLower = searchTerm
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean)
    const newFilteredProjects = projects.filter(({ name, tags }) => {
      return (
        searchTermsLower.length === 0 ||
        searchTermsLower.every(
          (term) =>
            name.toLowerCase().includes(term) ||
            (tags && tags.some((tag) => tag.toLowerCase().includes(term)))
        )
      )
    })
    setFilteredProjects(newFilteredProjects)
  }, [searchTerm, projects])

  return { searchTerm, setSearchTerm, projects, setProjects, filteredProjects }
}
