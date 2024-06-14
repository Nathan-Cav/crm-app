import express, { Express, Request, Response } from "express";
import cors from "cors";
import { api_functions } from "./api_utils";

const app: Express = express();
const port = process.env.PORT || 3055;

app.use(cors());

/* GET ENDPOINTS */

app.get('/', (req: Request, res: Response) => {
    res.send('Congratulations! You have successfully started the server');
});

app.get('/clients', async (req: Request, res: Response) => {
  api_functions.api_clients()
    .then(ret => res.json(ret))
    .catch(err => res.status(err.status).json(err.message));
});

app.get('/client/:clientId', (req: Request, res: Response) =>{
  api_functions.api_client(req.params.clientId)
    .then(ret => res.json(ret))
    .catch(err => res.status(err.status).json(err.message));
});
app.get('/client', (req: Request, res: Response) =>
  res.status(400).json({ error: "Client ID must be specified in request" })
);

app.get('/jobs/:clientId', (req: Request, res: Response) =>{
  api_functions.api_jobs(req.params.clientId)
    .then(ret => res.json(ret))
    .catch(err => res.status(err.status).json(err.message));
});
app.get('/jobs', async (req: Request, res: Response) => {
  api_functions.api_jobs()
    .then(ret => res.json(ret))
    .catch(err => res.status(err.status).json(err.message));
});

app.get('/job/:jobId', (req: Request, res: Response) =>{
  api_functions.api_job(req.params.jobId)
    .then(ret => res.json(ret))
    .catch(err => res.status(err.status).json(err.message));
});
app.get('/job', (req: Request, res: Response) =>
  res.status(400).json({ error: "Job ID must be specified" })
);

/* POST ENDPOINTS */



/* DELETE ENDPOINTS */




app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port} or http://127.0.0.1:${port}`);
});