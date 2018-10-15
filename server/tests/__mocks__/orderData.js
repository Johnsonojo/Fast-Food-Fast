const order = {
    completeOrder: {
        foodName: 'Beef Burger',
        foodPrice: 200,
        qty: 5,
        address: '234 Ikorodu road Anthony',
        phone: '2348188699278'
    },
    noFoodName: {
        foodName: '',
        foodPrice: 200,
        qty: 5,
        address: '234 Ikorodu road Anthony',
        phone: '2348188699278'
    },
    noFoodPrice: {
        foodName: 'Beef Burger',
        foodPrice: '',
        qty: 5,
        address: '234 Ikorodu road Anthony',
        phone: '2348188699278'
    },
    noQty: {
        foodName: 'fish pie',
        foodPrice: 300,
        qty: '',
        address: '234 Ikorodu road Anthony',
        phone: '2348188699278'
    },
    noAddress: {
        foodName: 'Beef Burger',
        foodPrice: 200,
        qty: 5,
        address: '',
        phone: '2348188699278'
    },
    noPhone: {
        foodName: 'Beef Burger',
        foodPrice: 200,
        qty: 5,
        address: '',
        phone: ''
    }
};

export default order;