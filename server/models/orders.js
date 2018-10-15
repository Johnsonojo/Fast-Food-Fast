const orderSeed = `
INSERT INTO orders(
  user_id,
  foodName,
  foodPrice,
  qty,
  totalAmount,
  phone,
  address)
VALUES (1, 'yamarita', 900, 3, 2700,'2348188699278','234 Ikorodu road Anthony');
INSERT INTO orders(
  user_id,
  foodName,
  foodPrice,
  qty,
  totalAmount,
  orderStatus,
  phone,
  address)
VALUES (2, 'chicken and chips', 800, 2, 1600, 'Processing','2348188699277','234 Ikorodu road Anthony');
INSERT INTO orders(
  user_id,
  foodName,
  foodPrice,
  qty,
  totalAmount,
  orderStatus,
  phone,
  address)
VALUES (3, 'meat pie', 200, 4, 800,'Complete','2348188699277','234 Ikorodu road Anthony');
INSERT INTO orders(
  user_id,
  foodName,
  foodPrice,
  qty,
  totalAmount,
  orderStatus,
  phone,
  address)
VALUES (4, 'beef shawarma', 900, 2, 1800,'Cancelled','2348188699277','234 Ikorodu road Anthony');`;


export default orderSeed;