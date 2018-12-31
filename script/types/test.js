import PropTypes from 'prop-types';
import { Attributes } from '../enum';

export default PropTypes.shape({
  type: PropTypes.oneOf([
    Attributes.INFLUENCE,
    Attributes.LORE,
    Attributes.OBSERVATION,
    Attributes.STRENGTH,
    Attributes.WILL
  ]).isRequired,
  modifier: PropTypes.number.isRequired
});
