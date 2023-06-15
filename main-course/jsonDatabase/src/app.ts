import express from 'express';
import { uploadData } from './utils/uploadData';
import { getData } from './utils/getData';

const app = express();

const port = 3000;

app.use(express.json());

app.post('/:path', uploadData);

app.get('/:path', getData);


app.listen(port, () => {
    console.log("Server is running on port 3000");
});