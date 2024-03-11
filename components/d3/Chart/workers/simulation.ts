import { forceCollide, forceManyBody } from "d3-force"

import {
  createSimulationNodeData,
  nodeCollisionRadius,
  nodeStrength,
} from "../entities/Node"
import { createSimulation } from "../entities/Simulation"
import { NodeDatum, NodeInfo } from "../types"

import { Listeners, Message } from "./types"

const createWorkerSimulation = (simulationNodeData: NodeDatum[]) => {
  // Construct the forces.
  // const nodeForce = createForceManyBody();
  const nodeForce = forceManyBody<NodeDatum>()
    .theta(0.9)
    .distanceMin(1)
    .distanceMax(200)

  const collideForce = forceCollide(nodeCollisionRadius).iterations(5) // Tune this down for more performance but more chaotic node positioning (default = 1).

  nodeForce.strength(nodeStrength)

  const simulation = createSimulation(simulationNodeData)
    .force("charge", nodeForce)
    .force("collide", collideForce)

  return simulation
}

const listeners: Listeners = {
  init: function ({ nodes }: { nodes: NodeInfo[] }) {
    postMessage({
      type: "log",
      payload: "worker simulation initiated",
    })

    const simulationNodeData = createSimulationNodeData(nodes)
    const simulation = createWorkerSimulation(simulationNodeData)

    simulation.stop()

    for (
      let i = 0,
        n = Math.ceil(
          Math.log(simulation.alphaMin()) /
            Math.log(1 - simulation.alphaDecay())
        );
      i < n;
      ++i
    ) {
      simulation.tick()
    }
    postMessage({
      type: "log",
      payload: "worker simulation complete",
    })

    const nodeStateMap = simulationNodeData.reduce<
      Record<string, NodeDatum["state"]>
    >((acc, entry) => {
      acc[entry.info.id] = { ...entry.state }

      return acc
    }, {})

    postMessage({
      type: "complete",
      payload: {
        nodeState: nodeStateMap,
      },
    })
  },
}

const isValidMessage = (message: unknown) =>
  typeof message === "object" &&
  message !== null &&
  Object.hasOwn(message, "type")

const isValidMessageType = (message: Message) => {
  return Object.hasOwn(listeners, message.type)
}

onmessage = function (e: MessageEvent<Message>) {
  const { data } = e

  if (!isValidMessage(data)) {
    throw new Error("Invalid message format received from worker")
  }

  if (!isValidMessageType(data)) {
    throw new Error(`Received invalid message type "${data.type}"`)
  }

  if (isValidMessage(data) && isValidMessageType(data)) {
    listeners[data.type](data.payload)
  } else {
    postMessage({
      type: "error",
      payload: `invalid message type "${data.type}"`,
    })
  }
}
