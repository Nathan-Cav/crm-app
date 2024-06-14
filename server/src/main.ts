import express, { Express, Request, Response } from "express";
import cors from "cors";
import { api_functions } from "./api_functions";

const app: Express = express();
const port = process.env.PORT || 3055;

app.use(cors());

/* GET ENDPOINTS */
/* ------------- */

app.get('/', (req: Request, res: Response) => {
    res.send('Congratulations! You have successfully started the server');
});

// List all clients
app.get('/clients', async (req: Request, res: Response) => {
  api_functions.apiGetClients()
    .then(ret => res.json(ret))
    .catch(err => res.status(err.status || 500).json(err.message));
});
// Get details for a single client
app.get('/clients/:clientId', (req: Request, res: Response) =>{
  api_functions.apiGetClient(req.params.clientId)
    .then(ret => res.json(ret))
    .catch(err => res.status(err.status || 500).json(err.message));
});


// List all jobs
app.get('/jobs', async (req: Request, res: Response) => {
  api_functions.apiGetAllJobs()
    .then(ret => res.json(ret))
    .catch(err => res.status(err.status || 500).json(err.message));
});
// Get details for a single job
app.get('/jobs/:jobId', (req: Request, res: Response) =>{
  api_functions.apiGetJob(req.params.jobId)
    .then(ret => res.json(ret))
    .catch(err => res.status(err.status || 500).json(err.message));
});


/* POST ENDPOINTS */
/* -------------- */



/* DELETE ENDPOINTS */
/* ---------------- */




app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port} or http://127.0.0.1:${port}`);
});