import { createSignal } from 'solid-js';
import { useParams } from "@solidjs/router";

function ClientDisplay() {
  const params = useParams();

  const goBack = () => { location.href = '/'; };

  return (
    <>
      <div class="app-display">
        {/* <a href='/'>Go Back!</a> */}
        <header>
          <div class='back-container'>
            <button type='button' onClick={goBack}>&lt;</button>
            <h2>Client Stuff</h2>
          </div>
        </header>

        <div>{ params.clientId }</div>

      </div>
    </>
  );
}

export default ClientDisplay;
