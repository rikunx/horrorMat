class Card {
  get name() {
    return this._name;
  }

  get image() {
    return this._image;
  }

  constructor(name, image) {
    this._name = name;
    this._image = image;
  }
}

export default Card;
