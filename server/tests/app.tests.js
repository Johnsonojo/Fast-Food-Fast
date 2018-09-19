import chaiHttp from 'chai-http';
import chai from 'chai';
import server from '../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('App.js Function', () => {
    // test for getting the homepage route
    it('should get the homepage route', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.eql({
                    status: 'success',
                    message: 'Welcome to Fast-Food-Fast, a platform to order for food'
                });
                done(err);
            });
    });
});