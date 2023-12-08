import {User} from "../model/user.model";
class UserDao{
    constructor(){}
    public async getUserByUsername(username:string){
    return await User.findOne({username:username}).exec();
    
    }
    public async getUserByEmail(email:string){
        return  await User.findOne({email:email}).exec();
       
    }
    public async addUser(username:string,email:string,password:string){
        const newuser = new User({
            username:username,
            email:email,
            password:password,
        });
        return await newuser.save();
    }
    public async getUserWithEmailPassword(username:string){
        return await User.findOne({username:username}).select("+email +password").exec();
    }
    // public async getUserById(id:string){
    //     const existinguser = await User.findById(id).exec();
    //     return existinguser;
    // }
}
export default UserDao;