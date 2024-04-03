const express=require("express")

const categoryRouter=express.Router()
let mongodb=require("mongodb").MongoClient;
var url = 'mongodb://localhost/27017';
//const categories=[
  // {
  //   "id":1,
  //   "name":"Electronics",
  //   "description":"here you get all kind of electronic products",
  //   "img":"/images/electronics.jpeg"

  // },
  // {
  //   "id":2,
  //   "name":"Clothes",
  //   "description":"here you get all kind of clothing products",
  //   "img":"/images/clothes.webp"
  

  // },
  // {
  //   "id":3,
  //   "name":"Kitchen Utentials",
  //   "description":"here you get all kind of kitchen utentials products",
  //   "img":"/images/ktichenutentials.jpg"

  // },
  // {
  //   "id":4,
  //   "name":"Shoes",
  //   "description":"here you get all kind of footwears",
  //   "img":"/images/shoes.jpg"

  // }
//]

categoryRouter.route("/").get((req,res)=>{
  mongodb.connect(url,function(err,dc){
    if(err){
      res.status(500),send('error in mongodb connection'+err)
    }else{
        let dbObj=dc.db('ecommerce');
        dbObj.collection('categories').find().toArray(function(err,categories){
          if(err){
            res.status(500).send("error in fetching categories")
          }
          else{
            res.render('category',{data:categories});
          }
        })
      }
    
  })


  categoryRouter.route("/details").get((req,res)=>{

    res.send(`<h1> details</h1>`)
  })
})
module.exports=categoryRouter
