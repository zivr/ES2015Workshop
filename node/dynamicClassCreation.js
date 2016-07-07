class TwoWheels {
    constructor(name) {
        this._name = name;
        this._numOfWhels = 2;
    }

    get wheelBase() {
        return this._numOfWhels;
    }

    get name() {
        return this._name;
    }
}
class FourWheels {
    constructor(name) {
        this._name = name;
        this._numOfWhels = 4;
    }

    get wheelBase() {
        return this._numOfWhels;
    }

    get name() {
        return this._name;
    }
}
const createWheelBaseClass = (baseClass) => {
    let dynamicClass = class newClass extends baseClass {
        constructor(...args) {
            super(...args);            //Do something
        }
    };
    return dynamicClass;
};
let Bicycle = createWheelBaseClass(TwoWheels);
let Car = createWheelBaseClass(FourWheels);
let bmx = new Bicycle('BMX');
console.log(bmx.name + ' has ' + bmx.wheelBase + ' wheels.');
let ferrari = new Car('Ferrari');
console.log(ferrari.name + ' has ' + ferrari.wheelBase + ' wheels.');


