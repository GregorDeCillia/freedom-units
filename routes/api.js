'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.get("/api/convert", (req, res) => {
    const { input } = req.query;
    let numError = false, unitError = false, initNum, initUnit;
    try {
      initNum = convertHandler.getNum(input);
    } catch (e) {
      numError = true;
    }
    try {
      initUnit = convertHandler.getUnit(input);
    } catch (e) {
      unitError = true;
    }
    if (numError && unitError)
      res.json('invalid number and unit');
    if (numError)
      res.json('invalid number');
    if (unitError)
      res.json('invalid unit');
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    res.json({ initNum, initUnit, returnNum, returnUnit, string });
  })
};
