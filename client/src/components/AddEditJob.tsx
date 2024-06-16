import { A } from '@solidjs/router';

import Overlay from './Overlay';

import "./componentStyles/AddEditJob.css"


export default function AddEditJob(props: { jobId?: string; root: string }) {
  const root = props.root || "/jobs";
  const addEditText = (props.jobId) ? "Edit" : "Add New";

  return (
    <>
      <A class='button-wrapper' href={root}><Overlay display={true} /></A>

      <div class='new-client-container'>
        <A class='button-wrapper' href={root}><button type='button' class='close-button'>X</button></A>
        <h2>{addEditText} Job</h2>
        <div class='scroll-add'>

        </div>
        <button type='button' class=''>Save Changes</button>
      </div>
    </>
  );
}
