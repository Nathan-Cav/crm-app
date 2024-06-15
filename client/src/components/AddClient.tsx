import { createSignal } from 'solid-js';
import Overlay from './Overlay';
import ClientForm from './ClientForm';

import "./componentStyles/AddClient.css"

export default function AddClient() {
  const [overlay, setOverlay] = createSignal(true);

  const toggleOverlay = () => { setOverlay(!overlay()) }

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
    client_contacts: [],
    jobs: [],
  }

  return (
    <>
      <Overlay display={overlay()} />

      <div class='new-client-container'>
        <button type='button' class='close-button'>X</button>
        <h2>Add New Client</h2>
        <div class='scroll-add'>
          <ClientForm editable={true} client={placeholderDataStructure} />
        </div>
        <button type='button' class=''>Save Changes</button>
      </div>
    </>
  );
}