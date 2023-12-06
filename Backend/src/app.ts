import express ,{Request,Response,NextFunction} from "express";
import userRoutes from "./routers/userRouter"
import  expenseRoutes from "./routers/expense";
import createHttpError ,{isHttpError}from "http-errors";
import sesssion from "express-session"
import MongoStore from "connect-mongo";
import env from "./utils/validateEnv"
const app = express();
app.use(express.json());
app.use(sesssion({
secret:env.SESSION_SECRET,
resave:false,
saveUninitialized:false,
cookie:{
    maxAge:60*60*1000,
},
rolling:true,
store:MongoStore.create({
    mongoUrl:env.MONGO_CONNECTION_STRING
}),


}));
app.use('api/users',userRoutes);
app.use('/api/Expenses',expenseRoutes);
app.use((req:Request,res:Response,next:NextFunction) => {
    next(createHttpError(404,"Endpoint not found"));
});
app.use((err:unknown,req:Request,res:Response,next:NextFunction) => {
    let error = "An unknown error has occurred";
    let status = 500;
    if(isHttpError(err)){
        status = err.status;
        error = err.message;
    }
        res.status(status).json({err:error});

});
export default app;

