import { pointer, select } from 'd3-selection'

import { CanvasSelection, MaskColor, MaskDatum } from '../../../types'
import { isNodeDatum } from '../../../utils/node'
import { updateCursor } from '../cursor'
import {
  applyOffset,
  applyReversedOffset,
  applyReversedScale,
  applyScale,
  getOffsets,
  getScale,
} from '../geometry'
import { lookUpEntityByColor } from '../mask'

export const attachMouseMoveBehaviour = function (selection: CanvasSelection) {
  return selection.on('mousemove.trackmouse', function (event: MouseEvent) {
    const mask = select<HTMLCanvasElement, MaskDatum>('#canvas-mask')
    const [x, y] = pointer(event)

    const canvasDatum = selection.datum()
    const maskContext = mask.node()?.getContext('2d')
    const scale = getScale(selection)
    const { x: oX, y: oY } = getOffsets(selection)

    if (!maskContext) {
      throw new Error(
        'attachMouseMoveBehaviour was called but no mask context could be resolved'
      )
    }

    const imageData = maskContext.getImageData(x, y, 1, 1)
    const color = Array.from(imageData.data).slice(0, 3) as MaskColor
    const [alpha] = Array.from(imageData.data).slice(3, 4)
    const entity = alpha === 255 ? lookUpEntityByColor(mask, color) : null

    let entityX: number | undefined = x
    let entityY: number | undefined = y
    if (entity && isNodeDatum(entity)) {
      entityX = entity.state.x
      entityY = entity.state.y
    } else if (entity) {
      entityX = applyReversedScale(applyReversedOffset(x, oX), scale)
      entityY = applyReversedScale(applyReversedOffset(y, oY), scale)
    }

    if (canvasDatum.state.hovered && canvasDatum.state.hovered !== entity) {
      const current = canvasDatum.state.hovered
      canvasDatum.state.hovered = null
      selection.call(updateCursor).dispatch('canvasmouseleave', {
        bubbles: false,
        cancelable: false,
        detail: {
          event,
          entity: current,
          entityPosition: {
            x: applyOffset(applyScale(entityX ?? 0, scale), oX),
            y: applyOffset(applyScale(entityY ?? 0, scale), oY),
          },
        },
      })
    }

    if (entity) {
      event.preventDefault()
      canvasDatum.state.hovered = entity
      selection.call(updateCursor).dispatch('canvasmouseenter', {
        bubbles: false,
        cancelable: false,
        detail: {
          event,
          entity,
          entityPosition: {
            x: applyOffset(applyScale(entityX ?? 0, scale), oX),
            y: applyOffset(applyScale(entityY ?? 0, scale), oY),
          },
        },
      })
    }
  })
}

export const detachMouseMoveBehaviour = function (selection: CanvasSelection) {
  return selection.on('mousemove.trackmouse', null)
}
