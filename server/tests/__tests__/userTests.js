import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import userData from '../__mocks__/userData';
import orderData from '../__mocks__/orderData';

let userToken;
const userSignin = '/api/v1/auth/login';
const seededUser = {
    email: 'adesewa@gmail.com',
    password: 'johnson123',
};

const {
    signUpDetails,
    signUpNoName,
    existingUser,
    wrongUser,
    notAUser,
    invalidPwd
} = userData;

const {
    completeOrder,
    noFoodName,
    noFoodPrice,
    noQty,
    noAddress,
    noPhone
} = orderData;

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
                expect(res.status).to.equal(401);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('failure');
                expect(res.body.message).to.equal('Password does not match');
                done(err);
            });
    });
});

describe('User Order', () => {
    before((done) => {
        chai.request(app)
            .post(`${userSignin}`)
            .send(seededUser)
            .end((err, res) => {
                userToken = res.body.data.token;
                done(err);
            });
    });

    it('should post an order to the database', (done) => {
        chai.request(app)
            .post('/api/v1/orders')
            .set('token', userToken)
            .send(completeOrder)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('success');
                expect(res.body.message).to.equal('Order placed successfully');
                expect(res.body.data).to.be.an('array');
                done(err);
            });
    });

    it('should not post an order without a food name', (done) => {
        chai.request(app)
            .post('/api/v1/orders')
            .set('token', userToken)
            .send(noFoodName)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('failure');
                expect(res.body.message).to.equal('Order validation not successful');
                expect(res.body.data).to.be.an('array');
                expect(res.body.data[0].msg).to.equal('food name must not be empty');
                done(err);
            });
    });

    it('should not post an order without a food price', (done) => {
        chai.request(app)
            .post('/api/v1/orders')
            .set('token', userToken)
            .send(noFoodPrice)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('failure');
                expect(res.body.message).to.equal('Order validation not successful');
                expect(res.body.data).to.be.an('array');
                expect(res.body.data[0].msg).to.equal('food price must not be empty');
                done(err);
            });
    });

    it('should not post an order without quantity', (done) => {
        chai.request(app)
            .post('/api/v1/orders')
            .set('token', userToken)
            .send(noQty)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('failure');
                expect(res.body.message).to.equal('Order validation not successful');
                expect(res.body.data).to.be.an('array');
                expect(res.body.data[0].msg).to.equal('Quantity must not be empty');
                done(err);
            });
    });


    it('should not post an order without an address', (done) => {
        chai.request(app)
            .post('/api/v1/orders')
            .set('token', userToken)
            .send(noAddress)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('failure');
                expect(res.body.message).to.equal('Order validation not successful');
                expect(res.body.data).to.be.an('array');
                expect(res.body.data[0].msg).to.equal('Delivery address must not be empty');
                done(err);
            });
    });

    it('should get all the orders of a user', (done) => {
        chai.request(app)
            .get('/api/v1/users/2/orders')
            .set('token', userToken)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('success');
                expect(res.body.message).to.equal('orders fetched successfully');
                done(err);
            });
    });

    it('should throw user not found error', (done) => {
        chai.request(app)
            .get('/api/v1/users/500/orders')
            .set('token', userToken)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('failure');
                expect(res.body.message).to.equal('User not found');
                done(err);
            });
    });

    it('should throw an error for a wrong userId', (done) => {
        chai.request(app)
            .get('/api/v1/users/50jhgfhjj0/orders')
            .set('token', userToken)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('failure');
                expect(res.body.message).to.equal('Validation not successful');
                expect(res.body.data[0].msg).to.equal('User id must be an integer');
                done(err);
            });
    });
});