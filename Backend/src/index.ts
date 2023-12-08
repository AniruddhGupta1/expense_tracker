import "dotenv/config";
import mongoose from "mongoose";
import App from "./app";
import { cleanEnv } from "envalid";
import Env from "./utils/validateEnv"
type Envtype = ReturnType<typeof cleanEnv>
const env:Envtype = new Env().validate();
const port = env.PORT;
const app = new App().app;
mongoose.connect(env.MONGO_CONNECTION_STRING).then(() => {
    console.log("Connected to mongoDB");
    app.listen(port, () => console.log('Server running on port',port));
}  ).catch((err) => {     console.log("Error connecting to mongoDB", err); });



// app.get('/', (req, res) => {
//      res.send('Hello World!')
// });
// app.get('/api', (req, res) => {
//     res.send('Hello Api!');
// });
