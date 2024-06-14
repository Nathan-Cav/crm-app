/**
 * @file This file serves as the main controller for any database operation required within the app.
 * @module dbController
 */

import { dbConnection } from "./connection";

/**
 * The database controller object.
 * Can be used by calling db.create(data), db.update(data), db.delete(id) etc.
 */
export let dbController = {
    getClients: async() => {
        return (await dbConnection.query(
            `SELECT
                id,
                company_name,
                abn,
                active,
                address,
                suburb,
                state
             FROM clients;`
        ));
    },

    getClient: async(client_id: string) => {
        return (await dbConnection.query(
            `SELECT
                id,
                company_name,
                abn,
                active,
                address,
                suburb,
                state,
                postcode,
                comments,
                to_jsonb(client_contacts) AS client_contacts
             FROM clients
             WHERE id = $1;`,
            [client_id]
        ));
    },

    getJobs: async(client_id = "") => {
        const clientFilter = (client_id !== "")
            ? "WHERE c.id = $1"
            : "";
        const paramArray = (client_id !== "")
            ? [client_id]
            : [];

        return (await dbConnection.query(
            `SELECT
                j.id,
                j.client_id,
                c.company_name,
                c.abn,
                c.active AS company_active,
                j.job_number,
                j.status,
                j.description,
                j.comments,
                j.amount_due,
                j.amount_paid
             FROM jobs j
             INNER JOIN clients c ON j.client_id = c.id
             ${clientFilter}
             ORDER BY job_number;`,
             paramArray
        ));
    },

    getJob: async(job_id: string) => {
        return (await dbConnection.query(
            `SELECT *
             FROM jobs j
             INNER JOIN clients c ON j.client_id = c.id
             WHERE id = $1
             ORDER BY job_number;`,
            [job_id]
        ));
    }
}