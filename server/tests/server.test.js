const request = require('supertest');
const expect = require('expect');
var {server} = require('./../server.js');

var {app} = require('./../server.js');

describe('GET /', () => {
    it('Should render the index.html home page', () => {

        request('localhost:3000')
        .get('/')
        .expect(200)
        .end((err, res) => {
        if (err) {
            return (err);
        }
    });
})
});

describe('POST /', () => {
    it('Should should send an SMS succesfully', (done) => {
        var toNumber = 14169385958  
        var text = "Hello World"
        var NUMBER = 12046743781

        request('localhost:3000')
        .post('/')
        .send({toNumber: toNumber, text: text, NUMBER: NUMBER})
        .expect(200)
        .expect((res) => {
            expect(res).toExist();
 
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            done();
        });
    });
})