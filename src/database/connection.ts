import mongoose from "mongoose";
import { logger } from "../utils/logger";


const dbConnect=async()=>{
    try {
        const connectionString = process.env.DB_CONNECT;
        if(! connectionString) throw Error('failed to find database connection string');
        const connect = await mongoose.connect(connectionString);
        logger.info(`DB Connected:${connect.connection.host}`);
    } catch (error:any) {
        logger.error(`DB Connection Failed:${error.message}`);
        process.exit(1);
    }
}

export default dbConnect;