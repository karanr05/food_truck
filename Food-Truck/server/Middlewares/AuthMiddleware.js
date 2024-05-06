const ProductModel = require('../Models/ProductModel')
const UserModel=require('../Models/UserMoldel')
const jwt =require('jsonwebtoken')


module.exports.userVerification=(req,res,next)=>{
  
    const token=req.cookies.token 
    if(!token){
        res.json({ status: false })
    }
    jwt.verify(token,'jwt_secret_key',async(err,data)=>{
        if (err) {
            return res.json({ status: false })
           } else {
             const user = await UserModel.findById(data.id)
             const vendorProduct = await ProductModel.find({})
             if (user) return res.json({ status: true, user,vendorProduct})
             else return res.json({ status: false })
           }
         })
  

}


module.exports.vendorVerification=(req,res,next)=>{
  
  const token=req.cookies.token 
  if(!token){
      res.json({ status: false })
  }
  jwt.verify(token,'jwt_secret_key',async(err,data)=>{
      if (err) {
          return res.json({ status: false })
         } else {
           const vendor = await UserModel.findById(data.id)
           const vendorProduct= await ProductModel.find({email:vendor.email}) 
           if (vendor) 
           {
            return res.json({ status: true,vendor, vendorProduct})}
           else {
            return res.json({ status: false })}
         }
       })


}
module.exports.adminVerification=(req,res,next)=>{
  
  const token=req.cookies.token 
  if(!token){
      res.json({ status: false })
  }
  jwt.verify(token,'jwt_secret_key',async(err,data)=>{
      if (err) {
          return res.json({ status: false })
         } else {
           const user = await UserModel.findById(data.id)
           if (user) return res.json({ status: true, user})
           else return res.json({ status: false })
         }
       })


}
