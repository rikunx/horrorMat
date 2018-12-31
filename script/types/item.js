import PropTypes from 'prop-types';
import { Card } from '../enum';
import Bonuses from './bonuses';
import Cost from './cost';
import Test from './test';
import Situation from './situation';

export default PropTypes.shape({
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  card: PropTypes.oneOf([Card.ITEM, Card.WEAPON, Card.TOME, Card.TRINKET, Card.ALLY, Card.ARTIFACT, Card.SPELL])
    .isRequired,
  effects: PropTypes.arrayOf(
    PropTypes.shape({
      situation: Situation.isRequired,
      bonuses: Bonuses.isRequired,
      cost: Cost,
      test: Test,
      oncePerRound: PropTypes.bool,
      disposable: PropTypes.bool
    })
  )
});
