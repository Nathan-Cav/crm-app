import { createResource, createSignal } from 'solid-js';
import { A, useParams } from "@solidjs/router";

import ResourceHandler from './components/ResourceHandler';

import "./styles/Client.css";
import ClientForm from './components/ClientForm';
import JobDisplay from './components/JobDisplay';

// API Constants
const protocol = "http";
const hostname = "localhost";
const port = 3055;

const fetchClient = async (clientId: string) =>
  await fetch(`${protocol}://${hostname}:${port}/clients/${clientId}`).then(res => {
    // Handle Response
    if (!res.ok) {
      throw new Error('RequestError');
    }
    return res.json();
  });

export default function Client() {
  const params = useParams();
  const [client, {refetch}] = createResource(params.clientId, fetchClient);

  const [beingEdited, setBeingEdited] = createSignal(false);
  const [editText, setEditText] = createSignal("Edit Client");

  const editClient = () => {
    if (beingEdited()) {
      // Then form is being saved
      setEditText("Edit Client");
    }
    else {
      // The form is being edited
      setEditText("Save Changes");

    }
    setBeingEdited(!beingEdited());
  }

  return (
    <>
      <div class="app-display">
        <ResourceHandler loading={client.loading} error={client.error}>
          <header>
            <div class='heading-button-container'>
              <A class='button-wrapper' href="/"><button type='button'>&lt;</button></A>
              <h2>{client().trading_as} ({client().company_name})</h2>
            </div>
            <button type='button' onClick={editClient}>{editText()}</button>
          </header>

          <div class='client-container'>
            <ClientForm client={client()} editable={beingEdited()} />

            <div class='client-jobs-container'>
              <div class='heading-button-container'>
                <h2>Jobs</h2>
                <A class='button-wrapper' href={`/client/${params.clientId}/addjob`}><button type='button'>+ Add Job</button></A>
              </div>
              <JobDisplay OnComponentStale={()=>refetch()} jobs={client().jobs} />
            </div>
          </div>
        </ResourceHandler >
      </div >
    </>
  );
}