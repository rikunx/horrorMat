import PropTypes from 'prop-types';
import Cost from './cost';
import Attribute from './attribute';
import Situation from './situation';
import Bonuses from './bonuses';
import Test from './test';

export default PropTypes.shape({
  attribute: Attribute.isRequired,
  situation: Situation.isRequired,
  bonus: Bonuses.isRequired,
  cost: Cost,
  test: Test,
  oncePerRound: PropTypes.bool
});
