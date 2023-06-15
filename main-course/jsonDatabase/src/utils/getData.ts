import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import { config } from 'dotenv';
import { Request, Response } from "express";

config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vtkeop6.mongodb.net/&retryWrites=true&w=majority`;

const client = new MongoClient(url);

export const getData = async (
    req: Request<{ path: string }>,
    res: Response<string | { [key: string]: any }>
) => {
    const { path } = req.params;
    try {
        await client.connect();
        console.log("connected to db");
        const db = client.db("jsondb");
        const collection = db.collection(req.params.path);
        const foundData = await collection.find({}).toArray();
        if (!foundData) {
            client.close();
            return res.status(400).send("Data not found");
        } else {
            client.close();
            return res.status(200).json(foundData);
        }
    } catch (error) {
        return res.status(500).send("Server Error");
    }
};