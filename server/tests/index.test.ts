import { api_functions } from "../src/api_functions";

describe('testing index file', () => {

    test('Client ID must be UUID', () => {
        api_functions.apiGetClient("Not a UUID")
            .then(res => expect(true).toBe(false))
            .catch(error => {
                expect(error.status).toBe(400);
            });
    });

    test('Job ID must be UUID', () => {
        api_functions.apiGetJob("Not a UUID")
            .then(res => expect(true).toBe(false))
            .catch(error => {
                expect(error.status).toBe(400);
            });
    });

    test('Client ID not in system', () => {
        api_functions.apiGetClient("481f2204-50ba-4242-b6ef-2b1de217ce18")
            .then(res => expect(true).toBe(false))
            .catch(error => {
                expect(error.status).toBe(404);
            });
    });

    test('Job ID not in system', () => {
        api_functions.apiGetJob("481f2204-50ba-4242-b6ef-2b1de217ce18")
            .then(res => expect(true).toBe(false))
            .catch(error => {
                expect(error.status).toBe(404);
            });
    });

    test('Job Data', () => {
        api_functions.apiGetClient("33ed8cd8-c705-4d61-b7d4-f28159824c6f")
            .then(res => {
                const jobs = res.jobs;
                jobs.forEach((job: any) => {
                    expect(typeof job.amount_due).toBe("number");
                    expect(typeof job.amount_paid).toBe("number");
                    expect(typeof job.total_outstanding).toBe("number");
                    expect(job.total_outstanding).toBe(job.amount_due - job.amount_paid);
                });
            })
            .catch(error => {
                console.error(error.message);
                expect(true).toBe(false);
            });
    });
});