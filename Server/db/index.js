import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connectionInstance = mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log(`Mongo Db connected at port ${process.env.PORT}`);
    } catch (error) {
        console.log("error: ", error);
        throw error;
    }
};

export default connectDb;
