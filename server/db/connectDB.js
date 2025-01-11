import mongoose from "mongoose";

const connectDB = async () => {
	try {
		console.log("ATLAS_URI: ", process.env.ATLAS_URI);
		const conn = await mongoose.connect(process.env.ATLAS_URI);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log("Error connection to MongoDB: ", error.message);
		process.exit(1);
	}
};

export default connectDB;