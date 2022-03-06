import mongoose from "mongoose"; 
const Schema = mongoose.Schema;
const productScema = new Schema ({
    ProductsName:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required: true
    },
    quantiy:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
} ,{timestamps:true});
export default mongoose.model('Product',productScema)  

