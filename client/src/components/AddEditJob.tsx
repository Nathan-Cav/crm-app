import { createSignal, JSX } from 'solid-js';
import Overlay from './Overlay';

export default function AddEditJob(props: { jobId?: string; }) {
  // const [count, setCount] = createSignal(0);

  return (
    <>
      <Overlay display={true} />
      <div>{props.jobId}</div>
    </>
  );
}
