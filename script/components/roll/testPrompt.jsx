import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const TestPrompt = ({ classes, rollDialogOpen, test, baseRoll, abilities, items, total, closePrompt, roll }) => (
  <Dialog
    classes={{ paper: classes.paper }}
    open={rollDialogOpen}
    TransitionComponent={Transition}
    keepMounted
    onClose={closePrompt}
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
        {items.map(item => (
          <span key={item._id}>
            {item.name}: +{item.test.bonus}
          </span>
        ))}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={closePrompt} color="primary">
        Cancel
      </Button>
      <Button onClick={() => roll(total)} color="primary">
        Roll {total} Dice!
      </Button>
    </DialogActions>
  </Dialog>
);

TestPrompt.propTypes = {};

export default TestPrompt;
