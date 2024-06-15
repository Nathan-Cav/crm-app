import { createSignal, Show } from 'solid-js';

import DashboardDisplay from './components/DashboardDisplay';
import AddClient from './components/AddClient';

export default function Dashboard() {
  // const add = (window.location.href.split("/").pop() === "add");

  const [add, setAdd] = createSignal(
    false
    // (window.location.href.split("/").pop() === "add")
  );

  const goToAdd = () => {
    setAdd(!add())
  };

  return (
    <>
      <div class="app-display">
        <header>
          <h2>CRM System</h2>
          <button type='button' onClick={goToAdd}>+ Add Client</button>
        </header>

        <DashboardDisplay />

        <Show when={add()}>
          <AddClient />
        </Show>

      </div>
    </>
  );
}