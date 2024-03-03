import { CommandActionVariant } from './types';

const MAX_HISTORY_LENGTH = 20;

export type OnHistoryChangeEvent = {
  length: number;
  pointer: number;
  canUndo: boolean;
  canRedo: boolean;
};
export type OnHistoryChange = (event: OnHistoryChangeEvent) => void;

export type CommandManagerOptions = {
  maxHistoryLength?: number;
};

export class CommandManager {
  private history: CommandActionVariant[][] = [];
  private pointer = -1;
  private subsciptions: OnHistoryChange[] = [];

  constructor(private maxHistoryLength: number = MAX_HISTORY_LENGTH) {}

  private maxPointerIndex() {
    return this.history.length - 1;
  }

  private pointerIsAtHistoryTip() {
    return this.pointer === this.maxPointerIndex();
  }

  private pointerIsAtHistoryBottom() {
    return this.history[this.pointer] === undefined;
  }

  private broadcast() {
    this.subsciptions.forEach((subscription) => {
      subscription({
        length: this.history.length,
        pointer: this.pointer,
        canUndo: !this.pointerIsAtHistoryBottom(),
        canRedo: !this.pointerIsAtHistoryTip(),
      });
    });
  }

  private isArray(
    value: CommandActionVariant | CommandActionVariant[]
  ): value is CommandActionVariant[] {
    return Array.isArray(value);
  }

  private disposePointerToTipHistory() {
    if (!this.pointerIsAtHistoryTip()) {
      this.history.splice(this.pointer + 1, Infinity);
    }
  }

  private addHistoryEntry(actions: CommandActionVariant[]) {
    if (this.history.length === this.maxHistoryLength) {
      this.history.shift();
    }
    this.history.push(actions);
    this.pointer = this.maxPointerIndex();

    this.broadcast();
  }

  execute(actions: CommandActionVariant | CommandActionVariant[]) {
    const _actions = this.isArray(actions) ? actions : [actions];

    this.disposePointerToTipHistory();
    _actions.forEach((action) => {
      if ('execute' in action) {
        action.execute();
      }
    });
    this.addHistoryEntry(_actions);
  }

  /*
   * Similar to execute, except it doesn't execute the actions.
   *
   * Use this for specific cases where the manipulations already happened,
   * but should be reversable (e.g. dragging a node).
   */
  register(actions: CommandActionVariant | CommandActionVariant[]) {
    const _actions = this.isArray(actions) ? actions : [actions];

    this.disposePointerToTipHistory();
    this.addHistoryEntry(_actions);
  }

  undo() {
    if (this.pointerIsAtHistoryBottom()) {
      console.warn('Bottom of history reached, no more undo actions available');
      return;
    }

    const actions = [...this.history[this.pointer]].reverse();
    actions.forEach((action) => {
      if ('undo' in action) {
        action.undo();
      }
    });
    this.pointer--;

    this.broadcast();
  }

  redo() {
    if (this.pointerIsAtHistoryTip()) {
      console.warn('Tip of history reached, no more redo actions available');
      return;
    }

    const actions = this.history[this.pointer + 1];
    actions.forEach((action) => {
      if ('execute' in action) {
        action.execute();
      }
    });
    this.pointer++;

    this.broadcast();
  }

  subscribe(handler: OnHistoryChange) {
    this.subsciptions.push(handler);
  }

  unsubscribe(handler: OnHistoryChange) {
    const index = this.subsciptions.findIndex((entry) => entry === handler);
    this.subsciptions.splice(index, 1);
  }

  clear() {
    this.history.length = 0;
    this.pointer = -1;

    this.broadcast();
  }

  reset() {
    this.clear();
    this.subsciptions.length = 0;
  }
}

let instance: CommandManager | null = null;
export const getInstance = () => instance ?? (instance = new CommandManager());
