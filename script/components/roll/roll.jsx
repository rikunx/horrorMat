import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

import CombatPrompt from './combatPrompt';
import TestPrompt from './testPrompt';
import AbilityPrompt from './abilityPrompt';
import * as phases from '../../enum/rollPhases';

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
  setCombat,
  useAbility,
  closeRollPrompt,
  roll
}) => (
  <div id="roll-pad">
    <CombatPrompt
      classes={classes}
      combatDialogOpen={phase === phases.Combat}
      test={test}
      setCombat={setCombat}
      closePrompt={closeRollPrompt}
    />
    {(() => {
      if (phase === phases.Ability && eligibleAbilities.length) {
        return (
          <AbilityPrompt
            classes={classes}
            abilityDialogOpen={phase === phases.Ability}
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

Roll.propTypes = {};

export default withStyles(styles)(Roll);
