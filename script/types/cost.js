import PropTypes from 'prop-types';

import { Cost } from '../enum';

export default PropTypes.shape({
  type: PropTypes.oneOf([Cost.CLUE, Cost.HEALTH, Cost.SANITY, Cost.LOCATION]).isRequired,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number])
});
