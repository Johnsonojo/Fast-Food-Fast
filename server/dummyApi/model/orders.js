const orders = [{
    orderId: 1,
    userId: 1,
    foodItem: [{
        foodName: 'Yamarita',
        foodPrice: 900.00,
        qty: 3,
    }],
    totalAmount: 2700.00,
    orderStatus: 'Completed',
    deliveryAddress: '235, Ikorodu road Anthony',
    orderDate: '24/09/2018, 3:13pm',
}, {
    orderId: 2,
    userId: 2,
    foodItem: [{
        foodName: 'Chicken Shawarma',
        foodPrice: 700.00,
        qty: 1,
    }],
    totalAmount: 700.00,
    orderStatus: 'Pending',
    deliveryAddress: '234, Ikorodu road Anthony',
    orderDate: '24/09/2018, 3:30pm',
}, {
    orderId: 3,
    userId: 3,
    foodItem: [{
        foodName: 'Beef Hambuger',
        foodPrice: 800.00,
        qty: 3,
    }],
    totalAmount: 2400.00,
    orderStatus: 'Completed',
    deliveryAddress: '236, Ikorodu road Anthony',
    orderDate: '24/09/2018, 3:45pm',
}];

export default orders;