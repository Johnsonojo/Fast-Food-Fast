const cartSeed = `
INSERT INTO cart(foodName,foodPrice,qty,user_id,order_id)
VALUES ('yamarita', 900, 3, 2, 1);
INSERT INTO cart(foodName,foodPrice,qty,user_id,order_id)
VALUES ('meat pie', 300, 5, 2, 1);
INSERT INTO cart(foodName,foodPrice,qty,user_id,order_id)
VALUES ('beef shawarma', 800, 5, 3, 1);
INSERT INTO cart(foodName,foodPrice,qty,user_id,order_id)
VALUES ('jollof rice', 1200, 5, 1, 1);`;

export default cartSeed;