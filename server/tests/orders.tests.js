import chaiHttp from 'chai-http';
import chai from 'chai';
import server from '../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('Order Controller', () => {
    it('should create a new order', (done) => {
        const newOrder = {
            orderId: 4,
            userId: 5,
            foodItems: [{
                foodName: 'Yamarita',
                foodPrice: 900.00,
                qty: 3,
            }],
            totalAmount: 2700.00,
            orderStatus: 'Completed',
            deliveryAddress: '286, Ikorodu road Palmgrove',
            orderDate: '24/09/2018, 3:10pm',
        };
        chai.request(server)
            .post('/api/v1/orders')
            .send(newOrder)
            .end((err, res) => {
                console.log(res.body);
                expect(res.status).to.equal(201);
                expect(res.body.data.orderId).to.be.eql(newOrder.orderId);
                expect(res.body.data.userId).to.be.eql(newOrder.userId);
                expect(res.body.data.foodItems.foodName).to.be.eql(newOrder.foodItems.foodName);
                // expect(res.body.data.foodItems[foodName]).to.be.eql(newOrder.foodItems[foodName]);
                // expect(res.body.data.foodItems[foodPrice]).to.be.eql(newOrder.foodItems[foodPrice]);
                // expect(res.body.data.foodItems[qty]).to.be.eql(newOrder.foodItems[qty]);
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
                console.log(res.body);
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
            .get('/api/v1/orders/3')
            .end((err, res) => {
                console.log(res.body);
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
                expect(res.body.data.foodItems).to.be.eql(foodItems);
                // expect(res.body.data.foodItems[foodName]).to.be.eql(newOrder.foodItems[foodName]);
                // expect(res.body.data.foodItems[foodPrice]).to.be.eql(newOrder.foodItems[foodPrice]);
                // expect(res.body.data.foodItems[qty]).to.be.eql(newOrder.foodItems[qty]);
                expect(res.body.data.totalAmount).to.be.eql(totalAmount);
                expect(res.body.data.orderStatus).to.be.eql(orderStatus);
                expect(res.body.data.deliveryAddress).to.be.eql(deliveryAddress);
                expect(res.body.data.orderDate).to.be.eql(orderDate);
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
                console.log(res.body);
                expect(res.status).to.equal(200);
                expect(res.body.data.orderStatus).to.be.eql(updateOrder.orderStatus);
                done(err);
            });
    });
});