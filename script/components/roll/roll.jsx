import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

import SituationPrompt from './situationPrompt';
import TestPrompt from './testPrompt';
import AbilityPrompt from './abilityPrompt';
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
      if (phase === phases.Ability && eligibleAbilities.length) {
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
      return '';
    })()}
    {(() => {
      {
        /* if (eligibleItems.length) {
        return (
          <AbilityPrompt
            classes={classes}
            abilityDialogOpen={phase === Ability}
            test={test}
            ability={eligibleAbilities[eligibleAbilityIndex]}
            useAbility={useAbility}
            closePrompt={closeRollPrompt}
          />
        );
      } */
      }
      return '';
    })()}
    {(() => {
      if (phase === phases.Roll) {
        return (
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
        );
      }
      return '';
    })()}
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
  closeRollPrompt: PropTypes.func.isRequired,
  roll: PropTypes.func.isRequired
};

export default withStyles(styles)(Roll);
