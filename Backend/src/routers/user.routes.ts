import express from "express"
import UserController from "../controller/user"
class UserRouter{
    private router:express.Router;
    private usercontroller:UserController;
    constructor(){
        this.router = express.Router();
        this.usercontroller = new UserController();
        this.initialiseRoutes();
    }

public initialiseRoutes(){
this.router.post('/api/user/signup',this.usercontroller.signUp);
this.router.post('/api/user/login',this.usercontroller.login);
this.router.post('/api/user/logout',this.usercontroller.logout);
}
public getRouter(){
    return this.router;
}
}
export default UserRouter;
