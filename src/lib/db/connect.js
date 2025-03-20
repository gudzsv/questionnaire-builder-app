import mongoose from 'mongoose';

const connectToDatabase = async () => {
	const URI = process.env.MONGODB_URI;

	if (mongoose.connections[0].readyState) {
		return;
	}

	try {
		if (!URI) {
			throw new Error('MongoDB URI is not defined');
		}

		await mongoose.connect(URI);
	} catch (error) {
		process.exit(1);
	}
};

export default connectToDatabase;
