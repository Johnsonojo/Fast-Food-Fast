import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('Menu Controller', () => {
    it('should get all the menu from database', (done) => {
        chai.request(app)
            .get('/api/v1/menu')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('success');
                expect(res.body.message).to.equal('All menu fetched');
                done(err);
            });
    });

});