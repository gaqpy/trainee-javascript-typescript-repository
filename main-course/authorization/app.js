import Express from "express";
import createUser from "./utils/mongoDBCreate.js";
import loginUser from "./utils/mongoDBLogin.js";
import cookieParser from "cookie-parser";
import cookie from "cookie";
import { findUserByEmail } from "./utils/mongoDBLogin.js";
import jwt from "jsonwebtoken";
import { config } from 'dotenv';

config();

const app = Express();
const port = 3001;

app.use(Express.json());
app.use(cookieParser());

const jwtKey = process.env.SECRET_KEY;

const login = async (req, res) => {
    const { email, password } = req.body;
    const userInfo = findUserByEmail(email);
    const jwtExpiresTime = Math.round(Math.random() * (60 - 30) + 30);
    const accessToken = jwt.sign({ _id: userInfo["_id"] }, jwtKey, {
        expiresIn: `${jwtExpiresTime}s`,
    });
    const loginResponse = await loginUser(email, password);
    if (userInfo) {
        res.setHeader(
            'Set-Cookie',
            cookie.serialize('accessToken', accessToken, {
                httpOnly: true,
                maxAge: jwtExpiresTime,
            })
        );
    }
    return res.status(200).send("You succesfully loged in");

};

const signUp = async (req, res) => {
    const { email, password } = req.body;
    const signUpResponse = await createUser(email, password);
    return res.status(signUpResponse.status).send(signUpResponse);
};

const refresh = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.cookies.refreshToken);
    const oldRefreshToken = req.cookies.accessToken;
    const userInfo = await findUserByEmail(email);
    const userEmail = { email: userInfo.email }; 
    const refreshedToken = jwt.sign(userEmail, jwtKey, {
        expiresIn: `7d`,
    });
    if (userInfo) {
        res.setHeader(
            'Set-Cookie',
            cookie.serialize('refreshToken', refreshedToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
            })
        );
    }
    return res.status(200).send("You successfully refreshed token");
};

app.post("/login", (req, res) => {
    login(req, res);
});

app.post("/refresh", (req, res) => {
    refresh(req, res);
});

app.post("/sign_up", (req, res) => {
    signUp(req, res);
});


app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});