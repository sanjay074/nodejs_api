import Joi from "joi";
import CustomErrorHandler from '../services/CustomErrorHandler';
import { Product } from '../models';
const productController ={
 async uploadProduct(req,res,next){
       // validation 
  const registerSchema = Joi.object({
    ProductsName:Joi.string().min(3).max(30).required(),
    description:Joi.string().min(10).max(50).required(),
    quantiy:Joi.number().required(),
    price:Joi.number().required()
  
  });
  const {error} =registerSchema.validate(req.body);
  if(error){
    return next (error);
  }
   //  check if user is in the dattabase already 
   try{
    const exist = await Product.exists({ProductsName:req.body.ProductsName});
    if(exist){
        return next(CustomErrorHandler.alreadyExist('Product is already taken'))
    }

}catch(err) {
    return next(err);
}  
const {ProductsName,description ,quantiy,price} = req.body;
// prepare the model

const user = new Product({
 ProductsName,
 description,
 quantiy,
 price
}) 
try {
    const result = await user.save();
    console.log(result);
    res.json(result);
} catch(err) {
    return next(err);
}
    },
    //productlist
 async  productlist(req,res,next){
        let documents;
        try{
            documents = await Product.find();
            console.log(documents)
        }catch(err){
            return next(CustomErrorHandler.serverError());
        }
        return res.json(documents);
    }
} 

export default productController;