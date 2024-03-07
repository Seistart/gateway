import { Input } from "@/components/ui/input"

interface ProjectsFilterProps {
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}

export const ProjectsFilter = ({
  searchTerm,
  setSearchTerm,
}: ProjectsFilterProps) => {
  return (
    <Input
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
      value={searchTerm}
      type="text"
    />
  )
}
