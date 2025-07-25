const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests: GET /api/convert to convert...', function () {
    test(' a valid input such as 10L', done => {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=10L')
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.body.returnUnit, "gal")
                assert.approximately(res.body.returnNum, 10/3.78541, 0.001)
                done()
            })
    })
    test(' an invalid input such as 32g', done => {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=32g')
            .end((err, res) => {
                assert.equal(res.body, 'invalid unit')
                done()
            })
    })
    test(' an invalid number such as 3/7.2/4kg', done => {
        chai
            .request(server)
            .get('/api/convert?input=3/7.2/4kg')
            .end((err, res) => {
                assert.equal(res.body, 'invalid number')
                done()
            })
    })
    test(' an invalid number AND unit such as 3/7.2/4kilomegagram', done => {
        chai
            .request(server)
            .get('/api/convert?input=3/7.2/4kilomegagram')
            .end((err, res) => {
                assert.equal(res.body, 'invalid number and unit')
                done()
            })
    })
    test(' with no number such as kg', done => {
        chai
            .request(server)
            .get('/api/convert?input=kg')
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.body.returnUnit, "lbs")
                assert.approximately(res.body.returnNum, 1/0.453592, 0.0001)
                done()
            })
    })
});
