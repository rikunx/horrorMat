import * as actions from './rollActionTypes';

import { RollPhases } from '../../enum/index';

const defaultState = {
  combatDialogOpen: false,
  rollDialogOpen: false,
  test: '',
  baseRoll: 0,
  clues: 0,
  abilities: [],
  excludedAbilities: [],
  inventory: [],
  excludedItems: [],
  cluesToSpend: 0,
  results: [],
  total: 0,
  phase: 'none'
};

function rollReducer(state = defaultState, action) {
  switch (action.type) {
    case actions.PromptCombat:
      return {
        ...state,
        combatDialogOpen: true,
        test: action.test
      };
    case actions.CloseCombatPrompt:
      return {
        ...state,
        combatDialogOpen: false,
        test: ''
      };
    case actions.PromptRoll:
      return {
        ...state,
        combatDialogOpen: false,
        rollDialogOpen: true,
        test: action.test,
        baseRoll: action.baseRoll,
        clues: action.clues,
        abilities: action.abilities,
        inventory: action.inventory,
        cluesToSpend: action.clues,
        total: action.total,
        phase: RollPhases.Roll,
        results: []
      };
    case actions.CloseRollPrompt:
      return {
        ...state,
        rollDialogOpen: false
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
