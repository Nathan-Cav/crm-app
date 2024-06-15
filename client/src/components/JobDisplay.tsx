import { createEffect, createSignal, For, Show } from 'solid-js';
import { A, useParams } from '@solidjs/router';

import AddEditJob from './AddEditJob';

import "./componentStyles/JobDisplay.css";

export default function JobDisplay(props: {
  jobs: [{ id: string, job_number: number, status: string, description: string, comments: string, amount_due: number, amount_paid: number, total_outstanding: number, client_id?: string, company_name?: string, trading_as?: string, abn: string }];
}) {
  const params = useParams();
  const [jobId, setJobId] = createSignal("");

  // Create an event for when a job_id is selected
  // TODO account for this being on two separate pages
  createEffect(() => {
    setJobId(params.jobId || "");
  });

  return (
    <>
      <Show when={jobId() !== ""}>
        <AddEditJob jobId={jobId()} />
      </Show>
      <div class='job-listing-container'>
        <Show when={props.jobs.length <= 0}>
          <h5 class='none-found'>No Jobs to Display</h5>
        </Show>
        <Show when={props.jobs.length > 0}>
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
              <For each={props.jobs}>
                {(job) =>
                  <tr>
                    <td class='job-number-cell'>{job.job_number}</td>
                    <td class='status-cell'>
                      <div class='status-container'>
                        <div class='dom'>{job.status}</div>
                        <div class='outstanding'>{(job.status !== "In Progress" && job.total_outstanding > 0) ? `($${job.total_outstanding.toFixed(2)} still outstanding)` : ""}</div>
                        <Show when={job.client_id}>
                          <div class='sub'>{job.trading_as} ({job.company_name})</div>
                        </Show>
                      </div>
                    </td>
                    <td class='comment-cell'>
                      <div class='comment-container'>
                        <div class='h6'>{job.description}</div>
                        <hr />
                        <Show when={job.comments}>
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
        </Show>
      </div>
    </>
  );
}