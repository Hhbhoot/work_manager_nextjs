import mongoose from "mongoose";

const connectionObject = {
  isConnected: null,
};

export const connectDB = async () => {
  try {
    if (connectionObject.isConnected !== null) {
      console.log("Db already connected");
      return;
    }
    const db = await mongoose.connect(process.env.MONGO_DB_URI, {
      connectTimeoutMS: 30000,
    });
    connectionObject.isConnected = db.connections[0].readyState;
    console.log("Database connected successfully..");
  } catch (error) {
    console.log("Failed to connect with Database", error);
  }
};
