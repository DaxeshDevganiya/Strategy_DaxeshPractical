const express = require('express')
const router = express.Router()
const db_query=require("../dbquery");
const bcrypt= require("bcrypt");
router.route("/signup").post(async(req,res)=>{
    try{
        const{email,password}=req.body
        let validated=true;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let error={}
        if(!email||!password){
            return res.json({response:"All fields are required",status:400})
        }
        if(regex.test(email)==false){
           validated=false
           error['email']="Invalid Email"
        }
        if(password.length<6 ){
            validated=false
            error['password']="Password must be greater than 6 character"
        }
        if(validated){
            const alreadyUser= await db_query(`select email from users where email='${email}'`)
            if(alreadyUser.length>0){
                res.json({"response":"User already Exists","status":400})
            }else{
                const hashpassword= await bcrypt.hash(password,10)
                const data={
                    email:email,password:hashpassword
                }
                const result=await db_query("insert into users set ?",data)
                if(result){
                    res.json({"response":"User Signup Succssfully..",status:200})
                }
        }
        }else{
            res.json({"response":error,"status":400})
        }
        

        
        
    }catch(error){
        console.log(error)
    }
})



module.exports=router