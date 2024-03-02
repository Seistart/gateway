function forceCluster(
  nodes: d3.SimulationNodeDatum[],
  centroidCalculator: (nodes: Node[]) => { x: number; y: number }
) {
  const strength = 0.2
  let centroids: Map<number, { x: number; y: number }>

  function force(alpha: number) {
    centroids = new Map(
      d3.rollup(nodes as Node[], centroidCalculator, (d) => d.group)
    )
    for (const d of nodes as Node[]) {
      const { x: cx, y: cy } = centroids.get(d.group)
      d.vx -= (d.x - cx) * alpha * strength
      d.vy -= (d.y - cy) * alpha * strength
    }
  }

  force.initialize = function () {
    // Initialization logic if needed
  }

  return force
}

function forceCollide() {
  const alpha = 0.4 // Adjust rigidity
  const padding1 = 2 // Separation between same-group nodes
  const padding2 = 6 // Separation between different-group nodes
  let maxRadius: number

  function force(nodes: d3.SimulationNodeDatum[]) {
    const quadtree = d3.quadtree(
      nodes,
      (d) => d.x,
      (d) => d.y
    )
    for (const d of nodes as Node[]) {
      const r = d.r + maxRadius
      const nx1 = d.x - r,
        ny1 = d.y - r
      const nx2 = d.x + r,
        ny2 = d.y + r
      quadtree.visit((q, x1, y1, x2, y2) => {
        if (!q.length)
          do {
            if (q.data !== d) {
              const r =
                d.r +
                q.data.r +
                (d.group === q.data.group ? padding1 : padding2)
              let x = d.x - q.data.x,
                y = d.y - q.data.y,
                l = Math.hypot(x, y)
              if (l < r) {
                l = ((l - r) / l) * alpha
                d.x -= x *= l
                d.y -= y *= l
                q.data.x += x
                q.data.y += y
              }
            }
          } while ((q = q.next))
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1
      })
    }
  }

  force.initialize = function (nodes: Node[]) {
    maxRadius = d3.max(nodes, (d) => d.r) + Math.max(padding1, padding2)
  }

  return force
}

function drag(simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>) {
  return d3
    .drag<SVGCircleElement, Node>()
    .on('start', (event, d) => {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    })
    .on('drag', (event, d) => {
      d.fx = event.x
      d.fy = event.y
    })
    .on('end', (event, d) => {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    })
}
