import mongoose from 'mongoose';
import {Product} from "../models/Product";


const productSchema = new mongoose.Schema({

    name : {type : String, required: true, unique : true },
    image : { type : String, required: true },
    price : { type : String, required: true },
    qty : { type : String, required: true },
    info : { type : String, required: true }
}, {timestamps : true}); /*>This last line create automatilly : created_at, updated_at*/

const ProductTable:mongoose.Model<Product>  = mongoose.model('product', productSchema);

export default ProductTable;