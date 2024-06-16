import { createEffect, createSignal, Show } from 'solid-js';
import { A, useLocation } from '@solidjs/router';

import DashboardDisplay from './components/DashboardDisplay';
import AddClient from './components/AddClient';

export default function Dashboard() {
  const location = useLocation();

  const [add, setAdd] = createSignal(false);

  createEffect(() => {
    if (location.pathname.indexOf("/add") !== -1) {
      setAdd(true);
    }
    else {
      setAdd(false);
    }
  });

  return (
    <>
      <div class="app-display">
        <header>
          <h2>CRM System</h2>
          <A class='button-wrapper' href="/add"><button type='button'>+ Add Client</button></A>
        </header>

        <DashboardDisplay />

        <Show when={add()}>
          <AddClient />
        </Show>

      </div>
    </>
  );
}