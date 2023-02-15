/* Node.js Imports */
import path from "path";
import os from "os";
import fs from "fs";

/* Libraries */
import express from "express";
import ytdl from "ytdl-core";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.post("/download", async (req, res) => {
    try {
        const { url, id } = await req.body;
        const info = await ytdl.getInfo(id);
        const { title } = info.videoDetails;
        const file_path = path.join(os.homedir(), "Downloads", `${title}.mp4`);
        
        /* Set up headers */
        res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
        res.header('Content-Type', 'video/mp4');
        
        ytdl(url, { quality: 'highest', filter: "audioandvideo" }).pipe(res);
        const writeStream = fs.createWriteStream(file_path);
        writeStream.on('finish', () => {
            console.log('Video downloaded successfully!');
        });
        ytdl(url, { quality: 'highest', filter: "audioandvideo" }).pipe(writeStream);
        res.status(200).json(url);
    } catch (error) {
        res.status(500).json("Error is: " + error);
    }
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server has established on ${PORT}`));