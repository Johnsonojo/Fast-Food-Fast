import chaiHttp from 'chai-http';
import chai from 'chai';
import server from '../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('Order Controller', () => {
    const newOrder = {
        foodName: 'Meat Pie',
        foodPrice: 250,
        qty: 9,
        orderStatus: 'Complete',
        deliveryAddress: '29, Ikorodu road Lagos'
    };

    // test for posting an order
    it('should create a new order', (done) => {
        chai.request(server)
            .post('/api/v1/orders')
            .send(newOrder)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body.status).to.equal('Success');
                expect(res.body.message).to.equal('New order was created');
                expect(res.body.data.orderId).to.be.eql(4);
                expect(res.body.data.orderStatus).to.be.eql('Complete');
                expect(res.body.data.totalAmount).to.be.eql(2250);
                done(err);
            });
    });


    // test for posting an order with an empty food name
    it('should not create a new order with an empty food name', (done) => {
        const newOrder = {
            foodName: '',
            foodPrice: 250,
            qty: 9,
            orderStatus: 'Complete',
            deliveryAddress: '29, Ikorodu road Lagos'
        };
        chai.request(server)
            .post('/api/v1/orders')
            .send(newOrder)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.status).to.equal('Failure');
                expect(res.body.message).to.equal('Order validation not successful');
                expect(res.body.data[0].msg).to.equal('food name must not be empty');
                done(err);
            });
    });

    // test for posting an order with an integer as food name
    it('should not create a new order with food name as an integer', (done) => {
        const newOrder = {
            foodName: 2,
            foodPrice: 250,
            qty: 9,
            orderStatus: 'Complete',
            deliveryAddress: '29, Ikorodu road Lagos'
        };
        chai.request(server)
            .post('/api/v1/orders')
            .send(newOrder)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.status).to.equal('Failure');
                expect(res.body.message).to.equal('Order validation not successful');
                expect(res.body.data[0].msg).to.equal('food name must be a string');
                done(err);
            });
    });


    // test for posting an order with an empty food price
    it('should not create a new order without a food price', (done) => {
        const newOrder = {
            foodName: 'Meat Pie',
            foodPrice: '',
            qty: 9,
            orderStatus: 'Complete',
            deliveryAddress: '29, Ikorodu road Lagos'
        };
        chai.request(server)
            .post('/api/v1/orders')
            .send(newOrder)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.status).to.equal('Failure');
                expect(res.body.message).to.equal('Order validation not successful');
                expect(res.body.data[0].msg).to.equal('food price must not be empty');
                done(err);
            });
    });

    // test for posting an order with a food price as a string
    it('should not create a new order with a food price as string', (done) => {
        const newOrder = {
            foodName: 'Meat Pie',
            foodPrice: 'hi',
            qty: 9,
            orderStatus: 'Complete',
            deliveryAddress: '29, Ikorodu road Lagos'
        };
        chai.request(server)
            .post('/api/v1/orders')
            .send(newOrder)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.status).to.equal('Failure');
                expect(res.body.message).to.equal('Order validation not successful');
                expect(res.body.data[0].msg).to.equal('food price must be an integer');
                done(err);
            });
    });

    // test for posting an order with a qty as a string
    it('should not create a new order with a food qty as string', (done) => {
        const newOrder = {
            foodName: 'Meat Pie',
            foodPrice: 300,
            qty: 'hello',
            orderStatus: 'Complete',
            deliveryAddress: '29, Ikorodu road Lagos'
        };
        chai.request(server)
            .post('/api/v1/orders')
            .send(newOrder)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.status).to.equal('Failure');
                expect(res.body.message).to.equal('Order validation not successful');
                expect(res.body.data[0].msg).to.equal('Quantity must be an integer');
                done(err);
            });
    });

    // test for posting an order with an empty qty
    it('should not create a new order with an empty qty', (done) => {
        const newOrder = {
            foodName: 'Meat Pie',
            foodPrice: 300,
            qty: '',
            orderStatus: 'Completed',
            deliveryAddress: '29, Ikorodu road Lagos'
        };
        chai.request(server)
            .post('/api/v1/orders')
            .send(newOrder)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.status).to.equal('Failure');
                expect(res.body.message).to.equal('Order validation not successful');
                expect(res.body.data[0].msg).to.equal('Quantity must not be empty');
                done(err);
            });
    });

    // test for getting all orders
    it('should get all orders', (done) => {
        chai.request(server)
            .get('/api/v1/orders')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).to.be.a('string');
                expect(res.body.status).to.be.a('string');
                expect(res.body.data.length).to.be.eql(4);
                done(err);
            });
    });

    // test for getting an order
    it('should get an order', (done) => {
        chai.request(server)
            .get('/api/v1/orders/4')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.status).to.equal('Success');
                expect(res.body.message).to.equal('Order  4  fetched');
                expect(res.body.data.orderId).to.be.eql(4);
                expect(res.body.data.userId).to.be.eql(4);
                expect(res.body.data.totalAmount).to.be.eql(2250);
                expect(res.body.data.orderStatus).to.be.eql('Complete');
                done(err);
            });
    });

    // test for getting a string order id
    it('should throw a order not found message for a string order id', (done) => {
        chai.request(server)
            .get('/api/v1/orders/" "')
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.status).to.be.eql('Failure');
                expect(res.body.message).to.be.eql('Order not found');
                expect(res.body.data[0].msg).to.be.eql('Order id must be an integer');
                done(err);
            });
    });

    // test for getting a non-existent order
    it('should throw a order not found message for a string order id', (done) => {
        chai.request(server)
            .get('/api/v1/orders/700')
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.status).to.be.eql('Failure');
                expect(res.body.message).to.be.eql('Order not found');
                done(err);
            });
    });

    // test for updating the status of an order
    it('should update an order', (done) => {
        const updateOrder = {
            orderStatus: 'New',
        };
        chai.request(server)
            .put('/api/v1/orders/3')
            .send(updateOrder)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data.orderStatus).to.be.eql(updateOrder.orderStatus);
                done(err);
            });
    });

    // test for updating the status of a not existing order
    it('should throw a 404 error when wanting to update a non-existent order', (done) => {
        const updateOrder = {
            orderStatus: 'Complete',
        };
        chai.request(server)
            .put('/api/v1/orders/40')
            .send(updateOrder)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.eql({
                    status: 'Failure',
                    message: 'Order not found'
                });
                done(err);
            });
    });

    // test for updating the status of an order using random strings
    it('should not update an order using random strings', (done) => {
        const updateOrder = {
            orderStatus: 'kkljhgf',
        };
        chai.request(server)
            .put('/api/v1/orders/3')
            .send(updateOrder)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.status).to.be.eql('Failure');
                expect(res.body.message).to.be.eql('Validation not successful');
                expect(res.body.data[0].msg).to.be.eql('Order status is either New, Processing, Cancelled or Complete');
                done(err);
            });
    });

    // test for updating the status of an order with a string id
    it('should throw an error when trying to update a string order id', (done) => {
        const updateOrder = {
            orderStatus: 'Processing',
        };
        chai.request(server)
            .put('/api/v1/orders/u')
            .send(updateOrder)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.status).to.be.eql('Failure');
                expect(res.body.message).to.be.eql('Validation not successful');
                expect(res.body.data[0].msg).to.be.eql('Order id must be an integer');
                done(err);
            });
    });

    // test for an empty order status
    it('should give a failure status for an empty order status body', (done) => {
        const updateOrder = {
            orderStatus: '',
        };
        chai.request(server)
            .put('/api/v1/orders/3')
            .send(updateOrder)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.status).to.be.eql('Failure');
                expect(res.body.data[0].msg).to.be.eql('Order status must not be empty');
                done(err);
            });
    });

    // test for an empty order status
    it('should give a failure status for an integer order status body', (done) => {
        const updateOrder = {
            orderStatus: 2,
        };
        chai.request(server)
            .put('/api/v1/orders/3')
            .send(updateOrder)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.status).to.be.eql('Failure');
                expect(res.body.message).to.be.eql('Validation not successful');
                expect(res.body.data[0].msg).to.be.eql('Order status must be a string');
                done(err);
            });
    });
});