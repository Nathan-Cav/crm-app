import { createEffect, createResource, createSignal, For, Show } from 'solid-js';
import ResourceHandler from './ResourceHandler';
import { A, useParams } from '@solidjs/router';

import AddEditJob from './AddEditJob';

import "./componentStyles/JobDashboard.css";

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
  const params = useParams();
  const [jobs] = createResource(fetchJobs);
  const [jobId, setJobId] = createSignal("");

  // Create an event for when a job_id is selected
  createEffect(() => {
    setJobId(params.jobId || "");
  });

  return (
    <>
      <Show when={jobId() !== ""}>
        <AddEditJob jobId={jobId()} />
      </Show>
      <ResourceHandler loading={jobs.loading} error={jobs.error}>
        {/* <div>{JSON.stringify(jobs(), null, 2)}</div> */}

        <div class='job-listing-container'>
          <table class='job-table'>
            <thead>
              <tr>
                <th class='job-number-cell'>Job No.</th>
                <th class='status-cell'>Status</th>
                <th>Details</th>
                <th class="button-cell"></th>
              </tr>
            </thead>
            <tbody>
              <For each={jobs()}>
                {(job) =>
                  <tr>
                    <td class='job-number-cell'>{job.job_number}</td>
                    <td class='status-cell'>
                      <div class='status-container'>
                        <div class='dom'>{job.status}</div>
                        <div class='outstanding'>{(job.status !== "In Progress" && job.total_outstanding > 0) ? `($${job.total_outstanding.toFixed(2)} still outstanding)` : ""}</div>
                        <div class='sub'>{job.trading_as} ({job.company_name})</div>
                      </div>
                    </td>
                    <td class='comment-cell'>
                      <div class='comment-container'>
                        <div class='h6'>{job.description}</div>
                        <Show when={job.comments}>
                          <hr />
                          <div class='comment'>{job.comments || ""}</div>
                        </Show>
                      </div>
                    </td>
                    <td class="button-cell">
                      <div class='job-buttons'>
                        <A class='button-wrapper' href={`/jobs/${job.id}`}><button type='button'>Edit</button></A>
                        <A class='button-wrapper' href=""><button type='button'>Delete</button></A>
                      </div>
                    </td>
                  </tr>
                }
              </For>
            </tbody>
          </table>
        </div>
      </ResourceHandler >
    </>
  );
}