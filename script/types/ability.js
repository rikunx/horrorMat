import PropTypes from 'prop-types';
import Cost from './cost';
import { Attributes, Situation } from '../enum';

export default PropTypes.shape({
  attribute: PropTypes.oneOf([
    Attributes.STRENGTH,
    Attributes.WILL,
    Attributes.INFLUENCE,
    Attributes.OBSERVATION,
    Attributes.LORE,
    Attributes.ANY
  ]).isRequired,
  situation: PropTypes.oneOf([Situation.COMBAT, Situation.TEST, Situation.REROLL, Situation.ATTRIBUTE]).isRequired,
  bonus: PropTypes.number.isRequired,
  secondarySituation: PropTypes.oneOf([Situation.COMBAT, Situation.TEST, Situation.REROLL, Situation.ATTRIBUTE]),
  cost: Cost,
  oncePerRound: PropTypes.bool
});
