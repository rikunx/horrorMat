import * as actions from './rollActionTypes';

import { RollPhases } from '../../enum/index';

const defaultState = {
  test: '',
  isCombat: false,
  baseRoll: 0,
  clues: 0,
  abilities: [],
  eligibleAbilities: [],
  eligibleAbilityIndex: 0,
  items: [],
  eligibleItems: [],
  eligibleItemIndex: 0,
  cluesToSpend: 0,
  results: [],
  total: 0,
  phase: RollPhases.None
};

function rollReducer(state = defaultState, action) {
  switch (action.type) {
    case actions.SetTest:
      return {
        ...state,
        baseRoll: action.baseRoll,
        test: action.test
      };
    case actions.PromptCombat:
      return {
        ...state,
        phase: RollPhases.Combat
      };
    case actions.SetCombat:
      return {
        ...state,
        isCombat: action.isCombat
      };
    case actions.PromptAbilities:
      return {
        ...state,
        phase: RollPhases.Ability
      };
    case actions.SetEligibleAbilities:
      return {
        ...state,
        eligibleAbilities: action.eligibleAbilities
      };
    case actions.UseAbility:
      return {
        ...state,
        abilities: action.abilities
      };
    case actions.ShowNextAbility:
      return {
        ...state,
        eligibleAbilityIndex: state.eligibleAbilityIndex + 1
      };
    case actions.PromptItems:
      return {
        ...state,
        phase: RollPhases.Items
      };
    case actions.SetEligibleItems:
      return {
        ...state,
        eligibleItems: action.eligibleItems
      };
    case actions.PromptRoll:
      return {
        ...state,
        total: action.total,
        phase: RollPhases.Roll
      };
    case actions.CloseRollPrompt:
      return {
        ...defaultState
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
