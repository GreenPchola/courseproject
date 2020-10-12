const {User} = require("../models")

const signUp = async(req,res) =>{
    try{
        const {name,surname,number,password}=req.body
        await User.create({name, surname,number,password})
        res.status(200).json({message:"User was registered"})
    }
    catch(e){
        res.status(500).json({message:`Error: ${e.message}`})
    }
}
const login = async(req,res)=>{

}
module.exports={
    signUp,
    login
}