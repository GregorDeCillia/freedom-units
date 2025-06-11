const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests: GET /api/convert to convert...', function() {
    test(' a valid input such as 10L')
    test(' an invalid input such as 32g')
    test(' an invalid number such as 3/7.2/4kg')
    test(' an invalid number AND unit such as 3/7.2/4kilomegagram')
    test(' with no number such as kg')
});
