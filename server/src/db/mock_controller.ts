/**
 * @file This file serves as a mock controller for any database operation required within the app.
 * @module dbController
 */

import fs from 'node:fs';
import path from 'node:path';
import { InputJob, OutputJob } from '../models/Job';
import { InputClient, OutputClient } from '../models/Client';


async function getMockData(): Promise<OutputClient> {
    const mockData = fs.readFileSync(path.join(__dirname, `mockData.json`), 'utf8');
    return JSON.parse(mockData);
}

export let dbController = {
    getClients: async () => {
        const data = await getMockData();
        const rows: OutputClient[] = [{
            id: data.id,
            company_name: data.company_name,
            trading_as: data.trading_as,
            abn: data.abn,
            active: data.active,
            address: data.address,
            suburb: data.suburb,
            state: data.state,
            postcode: data.postcode
        }];

        return {
            rowCount: rows.length,
            rows: rows
        };
    },

    getClient: async (client_id: string) => {
        const data = await getMockData();
        const rows: OutputClient[] = (data.id !== client_id)
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
        const jobs: OutputJob[] = (data.jobs || []).map((job: OutputJob) => {
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
        const rows = (job_id !== "")
            ? jobs.filter((job: OutputJob) => job.id === job_id)
            : jobs;

        return {
            rowCount: rows.length,
            rows: rows
        };
    },

    getJobsForClient: async (client_id: string) => {
        const data = await getMockData();
        const rows: OutputJob[] = (data.id !== client_id)
            ? []
            : (data.jobs || []).map((job: OutputJob) => {
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
    },

    addClient: async (_client: InputClient) => {
        const data = await getMockData();
        return {
            rowCount: 1,
            rows: [
                { id: data.id }
            ]
        };
    },

    updateClient: async (
        client_id: string,
        _client: InputClient
    ) => {
        const data = await getMockData();
        const rows = (data.id !== client_id)
            ? []
            : [{ id: client_id }];

        return {
            rowCount: rows.length,
            rows: rows
        };
    },

    addJob: async (job: InputJob) => {
        const data = await getMockData();
        const rows = (data.id !== job.client_id)
            ? []
            : [{ id: "eea06942-21c4-4486-8289-e0f4b030c6d6" }];

        return {
            rowCount: rows.length,
            rows: rows
        };
    },

    updateJob: async (
        job_id: string,
        _job: InputJob
    ) => {
        const data = await getMockData();
        const rows = (data.jobs || [])
            .filter((job: OutputJob) => job.id === job_id)
            .map((job: OutputJob) => { return { id: job.id } });

        return {
            rowCount: rows.length,
            rows: rows
        };
    },

    deleteJob: async (job_id: string) => {
        const data = await getMockData();
        const rows = (data.jobs || [])
            .filter((job: OutputJob) => job.id === job_id)
            .map((job: OutputJob) => { return { id: job.id } });

        return {
            rowCount: rows.length,
            rows: rows
        };
    }
}