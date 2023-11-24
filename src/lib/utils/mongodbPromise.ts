/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MONGODB_URI } from '$env/static/private';
import { MongoClient } from 'mongodb';

const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
	const globalWithMongo = global as typeof globalThis & {
		_mongoClientPromise: Promise<MongoClient>;
	};
	if (!globalWithMongo._mongoClientPromise) {
		client = new MongoClient(MONGODB_URI, options);
		globalWithMongo._mongoClientPromise = client.connect();
	}
	clientPromise = globalWithMongo._mongoClientPromise;
} else {
	client = new MongoClient(MONGODB_URI, options);
	clientPromise = client.connect();
}

export default clientPromise;
