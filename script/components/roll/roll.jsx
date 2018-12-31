import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

import SituationPrompt from './situationPrompt';
import TestPrompt from './testPrompt';
import AbilityPrompt from './abilityPrompt';
import ItemPrompt from './itemPrompt';
import * as phases from '../../enum/rollPhases';
import { Ability, Item } from '../../types';
import { RollPhases } from '../../enum';
import ModifierPrompt from './modifierPrompt';

const styles = {
  paper: {
    backgroundColor: 'inherit',
    boxShadow: 'none'
  }
};
const Roll = ({
  classes,
  test,
  baseRoll,
  modifier,
  clues,
  abilities,
  eligibleAbilities,
  eligibleAbilityIndex,
  items,
  eligibleItems,
  eligibleItemIndex,
  total,
  phase,
  results,
  setModifier,
  promptSituation,
  setSituation,
  useItem,
  useAbility,
  closeRollPrompt,
  roll
}) => (
  <div id="roll-pad">
    <ModifierPrompt
      classes={classes}
      open={phase === phases.Modifier}
      modifier={modifier}
      setModifier={setModifier}
      promptSituation={promptSituation}
      closePrompt={closeRollPrompt}
    />
    <SituationPrompt
      classes={classes}
      open={phase === phases.Situation}
      test={test}
      setSituation={setSituation}
      closePrompt={closeRollPrompt}
    />
    {(() => {
      if (eligibleAbilities[eligibleAbilityIndex]) {
        return (
          <AbilityPrompt
            classes={classes}
            open={phase === phases.Ability}
            test={test}
            ability={eligibleAbilities[eligibleAbilityIndex]}
            useAbility={useAbility}
            closePrompt={closeRollPrompt}
          />
        );
      }
      return null;
    })()}
    {(() => {
      if (eligibleItems[eligibleItemIndex]) {
        return (
          <ItemPrompt
            classes={classes}
            open={phase === phases.Items}
            test={test}
            item={eligibleItems[eligibleItemIndex]}
            useItem={useItem}
            closePrompt={closeRollPrompt}
          />
        );
      }
      return null;
    })()}
    <TestPrompt
      classes={classes}
      rollDialogOpen={phase === phases.Roll}
      test={test}
      baseRoll={baseRoll}
      abilities={abilities}
      items={items}
      total={total}
      closePrompt={closeRollPrompt}
      roll={roll}
    />
  </div>
);

Roll.propTypes = {
  classes: PropTypes.object.isRequired,
  test: PropTypes.string.isRequired,
  baseRoll: PropTypes.number.isRequired,
  modifier: PropTypes.number.isRequired,
  clues: PropTypes.number.isRequired,
  abilities: PropTypes.arrayOf(Ability),
  eligibleAbilities: PropTypes.arrayOf(Ability),
  eligibleAbilityIndex: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(Item),
  eligibleItems: PropTypes.arrayOf(Item),
  eligibleItemIndex: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  phase: PropTypes.oneOf([
    RollPhases.None,
    RollPhases.Modifier,
    RollPhases.Situation,
    RollPhases.Ability,
    RollPhases.Items,
    RollPhases.Roll,
    RollPhases.Rolling,
    RollPhases.Rolled,
    RollPhases.SpendClue,
    RollPhases.ActionReroll
  ]).isRequired,
  results: PropTypes.arrayOf(PropTypes.number).isRequired,
  setModifier: PropTypes.func.isRequired,
  promptSituation: PropTypes.func.isRequired,
  setSituation: PropTypes.func.isRequired,
  useAbility: PropTypes.func.isRequired,
  useItem: PropTypes.func.isRequired,
  closeRollPrompt: PropTypes.func.isRequired,
  roll: PropTypes.func.isRequired
};

export default withStyles(styles)(Roll);
