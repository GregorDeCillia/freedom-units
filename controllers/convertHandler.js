const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

const units = [
  ["km", "kilometers", "mi", 1 / miToKm],
  ["mi", "miles", "km", miToKm],
  ["L", "liters", "gal", 1 / galToL],
  ["gal", "gallons", "L", galToL],
  ["kg", "kilograms", "lbs", 1 / lbsToKg],
  ["lbs", "pounds", "kg", lbsToKg]
]

const unitIndex = (unit) => {
  let index = units.findIndex(x => x[0].toLocaleLowerCase() == unit.toLocaleLowerCase());
  if (index === -1) {
    throw new Error("invalid unit " + unit);
  }
  return index;
}

function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    let index = /[gGmMLkKl]/.exec(input);
    if (index.length === 0) {
      throw new Error("bad number");
    }
    index = index.index;
    result = input.slice(0, index);
    if (index === 0)
      result = "1";
    result = result.split("/");
    if (result.length == 1) {
      result = result[0];
    } else if (result.length == 2) {
      result = Number(result[0] / result[1]);
    } else if (result.length === 3) {
      throw new Error("bad number");
    }
    return Number(result);
  };

  this.getUnit = function (input) {
    let index = /[gGmMLkKl]/.exec(input);
    if (index.length === 0) {
      throw new Error("bad unit");
    }
    index = index.index;
    const result = input.slice(index);
    index2 = unitIndex(result);
    return units[index2][0];
  };

  this.getReturnUnit = function (initUnit) {
    return units[unitIndex(initUnit)][2];
  };

  this.spellOutUnit = function (unit) {
    return units[unitIndex(unit)][1];
  };

  this.convert = function (initNum, initUnit) {
    const factor = units[unitIndex(initUnit)][3];
    return Number((initNum * factor).toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  };
}

module.exports = ConvertHandler;
