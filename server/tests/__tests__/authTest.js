import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import mockData from '../__mocks__/menuData';

const {
    completeDetails,
    noFoodName,
    noFoodPrice,
    noFoodImage,
    intFoodName,
    strFoodPrice,
    intFoodImage
} = mockData;

const badToken = 'EXjOEb5LVhhh4PYbjftfttmkcy1MzUxODE2MjUsImV4cCI6MTUzNTI2ODAyNX0.hmQeQFBbUkfggfUtYlJPGq3_x8Ru-FpbC5jb20iLCJpYXQiOj';
const emptyToken = '';

let userToken;

const userSignin = '/api/v1/auth/login';
const seededUser = {
    email: 'adesewa@gmail.com',
    password: 'johnson123',
};
const { expect } = chai;

chai.use(chaiHttp);


describe('Authenticator', () => {
    before((done) => {
        chai.request(app)
            .post(`${userSignin}`)
            .send(seededUser)
            .end((err, res) => {
                userToken = res.body.data.token;
                done(err);
            });
    });

    it('should return 401 status code for empty token', (done) => {
        chai.request(app)
            .post('/api/v1/menu')
            .set('token', emptyToken)
            .send(completeDetails)
            .end((err, res) => {
                expect(res.status).to.equal(401);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('failure');
                expect(res.body.message).to.equal('User not authenticated. No token provided');
                done(err);
            });
    });


    it('should return 401 status code for invalid token', (done) => {
        chai.request(app)
            .post('/api/v1/menu')
            .set('token', badToken)
            .end((err, res) => {
                expect(res.status).to.equal(401);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('failure');
                expect(res.body.message).to.equal('User authentication invalid');
                done(err);
            });
    });

    it('should not allow a user to add a food menu', (done) => {
        chai.request(app)
            .post('/api/v1/menu')
            .set('token', userToken)
            .send(completeDetails)
            .end((err, res) => {
                expect(res.status).to.equal(403);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('failure');
                expect(res.body.message).to.equal('User not authenticated to perform this action');
                done(err);
            });
    });
});