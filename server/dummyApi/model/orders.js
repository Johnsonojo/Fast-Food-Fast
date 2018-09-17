const orders = [{
    orderId: 1,
    userId: 1,
    foodItems: [{
        foodId: 1,
        foodName: 'Yamarita',
        foodPrice: 900.00,
        qty: 3,
    }, {
        foodId: 2,
        foodName: 'Meat Pie',
        foodPrice: 200.00,
        qty: 3,
    }],
    totalAmount: 3300.00,
    status: 'Completed',
    deliveryAddress: '235, Ikorodu road Anthony',
    orderDate: '24/09/2018, 3:13pm',
}, {
    orderId: 2,
    userId: 2,
    foodItems: [{
        foodId: 3,
        foodName: 'Chicken Shawarma',
        foodPrice: 700.00,
        qty: 1,
    }, {
        foodId: 4,
        foodName: 'Jollof Rice',
        foodPrice: 900.00,
        qty: 1,
    }],
    totalAmount: 1600.00,
    status: 'Pending',
    deliveryAddress: '234, Ikorodu road Anthony',
    orderDate: '24/09/2018, 3:30pm',
}, {
    orderId: 3,
    userId: 3,
    foodItems: [{
        foodId: 5,
        foodName: 'Beef Hambuger',
        foodPrice: 800.00,
        qty: 3,
    }, {
        foodId: 6,
        foodName: 'Fried Rice',
        foodPrice: 1200.00,
        qty: 1,
    }],
    totalAmount: 3600.00,
    status: 'Completed',
    deliveryAddress: '236, Ikorodu road Anthony',
    orderDate: '24/09/2018, 3:45pm',
}];

export default orders;