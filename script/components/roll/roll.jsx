import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Icon from '@material-ui/core/Icon';

const styles = {
  paper: {
    backgroundColor: 'inherit',
    boxShadow: 'none'
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
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
    <Dialog
      classes={{ paper: classes.paper }}
      open={combatDialogOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeCombatPrompt}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="prompt-background">
        <img src="images/burnt_paper.png" />
      </div>
      <DialogTitle>Is this a combat roll?</DialogTitle>
      <DialogActions>
        <Button onClick={() => promptRoll(test)} color="primary">
          No
        </Button>
        <Button onClick={() => promptRoll(test, true)} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
    <Dialog
      classes={{ paper: classes.paper }}
      open={rollDialogOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeRollPrompt}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="prompt-background">
        <img src="images/burnt_paper.png" />
      </div>
      <DialogTitle className="test-prompt-title">{test} Test</DialogTitle>
      <DialogContent>
        <DialogContentText className="test-prompt-content">
          <span>
            {test}: +{baseRoll}
          </span>
          {abilities.map((ability, index) => (
            <span key={index}>Ability: +{ability.bonus}</span>
          ))}
          {inventory.map(item => (
            <span key={item._id}>
              {item.name}: +{item.test.bonus}
            </span>
          ))}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeRollPrompt} color="primary">
          Cancel
        </Button>
        <Button onClick={() => roll(total)} color="primary">
          Roll {total} Dice!
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

Roll.propTypes = {};

export default withStyles(styles)(Roll);
