import { createEffect, createResource, createSignal, For } from 'solid-js';
import ResourceHandler from './ResourceHandler';
import { A } from '@solidjs/router';

import "./componentStyles/ClientDashboard.css";

// API Constants
const protocol = "http";
const hostname = "localhost";
const port = 3055;

const fetchClients = async () =>
  await fetch(`${protocol}://${hostname}:${port}/clients`).then(res => {
    // Handle Response
    if (!res.ok) {
      throw new Error('RequestError');
    }
    return res.json();
  });

export default function ClientDashboard() {
  const [clients] = createResource(fetchClients);
  const [filterInactive, setFilterInactive] = createSignal(false);

  return (
    <>
      <ResourceHandler loading={clients.loading} error={clients.error}>
        <div class='filter-container'>
          <label for='filter_inactive'><input type='checkbox' id='filter_inactive' onChange={(e) => setFilterInactive(e.target.checked)}/> <span>Show Inactive</span></label>
        </div>

        <div>{JSON.stringify(clients(), null, 2)}</div>
        <div class='client-container'>
          <For each={clients().filter((client: { active: boolean; }) => client.active || filterInactive())}>
            {(client) =>
              <div class='client' classList={{inactive: client.active}}>
                <A href={`/client/${client.id}`}>{client.trading_as} ({client.company_name})</A>
                <div>ABN {client.abn}</div>
                <div>{client.address}, {client.suburb}, {client.state} {client.postcode}</div>
              </div>
            }
          </For>
        </div>
      </ResourceHandler>
    </>
  );
}