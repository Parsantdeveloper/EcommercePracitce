const express=require("express")

const productRouter=express.Router()
 
let mongodb = require('mongodb').MongoClient;

var url = 'mongodb://localhost/27017';

productRouter.route("/").get((req,res)=>{
  mongodb.connect(url,function(err,dc){
    if(err){
      res.status(500),send('error in connection of mongodb'+err)
    }else{
      let dbObj=dc.db('ecommerce');
      dbObj.collection('products').find().toArray(function(err,products){
        if(err){
          res.status(500).send("error in fetching products")
        }else{
          res.render('products',{data:products})
        }
      })
    }
  })
  })
 
  productRouter.route('/category/:id').get((req,res)=>{
    let id=req.params.id;
  
    mongodb.connect(url,function(err,dc){
      if(err){
        res.status(500),send('error in connection of mongodb'+err)
      }else{
        let dbObj=dc.db('ecommerce');
        dbObj.collection('products').find({id:Number(id)}).toArray(function(err,products){
          if(err){
            res.status(500).send("error in fetching products")
          }else{
            res.render('products',{data:products})
          }
        })
      }
    })
  })
  productRouter.route("/details/:title").get((req,res)=>{
   let {title}=req.params;

   mongodb.connect(url,function(err,dc){
    if(err){
      res.status(500),send('error in connection of mongodb'+err)
    }else{
      let dbObj=dc.db('ecommerce');
      dbObj.collection('products').find({title}).toArray(function(err,productDetails){
        if(err){
          res.status(500).send("error in fetching products")
        }else{
          res.render('productDetails',{data:productDetails})
        }
      })
    }
  })
})

    
  

module.exports=productRouter

