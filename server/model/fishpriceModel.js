import mongoose from "mongoose";

const fishPriceSchema =new mongoose.Schema({

    name:{
        type:String,
        required:true

    },
    species:{
        type:String,
        required:true

    },
    grade:{
        type:String,
        required:true

    },
    wolesale_price:{
        type:String,
        required:true

    },
    retail_price:{
        type:String,
        required:true

    },
    average_weight:{
        type:String,
        required:true

    },
    availability:{
        type:String,
        required:true

    }
    




})

export default mongoose.model("FishPrice",fishPriceSchema);