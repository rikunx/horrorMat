import * as actionTypes from './rollActionTypes';
import * as toastActions from '../Toast/toastActions';

import { Attributes, Situation, BonusType } from '../../enum';

function retrieveEligibleItems(items, attribute, situation) {
  items
    .map(item => ({
      ...item,
      effects: item.effects.filter(
        effect =>
          (effect.situation === situation || effect.situation === Situation.TEST) &&
          effect.bonuses.find(
            bonus =>
              (bonus.attribute === attribute || bonus.attribute === Attributes.ANY) &&
              (bonus.type !== BonusType.REROLL && bonus.type !== BonusType.CLUE)
          )
      )
    }))
    .filter(item => item.effects.length > 0);
  return items
    .map(item => ({
      ...item,
      effects: item.effects.filter(
        effect =>
          (effect.situation === situation || effect.situation === Situation.TEST) &&
          effect.bonuses.find(
            bonus =>
              (bonus.attribute === attribute || bonus.attribute === Attributes.ANY) &&
              (bonus.type !== BonusType.REROLL && bonus.type !== BonusType.CLUE)
          )
      )
    }))
    .filter(item => item.effects.length > 0);
}

function retrieveRollEligibleAbilities(abilities, attribute, situation) {
  return abilities.filter(
    ability =>
      (ability.situation === situation || ability.situation === Situation.TEST) &&
      ability.bonuses.find(
        bonus =>
          (bonus.attribute === attribute || bonus.attribute === Attributes.ANY) &&
          (bonus.type !== BonusType.REROLL && bonus.type !== BonusType.CLUE)
      )
  );
}

// function retrieveRerollEligibleAbilities(abilities, test, isCombat) {
//   return abilities.filter(ability => {
//     return ability.situation === Situation.REROLL &&
//   });
// }

export function promptRoll() {
  return (dispatch, getState) => {
    const state = getState();
    const mat = state.mat.character.get('character');
    const rollState = state.roll;
    const { test, items, abilities } = rollState;
    const baseRoll = mat[test] + mat.improvements[test];
    const itemBonus = items.reduce((bonus, item) => bonus + item.test.bonus, 0);
    const abilityBonus = abilities.reduce((bonus, ability) => bonus + ability.bonus, 0);
    dispatch({
      type: actionTypes.PromptRoll,
      test,
      clues: mat.clues,
      items,
      rerolls: mat.abilities.filter(ability => ability.situation === Situation.REROLL),
      baseRoll,
      abilities,
      total: baseRoll + itemBonus + abilityBonus
    });
  };
}

export function showNextItem() {
  return {
    type: actionTypes.ShowNextItem
  };
}

export function useItem(shouldUseItem) {
  return (dispatch, getState) => {
    const { roll: rollState } = getState();
    const items = rollState.items;
    const eligibleItems = rollState.eligibleItems;
    const eligibleItemIndex = rollState.eligibleItemIndex;

    if (shouldUseItem) {
      dispatch({ type: actionTypes.UseAbility, items: [...items, eligibleItems[eligibleItemIndex]] });
    }
    if (eligibleItemIndex < eligibleItems.length - 1) {
      dispatch(showNextItem());
    } else {
      dispatch(promptRoll());
    }
  };
}

export function promptItems() {
  return (dispatch, getState) => {
    const state = getState();
    const matState = state.mat.character.get('character');
    const rollState = state.roll;

    const eligibleItems = retrieveEligibleItems(matState.inventory.items, rollState.test, rollState.situation);
    if (eligibleItems.length) {
      dispatch({ type: actionTypes.SetEligibleItems, eligibleItems });
      dispatch({ type: actionTypes.PromptItems });
    } else {
      dispatch(promptRoll());
    }
  };
}

export function showNextAbility() {
  return {
    type: actionTypes.ShowNextAbility
  };
}

export function useAbility(shouldUseAbility) {
  return (dispatch, getState) => {
    const { roll: rollState } = getState();
    const abilities = rollState.abilities;
    const eligibleAbilities = rollState.eligibleAbilities;
    const eligibleAbilityIndex = rollState.eligibleAbilityIndex;

    if (shouldUseAbility) {
      dispatch({
        type: actionTypes.UseAbility,
        abilities: [...abilities, eligibleAbilities[eligibleAbilityIndex]]
      });
    }
    if (eligibleAbilityIndex < eligibleAbilities.length - 1) {
      dispatch(showNextAbility());
    } else {
      dispatch(promptItems());
    }
  };
}

export function promptAbilities() {
  return (dispatch, getState) => {
    const state = getState();
    const matState = state.mat.character.get('character');
    const rollState = state.roll;
    const eligibleAbilities = retrieveRollEligibleAbilities(matState.abilities, rollState.test, rollState.situation);
    if (eligibleAbilities.length) {
      dispatch({
        type: actionTypes.SetEligibleAbilities,
        eligibleAbilities
      });
      dispatch({
        type: actionTypes.PromptAbilities
      });
    } else {
      dispatch(promptItems());
    }
  };
}

export function setSituation(situation) {
  return (dispatch, getState) => {
    const state = getState();
    const {
      abilities,
      inventory: { items }
    } = state.mat.character.get('character');
    dispatch({
      type: actionTypes.SetSituation,
      situation,
      abilities,
      items
    });
    dispatch(promptAbilities());
  };
}

export function promptSituation() {
  return { type: actionTypes.PromptSituation };
}

export function setModifier(modifier) {
  return {
    type: actionTypes.SetModifier,
    modifier
  };
}

export function promptModifier() {
  return { type: actionTypes.PromptModifier };
}

export function promptTest(test, baseValue, improvementValue) {
  return dispatch => {
    dispatch({ type: actionTypes.SetTest, test, baseRoll: baseValue + improvementValue });
    dispatch(promptModifier());
  };
}

export function closeRollPrompt() {
  return {
    type: actionTypes.CloseRollPrompt
  };
}

export function roll(numOfDice) {
  return async dispatch => {
    dispatch({ type: actionTypes.Rolling, numOfDice });
    try {
      const response = await fetch(`/roll?dice=${numOfDice}`);
      if (!response.ok) {
        throw new Error(await response.text());
      }

      const results = await response.json();
      dispatch({ type: actionTypes.Rolled, results });

      // todo handle reroll stuff here
    } catch (error) {
      toastActions.show(error, true);
    } finally {
      dispatch(closeRollPrompt());
    }
  };
}

export function actionReroll() {
  return { type: actionTypes.ActionReroll };
}

export function spendClue() {
  return { type: actionTypes.SpendClue };
}
