import * as d3 from 'd3'

export const forceCollide = (
  nodes: any[],
  padding1: number = 2,
  padding2: number = 6
) => {
  const alpha = 0.4 // You might want to use a dynamic alpha value from the simulation

  const maxRadius =
    d3.max(nodes, (node) => node.value) + Math.max(padding1, padding2)

  function force() {
    const quadtree = d3.quadtree(
      nodes,
      (d) => d.x,
      (d) => d.y
    )
    for (const node of nodes) {
      const r = node.value + maxRadius
      const nx1 = node.x - r,
        ny1 = node.y - r
      const nx2 = node.x + r,
        ny2 = node.y + r
      quadtree.visit((q, x1, y1, x2, y2) => {
        if (!q.length)
          do {
            if (q.data !== node) {
              const r =
                node.value +
                q.data.value +
                (node.type === q.data.type ? padding1 : padding2)
              let x = node.x - q.data.x
              let y = node.y - q.data.y
              let l = Math.hypot(x, y)
              if (l < r) {
                l = ((l - r) / l) * alpha
                node.x -= x *= l
                node.y -= y *= l
                q.data.x += x
                q.data.y += y
              }
            }
          } while ((q = q.next))
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1
      })
    }
  }

  force.initialize = function () {}

  return force
}

export const forceCluster = (nodes: any[], strength: number = 0.2) => {
  // Calculate cluster centers
  const clusters = new Map()

  nodes.forEach((node) => {
    const cluster = clusters.get(node.type)
    if (cluster) {
      cluster.x += node.x
      cluster.y += node.y
      cluster.count += 1
    } else {
      clusters.set(node.type, { x: node.x, y: node.y, count: 1 })
    }
  })

  clusters.forEach((cluster) => {
    cluster.x /= cluster.count
    cluster.y /= cluster.count
  })

  function force(alpha: number) {
    for (const node of nodes) {
      const cluster = clusters.get(node.type)
      node.vx -= (node.x - cluster.x) * strength * alpha
      node.vy -= (node.y - cluster.y) * strength * alpha
    }
  }

  force.initialize = function () {}

  return force
}
