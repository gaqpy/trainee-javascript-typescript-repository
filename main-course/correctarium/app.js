import { getOrderDetails } from "./utils/getData.js";
import Express from "express";

const app = Express();
const port = 3000;

app.use(Express.json());

app.post("/", (req, res) => {
    const { body } = req;
    res.send(getOrderDetails(body));

});

app.listen(port, () => {
    console.log("start");
});