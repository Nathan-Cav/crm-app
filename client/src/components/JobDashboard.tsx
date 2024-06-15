import { createResource } from 'solid-js';
import ResourceHandler from './ResourceHandler';

// API Constants
const protocol = "http";
const hostname = "localhost";
const port = 3055;

const fetchClients = async () =>
  await fetch(`${protocol}://${hostname}:${port}/jobs`).then(res => {
    // Handle Response
    if (!res.ok) {
      throw new Error('RequestError');
    }
    return res.json();
  });

export default function ClientDashboard() {
  const [clients] = createResource(fetchClients);
  return (
    <>
      <ResourceHandler loading={clients.loading} error={clients.error}>
        <div>{JSON.stringify(clients(), null, 2)}</div>
      </ResourceHandler>
    </>
  );
}
