import express from "express";
import {Product} from "../database/models/Product";
import ProductTable from "../database/schemas/ProductSchema";

//business logic

export const createProduct = async (request:express.Request, response:express.Response) => {

    //Gestion des exceptions
    try {
        //Recuperation des données dans la request
        let product:Product = {
            name : request.body.name,
            image : request.body.image,
            price :  request.body.price,
            qty : request.body.qty,
            info : request.body.info,
        };
        //Verify if data already exist in the database
        let existingProduct:Product|null = await ProductTable.findOne({ name: product.name});
        if(existingProduct){
            return response.status(401).json({
                msg: 'Product is already exist'
            });
        }

        //Create the product into database
        let newProduct = new ProductTable(product);
        product = await newProduct.save();
        response.status(200).json({
            msg: 'Product is created successfully',
            product:product
        });

    } catch (error){
        console.log(error);
        response.status(500).json({
            error : error
        });
    };
}

export const updateProduct = async(request:express.Request, response:express.Response) => {

    //Get id into request params
    let {productId} = request.params

    //Management Exception
    try {
        let updatedProduct:Product = {
            name : request.body.name,
            image : request.body.image,
            price :  request.body.price,
            qty : request.body.qty,
            info : request.body.info,
        };

        //Check if product is already exist into database
        let existingProductwillUpdated:Product|null = await ProductTable.findById(productId);
        if(!existingProductwillUpdated){
            return response.status(404).json({
                msg : 'Product is not exists'
            });
        }

        //update product
        existingProductwillUpdated = await ProductTable.findByIdAndUpdate(productId, {
            $set : {
                name : updatedProduct.name ? updatedProduct.name : existingProductwillUpdated.name,
                image : updatedProduct.image ? updatedProduct.image : existingProductwillUpdated.image,
                price :  updatedProduct.price ? updatedProduct.price : existingProductwillUpdated.price,
                qty : updatedProduct.qty ? updatedProduct.qty : existingProductwillUpdated.qty,
                info : updatedProduct.info ? updatedProduct.info : existingProductwillUpdated.info,
            }
        }, { new : true });

        response.status(201).json({
            msg: 'Product is Updated',
            product: existingProductwillUpdated
        });

    } catch (error) {
        console.log(error);
        // @ts-ignore
        if(error.kind === 'ObjectId'){
            return response.status(404).json({
                msg : 'Product is not exists'
            });
        }
        response.status(500).json({
            error : error
        });
    }

    response.status(200).json({
        msg : 'Updated a Product',
        productId : productId
    });
}

export const deleteProduct = async(request:express.Request, response:express.Response) => {

    let {productId} = request.params;
    try {
        let product:Product|null = await ProductTable.findById(productId);
        if(!product){
            return response.status(404).json({
                msg : 'Product is not found !'
            });
        }

        product= await ProductTable.findByIdAndRemove(productId);

        response.status(200).json({
            msg: `Product ${productId} is deleted`,
            product:product
        })
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error
        })
    }
    response.status(200).json({
        msg : 'got a single Product',
        productId : productId
    });
}

export const getProducts = async(request:express.Request, response:express.Response) => {

    try {
        let products:Product[]|null = await ProductTable.find();
        response.status(200).json({
            products : products
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error : error
        })
    }

}

export const getProduct = async(request:express.Request, response:express.Response) => {

    let {productId} = request.params;
    try {
        let product:Product|null = await ProductTable.findById(productId);
        if(!product){
            return response.status(404).json({
                msg : 'Product is not found !'
            });
        }

        response.status(200).json({
            product:product
        })
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error
        })
    }
    response.status(200).json({
        msg : 'got a single Product',
        productId : productId
    });
};

