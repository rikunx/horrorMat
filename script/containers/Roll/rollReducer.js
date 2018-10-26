import * as actions from './rollActionTypes';

import { RollPhases } from '../../enum/index';

const defaultState = {
  baseRoll: 0,
  clues: 0,
  abilities: [],
  inventory: [],
  cluesToSpend: 0,
  phase: 'none',
  results: []
};

function rollReducer(state = defaultState, action) {
  switch (action.type) {
    case actions.Roll:
      return {
        ...state,
        baseRoll: action.baseRoll,
        clues: action.clues,
        abilities: action.abilities,
        inventory: action.inventory,
        cluesToSpend: action.clues,
        phase: RollPhases.Roll,
        results: []
      };
    case actions.Rolling:
      return {
        ...state,
        phase: RollPhases.Rolling
      };
    case actions.Rolled:
      return {
        ...state,
        results: action.results,
        phase: RollPhases.Rolled
      };
    case actions.SpendClue:
      return {
        ...state,
        phase: RollPhases.SpendClue
      };
    case actions.IncreaseCluesToSpend: {
      const totalClues = state.clues;
      return {
        ...state,
        cluesToSpend: Math.min(state.cluesToSpend + 1, totalClues)
      };
    }
    case actions.DecreaseCluesToSpend:
      return {
        ...state,
        cluesToSpend: Math.max(state.cluesToSpend - 1, 0)
      };
    case actions.ActionReroll:
      return {
        ...state,
        phase: RollPhases.ActionReroll
      };
    default:
      return state;
  }
}

export default rollReducer;
