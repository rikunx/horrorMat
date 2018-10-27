import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

import CombatPrompt from './combatPrompt';
import TestPrompt from './testPrompt';

const styles = {
  paper: {
    backgroundColor: 'inherit',
    boxShadow: 'none'
  }
};
const Roll = ({
  classes,
  combatDialogOpen,
  rollDialogOpen,
  test,
  baseRoll,
  clues,
  abilities,
  inventory,
  total,
  phase,
  results,
  promptRoll,
  closeRollPrompt,
  closeCombatPrompt,
  roll
}) => (
  <div id="roll-pad">
    <CombatPrompt
      classes={classes}
      combatDialogOpen={combatDialogOpen}
      test={test}
      promptRoll={promptRoll}
      closeCombatPrompt={closeCombatPrompt}
    />
    <TestPrompt
      classes={classes}
      rollDialogOpen={rollDialogOpen}
      test={test}
      baseRoll={baseRoll}
      abilities={abilities}
      inventory={inventory}
      total={total}
      closeRollPrompt={closeRollPrompt}
      roll
    />
  </div>
);

Roll.propTypes = {};

export default withStyles(styles)(Roll);
