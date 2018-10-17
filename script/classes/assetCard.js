import Card from './card';

class AssetCard extends Card {
  get type() {
    return this._type;
  }

  get attributes() {
    return this._attributes;
  }

  constructor(name, image, type, attributes) {
    super(name, image);
    this._type = type;
    this._attributes = attributes;
  }
}

export default AssetCard;
