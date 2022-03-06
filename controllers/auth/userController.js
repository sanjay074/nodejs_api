import { User } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";

const userController = {
    async userlist(req, res, next) {
        let documents;
        try {
        documents = await User.find();
       }catch(err){
        return next(CustomErrorHandler.serverError());
       }
       return res.json(documents);
    } ,
    async userdetails(req, res, next) {
        try {
            const user = await User.findById(req.params._id).select('-password -updatedAt -__v');
            console.log(user)
            if (!user) {
                return next(CustomErrorHandler.notFound());
            }
            res.json(user);
        } catch (err) {
            return next(err);
        }
    },
    
}



export default userController;