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
        job.total_outstanding = parseFloat(job.total_outstanding)
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
            .then(response => parseJobs(response.rows) || [])
            .catch(error => {
                // Handle Error
                console.error(error);
                throw std_error.json();
            });

        return jobRes;
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
            .then(response => parseJobs(response.rows) || [])
            .catch(error => {
                // Handle Error
                console.error(error);
                throw std_error.json();
            });

        // Work out the total amount outstanding from all jobs
        const totalOutstanding = jobRes
            .filter(job => job.status !== "In Progress")
            .map(job => job.total_outstanding)
            .reduce((partialSum, a) => partialSum + a, 0);

        // Combine the two arrays and transform data into the response object
        let response = clientRes[0];
        response.total_outstanding = totalOutstanding;
        response.jobs = jobRes;

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
                return parseJobs(response.rows);
            })
            .catch(error => {
                // Handle Error
                if (error.message.toLowerCase() === "not found") {
                    throw new ErrorMessage(404, "Job was not found in our system.").json();
                }
                console.error(error);
                throw std_error.json();
            });

        return jobRes[0];
    },

    apiAddJob: async (job: {client_id: string, status: 'In Progress'|'Awaiting Payment'|'Complete', description: string, comments?: string, amount_due: number, amount_paid: number}) => {
        // Validate request
        // Check the ID is valid
        if (!validUUID(job.client_id)) {
            throw new ErrorMessage(400, "Invalid Client ID").json();
        }
        // Check that the client ID is actually in the system
        await api_functions.apiGetClient(job.client_id);

        // Check status
        if (job.status !== "In Progress" && job.status !== "Awaiting Payment" && job.status !== "Complete") {
            throw new ErrorMessage(400, "Invalid Job Status").json();
        }

        // Check Description
        if (!job.description) {
            throw new ErrorMessage(400, "Job description must be specified").json();
        }

        // Parse and check amount due and amount paid
        job.amount_due = parseFloat(`${job.amount_due}`);
        job.amount_paid = parseFloat(`${job.amount_paid}`);
        if (Number.isNaN(job.amount_due) || Number.isNaN(job.amount_paid)) {
            throw new ErrorMessage(400, "Amount Due and Amount Paid must be valid numeric values").json();
        }

        // Add job to DB
        const jobRes = await dbController.addJob(job)
            .then(response => {
                // Check if the client was found
                if ((response.rowCount || 0) <= 0) {
                    throw new Error('Not Inserted');
                }
                return response.rows;
            })
            .catch(error => {
                // Handle Error
                console.error(error);
                throw std_error.json();
            });

        return {
            id: jobRes[0].id,
            client_id: job.client_id,
            message: "Job added to client successfully"
        };
    },

    apiUpdateJob: async (jobId: string, job: {status: 'In Progress'|'Awaiting Payment'|'Complete', description: string, comments?: string, amount_due: number, amount_paid: number}) => {
        // Validate request
        // Check the ID is valid
        if (!validUUID(jobId)) {
            throw new ErrorMessage(400, "Invalid Job ID").json();
        }
        // Check that the client ID is actually in the system
        await api_functions.apiGetJob(jobId);

        // Check status
        if (job.status !== "In Progress" && job.status !== "Awaiting Payment" && job.status !== "Complete") {
            throw new ErrorMessage(400, "Invalid Job Status").json();
        }

        // Check Description
        if (!job.description) {
            throw new ErrorMessage(400, "Job description must be specified").json();
        }

        // Parse and check amount due and amount paid
        job.amount_due = parseFloat(`${job.amount_due}`);
        job.amount_paid = parseFloat(`${job.amount_paid}`);
        if (Number.isNaN(job.amount_due) || Number.isNaN(job.amount_paid)) {
            throw new ErrorMessage(400, "Amount Due and Amount Paid must be valid numeric values").json();
        }

        // Update job in DB
        await dbController.updateJob(jobId, job)
            .then(response => {
                // Check if the client was found
                if ((response.rowCount || 0) <= 0) {
                    throw new Error('Not Updated');
                }
                return response.rows;
            })
            .catch(error => {
                // Handle Error
                console.error(error);
                throw std_error.json();
            });

        return {
            id: jobId,
            message: "Job updated successfully"
        };
    },

    apiDeleteJob: async (jobId: string) => {
        if (!validUUID(jobId)) {
            throw new ErrorMessage(400, "Invalid Job ID").json();
        }
        await dbController.deleteJob(jobId)
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

        return { message: "Job deleted successfully" };
    }
}