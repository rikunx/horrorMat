import PropTypes from 'prop-types';
import { Attributes } from '../enum';

export default PropTypes.oneOf([
  Attributes.STRENGTH,
  Attributes.WILL,
  Attributes.INFLUENCE,
  Attributes.OBSERVATION,
  Attributes.LORE,
  Attributes.ANY
]);
