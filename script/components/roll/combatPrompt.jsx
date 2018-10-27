import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const CombatPrompt = ({ classes, combatDialogOpen, test, promptRoll, closeCombatPrompt }) => (
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
);

CombatPrompt.propTypes = {};

export default CombatPrompt;
