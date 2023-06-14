import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { config } from 'dotenv';

config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vtkeop6.mongodb.net/&retryWrites=true&w=majority`;

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

const createUser = async (email, password) => {
    try {
        await client.connect();
        console.log("Connected to DB");
        const db = client.db("auth");
        const users = db.collection("users");
        const user = await users.findOne({ email: email });

        if (user) throw new Error("User already exists");

        await users.insertOne({
            email: email,
            password: password,
        });

        client.close();
        return {
            status: 200,
            message: "User created",
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Server error",
        };
    }
};

export default createUser;