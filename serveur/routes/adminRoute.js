const express=require('express')
const { register , login } = require('../middlewares/auth')
const  router =express.Router()
const users=require('../model/userModel')
const bcrypt=require('bcrypt')
var jwt = require('jsonwebtoken')
require('dotenv').config()


//********************************REGISTER*************************************************/
router.post('/user/register',register,async(req,res)=>{
   const {nom,prenom,email,motdepasse,genre}=req.body
   const searchAdmin= await users.findOne({email}).exec()
   if (searchAdmin){
       return (res.status(401).json({msg:'cet utilisateur est inscrit déjà  !'}))
   }
   if (email==="dmoumen011@gmail.com"){
    const hashedPassword= await bcrypt.hash( motdepasse,10)
    await users.create({nom,prenom,email,motdepasse:hashedPassword,genre,isAdmin:true},(err)=>{
     return (err?(res.status(501).json({msg:'failed to add user'}))
     :
     (res.status(200).json({msg:'admin added to database'})))
 
 })
   }
       /************ CRYPTAGE DU MOT DE PASSE ***********/
   const hashedPassword= await bcrypt.hash( motdepasse,10)
   await users.create({nom,prenom,email,motdepasse:hashedPassword,genre},(err)=>{
    return (err?(res.status(501).json({msg:'failed to add user'}))
    :
    (res.status(200).json({msg:'user added to database'})))

})

})

/**************************************************LOGIN******************************************/

router.post('/user/login',login,async(req,res)=>{
const {email,motdepasse}=req.body
const searchUser=await users.findOne({email}).exec()
if (!searchUser){
    return (res.status(402).json({msg:'cet administrateur nexiste pas !'}))}
    const checkPassword= await bcrypt.compare(motdepasse,searchUser.motdepasse)
 if (!checkPassword){
    return(res.status(403).json({msg:'veuillez vérifier votre mot de passe !'}))

 }
 else{
var token = jwt.sign({email},process.env.tokenKey )
 //res.send(token)
 return(res.json({msg:'login succeeded !', token:token}))

}})

/************************************ AUTHENTIFICATION*******************************************/
router.get('/user/auth',async(req,res)=>{

    const token=req.headers.authorization
    const tokenVerify=await jwt.verify(token,process.env.secret)
    if(!tokenVerify){
        return(res.status(505).json({msg:'vous n etes pas authorisé !'}))
    }
    else{
        return(res.status(200).json({msg:'vous etes authorisé'}))

    }
})
/************************************PROFILE*******************************************************/
router.get("/user/byemail",async(req,res)=>{
    try {
    const {email}=req.query
    const data=await users.findOne({email}).exec()
    return(res.json(data))
    } catch (error) {
        
    return(res.json(error.message))
    }
    
 })
/********************************* FONCTION DE TEST *************************************************/


/************************************ GET ALL USERS ************************************************/


router.get("/allusers",async(req,res)=>{
    try {
       const data=await users.find().exec()
       res.status(200).send(data)
   } catch (error) {
       error? res.send('sth went wrong'):res.send('succeeded')
   }
})


module.exports=router  