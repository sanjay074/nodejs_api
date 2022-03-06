import Joi from "joi";
import CustomErrorHandler from '../../services/CustomErrorHandler';
import {User} from '../../models';
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService';
const registerController ={
 async   register(req,res,next){
  // validation 
  const registerSchema = Joi.object({
    firstName:Joi.string().min(3).max(30).required(),
    lastName:Joi.string().min(3).max(30).required(),
    username:Joi.string().min(3).max(30).required(),
    password:Joi.string().required()
  
  });
  const {error} =registerSchema.validate(req.body);
  if(error){
    return next (error);
  }
   //  check if user is in the dattabase already 
   try{
       const exist = await User.exists({username:req.body.username});
       if(exist){
           return next(CustomErrorHandler.alreadyExist('Usename is already taken'))
       }

   }catch(err) {
       return next(err);
   }      
     // Hash  password  
     const { firstName ,lastName ,username,password } = req.body;
     const hashedPassword = await bcrypt.hash(password ,10);
     // prepare the model
    
     const user = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword
     }) 
     
      
    let access_token;
    try {
        const result = await user.save();
        console.log(result);
         
        // Token
        access_token = JwtService.sign({ _id: user._id, role: user.role });
      
    } catch(err) {
        return next(err);
    }

        res.json({ access_token});
     
      
  
    }
}  

export default registerController ;