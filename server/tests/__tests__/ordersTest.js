import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';

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
});