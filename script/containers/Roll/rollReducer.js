import * as actions from './rollActionTypes';

import { Attributes, BonusType, RollPhases, Situation } from '../../enum/index';

const defaultState = {
  test: '',
  baseRoll: 0,
  modifier: 0,
  situation: '',
  abilities: [],
  eligibleAbilities: [],
  rerollAbilities: [],
  eligibleRerollAbilities: [],
  eligibleAbilityIndex: 0,
  items: [],
  eligibleItems: [],
  rerollItems: [],
  eligibleRerollItems: [],
  eligibleItemIndex: 0,
  clues: 0,
  cluesToSpend: 0,
  results: [],
  total: 0,
  phase: RollPhases.None
};

function retrieveEligibleItems(items, attribute, situation) {
  return {
    eligibleItems: items
      .map(item => ({
        ...item,
        effects: item.effects.filter(
          effect =>
            (effect.oncePerRound || effect.disposable) &&
            (effect.situation === situation || effect.situation === Situation.TEST) &&
            effect.bonuses.find(
              bonus =>
                (bonus.attribute === attribute || bonus.attribute === Attributes.ANY) &&
                (bonus.type !== BonusType.REROLL && bonus.type !== BonusType.CLUE)
            )
        )
      }))
      .filter(item => item.effects.length > 0),
    items: items
      .map(item => ({
        ...item,
        effects: item.effects.filter(
          effect =>
            !(effect.oncePerRound || effect.disposable) &&
            (effect.situation === situation || effect.situation === Situation.TEST) &&
            effect.bonuses.find(
              bonus =>
                (bonus.attribute === attribute || bonus.attribute === Attributes.ANY) &&
                (bonus.type !== BonusType.REROLL && bonus.type !== BonusType.CLUE)
            )
        )
      }))
      .filter(item => item.effects.length > 0)
  };
}

function retrieveEligibleRerollItems(items, attribute, situation) {
  return {
    eligibleRerollItems: items
      .map(item => ({
        ...item,
        effects: item.effects.filter(
          effect =>
            (effect.oncePerRound || effect.disposable) &&
            (effect.situation === situation || effect.situation === Situation.TEST) &&
            effect.bonuses.find(
              bonus =>
                (bonus.attribute === attribute || bonus.attribute === Attributes.ANY) && bonus.type === BonusType.REROLL
            )
        )
      }))
      .filter(item => item.effects.length > 0),
    rerollItems: items
      .map(item => ({
        ...item,
        effects: item.effects.filter(
          effect =>
            !(effect.oncePerRound || effect.disposable) &&
            (effect.situation === situation || effect.situation === Situation.TEST) &&
            effect.bonuses.find(
              bonus =>
                (bonus.attribute === attribute || bonus.attribute === Attributes.ANY) && bonus.type === BonusType.REROLL
            )
        )
      }))
      .filter(item => item.effects.length > 0)
  };
}

function retrieveRollEligibleAbilities(abilities, attribute, situation) {
  return {
    abilities: abilities.filter(
      ability =>
        !ability.oncePerRound &&
        (ability.situation === situation || ability.situation === Situation.TEST) &&
        ability.bonuses.find(
          bonus =>
            (bonus.attribute === attribute || bonus.attribute === Attributes.ANY) &&
            (bonus.type !== BonusType.REROLL && bonus.type !== BonusType.CLUE)
        )
    ),
    eligibleAbilities: abilities.filter(
      ability =>
        ability.oncePerRound &&
        (ability.situation === situation || ability.situation === Situation.TEST) &&
        ability.bonuses.find(
          bonus =>
            (bonus.attribute === attribute || bonus.attribute === Attributes.ANY) &&
            (bonus.type !== BonusType.REROLL && bonus.type !== BonusType.CLUE)
        )
    )
  };
}

function retrieveEligibleRerollAbilities(abilities, attribute, situation) {
  return {
    rerollAbilities: abilities.filter(
      ability =>
        !ability.oncePerRound &&
        (ability.situation === situation || ability.situation === Situation.TEST) &&
        ability.bonuses.find(
          bonus =>
            (bonus.attribute === attribute || bonus.attribute === Attributes.ANY) && bonus.type === BonusType.REROLL
        )
    ),
    eligibleRerollAbilities: abilities.filter(
      ability =>
        ability.oncePerRound &&
        (ability.situation === situation || ability.situation === Situation.TEST) &&
        ability.bonuses.find(
          bonus =>
            (bonus.attribute === attribute || bonus.attribute === Attributes.ANY) && bonus.type === BonusType.REROLL
        )
    )
  };
}

function rollReducer(state = defaultState, action) {
  switch (action.type) {
    case actions.SetTest:
      return {
        ...state,
        baseRoll: action.baseRoll,
        test: action.test,
        phase: RollPhases.Modifier
      };
    case actions.SetModifier:
      return {
        ...state,
        modifier: action.modifier
      };
    case actions.PromptSituation:
      return {
        ...state,
        phase: RollPhases.Situation
      };
    case actions.SetSituation: {
      const { abilities: actionAbilities, items: actionItems, situation } = action;
      const { test } = state;

      const { abilities, eligibleAbilities } = retrieveRollEligibleAbilities(actionAbilities, test, situation);
      const { rerollAbilities, eligibleRerollAbilities } = retrieveEligibleRerollAbilities(
        actionAbilities,
        test,
        situation
      );
      const { items, eligibleItems } = retrieveEligibleItems(actionItems, test, situation);
      const { rerollItems, eligibleRerollItems } = retrieveEligibleRerollItems(actionItems, test, situation);

      let phase = RollPhases.Roll;
      if (eligibleAbilities.length > 0) {
        phase = RollPhases.Ability;
      } else if (eligibleItems.length > 0) {
        phase = RollPhases.Items;
      }
      return {
        ...state,
        abilities,
        eligibleAbilities,
        rerollAbilities,
        eligibleRerollAbilities,
        items,
        eligibleItems,
        rerollItems,
        eligibleRerollItems,
        phase,
        situation: action.situation
      };
    }
    case actions.UseAbility: {
      const { abilities, eligibleAbilities, eligibleAbilityIndex } = state;
      let phase = RollPhases.Ability;
      if (eligibleAbilityIndex + 1 >= eligibleAbilities.length - 1) {
        phase = RollPhases.Items;
      }
      return {
        ...state,
        eligibleAbilityIndex: eligibleAbilityIndex + 1,
        abilities: action.shouldUseAbility ? [...abilities, eligibleAbilities[eligibleAbilityIndex]] : abilities,
        phase
      };
    }
    case actions.UseItem: {
      const { items, eligibleItems, eligibleItemIndex } = state;
      let phase = RollPhases.Items;
      if (eligibleItemIndex + 1 >= eligibleItems.length - 1) {
        phase = RollPhases.Roll;
      }
      return {
        ...state,
        eligibleItemIndex: eligibleItemIndex + 1,
        items: [...items, eligibleItems[eligibleItemIndex]],
        phase
      };
    }
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
