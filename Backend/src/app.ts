import express ,{Request,Response,NextFunction} from "express";
import UserRoutes from "./routers/user.routes"
import  ExpenseRoutes from "./routers/expense.routes";
import createHttpError ,{isHttpError}from "http-errors";
import sesssion from "express-session"
import MongoStore from "connect-mongo";
import Env from "./utils/validateEnv"
import { cleanEnv } from "envalid";
type Envtype = ReturnType<typeof cleanEnv>
class App{
public app:express.Application;
public env:Envtype;
public userRoute:UserRoutes;
public expenseRoutes:ExpenseRoutes;
constructor(){
    this.app = express();
    this.env = new Env().validate();
    this.userRoute = new UserRoutes();
    this.expenseRoutes = new ExpenseRoutes();

    this.expressJson()
    this.sessionMiddleware();
    this.userRouteMiddleware();
    this.expenseRouteMiddleware();
    this.errorMiddleware();
}
public expressJson(){
this.app.use(express.json());
}

private sessionMiddleware(){
    this.app.use(sesssion({
        secret:this.env.SESSION_SECRET,
        resave:false,
        saveUninitialized:false,
        cookie:{
            maxAge:60*60*1000,
        },
        rolling:true,
        store:MongoStore.create({
            mongoUrl:this.env.MONGO_CONNECTION_STRING
        }),
        
        
        }));
}
public userRouteMiddleware(){
this.app.use('api/users',this.userRoute.getRouter);
}
public expenseRouteMiddleware(){
this.app.use('/api/Expenses',this.expenseRoutes.getRouter);

}
private endpointerrorHandler(){
this.app.use((req:Request,res:Response,next:NextFunction) => {
    next(createHttpError(404,"Endpoint not found"));
});
}
private errorMiddleware(){
this.app.use((err:unknown,req:Request,res:Response,next:NextFunction) => {
    let error = "An unknown error has occurred";
    let status = 500;
    if(isHttpError(err)){
        status = err.status;
        error = err.message;
    }
        res.status(status).json({err:error});

});
}
}
export default App;

