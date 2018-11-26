import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Cost } from '../../enum';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const AbilityPrompt = ({ classes, test, abilityDialogOpen, ability, useAbility, closeAbilityPrompt }) => {
  let promptMessage = `Do you want to use your ability to give you ${ability.bonus} bonus dice?`;
  const cost = ability.cost;
  if (cost) {
    switch (cost.type) {
      case Cost.Location:
        promptMessage = `Are you currently in the ${cost.value}?`;
        break;
      case Cost.Health:
        promptMessage = `Do you want to spend ${cost.value} health to activate your ability and gain ${
          ability.bonus
        } bonus dice?`;
        break;
      case Cost.Sanity:
        promptMessage = `Do you want to spend ${cost.value} sanity to activate your ability and gain ${
          ability.bonus
        } bonus dice?`;
        break;
      case Cost.Clue:
        promptMessage = `Do you want to spend ${cost.value} clue to activate your ability and gain ${
          ability.bonus
        } bonus dice?`;
        break;
      default:
        break;
    }
  }
  return (
    <Dialog
      classes={{ paper: classes.paper }}
      open={abilityDialogOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeAbilityPrompt}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="prompt-background">
        <img src="images/burnt_paper.png" />
      </div>
      <DialogTitle>{promptMessage}</DialogTitle>
      <DialogActions>
        <Button onClick={() => useAbility(test)} color="primary">
          No
        </Button>
        <Button onClick={() => useAbility(test, true)} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AbilityPrompt.propTypes = {};

export default AbilityPrompt;
