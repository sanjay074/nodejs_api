import Joi from "joi";
import {User} from '../../models';
import CustomErrorHandler from "../../services/CustomErrorHandler";
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService';
const loginController = {
 async   login(req ,res ,next){
    const loginSchema = Joi.object({
        username:Joi.string().min(3).max(30).required(),
        password:Joi.string().required()
      
      });
      const {error} =loginSchema.validate(req.body);
      if(error){
        return next (error);
      }
        try{
             const user =await User.findOne({username:req.body.username});
             if(!user){
                 return next(CustomErrorHandler.wrongCredentials());
             }
             console.log(user);
             
        // compare the password
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return next(CustomErrorHandler.wrongCredentials());
        }
         // Toekn
         const access_token = JwtService.sign({ _id: user._id, role: user.role });
        res.json({access_token})

        }catch(err){

        }

    }
} 

export default loginController