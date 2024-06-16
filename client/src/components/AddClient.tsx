import { createSignal } from 'solid-js';
import { A } from '@solidjs/router';

import Overlay from './Overlay';
import ClientForm from './ClientForm';

import "./componentStyles/AddClient.css"

export default function AddClient() {
  const placeholderDataStructure = {
    trading_as: "",
    company_name: "",
    abn: "",
    active: true,
    address: "",
    suburb: "",
    state: "",
    postcode: "",
    comments: "",
    total_outstanding: 0.00,
    client_contacts: [],
    jobs: [],
  }

  return (
    <>
      <A class='button-wrapper' href="/"><Overlay display={true} /></A>

      <div class='new-client-container'>
        <A class='button-wrapper' href="/"><button type='button' class='close-button'>X</button></A>
        <h2>Add New Client</h2>
        <div class='scroll-add'>
          <ClientForm editable={true} client={placeholderDataStructure} />
        </div>
        <button type='button' class=''>Save Changes</button>
      </div>
    </>
  );
}