const orderSeed = `
INSERT INTO orders(
  user_id,
  foodName,
  foodPrice,
  qty,
  totalAmount,
  phone,
  address)
VALUES (1, 'Yamarita', 900, 3, 2700,'2348188699277','234 Ikorodu road Anthony');
INSERT INTO orders(
  user_id,
  foodName,
  foodPrice,
  qty,
  totalAmount,
  orderStatus,
  phone,
  address)
VALUES (2, 'Chicken and Chips', 800, 2, 1600, 'Processing','2348188699278','235 Ikorodu road Anthony');
INSERT INTO orders(
  user_id,
  foodName,
  foodPrice,
  qty,
  totalAmount,
  orderStatus,
  phone,
  address)
VALUES (3, 'Meat Pie', 200, 4, 800,'Complete','2348188699279','236 Ikorodu road Anthony');
INSERT INTO orders(
  user_id,
  foodName,
  foodPrice,
  qty,
  totalAmount,
  orderStatus,
  phone,
  address)
VALUES (4, 'Beef Shawarma', 900, 2, 1800,'Cancelled','2348188699280','237 Ikorodu road Anthony');`;


export default orderSeed;