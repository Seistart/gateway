'use client'

import * as d3 from 'd3'
import React, { useEffect, useRef, useState } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

interface ProjectNode {
  id: number
  name: string
  type: string
  marketCap: number
  x?: number
  y?: number
  radius?: number
  color?: string
}

function forceCluster(nodes: ProjectNode[]) {
  const strength = 0.2
  let centroids: Map<number, { x: number; y: number }>

  function force(alpha: number) {
    centroids = d3.rollup(
      nodes,
      (v) => {
        const x = d3.mean(v, (d) => d.x!)!
        const y = d3.mean(v, (d) => d.y!)!
        return { x, y }
      },
      (d) => d.type
    )

    nodes.forEach((d) => {
      const { x: cx, y: cy } = centroids.get(d.type)!
      d.vx = d.vx! - (d.x! - cx) * strength * alpha
      d.vy = d.vy! - (d.y! - cy) * strength * alpha
    })
  }

  force.initialize = function () {}

  return force
}

function forceCollide(nodes: ProjectNode[]) {
  const alpha = 0.4 // Consider making this adjustable
  const padding1 = 2 // Separation between same-group nodes
  const padding2 = 6 // Separation between different-group nodes
  let maxRadius: number

  function force() {
    maxRadius =
      d3.max(nodes, (d) => d.radius as number) + Math.max(padding1, padding2)

    const quadtree = d3
      .quadtree<ProjectNode>()
      .x((d) => d.x!)
      .y((d) => d.y!)
      .addAll(nodes)

    nodes.forEach((d) => {
      const r = d.radius! + maxRadius
      const nx1 = d.x! - r,
        ny1 = d.y! - r
      const nx2 = d.x! + r,
        ny2 = d.y! + r
      quadtree.visit((q, x1, y1, x2, y2) => {
        if (!q.length)
          do {
            if (q.data !== d) {
              const r =
                d.radius! +
                q.data.radius! +
                (d.type === q.data.type ? padding1 : padding2)
              let x = d.x! - q.data.x!,
                y = d.y! - q.data.y!,
                l = Math.hypot(x, y)
              if (l < r) {
                l = ((l - r) / l) * alpha
                d.x! -= x *= l
                d.y! -= y *= l
                q.data.x! += x
                q.data.y! += y
              }
            }
          } while ((q = q.next))
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1
      })
    })
  }

  force.initialize = function () {}

  return force
}

function setupZoom(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  nodes: ProjectNode[]
) {
  const zoomHandler = d3
    .zoom()
    .scaleExtent([1, 10]) // Limit zoom scale
    .on('zoom', (event) => {
      context.save()
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.translate(event.transform.x, event.transform.y)
      context.scale(event.transform.k, event.transform.k)
      drawNodes(context, nodes)
      context.restore()
    })

  d3.select(canvas).call(zoomHandler)
}

function drawNodes(context: CanvasRenderingContext2D, nodes: ProjectNode[]) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height) // Clear canvas
  nodes.forEach((node) => {
    // Draw circle
    context.beginPath()
    context.arc(node.x!, node.y!, node.radius!, 0, 2 * Math.PI)
    context.fillStyle = node.color!
    context.fill()

    // Draw label
    context.font = '12px sans-serif'
    context.textAlign = 'center'
    context.fillText(node.name, node.x!, node.y! + node.radius! + 10)
  })
}

const ProjectVisualisation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [projects, setProjects] = useState<ProjectNode[]>([])
  const [selectedProject, setSelectedProject] = useState<ProjectNode | null>(
    null
  )

  useEffect(() => {
    // Step 2: Mock Dataset Generation
    const generateMockData = (): ProjectNode[] => {
      const projectTypes = ['DeFi', 'NFT', 'DAO', 'GameFi']
      const mockData: ProjectNode[] = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        name: `Project ${i}`,
        type: projectTypes[Math.floor(Math.random() * projectTypes.length)],
        marketCap: Math.random() * 1000,
      }))
      return mockData
    }

    const mockData = generateMockData()
    setProjects(mockData)

    if (canvasRef.current) {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      if (!context) return

      // Step 4: Calculate Node Color Based on Project Type
      const projectTypes = ['DeFi', 'NFT', 'DAO', 'GameFi']
      const colorScale = d3.scaleOrdinal(projectTypes, d3.schemeCategory10)

      // Step 6: Calculate Node Size Based on Market Cap
      const sizeScale = d3.scaleSqrt().domain([0, 1000]).range([5, 20])

      // Initialize canvas size
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const nodes = mockData.map((d) => ({
        ...d,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: sizeScale(d.marketCap),
        color: colorScale(d.type),
      }))

      // D3 Force Simulation setup
      const simulation = d3
        .forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(0.3))
        .force('center', d3.forceCenter(canvas.width / 2, canvas.height / 2))
        .force('cluster', forceCluster(nodes))
        .force('collide', forceCollide(nodes))
        .on('tick', () => drawNodes(context, nodes))

      setupZoom(canvas, context, nodes)

      // Draw nodes function
      const drawNodes = (
        context: CanvasRenderingContext2D,
        nodes: ProjectNode[]
      ) => {
        context.clearRect(0, 0, canvas.width, canvas.height) // Clear canvas
        nodes.forEach((node) => {
          // Draw circle
          context.beginPath()
          context.arc(node.x!, node.y!, node.radius!, 0, 2 * Math.PI)
          context.fillStyle = node.color!
          context.fill()

          // Draw label
          context.font = '10px sans-serif'
          context.textAlign = 'center'
          context.fillStyle = '#000'
          context.fillText(node.name, node.x!, node.y! - node.radius! - 5)
        })
      }

      // Handle click events
      canvas.onclick = (event) => {
        const rect = canvas.getBoundingClientRect()
        const mouseX = event.clientX - rect.left
        const mouseY = event.clientY - rect.top
        const clickedNode = nodes.find((node) => {
          const distance = Math.sqrt(
            (node.x! - mouseX) ** 2 + (node.y! - mouseY) ** 2
          )
          return distance < node.radius!
        })
        setSelectedProject(clickedNode || null)
      }

      return () => {
        simulation.stop()
      }
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className='left-0 top-0 h-full w-full bg-white'
      ></canvas>
      <aside
        className={`absolute right-0 top-0 h-full w-96 bg-white p-4 shadow-lg transition-transform duration-300 ${selectedProject ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <h2 className='text-xl font-semibold text-gray-900'>
              {selectedProject?.id} Details
            </h2>
            <h3 className='text-md font-normal text-gray-500'>
              {selectedProject?.name}
            </h3>
          </div>
          <button
            onClick={() => setSelectedProject(null)}
            className='text-gray-500 hover:text-gray-700'
          >
            <svg
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <div className='flex justify-between'>
          <Button
            variant='ghost'
            className='h-4 w-[50%] border border-2 border-gray-700 py-5 font-semibold text-gray-700'
          >
            Content
          </Button>
          <Button
            variant='ghost'
            className='h-4 w-[50%] border border-2 border-gray-200 py-5  font-semibold text-gray-500'
          >
            Details
          </Button>
        </div>
        <div>
          <span className='text-md text-gray-500'>Labels</span>
          <div>
            <Badge
              variant='outline'
              className='rounded-md bg-blue-200 text-blue-600'
            >
              Dex
            </Badge>
            <Badge
              variant='outline'
              className='rounded-md bg-green-200 text-green-600'
            >
              Finance
            </Badge>
            <Badge
              variant='outline'
              className='rounded-md bg-orange-200 text-orange-600'
            >
              NFT
            </Badge>
          </div>
        </div>
        <div className='mt-4'>
          <p className='text-sm text-gray-600'>
            <strong>Id:</strong> {selectedProject?.id}
          </p>
          <p className='text-sm text-gray-600'>
            <strong>Name:</strong> {selectedProject?.name}
          </p>
          <p className='text-sm text-gray-600'>
            <strong>Marketcap:</strong> {selectedProject?.marketCap}
          </p>
          {/* Add more node details here */}
        </div>
      </aside>
    </>
  )
}

export default ProjectVisualisation
