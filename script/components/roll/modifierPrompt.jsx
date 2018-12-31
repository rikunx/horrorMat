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
const ModifierPrompt = ({ classes, open, modifier, setModifier, promptSituation, closePrompt }) => (
  <Dialog
    classes={{ paper: classes.paper }}
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={closePrompt}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
  >
    <div className="prompt-background">
      <img src="images/burnt_paper.png" />
    </div>
    <DialogTitle>Test Modifier:</DialogTitle>
    <Button onClick={() => setModifier(modifier - 1)} color="primary">
      -
    </Button>
    {modifier}
    <Button onClick={() => setModifier(modifier + 1)} color="primary">
      +
    </Button>
    <DialogActions>
      <Button onClick={() => closePrompt()} color="primary">
        Close
      </Button>
      <Button onClick={() => promptSituation()} color="primary">
        Set
      </Button>
    </DialogActions>
  </Dialog>
);

ModifierPrompt.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  modifier: PropTypes.number.isRequired,
  setModifier: PropTypes.func.isRequired,
  promptSituation: PropTypes.func.isRequired,
  closePrompt: PropTypes.func.isRequired
};

export default ModifierPrompt;
