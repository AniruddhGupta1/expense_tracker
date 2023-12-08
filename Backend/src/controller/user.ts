import { RequestHandler } from "express";
import {User} from "../model/user.model"
import createHttpError from "http-errors";
import bcrypt from "bcrypt"
import { SignUpBody,loginBody } from "../@types/userInterface"; 
import UserDao from "../dao/user.dao";
class UserController{
    public userDao :UserDao
    constructor(){
        this.userDao = new UserDao();
    }
 public signUp:RequestHandler<unknown,unknown,SignUpBody,unknown>=async (req,res,next) => {
    const username=req.body.username;
    const email = req.body.username;
    const password= req.body.password;
    try{
        if(!username || !email || !password) 
        throw createHttpError('400',"Parameter missing");
    const existingusername = await this.userDao.getUserByUsername(username);
    if(existingusername){
        throw createHttpError(400,"Username already exist ,Please chhoose a different account or login instead")
    }
    const existingemail = await this.userDao.getUserByEmail(email);
    if(existingemail){
        throw createHttpError(400,"Username already exist ,Please chhoose a different account or login instead")
    }
    const passwordHashed = await bcrypt.hash(password,10)
            const newuser = await this.userDao.addUser(username,email,passwordHashed);
              req.session.userId=newuser._id;
            // this is how password is to be has
            res.status(201).json(newuser);
          }
        
          catch(err){
              next(err);
          }
    
}

public login:RequestHandler<unknown,unknown,loginBody,unknown> = async (req,res,next) => {
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
public logout:RequestHandler=async (req,res,next) => {
    req.session.destroy(error =>{
     if(error)
     next(error);
    else 
    res.sendStatus(201);
    });
    
}
}
export default UserController;
    
