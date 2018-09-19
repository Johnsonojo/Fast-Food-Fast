import chaiHttp from 'chai-http';
import chai from 'chai';
import server from '../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('Order Controller', () => {
    // const foodItems = [];
    // const addFood = {
    //     foodName: 'Yamarita',
    //     foodPrice: 900.00,
    //     qty: 3,
    // };
    // const totalAmount = qty * foodPrice;
    // foodItems.push(addFood);

    // const userId = userDb.length + 1; 
    const newOrder = {
        foodName: 'Meat Pie',
        foodPrice: '250',
        qty: '9',
        orderStatus: 'kjhg',
        deliveryAddress: '29, Ikorodu road Lagos'
            // totalAmount,
    };

    // test for posting an order
    it('should create a new order', (done) => {
        chai.request(server)
            .post('/api/v1/orders')
            .send(newOrder)
            .end((err, res) => {
                console.log(res.body);
                expect(res.status).to.equal(201);
                expect(res.body.status).to.equal('success');
                expect(res.body.message).to.equal('New order was created');

                // expect(res.body.data.orderId).to.be.eql(newOrder.orderId);
                // expect(res.body.data.userId).to.be.eql(newOrder.userId);
                // expect(res.body.data).to.be.eql(newOrder.foodItems[0].foodName);
                // expect(res.body.data[0].foodPrice).to.be.eql(newOrder.foodItems[0].foodPrice);
                // expect(res.body.data[0].qty).to.be.eql(newOrder.foodItems[0].qty);
                // expect(res.body.data.totalAmount).to.be.eql(newOrder.totalAmount);
                // expect(res.body.data.orderStatus).to.be.eql(newOrder.orderStatus);
                // expect(res.body.data.deliveryAddress).to.be.eql(newOrder.deliveryAddress);
                // expect(res.body.data.orderDate).to.be.eql(newOrder.orderDate);
                done(err);
            });
    });
    //         {
    //     status: 'success',
    //     message: 'New order was created',
    //     data: {
    //         orderId: 4,
    //         userId: 4,
    //         foodItems: [
    //             [Object]
    //         ],
    //         orderStatus: 'kjhg',
    //         totalAmount: 2250,
    //         deliveryAddress: '29, Ikorodu road Lagos',
    //         orderDate: '2018-09-19T19:03:01.988Z'
    //     }
    // }

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
                console.log(res.body);
                const {
                    foodName,
                    foodPrice,
                    qty,
                    orderStatus,
                    deliveryAddress,
                    orderDate,
                } = newOrder;
                expect(res.status).to.equal(200);
                // expect(res.body.data.orderId).to.be.eql(orderId);
                // expect(res.body.data.userId).to.be.eql(userId);
                // expect(res.body.data.foodItems[0].foodName).to.be.eql(foodItems[0].foodName);
                // expect(res.body.data.foodItems[0].foodPrice).to.be.eql(foodItems[0].foodPrice);
                // expect(res.body.data.foodItems[0].qty).to.be.eql(foodItems[0].qty);
                // expect(res.body.data.totalAmount).to.be.eql(totalAmount);
                // expect(res.body.data.orderStatus).to.be.eql(orderStatus);
                // expect(res.body.data.deliveryAddress).to.be.eql(deliveryAddress);
                // expect(res.body.data.orderDate).to.be.eql(orderDate);
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
    it('should throw an error when trying to update a string order id', (done) => {
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
                expect(res.body.message).to.be.eql('Validation not sucessful');
                expect(res.body.data[0].msg).to.be.eql('Order status must be a string');
                done(err);
            });
    });
});