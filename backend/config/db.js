// db.js
import mongoss from "mongoose";

export  const connectDB = async() =>{
    try{
        const conn = await mongoss.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    }catch(error){
        console.error(error);
        process.exit(1);
    }
}