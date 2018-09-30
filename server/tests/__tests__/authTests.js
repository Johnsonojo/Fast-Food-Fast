import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import mockData from '../__mocks__/mockData';

const {
    signUpDetails,
    signUpNoName,
    existingUser,
    wrongUser,
    notAUser,
    invalidPwd
} = mockData;

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

describe('Login Controller', () => {
    it('should signup a new user', (done) => {
        chai.request(app)
            .post('/api/v1/auth/login')
            .send(existingUser)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('success');
                expect(res.body.message).to.equal('User login successful');
                expect(res.body.data).to.be.an('object');
                done(err);
            });
    });

    it('should throw an validation failed message for wrong password', (done) => {
        chai.request(app)
            .post('/api/v1/auth/login')
            .send(wrongUser)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('failure');
                expect(res.body.message).to.equal('Validation not successful');
                done(err);
            });
    });

    it('should throw a 404 error for non-existent user', (done) => {
        chai.request(app)
            .post('/api/v1/auth/login')
            .send(notAUser)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('failure');
                expect(res.body.message).to.equal('User not found');
                done(err);
            });
    });

    it('should throw a 401 error for wrong password', (done) => {
        chai.request(app)
            .post('/api/v1/auth/login')
            .send(invalidPwd)
            .end((err, res) => {
                console.log(res.body);
                expect(res.status).to.equal(401);
                expect(res.body).to.be.an('object');
                expect(res.body.auth).to.equal(false);
                expect(res.body.token).to.equal(null);
                done(err);
            });
    });
});