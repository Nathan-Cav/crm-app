import express, { Express, Request, Response } from "express";
import cors from "cors";
// import fs from 'node:fs';
// import path from 'node:path';

import { dbController } from "./db/controller";

const app: Express = express();
const port = process.env.PORT || 3055;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Congratulations! You have successfully started the server');
});


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port} or http://127.0.0.1:${port}`)

  dbController.getData().then(res => {
    console.log(res.rows);
  });
});