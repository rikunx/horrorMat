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
  const eligibleItems = items
    .map(({ effects, ...item }) => ({
      ...item,
      effect: effects.reduce((endEffect, { bonuses, ...effect }) => {
        if (effect.situation === situation || effect.situation === Situation.TEST) {
          return {
            ...effect,
            bonus: bonuses.find(
              bonus =>
                (bonus.attribute === attribute || bonus.attribute === Attributes.ANY) &&
                (bonus.type !== BonusType.REROLL && bonus.type !== BonusType.CLUE)
            )
          };
        }
        return endEffect;
      }, null)
    }))
    .filter(item => item.effect.bonus);
  return {
    eligibleItems: eligibleItems.filter(({ effect }) => effect.oncePerRound || effect.disposable),
    items: eligibleItems.filter(({ effect }) => !(effect.oncePerRound || effect.disposable))
  };
}

function retrieveEligibleRerollItems(items, attribute, situation) {
  const eligibleItems = items
    .map(({ effects, ...item }) => ({
      ...item,
      effect: effects.reduce((endEffect, { bonuses, ...effect }) => {
        if (effect.situation === situation || effect.situation === Situation.TEST) {
          return {
            ...effect,
            bonus: bonuses.find(
              bonus =>
                (bonus.attribute === attribute || bonus.attribute === Attributes.ANY) && bonus.type === BonusType.REROLL
            )
          };
        }
        return endEffect;
      }, null)
    }))
    .filter(item => item.effect.bonus);
  return {
    eligibleRerollItems: eligibleItems.filter(({ effect }) => effect.oncePerRound || effect.disposable),
    rerollItems: eligibleItems.filter(({ effect }) => !(effect.oncePerRound || effect.disposable))
  };
}

function retrieveRollEligibleAbilities(abilities, attribute, situation) {
  const eligibleAbilities = abilities
    .filter(ability => ability.situation === situation || ability.situation === Situation.TEST)
    .map(({ bonuses, ...ability }) => ({
      ...ability,
      bonus: bonuses.find(
        bonus =>
          (bonus.attribute === attribute || bonus.attribute === Attributes.ANY) &&
          (bonus.type !== BonusType.REROLL && bonus.type !== BonusType.CLUE)
      )
    }));
  return {
    abilities: eligibleAbilities.filter(ability => !ability.oncePerRound),
    eligibleAbilities: eligibleAbilities.filter(ability => ability.oncePerRound)
  };
}

function retrieveEligibleRerollAbilities(abilities, attribute, situation) {
  const eligibleAbilities = abilities
    .filter(ability => ability.situation === situation || ability.situation === Situation.TEST)
    .map(({ bonuses, ...ability }) => ({
      ...ability,
      bonus: bonuses.find(
        bonus =>
          (bonus.attribute === attribute || bonus.attribute === Attributes.ANY) && bonus.type === BonusType.REROLL
      )
    }));
  return {
    rerollAbilities: eligibleAbilities.filter(ability => !ability.oncePerRound),
    eligibleRerollAbilities: eligibleAbilities.filter(ability => ability.oncePerRound)
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
        total:
          state.modifier +
          state.baseRoll +
          items.reduce((total, item) => item.effect.bonus.value + total, 0) +
          abilities.reduce((total, ability) => ability.bonus.value + total, 0),
        situation: action.situation
      };
    }
    case actions.UseAbility: {
      const { modifier, baseRoll, items, abilities, eligibleAbilities, eligibleAbilityIndex } = state;
      let phase = RollPhases.Ability;
      if (eligibleAbilityIndex + 1 >= eligibleAbilities.length - 1) {
        phase = RollPhases.Items;
      }
      const newAbilities = action.shouldUseAbility
        ? [...abilities, eligibleAbilities[eligibleAbilityIndex]]
        : abilities;
      return {
        ...state,
        eligibleAbilityIndex: eligibleAbilityIndex + 1,
        abilities: newAbilities,
        phase,
        total:
          modifier +
          baseRoll +
          items.reduce((total, item) => item.effect.bonus.value + total, 0) +
          newAbilities.reduce((total, ability) => ability.bonus.value + total, 0)
      };
    }
    case actions.UseItem: {
      const { modifier, baseRoll, items, abilities, eligibleItems, eligibleItemIndex } = state;
      let phase = RollPhases.Items;
      if (eligibleItemIndex + 1 >= eligibleItems.length - 1) {
        phase = RollPhases.Roll;
      }
      const newItems = action.shouldUseItem ? [...items, eligibleItems[eligibleItemIndex]] : items;
      return {
        ...state,
        eligibleItemIndex: eligibleItemIndex + 1,
        items: newItems,
        phase,
        total:
          modifier +
          baseRoll +
          newItems.reduce((total, item) => item.effect.bonus.value + total, 0) +
          abilities.reduce((total, ability) => ability.bonus.value + total, 0)
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
