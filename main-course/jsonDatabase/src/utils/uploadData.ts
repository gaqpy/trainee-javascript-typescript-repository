import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import { config } from 'dotenv';
import { Request, Response } from "express";

config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vtkeop6.mongodb.net/&retryWrites=true&w=majority`;

const client = new MongoClient(url);

export const uploadData = async (
    req: Request<{ path: string }, {}, { [key: string]: any }, {}>,
    res: Response<string>
) => {
    try {
        await client.connect();
        console.log("connected to db");
        const db = client.db("jsondb");
        const collection = db.collection(req.params.path);
        if (!(await collection.findOne({ _id: req.body._id }))) {
            await collection.insertOne(req.body);
            return res.status(200).send("Data uploaded");
            client.close();
        }
        else {
            return res.status(400).send("Data already exists");
        }

    } catch (error) {
        return res.status(500).send("Server Error");
    }
};

