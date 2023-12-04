import express ,{Request,Response,NextFunction} from "express";

import  expenseRoutes from "./routers/expense";
import createHttpError ,{isHttpError}from "http-errors";
const app = express();
app.use(express.json());
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

