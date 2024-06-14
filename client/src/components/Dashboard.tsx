import { createSignal } from 'solid-js';

import { DashboardDisplay } from './DashboardDisplay';

function Dashboard() {
  return (
    <>
      <div class="app-display">
        <header>
          <h2>CRM System</h2>
          <button type='button'>+ Add Client</button>
        </header>

        <DashboardDisplay />

      </div>

    </>
  );
}

export default Dashboard;
