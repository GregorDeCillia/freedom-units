const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();
const rnd = num => Number(num.toFixed(5))

suite('Unit Tests: convertHandler should correctly...', function () {
    // parse numbers
    test('read a whole number input.', () => {
        assert.equal(convertHandler.getNum('2L'), 2);
    })
    test('read a decimal number input.', () => {
        assert.equal(convertHandler.getNum('2.3kg'), 2.3);
    })
    test('read a fractional input.', () => {
        assert.equal(convertHandler.getNum("2/3lbs", true), 2 / 3);
    })
    test('read a fractional input with a decimal.', () => {
        assert.equal(convertHandler.getNum("12.3/4mi"), 12.3 / 4);
    })
    test('return an error on a double-fraction (i.e. 3/2/3).', () => {
        assert.Throw(() => convertHandler.getNum('3/2/3'));
    })
    test('default to a numerical input of 1 when no numerical input is provided.', () => {
        assert.equal(convertHandler.getNum('m'), 1);
    })
    // parse units
    test('read each valid input unit.', () => {
        assert.equal(convertHandler.getUnit('gal'), "gal");
        assert.equal(convertHandler.getUnit('L'), "L");
        assert.equal(convertHandler.getUnit('mi'), "mi");
        assert.equal(convertHandler.getUnit('km'), "km");
        assert.equal(convertHandler.getUnit('kg'), "kg");
        assert.equal(convertHandler.getUnit('lbs'), "lbs");
    })
    test('return an error for an invalid input unit.', () => {
        assert.Throw(() => convertHandler.getReturnUnit('lum'));
    })
    test('return the correct return unit for each valid input unit.', () => {
        assert.equal(convertHandler.getReturnUnit('gal'), 'L');
        assert.equal(convertHandler.getReturnUnit('L'), 'gal');
        assert.equal(convertHandler.getReturnUnit('mi'), 'km');
        assert.equal(convertHandler.getReturnUnit('km'), 'mi');
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    })
    test('return the spelled-out string unit for each valid input unit.', () => {
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
        assert.equal(convertHandler.spellOutUnit('L'), 'liters');
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    })
    // convert
    test('convert gal to L', () => {
        assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
    })
    test('convert L to gal', () => {
        assert.equal(convertHandler.convert(1, 'L'), rnd(1 / 3.78541));
    })
    test('convert mi to km', () => {
        assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
    })
    test('convert km to mi', () => {
        assert.equal(convertHandler.convert(1, 'km'), rnd(1 / 1.60934));
    })
    test('convert lbs to kg', () => {
        assert.equal(convertHandler.convert(1, 'lbs'), rnd(0.453592));
    })
    test('convert kg to lbs', () => {
        assert.equal(convertHandler.convert(1, 'kg'), rnd(1 / 0.453592));
    })
});