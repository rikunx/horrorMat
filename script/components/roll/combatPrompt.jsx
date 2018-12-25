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
const CombatPrompt = ({ classes, combatDialogOpen, setCombat, closePrompt }) => (
  <Dialog
    classes={{ paper: classes.paper }}
    open={combatDialogOpen}
    TransitionComponent={Transition}
    keepMounted
    onClose={closePrompt}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
  >
    <div className="prompt-background">
      <img src="images/burnt_paper.png" />
    </div>
    <DialogTitle>Is this a combat roll?</DialogTitle>
    <DialogActions>
      <Button onClick={() => setCombat(false)} color="primary">
        No
      </Button>
      <Button onClick={() => setCombat(true)} color="primary">
        Yes
      </Button>
    </DialogActions>
  </Dialog>
);

CombatPrompt.propTypes = {
  classes: PropTypes.object.isRequired,
  combatDialogOpen: PropTypes.bool.isRequired,
  setCombat: PropTypes.func.isRequired,
  closePrompt: PropTypes.func.isRequired
};

export default CombatPrompt;
