const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests: convertHandler should correctly...', function () {
    // parse numbers
    test('read a whole number input.')
    test('read a decimal number input.')
    test('read a fractional input.')
    test('read a fractional input with a decimal.')
    test('return an error on a double-fraction (i.e. 3/2/3).')
    test('default to a numerical input of 1 when no numerical input is provided.')
    // parse units
    test('read each valid input unit.')
    test('return an error for an invalid input unit.')
    test('return the correct return unit for each valid input unit.')
    test('return the spelled-out string unit for each valid input unit.')
    // convert
    test('convert gal to L')
    test('convert L to gal')
    test('convert mi to km')
    test('convert km to mi')
    test('convert lbs to kg')
    test('convert kg to lbs')
});