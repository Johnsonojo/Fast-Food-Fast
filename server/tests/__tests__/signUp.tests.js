import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import mockData from '../__mocks__/mockData';

const { signUpDetails, signUpNoEmail, signUpNoName } = mockData;

const { expect } = chai;

chai.use(chaiHttp);

describe('SignUp Controller', () => {
    it('should signup a new user', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(signUpDetails)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.equal('User created');
                expect(res.body.data).to.have.a.property('username');
                expect(res.body.data).to.have.a.property('email');
                expect(res.body.data).to.have.a.property('token');
                done(err);
            });
    });

    it('should throw an error for already existing user', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(signUpDetails)
            .end((err, res) => {
                expect(res.status).to.equal(409);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('failure');
                expect(res.body.message).to.equal('User already exist');
                done(err);
            });
    });

    it('should not create a user without a username', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(signUpNoName)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('failure');
                expect(res.body.message).to.equal('Validation not successful');
                done(err);
            });
    });
});