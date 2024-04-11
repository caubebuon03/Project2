export default class queryContants {
    static getAllOrderByUser = 'SELECT * FROM orders WHERE userId = $1'
    static getOrderByUser = 'SELECT * FROM orders WHERE userId = $1 AND status = $2'
    static insertOrder = 'INSERT INTO orders (userId, status) VALUES($1, $2) RETURNING *'
    static deleteOrderProduct = 'DELETE FROM order_product WHERE order_id = $1 AND product_id = $2'
    static insertOrderProduct = 'INSERT INTO order_product (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *'

    static getAllUsers = 'SELECT * FROM users'
    static getUserByID = 'SELECT * FROM users WHERE id = $1'
    static insertUser = 'INSERT INTO USERS (FIRSTNAME, LASTNAME, PASSWORD, USERNAME) VALUES($1, $2, $3, $4) RETURNING *'

    static getAllProducts = 'SELECT * FROM products'
    static getProductByID = 'SELECT * FROM products WHERE PRODUCT_ID = $1'
    static insertProduct = 'INSERT INTO products (PRODUCT_NAME, PRODUCT_PRICE) VALUES($1, $2) RETURNING *'
    static deleteProduct = 'DELETE FROM products WHERE PRODUCT_ID = $1'
}


