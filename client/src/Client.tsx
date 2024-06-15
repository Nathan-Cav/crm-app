import { createResource, createSignal } from 'solid-js';
import { A, useParams } from "@solidjs/router";

import AddEditJob from './components/AddEditJob';
import ResourceHandler from './components/ResourceHandler';

import "./styles/Client.css";

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
  const [client] = createResource(params.clientId, fetchClient);

  return (
    <>
      <div class="app-display">
        <header>
          <div class='back-container'>
            <A class='button-wrapper' href="/"><button type='button'>&lt;</button></A>
            <h2>Client Stuff</h2>
          </div>
        </header>

        <ResourceHandler loading={client.loading} error={client.error}>
          <div>{JSON.stringify(client(), null, 2)}</div>
          <div class='client-container'>
            {/* <For each={client()}>
            {(client) =>
              <div>
                <A href={`/client/${client.id}`}>{client.trading_as} ({client.company_name})</A>
              </div>
            }
          </For> */}
          </div>
        </ResourceHandler>

      </div>
    </>
  );
}