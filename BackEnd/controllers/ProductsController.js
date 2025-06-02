const express=require("express")
const router= express.Router()
const db_query=require("../dbquery")
const jwt= require("jsonwebtoken")
const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/productImages/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const Imageuploads= multer({storage:storage});
function GetUserId(jwtToken){
    
    const decoded= jwt.verify(jwtToken,"Practical")
    const userId= decoded.userId
    return userId;
}
router.route("/add").post(Imageuploads.single('Product_Image'),async(req,res)=>{
    
    try{
       const userId= GetUserId(req.header("Authorization"))
        const{Product_Name,Product_Description,Category,Product_Price,Product_Quantity,Status}=req.body

        if(!Product_Name||!req.file||!Product_Description||!Category||!Product_Price||!Product_Quantity||!Status){
            return res.json({ msg: "All fields are required",status:400 });
       }

       const data={
        userId:userId,
        Product_Name:Product_Name,
        Product_Image:`/productImages/${req.file.filename}`,
        Product_Description:Product_Description,
        Category:Category,
        Product_Price:Product_Price,
        Product_Quantity:Product_Quantity,
        Status:Status
       }
       
      
            const result= await db_query("insert into products set ?",data)
            if(result){
                res.json({msg:"Product added succesfully..",status:200})
            
       }

    }catch(error){
        res.status(500).json({ msg: "Server error" });
    }
});
router.route("/getProduct/:pid").get(async(req,res)=>{
    try{
        const userId=GetUserId(req.header("Authorization"));
        const pid= req.params.pid;
        const getProduct= await db_query(`select * from products where productId='${pid}' and userId='${userId}'`);
        if (!getProduct || getProduct.length === 0) {
            return res.json({ msg: "Product not found", status: 404 });
          }
        const product=getProduct[0];
            res.json({product:product,status:200})
    }catch(error){
        console.log(error)
    }

})

router.route("/getProducts").get(async(req,res)=>{
    try{
        const userId=GetUserId(req.header("Authorization"));
        const getProduct= await db_query(`select * from products where userId='${userId}'`);
        if (!getProduct || getProduct.length === 0) {
            return res.json({ msg: "Product not found", status: 404 });
          }
        
            res.json({product:getProduct,status:200})
    }catch(error){
        console.log(error)
    }

})

router.route("/edit/:pid").post(Imageuploads.single('Product_Image'),async(req,res)=>{
    const userId=GetUserId(req.header("Authorization"));
    const pid=req.params.pid;

    const{Product_Name,Product_Description,Category,Product_Price,Product_Quantity,Status}=req.body
    const img=await db_query(`select Product_Image from products where userId='${userId}' and productId='${pid}'`);
    const exImage=img[0];
    let Product_Image;

    if (req.file) {
      Product_Image = `/productImages/${req.file.filename}`;
    } else {
      
      Product_Image = exImage.Product_Image;
    }
    const data={
     userId:userId,
     Product_Name:Product_Name,Product_Image:Product_Image,Product_Description:Product_Description,Category:Category,Product_Price:Product_Price,Product_Quantity:Product_Quantity,Status:Status
    }
    const result= await db_query(`update products set ? where productId='${pid}'`,data)
    if(result){
        res.json({msg:"Product updated succesfully..",status:200})
    }
})

router.route("/deleteProduct/:pid").delete(async(req,res)=>{
    try{
        const userId=GetUserId(req.header("Authorization"));
        const pid= req.params.pid;
        const getProduct= await db_query(`delete from products where productId='${pid}' and userId='${userId}'`);
        if (!getProduct || getProduct.length === 0) {
            return res.json({ msg: "Product not found", status: 404 });
          }
        
            res.json({msg:"product deleted successfully..",status:200})
    }catch(error){
        console.log(error)
    }

})
module.exports=router;