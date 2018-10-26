import * as actionTypes from './rollActionTypes';
import * as toastActions from '../Toast/toastActions';

import { Attributes } from '../../enum';

export function roll(test) {
  return (dispatch, getState) => {
    const mat = getState().mat;
    console.log(test, mat);
    switch (test) {
      case Attributes.STRENGTH:
        dispatch({
          type: actionTypes.Roll,
          baseRoll: mat.strength + mat.improvements.strength,
          clues: mat.clues,
          abilities: mat.abilities,
          inventory: mat.inventory
        });
        break;
      // default:
      //   dispatch({ type: actionTypes.Roll, baseRoll, clues, abilities, inventory });
    }
  };
}

export function rolling(numOfDice) {
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
