const orderSeed = `
INSERT INTO orders(
  user_id,
  foodname,
  foodprice,
  qty,
  totalamount)
VALUES (1, 'yamarita', 900, 3, 2700);
INSERT INTO orders(
  user_id,
  foodname,
  foodprice,
  qty,
  totalamount,
  orderstatus)
VALUES (2, 'chicken and chips', 800, 2, 1600, 'Processing');
INSERT INTO orders(
  user_id,
  foodname,
  foodprice,
  qty,
  totalamount,
  orderstatus)
VALUES (3, 'meat pie', 200, 4, 800,'Complete');
INSERT INTO orders(
  user_id,
  foodname,
  foodprice,
  qty,
  totalamount,
  orderstatus)
VALUES (4, 'beef shawarma', 900, 2, 1800,'Cancelled');`;

export default orderSeed;