import { createSignal } from 'solid-js';
import Overlay from './Overlay';

export default function AddClient() {
  const [overlay, setOverlay] = createSignal(true);

  const toggleOverlay = () => { setOverlay(!overlay()) }

  return (
    <>
      {/* <button type='button' onClick={toggleOverlay}>Test</button> */}
      <Overlay display={overlay()} />
    </>
  );
}
