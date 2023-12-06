import { RequestHandler } from "express";
import {User} from "../model/userModel"
import createHttpError from "http-errors";
import bcrypt from "bcrypt"
interface SignUpBody{
    username?:string,
    email?:string,
    password?:string
}
export const signUp:RequestHandler<unknown,unknown,SignUpBody,unknown>=async (req,res,next) => {
    const username=req.body.username;
    const email = req.body.username;
    const password= req.body.password;
    try{
        if(!username || !email || !password) 
        throw createHttpError('400',"Parameter missing");
    const existingusername = await User.findOne({username:username}).exec();
    if(existingusername){
        throw createHttpError(400,"Username already exist ,Please chhoose a different account or login instead")
    }
    const existingemail = await User.findOne({email:email}).exec();
    if(existingemail){
        throw createHttpError(400,"Username already exist ,Please chhoose a different account or login instead")
    }
    const passwordHashed = await bcrypt.hash(password,10)
            const newuser= new User({
             username:username,
              email:email,
              password:passwordHashed,
            });
              req.session.userId=newuser._id;
            // this is how password is to be has
            res.status(201).json(await newuser.save());
          }
        
          catch(err){
              next(err);
          }
    
}
interface loginBody{
    username?:string,
    password?:string,
}
export const login:RequestHandler<unknown,unknown,loginBody,unknown> = async (req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        if(!username|| !password){
        throw createHttpError(400,"Paramter missing");
        }
    const user = await User.findOne({username:username}).select("+email +password").exec();
    if(!user){
        throw createHttpError(401,"Invalid Credentials");
    }
    // console.log(user.password);
    const passwordMatch = await bcrypt.compare(password,user.password);
    if(!passwordMatch){
        throw createHttpError(401,"Incorrect Password") ;
    }
    req.session.userId=user._id;
    res.status(201).json(user);


        
    } catch (error) {
        next(error);
    }
}
export const logout:RequestHandler=async (req,res,next) => {
    req.session.destroy(error =>{
     if(error)
     next(error);
    else 
    res.sendStatus(201);
    });
    
};
    
