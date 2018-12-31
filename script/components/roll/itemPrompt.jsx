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
const ItemPrompt = ({ classes, open, item, useItem, closePrompt }) => {
  let costMessage = `Do you want to use your <strong>${item.name}</strong> to give you ${
    item.effect.bonus.value
  } bonus dice?`;
  const { cost, disposable, oncePerRound } = item.effect;
  if (cost) {
    switch (cost.type) {
      case Cost.Location:
        costMessage = `Are you currently in the ${cost.value}?`;
        break;
      case Cost.Health:
        costMessage = `Do you want to spend ${cost.value} health to activate your ability and gain ${
          item.effect.bonus.value
        } bonus dice?`;
        break;
      case Cost.Sanity:
        costMessage = `Do you want to spend ${cost.value} sanity to activate your ability and gain ${
          item.effect.bonus.value
        } bonus dice?`;
        break;
      case Cost.Clue:
        costMessage = `Do you want to spend ${cost.value} clue to activate your ability and gain ${
          item.effect.bonus.value
        } bonus dice?`;
        break;
      default:
        break;
    }
  }
  console.log(item);
  let onceMessage = '';
  if (disposable) {
    onceMessage = 'This item must be disposed of after this round.';
  }
  if (oncePerRound) {
    onceMessage = 'This item can only be used once per round.';
  }
  return (
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
      <DialogTitle>
        <div dangerouslySetInnerHTML={{ __html: costMessage }} />
        <div dangerouslySetInnerHTML={{ __html: onceMessage }} />
      </DialogTitle>
      <DialogActions>
        <Button onClick={() => useItem(false)} color="primary">
          No
        </Button>
        <Button onClick={() => useItem(true)} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ItemPrompt.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  item: PropTypes.shape({
    cost: PropTypes.shape({
      type: PropTypes.string.isRequired,
      value: PropTypes.oneOf([PropTypes.string, PropTypes.number])
    }),
    effect: PropTypes.shape({
      bonus: PropTypes.shape({
        value: PropTypes.number.isRequired
      }).isRequired
    }).isRequired
  }),
  useItem: PropTypes.func.isRequired,
  closePrompt: PropTypes.func.isRequired
};

export default ItemPrompt;
