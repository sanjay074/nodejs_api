import  express from 'express' ;
import mongoose from 'mongoose';
import { APP_PORT } from './config';
import errorHandler from './middlewares/errorHandler';
import router from './routes';
const app = express();
app.use(express.json()); 
// db connect
mongoose.connect("mongodb://localhost:27017/pro", {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
}) 

app.use('/api',router);
app.use(errorHandler)
app.listen(APP_PORT,()=>console.log(`Listening on port ${APP_PORT}.`));
