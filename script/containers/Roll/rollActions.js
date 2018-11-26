import * as actionTypes from './rollActionTypes';
import * as toastActions from '../Toast/toastActions';

import { Attributes, Situation } from '../../enum';

function retrieveEligibleItems(items, test, isCombat) {
  return items
    .map(item => ({
      ...item,
      test: item.test.find(itemTest => {
        if (isCombat) return itemTest.situation === Situation.COMBAT && itemTest.attribute === test;
        return itemTest.situation !== Situation.COMBAT && itemTest.attribute === test;
      })
    }))
    .filter(item => item.test);
}
function retrieveEligibleAbilities(abilities, test, isCombat) {
  return abilities.filter(ability => {
    if (isCombat) {
      return (
        (ability.situation === Situation.COMBAT || ability.situation === Situation.TEST) &&
        (ability.attribute === test || ability.attribute === Attributes.ANY)
      );
    }
    return ability.situation === Situation.TEST && (ability.attribute === test || ability.attribute === Attributes.ANY);
  });
}

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

    const eligibleItems = retrieveEligibleItems(matState.inventory.items, rollState.test, rollState.isCombat);
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
    const eligibleAbilities = retrieveEligibleAbilities(matState.abilities, rollState.test, rollState.isCombat);
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

export function setCombat(isCombat) {
  return dispatch => {
    dispatch({
      type: actionTypes.SetCombat,
      isCombat
    });
    dispatch(promptAbilities());
  };
}

export function promptTest(test) {
  return dispatch => {
    dispatch({ type: actionTypes.SetTest, test });
    if (test === Attributes.STRENGTH || test === Attributes.WILL) {
      dispatch({ type: actionTypes.PromptCombat });
    } else {
      dispatch(promptAbilities());
    }
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
