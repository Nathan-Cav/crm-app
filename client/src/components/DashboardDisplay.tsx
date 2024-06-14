import { createSignal } from 'solid-js';

import { ClientContainer } from './ClientContainer';
import { JobContainer } from './JobContainer';

export function DashboardDisplay() {
  // const [count, setCount] = createSignal(0);

  return (
    <>
      <input type='text' placeholder='Add a Todo'/>
    </>
  );
}
