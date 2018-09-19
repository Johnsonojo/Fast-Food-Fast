import chaiHttp from 'chai-http';
import chai from 'chai';
import server from '../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('Order Controller', () => {
    const foodItems = [];
    const addFood = {
        foodName: 'Yamarita',
        foodPrice: 900.00,
        qty: 3,
    };
    const totalAmount = addFood.qty * addFood.foodPrice;
    foodItems.push(addFood);

    // const userId = userDb.length + 1;
    const newOrder = {
        orderId: 4,
        userId: 5,
        foodItems,
        totalAmount,
        orderStatus: 'Completed',
        deliveryAddress: '286, Ikorodu road Palmgrove',
        orderDate: new Date(),
    };
    // const newOrder = {
    //     orderId: 4,
    //     userId: 5,
    //     foodItems: [{
    //         foodName: 'Yamarita',
    //         foodPrice: 900.00,
    //         qty: 3,
    //     }],
    //     totalAmount: 2700.00,
    //     orderStatus: 'Completed',
    //     deliveryAddress: '286, Ikorodu road Palmgrove',
    //     orderDate: '24/09/2018, 3:10pm',
    // };
    // test for posting an order
    it('should create a new order', (done) => {
        chai.request(server)
            .post('/api/v1/orders')
            .send(newOrder)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body.data.orderId).to.be.eql(newOrder.orderId);
                expect(res.body.data.userId).to.be.eql(newOrder.userId);
                expect(res.body.data.foodItems[0].foodName).to.be.eql(newOrder.foodItems[0].foodName);
                expect(res.body.data.foodItems[0].foodPrice).to.be.eql(newOrder.foodItems[0].foodPrice);
                expect(res.body.data.foodItems[0].qty).to.be.eql(newOrder.foodItems[0].qty);
                expect(res.body.data.totalAmount).to.be.eql(newOrder.totalAmount);
                expect(res.body.data.orderStatus).to.be.eql(newOrder.orderStatus);
                expect(res.body.data.deliveryAddress).to.be.eql(newOrder.deliveryAddress);
                expect(res.body.data.orderDate).to.be.eql(newOrder.orderDate);
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
                expect(res.body.data.length).to.be.eql(3);
                done(err);
            });
    });

    // test for getting an order
    it('should get an order', (done) => {
        chai.request(server)
            .get('/api/v1/orders/4')
            .end((err, res) => {
                const {
                    orderId,
                    userId,
                    foodItems,
                    totalAmount,
                    orderStatus,
                    deliveryAddress,
                    orderDate,
                } = newOrder;
                expect(res.status).to.equal(200);
                expect(res.body.data.orderId).to.be.eql(orderId);
                expect(res.body.data.userId).to.be.eql(userId);
                expect(res.body.data.foodItems[0].foodName).to.be.eql(foodItems[0].foodName);
                expect(res.body.data.foodItems[0].foodPrice).to.be.eql(foodItems[0].foodPrice);
                expect(res.body.data.foodItems[0].qty).to.be.eql(foodItems[0].qty);
                expect(res.body.data.totalAmount).to.be.eql(totalAmount);
                expect(res.body.data.orderStatus).to.be.eql(orderStatus);
                expect(res.body.data.deliveryAddress).to.be.eql(deliveryAddress);
                expect(res.body.data.orderDate).to.be.eql(orderDate);
                done(err);
            });
    });

    // test for getting a false order id
    it('should throw a order not found message for a false order id', (done) => {
        chai.request(server)
            .get('/api/v1/orders/" "')
            .end((err, res) => {
                const {
                    orderId,
                    userId,
                    foodItems,
                    totalAmount,
                    orderStatus,
                    deliveryAddress,
                    orderDate,
                } = newOrder;
                expect(res.status).to.equal(404);
                expect(res.body).to.be.eql({
                    status: 'Failure',
                    message: 'Order not found',
                    data: [{
                        location: 'params',
                        param: 'orderId',
                        msg: 'Order id must be an integer',
                        value: '" "'
                    }]
                });
                done(err);
            });
    });

    // test for updating the status of an order
    it('should update an order', (done) => {
        const updateOrder = {
            orderStatus: 'Pending',
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
            orderStatus: 'Pending',
        };
        chai.request(server)
            .put('/api/v1/orders/40')
            .send(updateOrder)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.eql({
                    status: 'failure',
                    message: 'Order not found'
                });
                done(err);
            });
    });

    // test for updating the status of an order with a string id
    it('should throw an error when tryin to update a string order id', (done) => {
        const updateOrder = {
            orderStatus: 'Pending',
        };
        chai.request(server)
            .put('/api/v1/orders/u')
            .send(updateOrder)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.status).to.be.eql('Failure');
                expect(res.body.message).to.be.eql('Validation not sucessful');
                expect(res.body.data[0].msg).to.be.eql('Order id must be an integer');
                done(err);
            });
    });

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