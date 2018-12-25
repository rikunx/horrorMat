import PropTypes from 'prop-types';

import { UniqueBonus } from '../enum';

export default PropTypes.shape({
  type: PropTypes.oneOf([UniqueBonus.ADDITIVE, UniqueBonus.DUPLICATE]).isRequired,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number])
});
