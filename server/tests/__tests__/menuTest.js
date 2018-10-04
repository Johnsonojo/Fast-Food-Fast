import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import mockData from '../__mocks__/menuData';

const {
    completeDetails,
    noFoodName,
    noFoodPrice,
    noFoodImage,
    duplicate,
    strFoodPrice,
    intFoodImage
} = mockData;

let userToken;
const userSignin = '/api/v1/auth/login';
const seededAdmin = {
    email: 'johnson@gmail.com',
    password: 'johnson123',
};

const { expect } = chai;

chai.use(chaiHttp);

describe('Menu Controller', () => {
    before((done) => {
        chai.request(app)
            .post(`${userSignin}`)
            .send(seededAdmin)
            .end((err, res) => {
                userToken = res.body.data.token;
                done(err);
            });
    });

    it('should get all the menu from database', (done) => {
        chai.request(app)
            .get('/api/v1/menu')
            .set('token', userToken)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('success');
                expect(res.body.message).to.equal('All menu fetched');
                done(err);
            });
    });

    it('should allow admin to add a menu database', (done) => {
        chai.request(app)
            .post('/api/v1/menu')
            .set('token', userToken)
            .send(completeDetails)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('Success');
                expect(res.body.message).to.equal('Menu created successfully');
                done(err);
            });
    });

    it('should not allow admin to duplicate a menu in the database', (done) => {
        chai.request(app)
            .post('/api/v1/menu')
            .set('token', userToken)
            .send(duplicate)
            .end((err, res) => {
                expect(res.status).to.equal(409);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('failure');
                expect(res.body.message).to.equal('Menu already exist');
                done(err);
            });
    });

    it('should throw an error when adding food without a name', (done) => {
        chai.request(app)
            .post('/api/v1/menu')
            .set('token', userToken)
            .send(noFoodName)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('failure');
                expect(res.body.message).to.equal('Menu validation not successful');
                done(err);
            });
    });

    it('should throw an authentication error when no token set in header', (done) => {
        chai.request(app)
            .post('/api/v1/menu')
            .set('authorization', userToken)
            .send(completeDetails)
            .end((err, res) => {
                expect(res.status).to.equal(401);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('failure');
                expect(res.body.message).to.equal('User authentication invalid');
                done(err);
            });
    });
});