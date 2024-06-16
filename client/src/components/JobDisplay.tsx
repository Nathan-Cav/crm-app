import { createEffect, createSignal, For, Show } from 'solid-js';
import { A, useLocation, useParams } from '@solidjs/router';

import AddEditJob from './AddEditJob';

import "./componentStyles/JobDisplay.css";

// API Constants
const protocol = "http";
const hostname = "localhost";
const port = 3055;

export default function JobDisplay(props: {
  OnComponentStale(): unknown;
  jobs: [{ id: string, job_number: number, status: string, description: string, comments: string, amount_due: number, amount_paid: number, total_outstanding: number, client_id?: string, company_name?: string, trading_as?: string, abn: string }];
}) {
  const params = useParams();
  const location = useLocation();

  const [jobId, setJobId] = createSignal("");
  const [root, setRoot] = createSignal("");
  const [add, setAdd] = createSignal(false);

  // Function to delete job
  const onJobDelete = async (jobId: string) => {
    if (!confirm("Are you sure you would like to delete this job?"))
      return;

    const url = `${protocol}://${hostname}:${port}/job/${jobId}`;
    const options  = { method: "DELETE" };
    await fetch(url, options)
      .then(res => {
        // Handle Response
        if (!res.ok) {
          throw new Error('RequestError');
        }
        return res.json();
      })
      .catch(error => {
        console.error(error);
        alert("Failed to delete job. Please try again later.");
      });

    // Create callback to parent to refresh the table
    props.OnComponentStale();
  }

  // Create an event for when a job_id is selected
  createEffect(() => {
    setJobId(params.jobId || "");
    if (params.clientId) {
      setRoot(`/client/${params.clientId}`);
    }
    else {
      setRoot("");
    }
  });

  // Check if we're adding a job
  createEffect(() => {
    if (location.pathname.indexOf("/addjob") !== -1) {
      setAdd(true);
    }
    else {
      setAdd(false);
    }
  });

  return (
    <>
      <Show when={jobId() !== "" || add()}>
        <AddEditJob root={root()} jobId={jobId()} />
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
                        <A class='button-wrapper' href={`${root()}/jobs/${job.id}`}><button type='button'>Edit</button></A>
                        <button type='button' onClick={()=>onJobDelete(job.id)}>Delete</button>
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