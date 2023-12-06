import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";
import env from "./utils/validateEnv";
const port = env.PORT ;

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
