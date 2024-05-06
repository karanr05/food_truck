const mongoose = require('mongoose')
const bcrypt=require('bcrypt')

const VendorSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:Number,
    role:String,
    
  })
  VendorSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });

const Vendormodel= mongoose.model('vendorData',VendorSchema, "usersData")


module.exports=Vendormodel