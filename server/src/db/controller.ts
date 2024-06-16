/**
 * @file This file serves as the main controller for any database operation required within the app.
 * @module dbController
 */

import { PoolClient, QueryResult } from "pg";
import { dbConnection } from "./connection";

/**
 * The database controller object.
 * Can be used by calling dbController.getClients(), dbController.getClient(client_id), etc.
 */
export let dbController = {
    getClients: async () => {
        return (await dbConnection.query(
            `SELECT
                id,
                company_name,
                trading_as,
                abn,
                active,
                address,
                suburb,
                state,
                postcode
             FROM clients
             ORDER BY active DESC;`
        ));
    },

    getTotalOutstanding: async (client_id: string) => {
        return (await dbConnection.query(
            `SELECT
             client_id,
             SUM(amount_due - amount_paid) AS total_outstanding
             FROM jobs
             WHERE status <> 'In Progress'
             AND client_id = $1
             GROUP BY client_id;`,
            [client_id]
        ));
    },

    getClient: async (client_id: string) => {
        return (await dbConnection.query(
            `SELECT
                id,
                company_name,
                trading_as,
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

    addClient: async (
        client: { company_name: string, trading_as: string, abn: string, active: boolean, address: string, suburb: string, state: 'QLD' | 'NSW' | 'TAS' | 'ACT' | 'VIC' | 'WA' | 'SA' | 'NT', postcode: number, comments: string, client_contacts: [{ name: string, email: string, position: string, phone_number: string, comments: string }] }
    ) => {

        // Insert Client as multiple SQL requests bundled into 1 transaction - insert the client and then insert the contacts as individual array entries
        const dbClient = await dbConnection.beginTransaction();
        await dbConnection.appendTransaction(dbClient, "BEGIN;");
        const idRes = await dbConnection.appendTransaction(dbClient, `
            INSERT INTO clients (
                company_name,
                trading_as,
                abn,
                active,
                address,
                suburb,
                state,
                postcode,
                comments
            ) VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8,
                $9
            ) RETURNING id;`,
            [
                client.company_name,
                client.trading_as,
                client.abn,
                client.active,
                client.address,
                client.suburb,
                client.state,
                client.postcode,
                client.comments
            ]
        );
        await addContactsInTransaction(
            client.client_contacts,
            dbClient,
            idRes.rows[0].id
        );
        await dbConnection.appendTransaction(dbClient, "COMMIT;");
        dbConnection.endTransaction(dbClient);

        return idRes;
    },

    updateClient: async (
        client_id: string,
        client: { company_name: string, trading_as: string, abn: string, active: boolean, address: string, suburb: string, state: 'QLD' | 'NSW' | 'TAS' | 'ACT' | 'VIC' | 'WA' | 'SA' | 'NT', postcode: number, comments: string, client_contacts: [{ name: string, email: string, position: string, phone_number: string, comments: string }] }
    ) => {
        // Update Client as multiple SQL requests bundled into 1 transaction - insert the client and then insert the contacts as individual array entries
        const dbClient = await dbConnection.beginTransaction();
        await dbConnection.appendTransaction(dbClient, "BEGIN;");
        const idRes = await dbConnection.appendTransaction(dbClient, `
            UPDATE clients SET
                company_name = $1,
                trading_as = $2,
                abn = $3,
                active = $4,
                address = $5,
                suburb = $6,
                state = $7,
                postcode = $8,
                comments = $9,
                client_contacts = NULL
            WHERE id = $10`,
            [
                client.company_name,
                client.trading_as,
                client.abn,
                client.active,
                client.address,
                client.suburb,
                client.state,
                client.postcode,
                client.comments,
                client_id
            ]
        );
        await addContactsInTransaction(
            client.client_contacts,
            dbClient,
            client_id
        );
        await dbConnection.appendTransaction(dbClient, "COMMIT;");
        dbConnection.endTransaction(dbClient);

        return idRes;
    },

    getJobs: async (job_id = "") => {
        const filterJob = (job_id !== "")
            ? "WHERE j.id = $1"
            : "WHERE c.active = TRUE";
        const params = (job_id !== "")
            ? [job_id]
            : [];

        return (await dbConnection.query(
            `SELECT
                j.id,
                j.client_id,
                c.company_name,
                c.trading_as,
                c.abn,
                j.job_number,
                j.status,
                j.description,
                j.comments,
                j.amount_due,
                j.amount_paid,
                (j.amount_due - j.amount_paid) AS total_outstanding
             FROM jobs j
             INNER JOIN clients c ON j.client_id = c.id
             ${filterJob}
             ORDER BY (status = 'Awaiting Payment') DESC, status DESC, job_number DESC;`,
            params
        ));
    },

    getJobsForClient: async (client_id: string) => {
        return (await dbConnection.query(
            `SELECT
                id,
                job_number,
                status,
                description,
                comments,
                amount_due,
                amount_paid,
                (amount_due - amount_paid) AS total_outstanding
             FROM jobs
             WHERE client_id = $1
             ORDER BY (status = 'Awaiting Payment') DESC, status DESC, job_number DESC;`,
            [client_id]
        ));
    },

    addJob: async (
        job: { client_id: string, status: 'In Progress' | 'Awaiting Payment' | 'Complete', description: string, comments?: string, amount_due: number, amount_paid: number }
    ) => {
        return (await dbConnection.query(
            `INSERT INTO jobs (
                client_id,
                status,
                description,
                comments,
                amount_due,
                amount_paid
             ) VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6
             ) RETURNING id;`,
            [
                job.client_id,
                job.status,
                job.description,
                job.comments,
                job.amount_due,
                job.amount_paid
            ]
        ));
    },

    updateJob: async (
        job_id: string,
        job: { status: 'In Progress' | 'Awaiting Payment' | 'Complete', description: string, comments?: string, amount_due: number, amount_paid: number }
    ) => {
        return (await dbConnection.query(
            `UPDATE jobs SET
                status = $1,
                description = $2,
                comments = $3,
                amount_due = $4,
                amount_paid = $5
             WHERE id = $6`,
            [
                job.status,
                job.description,
                job.comments,
                job.amount_due,
                job.amount_paid,
                job_id
            ]
        ));
    },

    deleteJob: async (job_id: string) => {
        return (await dbConnection.query(
            `DELETE FROM jobs
             WHERE id IN (
                SELECT id FROM jobs
                WHERE id = $1
                LIMIT 1
             );`,
            [job_id]
        ));
    }
}

// Function to add contacts
async function addContactsInTransaction(
    client_contacts: [{ name: string; email: string; position: string; phone_number: string; comments: string; }],
    dbClient: PoolClient,
    client_id: string
) {
    for (let i = 0; i < client_contacts.length; i++) {
        const contact = client_contacts[i];
        await dbConnection.appendTransaction(dbClient, `
                UPDATE clients SET client_contacts = array_append(client_contacts, CAST(($1, $2, $3, $4, $5) AS client_contact))
                WHERE id = $6;`,
            [
                contact.name,
                contact.position,
                contact.phone_number,
                contact.email,
                contact.comments,
                client_id
            ]
        );
    }
}