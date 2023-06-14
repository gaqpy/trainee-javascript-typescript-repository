import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { config } from 'dotenv';

config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vtkeop6.mongodb.net/&retryWrites=true&w=majority`;

const jwtKey = process.env.SECRET_KEY;

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

export const findUserByEmail = async (email) => {
    await client.connect();
    const db = client.db("auth");
    const users = db.collection("users");
    const user = await users.findOne({ email: email });
    return user;
}



const loginUser = async (email, password) => {
    const db = client.db("auth");
    try {
        const userInfo = await findUserByEmail(email);
        if (userInfo === null || email !== userInfo.email || password !== userInfo.password) {
            return {
                status: 406,
                message: "Invalid user info",
                accessToken: "",
                refreshToken: "",
            };
        }

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Server error",
        };
    }
}

export default loginUser;