import {
  CommandAction,
  CommandActionBackwardsOnly,
  CommandActionForwardsOnly,
} from '../../command/action';
import { NodeDatum, Simulation } from '../../types';
import { ticked } from '../Simulation';

export const tickSimulationActionForwardsOnly = (simulation: Simulation) => {
  const execute = () => {
    ticked.call(simulation);
  };

  return new CommandActionForwardsOnly('simulation-tick', execute);
};

export const tickSimulationActionBackwardsOnly = (simulation: Simulation) => {
  const undo = () => {
    ticked.call(simulation);
  };

  return new CommandActionBackwardsOnly('simulation-tick', undo);
};

export const removeSimulationNodesAction = (
  simulation: Simulation,
  removeNodes: NodeDatum[]
) => {
  const allNodes = simulation.nodes();
  const remainingNodes = allNodes.filter(
    (entry) => !removeNodes.includes(entry)
  );

  const execute = () => {
    simulation.nodes(remainingNodes);
  };

  return new CommandActionForwardsOnly('simulation-nodes-remove', execute);
};

export const replaceSimulationNodesAction = (
  simulation: Simulation,
  replaceNodes: NodeDatum[]
) => {
  const currentNodes = simulation.nodes();

  const execute = () => {
    simulation.nodes(replaceNodes);
  };

  const undo = () => {
    simulation.nodes(currentNodes);
  };

  return new CommandAction('simulation-nodes-replace', execute, undo);
};

export const restoreSimulationNodesAction = (simulation: Simulation) => {
  const allNodes = simulation.nodes();

  const undo = () => {
    simulation.nodes(allNodes);
  };

  return new CommandActionBackwardsOnly('simulation-nodes-restore', undo);
};
