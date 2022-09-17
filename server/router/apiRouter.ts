import express from 'express';
import {createProduct, deleteProduct, getProduct, getProducts, updateProduct} from "../controller/productController";

const apiRouter:express.Router = express.Router();

/*
    Usage: Create a product
    URL : http://127.0.0.1:3000/api/v1/products
    Method : POST
    Fields: name, image, price, qty, info
    Access: Public
 */
apiRouter.post('/products', createProduct);

/*
    Usage: Update a Product
    URL : http://127.0.0.1:3000/api/v1/products/:productId
    Method : PUT
    Fields: name, image, price, qty, info
    Access: Public
 */
apiRouter.put('/products/:productId', updateProduct);

/*
    Usage: Delete a Product
    URL : http://127.0.0.1:3000/api/v1/products/:productId
    Method : DELETE
    Fields: name, image, price, qty, info
    Access: Public
 */
apiRouter.delete('/products/:productId', deleteProduct);

/*
    Usage: Get all the product
    URL : http://127.0.0.1:3000/api/v1/products/
    Method : GET
    Fields: name, image, price, qty, info
    Access: Public
 */
apiRouter.get('/products', getProducts);

/*
    Usage: Get a Single product
    URL : http://127.0.0.1:3000/api/v1/products/:productId
    Method : GET
    Fields: name, image, price, qty, info
    Access: Public
 */

apiRouter.get('/products/:productId', getProduct);

export default apiRouter;