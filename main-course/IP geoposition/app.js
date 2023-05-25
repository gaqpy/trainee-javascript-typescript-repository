import express from "express";
import  convertIPToLocation  from "./findIp/findIp.js";

const app = express();
const port = 3000;

app.set("trust proxy", true);

app.get('/', async (req, res) => {
  try {
    const resp = await convertIPToLocation(req.ip);
    //console.log(resp);
  
    res.setHeader("Content-Type", "application/json");
    res.send(resp);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server started at port ${port}`);
});