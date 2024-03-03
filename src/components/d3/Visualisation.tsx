'use client'

// components/ProjectVisualisation.tsx
import * as d3 from 'd3'
import React, { useEffect, useRef, useState } from 'react'

interface ProjectNode {
  id: number
  name: string
  type: string
  marketCap: number
  x?: number
  y?: number
  vx?: number
  vy?: number
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

function generateMockData(count: number, types: string[]): ProjectNode[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `Project ${i}`,
    type: types[Math.floor(Math.random() * types.length)],
    marketCap: Math.random() * 1000, // Mock market cap value
  }))
}

const setupSimulation = (
  nodes: ProjectNode[],
  width: number,
  height: number
) => {
  return d3
    .forceSimulation(nodes)
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('charge', d3.forceManyBody().strength(-50))
    .force('cluster', forceCluster(nodes))
    .force('collide', forceCollide(nodes))
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

function handleNodeClick(
  event: MouseEvent,
  nodes: ProjectNode[],
  setSelectedProject: (project: ProjectNode | null) => void
) {
  const rect = event.currentTarget.getBoundingClientRect()
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top

  const clickedNode = nodes.find((node) => {
    const distance = Math.sqrt(
      (node.x! - mouseX) ** 2 + (node.y! - mouseY) ** 2
    )
    return distance <= node.radius!
  })

  setSelectedProject(clickedNode || null)
}

const ProjectVisualisation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedProject, setSelectedProject] = useState<ProjectNode | null>(
    null
  )
  const [projects, setProjects] = useState<ProjectNode[]>([])
  const zoomRef = useRef<d3.ZoomBehavior<Element, unknown> | null>(null)

  useEffect(() => {
    // Assume generateMockData, setupSimulation, setupZoom, and other helper functions are defined
    const width = window.innerWidth
    const height = window.innerHeight

    const projectTypes = ['DeFi', 'NFT', 'DAO', 'GameFi']
    const colorScale = d3.scaleOrdinal(projectTypes, d3.schemeCategory10)
    const sizeScale = d3.scaleSqrt().domain([0, 1000]).range([5, 20])

    const mockData = generateMockData(100, projectTypes)
    setProjects(
      mockData.map((d) => ({
        ...d,
        radius: sizeScale(d.marketCap),
        color: colorScale(d.type),
      }))
    )

    if (canvasRef.current) {
      const canvas = canvasRef.current
      canvas.width = width
      canvas.height = height
      const context = canvas.getContext('2d')
      if (!context) return

      const nodes = projects.map((d) => ({
        ...d,
        x: Math.random() * width,
        y: Math.random() * height,
      }))

      const simulation = setupSimulation(nodes, width, height)
      setupZoom(canvas, context, nodes)

      drawNodes(context, nodes) // Initial draw

      simulation.on('tick', () => drawNodes(context, nodes))
      canvas.addEventListener('click', (event) =>
        handleNodeClick(event, nodes, setSelectedProject)
      )
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className='left-0 top-0 h-full w-full'></canvas>
      {selectedProject && (
        <div className='absolute right-0 top-0 bg-gray-100 p-4'>
          {/* Display selected project details here */}
        </div>
      )}
    </>
  )
}

export default ProjectVisualisation
