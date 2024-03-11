import { Listeners, Message } from "./types"

export class WorkerAgent<L extends Listeners> {
  worker: Worker
  listeners: L

  constructor(worker: Worker, listeners: L) {
    this.worker = worker
    this.listeners = listeners

    this.worker.addEventListener("message", this.onMessage)
  }

  destroy() {
    this.worker.removeEventListener("message", this.onMessage)
    this.worker.terminate()
  }

  isValidMessage(message: unknown): message is Message {
    return (
      typeof message === "object" &&
      message !== null &&
      Object.hasOwn(message, "type")
    )
  }

  isValidMessageType(message: Message) {
    return Object.hasOwn(this.listeners, message.type)
  }

  postMessage(message: Message): void {
    if (!this.isValidMessage(message)) {
      throw new Error(
        "Invalid message format sent to worker, but blocked by WorkerAgent"
      )
    }

    this.worker.postMessage(message)
  }

  onMessage = (e: MessageEvent) => {
    const { data } = e

    if (!this.isValidMessage(data)) {
      throw new Error("Invalid message format received from worker")
    }

    if (!this.isValidMessageType(data)) {
      throw new Error(`Received invalid message type "${data.type}"`)
    }

    const listener = this.listeners[data.type]
    listener(data.payload)
  }
}
