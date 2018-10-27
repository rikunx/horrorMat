import * as actionTypes from './rollActionTypes';
import * as toastActions from '../Toast/toastActions';

import { Attributes, Situation } from '../../enum';

export function promptCombat(test) {
  return {
    type: actionTypes.PromptCombat,
    test
  };
}

export function closeCombatPrompt() {
  return {
    type: actionTypes.CloseCombatPrompt
  };
}

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
    if (isCombat) return ability.situation === Situation.COMBAT && ability.attribute === test;
    return ability.situation === Situation.TEST && (ability.attribute === test || ability.attribute === Attributes.ANY);
  });
}

export function promptRoll(test, isCombat = false) {
  return (dispatch, getState) => {
    const mat = getState().mat.character.get('character');

    const baseRoll = mat[test] + mat.improvements[test];
    const eligibleItems = retrieveEligibleItems(mat.inventory, test, isCombat);
    const eligibleAbilities = retrieveEligibleAbilities(mat.abilities);

    const itemBonus = eligibleItems.reduce((bonus, item) => bonus + item.test.bonus, 0);
    const abilityBonus = eligibleAbilities.reduce((bonus, ability) => bonus + ability.bonus, 0);
    dispatch({
      type: actionTypes.PromptRoll,
      test,
      clues: mat.clues,
      inventory: eligibleItems,
      rerolls: mat.abilities.filter(ability => ability.situation === Situation.REROLL),
      baseRoll,
      abilities: eligibleAbilities,
      total: baseRoll + itemBonus + abilityBonus
    });
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
    }
  };
}

export function actionReroll() {
  return { type: actionTypes.ActionReroll };
}

export function spendClue() {
  return { type: actionTypes.SpendClue };
}
