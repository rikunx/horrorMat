import * as actionTypes from './rollActionTypes';
import * as toastActions from '../Toast/toastActions';

export function closeRollPrompt() {
  return {
    type: actionTypes.CloseRollPrompt
  };
}

export function promptTest(test, baseValue, improvementValue) {
  return {
    type: actionTypes.SetTest,
    test,
    baseRoll: baseValue + improvementValue
  };
}

// export function promptRoll() {
//   return (dispatch, getState) => {
//     const state = getState();
//     const mat = state.mat.character.get('character');
//     const rollState = state.roll;
//     const { test, items, abilities } = rollState;
//     const baseRoll = mat[test] + mat.improvements[test];
//     const itemBonus = items.reduce((bonus, item) => bonus + item.test.bonus, 0);
//     const abilityBonus = abilities.reduce((bonus, ability) => bonus + ability.bonus, 0);
//     dispatch({
//       type: actionTypes.PromptRoll,
//       test,
//       clues: mat.clues,
//       items,
//       rerolls: mat.abilities.filter(ability => ability.situation === Situation.REROLL),
//       baseRoll,
//       abilities,
//       total: baseRoll + itemBonus + abilityBonus
//     });
//   };
// }

export function promptSituation() {
  return { type: actionTypes.PromptSituation };
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
  };
}

export function useAbility(shouldUseAbility) {
  return {
    type: actionTypes.UseAbility,
    shouldUseAbility
  };
}

export function useItem(shouldUseItem) {
  return {
    type: actionTypes.UseAbility,
    shouldUseItem
  };
}

export function setModifier(modifier) {
  return {
    type: actionTypes.SetModifier,
    modifier
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
