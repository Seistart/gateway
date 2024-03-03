'use client'

import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

interface ProjectNode {
  id: string
  group: number
  value: number
  namr: string
  type: string
  x?: number
  y?: number
  vx?: number
  vy?: number
  fx?: number | null
  fy?: number | null
  r?: number
}

// Mock data generation (replace with your actual data logic)
const generateMockData = () => ({
  children: Array.from({ length: 200 }, (_, i) => ({
    id: `project-${i}`,
    group: Math.floor(Math.random() * 10),
    value: Math.random() * 100 + 10, // Random value for demonstration
    name: 'Sei Network',
    type: 'Sei Network',
    imageUrl:
      'http://localhost:3000/_next/image?url=%2Fimages%2Flogo_850.png&w=128&q=75',
  })),
})

function forceCluster(nodes: ProjectNode[]) {
  const clusterStrength = 0.3 // Adjust the strength as needed

  // Calculates the centroid for each cluster
  function calculateCentroids() {
    const centroids: Map<number, { x: number; y: number; count: number }> =
      new Map()
    nodes.forEach((node) => {
      const cluster = centroids.get(node.group) || { x: 0, y: 0, count: 0 }
      cluster.x += node.x || 0
      cluster.y += node.y || 0
      cluster.count += 1
      centroids.set(node.group, cluster)
    })

    centroids.forEach((centroid) => {
      centroid.x /= centroid.count
      centroid.y /= centroid.count
    })

    return centroids
  }

  return (alpha: number) => {
    const centroids = calculateCentroids()
    nodes.forEach((node: any) => {
      const centroid = centroids.get(node.group)
      if (centroid) {
        node.vx += (centroid.x - node.x) * clusterStrength * alpha
        node.vy += (centroid.y - node.y) * clusterStrength * alpha
      }
    })
  }
}

function forceCollide(nodes: ProjectNode[]) {
  const alpha = 0.1 // Control the rigidity of the collisions
  const padding = 10 // Minimum separation between nodes
  const labelHeight = 10 // Approximate height of your labels; adjust as needed

  d3.forceCollide((d) => d.r + 1).strength(1)

  return d3.forceCollide().radius((d) => d.r + labelHeight + padding)
}

function drag(
  simulation: d3.Simulation<ProjectNode, undefined>,
  nodes: ProjectNode[]
) {
  function dragstarted(event: any, d: ProjectNode) {
    // Change alpa to keep the node types together
    if (!event.active) simulation.alphaTarget(0).restart()
    d.fx = d.x
    d.fy = d.y
  }

  function dragged(event: any, d: ProjectNode) {
    d.fx = event.x
    d.fy = event.y

    // Optionally, adjust forces or parameters here for smoother dragging with cluster
    // For example, you could increase the collision padding or adjust the strength
    // of the cluster force to make it easier to pull the cluster along
    d3.forceSimulation(nodes)
      .force('x', d3.forceX().strength(0)) // Adjust strength as needed
      .force('y', d3.forceY().strength(0)) // Adjust strength as needed
  }

  function dragended(event: any, d: ProjectNode) {
    if (!event.active) simulation.alphaTarget(0)
    d.fx = null
    d.fy = null

    // Reset any temporary force adjustments made during dragging
  }

  return d3
    .drag<SVGCircleElement, ProjectNode>()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended)
}

// Define initial scale
const initialScale = 0.5 // Example: start zoomed in 2x

const ForceGraph = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedNode, setSelectedNode] = useState()
  const [previousSelectedNode, setPreviousSelectedNode] = useState()

  // Example function to handle node click
  function onNodeClick(event, d) {
    // Update selectedNode reference
    setPreviousSelectedNode(event.currentTarget)
    setSelectedNode(d) // Update state with clicked node data

    console.log(event.currentTarget.getAttribute('r'))

    // For rectangles, directly get the width and height
    const width = event.currentTarget.getAttribute('width')
    const height = event.currentTarget.getAttribute('height')

    const xPosition = event.currentTarget
      .querySelector('circle')
      .getAttribute('x')
    const yPosition = event.currentTarget
      .querySelector('circle')
      .getAttribute('y')

    // Highlight the clicked node
    // d3.select(event.currentTarget)
    //   .append('circle')
    //   .attr('cx', xPosition)
    //   .attr('cy', yPosition)
    //   .attr('r', event.currentTarget.getAttribute('r'))
    //   .attr('width', width)
    //   .attr('height', height)
    //   .style('stroke', 'white')
    //   .style('strokeWidth', '2px')

    // const newX = 100 // New X position
    // const newY = 100 // New Y position

    // // Update the node's fixed position
    // d.fx = newX
    // d.fy = newY

    // // Optionally, update the node's visual position immediately
    // d3.select(event.currentTarget).attr('cx', d.fx).attr('cy', d.fy)
  }

  useEffect(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    const data = generateMockData()

    // Convert the flat data structure to a hierarchical one, suitable for d3.pack
    const root = d3.hierarchy({ children: data.children }).sum((d) => d.value)

    // D3 pack layout
    const pack = d3.pack().size([width, height]).padding(3)
    const nodes: ProjectNode[] = pack(root)
      .leaves()
      .map((d) => ({
        ...d.data,
        x: d.x,
        y: d.y,
        r: d.r,
      }))

    function adjustViewBox() {
      const margin = 20 // Margin around the nodes
      const xExtent = d3.extent(nodes, (d) => d.x)
      const yExtent = d3.extent(nodes, (d) => d.y)
      const viewBox = [
        xExtent[0] - margin,
        yExtent[0] - margin,
        xExtent[1] - xExtent[0] + margin * 2,
        yExtent[1] - yExtent[0] + margin * 2,
      ]
      svg.attr('viewBox', viewBox.join(' '))
    }

    // Define any scales or calculations for node sizes
    const nodeRadiusScale = d3
      .scaleSqrt()
      .domain([d3.min(nodes, (d) => d.value), d3.max(nodes, (d) => d.value)])
      .range([10, 30])

    // Define any scales or calculations for node sizes
    const nodeFontScale = d3
      .scaleSqrt()
      .domain([d3.min(nodes, (d) => d.value), d3.max(nodes, (d) => d.value)])
      .range([8, 15])

    const zoom = d3
      .zoom()
      .scaleExtent([0.2, 10])
      .on('zoom', (event) => {
        svg.selectAll('g').attr('transform', event.transform)
      })

    // Initialize SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', [-width / 2, -height / 2, width, height])
      .call(zoom)

    // Color scale
    const color = d3.scaleOrdinal(
      nodes.map((d) => d.group),
      d3.schemeCategory10
    )

    // Force simulation setup
    const simulation = d3
      .forceSimulation(nodes)
      .force('x', d3.forceX(width / 100).strength(0.03)) // Adjust strength as needed
      .force('y', d3.forceY(height / 100).strength(0.03)) // Adjust strength as needed
      .force('cluster', forceCluster(nodes))
      .force('collide', forceCollide(nodes))

    const node = svg
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .classed('cursor-pointer', true)
      .on('click', onNodeClick)
      .call(zoom.transform, d3.zoomIdentity.scale(initialScale))
      .call(drag(simulation)) // Assuming you have a drag function set up

    node
      .append('circle')
      .attr('r', (d) => nodeRadiusScale(d.value))
      .attr('fill', (d) => color(d.group))

    node
      .append('text')
      .text((d) => d.type) // Assuming each node has a name property
      .attr('x', 0) // Center the text on the node's x position
      .attr('fill', 'white')
      .style('font-size', (d) => `${nodeFontScale(d.value)}px`)
      .attr('y', (d) => d.r + 10) // Adjust this value to position the label below the node
      .attr('text-anchor', 'middle') // Center the text horizontally
      .attr('dominant-baseline', 'hanging') // Start the text below its y position

    node
      .transition()
      .delay((d, i) => Math.random() * 500)
      .duration(750)
      .attrTween('r', (d) => {
        const i = d3.interpolate(0, d.r)
        return (t) => (d.r = i(t))
      })

    // Optional: Add labels or additional visuals here
    node
      .append('image')
      .attr('xlink:href', (d) => d.imageUrl) // URL/path of your image
      .attr('x', (d) => -d.r) // Offset by radius to center the image
      .attr('y', (d) => -d.r)
      .attr('height', (d) => d.r * 1.5) // Image size to cover the circle
      .attr('width', (d) => d.r * 1.5)
      .attr('clip-path', (d) => `circle(${d.r}px at center)`) // Optional: clip image to circle

    function updateViewBox() {
      const margin = 20 // Margin around the nodes
      const nodePositions = nodes.map((d) => ({ x: d.x, y: d.y }))
      const xExtent = d3.extent(nodePositions, (d) => d.x)
      const yExtent = d3.extent(nodePositions, (d) => d.y)

      // const viewBoxX = xExtent[0] - margin
      // const viewBoxY = yExtent[0] - margin
      // const viewBoxWidth = xExtent[1] - xExtent[0] + 2 * margin
      // const viewBoxHeight = yExtent[1] - yExtent[0] + 2 * margin

      const viewBox = [
        xExtent[0] - margin,
        yExtent[0] - margin,
        xExtent[1] - xExtent[0] + margin * 2,
        yExtent[1] - yExtent[0] + margin * 2,
      ]

      // Set the viewBox attribute to center the visualization
      d3.select('svg').attr('viewBox', viewBox.join(' '))
    }

    simulation.on('tick', () => {
      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)

      node
        .selectAll('circle')
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)

      node
        .selectAll('text')
        .attr('x', (d) => d.x)
        .attr('y', (d) => d.y + d.r + 10) // Keep this consistent with your initial positioning

      node
        .selectAll('image')
        .attr('x', (d) => d.x - d.r / 1.32)
        .attr('y', (d) => d.y - d.r / 1.32) // Keep this consistent with your initial positioning

      updateViewBox() // Keep the visualization centered
    })
    // simulation.on('end', adjustViewBox) // Adjust viewBox after simulation stabilizes
  }, [])

  return (
    <>
      <svg ref={svgRef} className='h-full w-full'></svg>
      <aside
        className={`absolute right-0 top-0 h-full w-96 bg-white p-4 shadow-lg transition-transform duration-300 ${selectedNode ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <h2 className='text-xl font-semibold text-gray-900'>
              {selectedNode?.id} Details
            </h2>
            <h3 className='text-md font-normal text-gray-500'>
              {selectedNode?.name}
            </h3>
          </div>
          <button
            onClick={() => setSelectedNode(null)}
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
            <strong>Id:</strong> {selectedNode?.id}
          </p>
          <p className='text-sm text-gray-600'>
            <strong>Name:</strong> {selectedNode?.name}
          </p>
          <p className='text-sm text-gray-600'>
            <strong>Group:</strong> {selectedNode?.group}
          </p>
          {/* Add more node details here */}
        </div>
      </aside>
    </>
  )
}

export default ForceGraph
