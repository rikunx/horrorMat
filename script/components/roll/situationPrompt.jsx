import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Situation, Attributes } from '../../enum';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const SituationPrompt = ({ classes, test, open, setSituation, closePrompt }) => (
  <Dialog
    classes={{ paper: classes.paper }}
    open={open}
    TransitionComponent={Transition}
    keepMounted
    fullWidth={true}
    maxWidth="md"
    onClose={closePrompt}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
  >
    <div className="prompt-background">
      <img src="images/burnt_paper.png" />
    </div>
    <DialogTitle>Choose the situation:</DialogTitle>
    {test === Attributes.STRENGTH || test === Attributes.WILL ? (
      <Button onClick={() => setSituation(Situation.COMBAT)} color="primary">
        Combat
      </Button>
    ) : null}
    <Button onClick={() => setSituation(Situation.SPELL)} color="primary">
      Spell
    </Button>
    <Button onClick={() => setSituation(Situation.OTHER_WORLD)} color="primary">
      Other World
    </Button>
    <Button onClick={() => setSituation(Situation.ACQUIRE)} color="primary">
      Acquire
    </Button>
    <Button onClick={() => setSituation(Situation.RESEARCH)} color="primary">
      Research
    </Button>
    <Button onClick={() => setSituation(Situation.TEST)} color="primary">
      Test
    </Button>
    <Button onClick={() => setSituation(Situation.REST)} color="primary">
      Rest
    </Button>
    <Button onClick={() => closePrompt()} color="primary">
      Close
    </Button>
  </Dialog>
);

SituationPrompt.propTypes = {
  classes: PropTypes.object.isRequired,
  test: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setSituation: PropTypes.func.isRequired,
  closePrompt: PropTypes.func.isRequired
};

export default SituationPrompt;
