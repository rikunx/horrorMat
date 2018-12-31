import PropTypes from 'prop-types';

import { Situation } from '../enum';

export default PropTypes.oneOf([
  Situation.COMBAT,
  Situation.RESEARCH,
  Situation.OTHER_WORLD,
  Situation.SPELL,
  Situation.TEST,
  Situation.ACQUIRE,
  Situation.REST,
  Situation.RECKONING
]);
