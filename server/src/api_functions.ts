import { validate as uuidValidate } from 'uuid';
import { version as uuidVersion } from 'uuid';
import { dbController } from "./db/controller";
import { ErrorMessage } from "./models/ErrorMessage";

const std_error = new ErrorMessage(
    500,
    "Something has gone wrong at our end. Please try again later."
);

function validUUID(uuid: string) {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

function parseJobs(jobs: any[]) {
    return jobs.map(job => {
        job.amount_due = parseFloat(job.amount_due);
        job.amount_paid = parseFloat(job.amount_paid);
        return job;
    });
}

/**
 *
 */
export let api_functions = {
    apiGetClients: async () => {
        const clientRes = await dbController.getClients()
            .then(response => response.rows || [])
            .catch(error => {
                // Handle Error
                console.error(error);
                throw std_error.json();
            });
        return clientRes;
    },

    apiGetAllJobs: async () => {
        const jobRes = await dbController.getJobs()
            .then(response => response.rows || [])
            .catch(error => {
                // Handle Error
                console.error(error);
                throw std_error.json();
            });

        return parseJobs(jobRes);
    },


    apiGetClient: async (clientId: string) => {
        // Check the ID is valid
        if (!validUUID(clientId)) {
            throw new ErrorMessage(400, "Invalid Client ID").json();
        }

        // Retrieve client information from the DB
        const clientRes = await dbController.getClient(clientId)
            .then(response => {
                // Check if the client was found
                if ((response.rowCount || 0) <= 0) {
                    throw new Error('Not Found');
                }
                return response.rows;
            })
            .catch(error => {
                // Handle Error
                if (error.message.toLowerCase() === "not found") {
                    throw new ErrorMessage(404, "Client was not found in our system.").json();
                }
                console.error(error);
                throw std_error.json();
            });

        // Retrieve all jobs associated with a given client
        const jobRes = await dbController.getJobsForClient(clientId)
            .then(response => response.rows || [])
            .catch(error => {
                // Handle Error
                console.error(error);
                throw std_error.json();
            });

        // Combine the two arrays and transform data into the response object
        let response = clientRes[0];
        response.jobs = parseJobs(jobRes);

        // TODO Create total_outstanding

        return response;
    },

    apiGetJob: async (jobId: string) => {
        // Check the ID is valid
        if (!validUUID(jobId)) {
            throw new ErrorMessage(400, "Invalid Job ID").json();
        }
        const jobRes = await dbController.getJobs(jobId)
            .then(response => {
                // Check if the job was found
                if ((response.rowCount || 0) <= 0) {
                    throw new Error('Not Found');
                }
                return response.rows;
            })
            .catch(error => {
                // Handle Error
                if (error.message.toLowerCase() === "not found") {
                    throw new ErrorMessage(404, "Job was not found in our system.").json();
                }
                console.error(error);
                throw std_error.json();
            });

        return parseJobs(jobRes)[0];
    }
}