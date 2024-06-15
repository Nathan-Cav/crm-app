import { createEffect, createSignal, Show } from 'solid-js';
import { A, useLocation } from '@solidjs/router';

import ClientDashboard from './ClientDashboard';
import JobDashboard from './JobDashboard';

import "./componentStyles/DashboardDisplay.css";

export default function DashboardDisplay() {
  const location = useLocation();

  const [currentDisplay, setCurrentDisplay] = createSignal("clients");

  createEffect(() => {
    if (location.pathname.indexOf("/jobs") !== -1) {
      setCurrentDisplay("jobs")
    }
    else {
      setCurrentDisplay("clients");
    }
  });

  return (
    <>
      <div class='dashboard-container'>
        <nav>
          <A classList={{active: currentDisplay() === "clients"}} href='/'>Clients</A>
          <A classList={{active: currentDisplay() === "jobs"}} href='/jobs'>Jobs</A>
        </nav>
        <Show when={ currentDisplay() === "clients" }>
          <ClientDashboard />
        </Show>
        <Show when={ currentDisplay() === "jobs" }>
          <JobDashboard />
        </Show>
      </div>
    </>
  );
}
