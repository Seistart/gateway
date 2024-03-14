import {
  CommandAction,
  CommandActionBackwardsOnly,
  CommandActionForwardsOnly,
} from "./action"

export type CommandActionVariant =
  | CommandAction
  | CommandActionForwardsOnly
  | CommandActionBackwardsOnly

export type ActionType =
  // Canvas
  | "canvas-update-zoom"

  // Simulation actions
  | "simulation-tick"
  | "simulation-nodes-remove"
  | "simulation-nodes-replace"
  | "simulation-nodes-restore"

  // Node actions
  | "node-move"
  | "node-hide"
  | "node-position-fix"
  | "node-position-unfix"
  | "node-select"
  | "node-deselect"
  | "node-idle"
  | "node-active"
  | "node-reset"
