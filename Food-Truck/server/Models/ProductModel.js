const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const  productSchema= new mongoose.Schema({
    shopname:String,email:String,shopmobilenumber:Number,shopaddress:String,starttime:String,endtime:String,role:String,image:String
})


const ProductModel=mongoose.model("Products",productSchema)
module.exports=ProductModel