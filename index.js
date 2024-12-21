const express= require("express");
const cors = require("cors")
require('./db/config');
const User = require("./db/User");
const NewProduct = require("./db/NewProduct")
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req,resp)=>{
   let user= new User(req.body);
   let result = await user.save();
   result = result.toObject();
   delete result.password;
   resp.send(result);
});

app.post("/login", async (req, resp) => {
  if(req.body.password && req.body.email){
    let user = await User.findOne(req.body).select("-password");
  if(user){
       resp.send(user)
    }else{
      resp.send({result:"No User Found"})
    }
    }else{
      resp.send({result:"No User Found"})
    }
});

app.post("/add-product", async (req, resp) => {
  let product = new NewProduct(req.body);
  let result = await product.save();
  resp.send(result)

});

app.get("/products",async (req,resp)=>{
   let products = await NewProduct.find();
   if(products.length>0){
    resp.send(products)
   }else{
    resp.send({result:"No Products found"})
   }
});

app.delete("/product/:id",async(req, resp)=>{
  const result = await NewProduct.deleteOne({_id:req.params.id})
  resp.send(result);
});

app.get("/product/:id", async(req,resp)=>{
  let result = await NewProduct.findOne({_id:req.params.id}); 
  if(result){
    resp.send(result)
  }else{
    resp.send({result:"No Record Fount."})
  }
});

app.put("/product/:id",async(req,resp)=>{
  let result = await NewProduct.updateOne(
    {_id: req.params.id},
    {$set : req.body}
  ) 
  resp.send(result)
});

app.get("/search/:key", async (req, resp)=>{
  let result = await NewProduct.find({
   "$or":[
       { name: { $regex:req.params.key } },
       { company: { $regex:req.params.key } },
       { category: { $regex:req.params.key } }
      ]
  });
  resp.send(result)
})

app.listen(5000);