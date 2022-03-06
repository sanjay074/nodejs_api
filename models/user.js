import mongoose from "mongoose"; 
const Schema = mongoose.Schema;
const userScema = new Schema ({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: { 
        type: String,
         default: 'customer' 
        },
} ,{timestamps:true});
export default mongoose.model('User' ,userScema)  

