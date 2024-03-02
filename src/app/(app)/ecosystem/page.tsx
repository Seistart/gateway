import ForceGraph from '@/components/d3/ForceGraph'
import { Button } from '@/components/ui/button'
import { appMetadata } from '@/config'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...appMetadata.projects,
}
interface ProjectType {
  name: string
  color: string // Representing the color in a web-friendly format (e.g., HEX, RGB)
}

const projectTypes: ProjectType[] = [
  { name: 'DEX', color: 'bg-orange-400' }, // A vibrant orange
  { name: 'GameFi', color: 'bg-green-400' }, // A lively green
  { name: 'Finance', color: 'bg-blue-400' }, // A deep blue
  { name: 'NFT', color: 'bg-purple-400' }, // A bright purple
]

export default async function ProjectsPage() {
  return (
    <div className='relative h-full w-full items-center justify-center overflow-hidden bg-opacity-20 bg-[url("/images/Union.png")] bg-center bg-no-repeat '>
      <div className='border-red-200-md  absolute rounded border-2 bg-secondary p-4'>
        <h1>Legends</h1>
        <div className='flex flex-col'>
          {projectTypes.map((type, index) => {
            return (
              <div key={index} className='flex h-6 items-center'>
                <Button
                  variant='ghost'
                  size='icon'
                  className={`h-4 w-4 rounded-full ${type.color}`}
                ></Button>
                <span className='text-sm'>{type.name}</span>
              </div>
            )
          })}
        </div>
      </div>
      <ForceGraph />
    </div>
  )
}
