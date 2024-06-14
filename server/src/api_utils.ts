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

/**
 *
 */
export let api_functions = {
    api_clients: async () => {
        const clientRes = await dbController.getClients()
            .then(response => response.rows)
            .catch(error => {
                // Handle Error
                console.error(error);
                throw std_error.json();
            });
        return clientRes;
    },

    api_client: async (clientId: string) => {
        // Check the ID is valid
        if (!validUUID(clientId)) {
            throw new ErrorMessage(400, "Invalid Client ID").json();
        }
        const clientRes = await dbController.getClient(clientId)
            .then(response => {
                // Check if the client was found
                if ((response.rowCount || 0) <= 0) {
                    throw new Error('Client not found');
                }
                return response.rows;
            })
            .catch(error => {
                // Handle Error
                if (error.message === "Client not found") {
                    throw new ErrorMessage(404, "Client was not found in our system").json();
                }
                console.error(error);
                throw std_error.json();
            });

        return clientRes;
    },

    api_jobs: async (clientId = "") => {
        // Check the ID is valid
        if (!validUUID(clientId) && clientId !== "") {
            throw new ErrorMessage(400, "Invalid Client ID").json();
        }
        let jobsRes = (clientId === "")
            ? await dbController.getJobs()
            : await dbController.getJobs(clientId);

        return jobsRes.rows;
    },

    api_job: async (jobId: string) => {
        // Check the ID is valid
        if (!validUUID(jobId)) {
            throw new ErrorMessage(400, "Invalid Client ID").json();
        }
        let clientRes = (jobId === "")
            ? await dbController.getClients()
            : await dbController.getClient(jobId);

        return clientRes.rows;
    }
}