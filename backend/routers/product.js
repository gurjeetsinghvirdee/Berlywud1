const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const data = require('../data.js')
const Product =require('../models/product.js')
const restAuth = require('../utils').restAuth
const isAdmin = require('../utils').isAdmin

const productRouter = express.Router()

productRouter.get('/',expressAsyncHandler(async(req,res)=>{
    const products = await Product.find({})
    res.send(products)
}))

productRouter.get('/seed',expressAsyncHandler(async(req,res)=>{
    // await Product.remove({})
    const createdProducts = await Product.insertMany(data.products)
    res.send({createdProducts})
}))

productRouter.get('/:id',expressAsyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message:"Product Not Found"})
    }
}))

productRouter.post('/',restAuth,isAdmin,expressAsyncHandler(async (req, res) => {
    const product = new Product({
      brand: 'Brand has to be changed ',
      title: 'Title has to be changed',
      description: 'Description has to be changed',
      origprice: 1999 ,
      gender: 'unisex',
      launch: 2010,
      concentration: 'Eau De Parfum',
      stockcount: 100,
      url: 'https://raw.githubusercontent.com/mannywebdev/perfumesite/main/PerfumePics/giorgio%20armani%20code%20absolu.jpg',
      rating: 4.5,
      review: 6,
      decantprice: {
          "2ml": 150,
          "5ml": 250,
          "10ml": 550,
          "30ml": 1050,
          "Retail": 3500,
      },
      notes: {
          Topnotes:["Apple","Green Mandarin"],
          Middlenotes:["Orange Blossom","Nutmeg","Carrot Seeds"],
          Basenotes:["Suede","Tonka Bean","Vanilla"]
      }
    });
    
    const createdProduct = await product.save();
    res.send({ message: 'Product Created', product: createdProduct });
  })
);

productRouter.put('/:id',restAuth,isAdmin,expressAsyncHandler(async (req, res) => {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        res.send({ message: 'Product Updated', product: updatedProduct });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    })
  );

module.exports = productRouter