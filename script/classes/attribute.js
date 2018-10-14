class Attribute {
    get type() {
        return this._type;
    }
    get value() {
        return this._value;
    }
    constructor(type, value) {
        this._type = type;
        this._value = value;
    }
}

export default Attribute;