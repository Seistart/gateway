'use client'

import { ComboBox } from '@/components/ui/combo-box'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useProjectStore } from '@/state'
import { ProjectStatus, ProjectTags } from '@/types'
import { CompleteProject } from '@/lib/db/schema/projects'
import { useEffect } from 'react'

export const Projects = ({
  projects,
}: {
  projects: CompleteProject[];
}) => {
    
  const {
    setSearchTerm,
    searchTerm,
    filter,
    setTagFilter,
    setStatusFilter,
    resetFilter,
    setProjects,
    filteredProjects
  } = useProjectStore(state=> ({...state,filteredProjects: state.getFilteredProjects()}))
  const tagValues = Object.values(ProjectTags).map((tag) => ({
    value: tag.toLowerCase(),
    label: tag,
  }))
  const statusValues = Object.values(ProjectStatus).map((status) => ({
    value: status.toLowerCase(),
    label: status,
  }))

  useEffect(() => {
    setProjects(projects);
    return () => {
      resetFilter()
    }
  }, [resetFilter, projects, setProjects])

  return (
    <div className='container mx-auto items-center'>
      {filter.tag}
      <div className='my-20 text-center text-4xl'>
        Discover SEI&#39;s most innovating projects
        <div className='mx-auto mt-10 max-w-[900px] text-center text-2xl'>
          Search through our leading platform to find new innovations in this
          fast growing ecosystem
        </div>
      </div>
      <Input
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search...'
        type='text'
        value={searchTerm}
      ></Input>
      <ComboBox
        items={tagValues}
        value={filter.tag}
        setValue={setTagFilter}
        selectPlaceHolder='Select Tag...'
        searchPlaceHolder='Search Tag...'
      ></ComboBox>
      <ComboBox
        items={statusValues}
        value={filter.status}
        setValue={setStatusFilter}
        selectPlaceHolder='Select Status...'
        searchPlaceHolder='Search Status...'
      ></ComboBox>
      <div className='mx-auto grid grid-cols-2 place-items-center'>
        {filteredProjects.map((project, index) => (
          <Button className='min-w-[400px]' key={index}>
            <div className='flex flex-col'>
              <div>{project.projectName}</div>
              <div> {project.projectType.toString()}</div>
              <div> {project.projectRelease}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}
