import PropTypes from 'prop-types';
import { Card, Situation, UniqueBonus } from '../enum';

export default PropTypes.shape({
  card: PropTypes.oneOf([Card.ITEM, Card.WEAPON, Card.TOME, Card.TRINKET, Card.ALLY, Card.ARTIFACT, Card.SPELL])
    .isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  test: PropTypes.shape({
    attribute: PropTypes.string.isRequired,
    situation: PropTypes.oneOf([Situation.COMBAT, Situation.TEST, Situation.REROLL, Situation.ATTRIBUTE]).isRequired,
    bonus: PropTypes.number.isRequired,
    oncePerRound: PropTypes.bool,
    uniqueBonus: PropTypes.shape({
      type: PropTypes.oneOf([UniqueBonus.ADDITIVE, UniqueBonus.DUPLICATE]).isRequired,
      value: PropTypes.number.isRequired
    }),
    disposable: PropTypes.bool
  })
});
