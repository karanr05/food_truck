const { SignUp, VendorSignUp, Login, Forgot, Reset, ProductRegister,ProductFullDetails,ProductUpdate, ProductDelete, vendorUpdate, userUpdate, getUserAndVendorDtails, getProductsDetails,} = require('../Controllers/AuthuController');
const { userDetails, vendorDetails, vendorProductsDetails, VendorDelete, userDelete, adminVendorProductDelete, userLoginDetails, vendorLoginDetails } = require('../Controllers/admin');
const { userVerification, vendorVerification, adminVerification } = require('../Middlewares/AuthMiddleware');

const router = require('express').Router()
const multer =require('multer')
const path =require('path')

const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'Assets/images')
        },
        filename:(req,file,cb)=>{
            cb(null,file.fieldname+"_"+ Date.now()+ path.extname(file.originalname))
        }
    })
    const upload= multer({
        storage:storage
    })

router.post('/userRegister', SignUp);
router.post('/vendorregister', VendorSignUp);
router.post("/productregister",upload.single('file'),ProductRegister)
router.post('/login', Login);
router.post('/', userVerification);
router.post("/vendordetails",vendorVerification)
router.post('/forgotpassword',Forgot);
router.post('/resetpassword/:id/:token',Reset)
router.put("/productupdate/:id",upload.single('file'),ProductUpdate)
router.delete("/vendorproductdelete/:id",ProductDelete)
router.get("/ProductFullDetails/:id/:token",ProductFullDetails)
router.post("/adminhome",adminVerification)
router.post('/adminhome', adminVerification);
router.get('/admin/userdetails', userDetails);
router.get('/admin/vendordetails', vendorDetails);
router.get('/admin/vendorproductdetails', vendorProductsDetails);
router.delete('/vendor/delete/:id', VendorDelete)
router.delete('/admin/vendorproductdelete/:id', adminVendorProductDelete)
router.put('/user/update/:id', userUpdate)
router.delete('/user/delete/:id', userDelete)
router.put('/vendor/update/:id', vendorUpdate)
router.get('/login/userdata',userLoginDetails)
router.get('/login/vendordata',vendorLoginDetails)
router.get('/getproductdetails/:id', getProductsDetails);
router.get('/getuser/vendor/details/:id', getUserAndVendorDtails)
module.exports = router; 