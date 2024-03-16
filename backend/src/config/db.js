// Connect to Mongodb by mongooose
import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGGO_LINK, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        if (conn) {
            console.log('Connected Database');
        }
    } catch (error) {
        console.log('Connect Fail!!!!!', error);
        process.exit(1);
    }
}