import { createSignal } from 'solid-js';

import { ClientDisplay } from './ClientDisplay';
import { JobDisplay } from './JobDisplay';

export function DashboardDisplay() {
  // const [count, setCount] = createSignal(0);

  return (
    <>
      <input type='text' placeholder='Add a Todo'/>
    </>
  );
}
