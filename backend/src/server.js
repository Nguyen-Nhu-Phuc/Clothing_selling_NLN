import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from './config/db.js';

import pictureRouter from './routes/picture.route.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import ListRouter from './routes/list.route.js';
import BrandRouter from './routes/Brand.route.js';
import CartRouter from './routes/cart.js';
import revenue from './routes/revenue.js';
import routerOrder from './routes/order.route.js'
import routerAddress from './routes/address.route.js'

dotenv.config();
connectDB();


const app = express();
app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: false }));



// routes
app.use("/api/picture", pictureRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/list", ListRouter);
app.use("/api/brand", BrandRouter);
app.use("/api/cart", CartRouter);
app.use("/api/order", routerOrder);
app.use("/api/revenue", revenue);
app.use("/api/address", routerAddress);

const port = 3000;

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})