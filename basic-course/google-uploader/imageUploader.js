import { google } from "googleapis";
import pkg from 'google-auth-library';
const { GoogleAuth } = pkg;
import fs from "fs";

const KEY_PATH = "C:/Users/beytm/Downloads/flash-bloom-385717-7a548768b1e8.json";
const SCOPES = ["https://www.googleapis.com/auth/drive"];

export default async function (path, filename) {
    const auth = new GoogleAuth({
        keyFile: KEY_PATH,
        scopes: SCOPES,
    });
    const driveServ = google.drive({ version: "v3", auth });
    let fileMetaData = {
        name: filename,
        parents: ["1CKUoutxMay6K3YiAcTThri-hYe677LE7"],
    };
    const media = {
        mimeType: "image/jpg",
        body: fs.createReadStream(path),
    };
    const file = await driveServ.files.create({
        resource: fileMetaData,
        media: media,
        fields: "id",
    });
    return file.data.id;
}