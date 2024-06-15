/**
 * @file This file serves as a mock controller for any database operation required within the app.
 * @module dbController
 */


import fs from 'node:fs';
import path from 'node:path';


async function getMockData() {
    const mockData = fs.readFileSync(path.join(__dirname, `mockData.json`), 'utf8');
    return JSON.parse(mockData);
}

export let dbController = {
    getClients: async () => {
        const data = await getMockData();
        const rows: any[] = [{
            id: data.id,
            company_name: data.company_name,
            trading_as: data.trading_as,
            abn: data.abn,
            active: data.active,
            address: data.address,
            suburb: data.suburb,
            state: data.state,
        }];

        return {
            rowCount: rows.length,
            rows: rows
        };
    },

    getClient: async (client_id: string) => {
        const data = await getMockData();
        const rows: any[] = (data.id !== client_id)
            ? []
            : [{
                id: data.id,
                company_name: data.company_name,
                trading_as: data.trading_as,
                abn: data.abn,
                active: data.active,
                address: data.address,
                suburb: data.suburb,
                state: data.state,
                postcode: data.postcode,
                comments: data.comments,
                client_contacts: data.client_contacts
            }];

        return {
            rowCount: rows.length,
            rows: rows
        };
    },

    getJobs: async (job_id = "") => {
        const data = await getMockData();
        const jobs = data.jobs.map((job: { id: any; job_number: any; status: any; description: any; comments: any; amount_due: any; amount_paid: any; total_outstanding: any; }) => {
            return {
                id: job.id,
                client_id: data.id,
                company_name: data.company_name,
                trading_as: data.trading_as,
                abn: data.abn,
                company_active: data.active,
                job_number: job.job_number,
                status: job.status,
                description: job.description,
                comments: job.comments,
                amount_due: job.amount_due,
                amount_paid: job.amount_paid,
                total_outstanding: job.total_outstanding,
            }
        });
        const rows: any[] = (job_id !== "")
            ? jobs.filter((job: { id: string; }) => job.id === job_id)
            : jobs;

        return {
            rowCount: rows.length,
            rows: rows
        };
    },

    getJobsForClient: async (client_id: string) => {
        const data = await getMockData();
        const rows: any[] = (data.id !== client_id)
            ? []
            : data.jobs
                .map((job: { id: any; job_number: any; status: any; description: any; comments: any; amount_due: any; amount_paid: any; total_outstanding: any; }) => {
                return {
                    id: job.id,
                    job_number: job.job_number,
                    status: job.status,
                    description: job.description,
                    comments: job.comments,
                    amount_due: job.amount_due,
                    amount_paid: job.amount_paid,
                    total_outstanding: job.total_outstanding
                }
            });

        return {
            rowCount: rows.length,
            rows: rows
        };
    }
}