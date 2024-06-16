import { createResource } from 'solid-js';
import ResourceHandler from './ResourceHandler';

import JobDisplay from './JobDisplay';

// API Constants
const protocol = "http";
const hostname = "localhost";
const port = 3055;

const fetchJobs = async () =>
  await fetch(`${protocol}://${hostname}:${port}/jobs`).then(res => {
    // Handle Response
    if (!res.ok) {
      throw new Error('RequestError');
    }
    return res.json();
  });

export default function JobDashboard() {
  const [jobs, {refetch}] = createResource(fetchJobs);
  return (
    <>
      <ResourceHandler loading={jobs.loading} error={jobs.error}>
        <JobDisplay OnComponentStale={()=>refetch()} jobs={jobs()} />
      </ResourceHandler >
    </>
  );
}