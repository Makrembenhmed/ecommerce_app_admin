const { Schema, model } = require("mongoose");

const productschema=new Schema({

    title:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:String, required:true},
    images:[{type:String}]
})
export const Product =model.Product || model('Product',productschema)