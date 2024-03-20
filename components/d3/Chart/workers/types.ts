export type Listeners = Record<string, Function>
export type Message<P = unknown> = {
  type: string
  payload?: P
}
