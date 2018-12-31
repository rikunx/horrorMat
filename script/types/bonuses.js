import PropTypes from 'prop-types';

import { BonusType } from '../enum';
import Attribute from './attribute';

export default PropTypes.arrayOf(
  PropTypes.shape({
    attribute: Attribute.isRequired,
    type: PropTypes.oneOf([BonusType.EXTRA, BonusType.REROLL, BonusType.ADDITIVE, BonusType.DUPLICATE, BonusType.CLUE])
      .isRequired,
    value: PropTypes.number.isRequired,
    additional: PropTypes.number
  })
);
