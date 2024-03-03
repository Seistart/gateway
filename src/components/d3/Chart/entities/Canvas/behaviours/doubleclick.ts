import { CanvasSelection } from '../../../types';

export const attachDoubleClickBehaviour = function (
  selection: CanvasSelection
) {
  selection.on('dblclick.dblclickhovered', function (event) {
    const datum = selection.datum();

    if (datum.state.hovered) {
      event.stopPropagation();
      selection.dispatch('canvasdoubleclick', {
        bubbles: false,
        cancelable: false,
        detail: {
          event,
          datum,
          element: this,
        },
      });
    }
  });
};

export const detachDoubleClickBehaviour = function (
  selection: CanvasSelection
) {
  return selection.on('dblclick.dblclickhovered', null);
};
