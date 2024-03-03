import { ActionType } from './types';

interface Execute {
  (): void;
}

interface Undo {
  (): void;
}

export class CommandAction {
  constructor(
    public type: ActionType,
    public execute: Execute,
    public undo: Undo
  ) {}
}

export class CommandActionForwardsOnly {
  constructor(
    public type: ActionType,
    public execute: Execute
  ) {}
}

export class CommandActionBackwardsOnly {
  constructor(
    public type: ActionType,
    public undo: Undo
  ) {}
}
