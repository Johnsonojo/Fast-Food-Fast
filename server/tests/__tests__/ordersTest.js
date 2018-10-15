import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import statusData from '../__mocks__/statusData';

const {
    processing,
    neew,
    wrong
} = statusData;

let userToken;
const userSignin = '/api/v1/auth/login';
const seededAdmin = {
    email: 'johnson@gmail.com',
    password: 'johnson123',
};

const { expect } = chai;

chai.use(chaiHttp);

describe('Order Controller', () => {
    before((done) => {
        chai.request(app)
            .post(`${userSignin}`)
            .send(seededAdmin)
            .end((err, res) => {
                userToken = res.body.data.token;
                done(err);
            });
    });

    it('should get all the order from database', (done) => {
        chai.request(app)
            .get('/api/v1/orders')
            .set('token', userToken)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('success');
                expect(res.body.message).to.equal('All order fetched');
                done(err);
            });
    });

    it('should get an order from database', (done) => {
        chai.request(app)
            .get('/api/v1/orders/1')
            .set('token', userToken)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('Success');
                expect(res.body.message).to.equal('Order 1 successfully fetched');
                done(err);
            });
    });

    it('should throw an error for non-existing order', (done) => {
        chai.request(app)
            .get('/api/v1/orders/100')
            .set('token', userToken)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('Failure');
                expect(res.body.message).to.equal('Order not found');
                done(err);
            });
    });

    it('should throw an error for a string order id', (done) => {
        chai.request(app)
            .get('/api/v1/orders/johnson')
            .set('token', userToken)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('failure');
                expect(res.body.message).to.equal('Validation not successful');
                done(err);
            });
    });

    it('should update the status of an order', (done) => {
        chai.request(app)
            .put('/api/v1/orders/2')
            .set('token', userToken)
            .send(processing)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('success');
                expect(res.body.message).to.equal('Status of order 2 successfully modified by you');
                expect(res.body.data).to.equal('Order status is Processing');
                done(err);
            });
    });

    it('should throw an error when using a wrong order status value', (done) => {
        chai.request(app)
            .put('/api/v1/orders/2')
            .set('token', userToken)
            .send(wrong)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('failure');
                expect(res.body.message).to.equal('Validation not successful');
                expect(res.body.data[0].msg).to.equal('Order status is either New, Processing, Cancelled or Complete');
                done(err);
            });
    });

    it('should throw a 404 error for order not in database', (done) => {
        chai.request(app)
            .put('/api/v1/orders/200')
            .set('token', userToken)
            .send(neew)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('failure');
                expect(res.body.message).to.equal('Order not found');
                done(err);
            });
    });
});