const user = {
    signUpDetails: {
        username: 'johnson',
        email: 'order@gmail.com',
        password: 'jhgfddajj2',
        confirmPassword: 'jhgfddajj2',
        deliveryAddress: '235, Ikorodu road',
        phone: '234808766545'
    },
    signUpNoEmail: {
        username: 'johnson',
        email: 'jhgfdghjklk',
        password: 'jhgfddajj2',
        confirmPassword: 'jhgfddajj2',
        deliveryAddress: '235, Ikorodu road',
        phone: '234808766545'
    },
    signUpNoName: {
        username: '',
        email: 'jame89@gmail.com',
        password: 'jhgfddajj2',
        confirmPassword: 'jhgfddajj2',
        deliveryAddress: '235, Ikorodu road',
        phone: '234808766545'
    },
    existingUser: {
        email: 'order@gmail.com',
        password: 'jhgfddajj2',
    },
    wrongUser: {
        email: 'order@gmail.com',
        password: '',
    },
    invalidPwd: {
        email: 'order@gmail.com',
        password: 'jhggfgghjk4',
    },
    notAUser: {
        email: 'ordr@gmail.com',
        password: 'oiuyttfkyedr4',
    }
};

export default user;