import { For, JSX, Show } from 'solid-js';

import JobDisplay from './JobDisplay';

import "./componentStyles/ClientForm.css"

export default function ClientForm(props: {
  editable: boolean; includeJobs: boolean; client: {
    total_outstanding: number; trading_as: string; company_name: string; abn: string; active: boolean; address: string; suburb: string; state: string; postcode: string; comments: string; client_contacts: any[]; jobs: any;
  };
}) {
  return (
    <>
      <form>
        <div class='client-form'>
          <h2>Business Details</h2>

          <div class='client-fields'>
            <Show when={props.editable}>
              <div class="client-field">
                <label for="trading_as">
                  <span>Trading As</span>
                  <input type='text' id='trading_as' disabled={!props.editable} value={props.client.trading_as} />
                </label>
              </div>
              <div class="client-field">
                <label for="company_name">
                  <span>Company Name</span>
                  <input type='text' id='company_name' disabled={!props.editable} value={props.client.company_name} />
                </label>
              </div>
            </Show>

            <div class="client-field">
              <label for="active">
                <span>Client Status</span>
                <select id='active' disabled={!props.editable} value={(props.client.active) ? "true" : "false"}>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </label>
            </div>
            <Show when={!props.editable}>
              <div class="client-field">
                <label for="total_outstanding">
                  <span>Total Outstanding</span>
                  <input type='text' id='total_outstanding' disabled={true} value={`$${props.client.total_outstanding.toFixed(2)}`} />
                </label>
              </div>
            </Show>
            <div class="client-field">
              <label for="company_name">
                <span>ABN</span>
                <input type='text' disabled={!props.editable} value={props.client.abn} />
              </label>
            </div>
            <div class="client-field">
              <label for="address">
                <span>Address</span>
                <input type='text' id='address' disabled={!props.editable} value={props.client.address} />
              </label>
            </div>
            <div class="client-field">
              <label for="suburb">
                <span>Suburb</span>
                <input type='text' id='suburb' disabled={!props.editable} value={props.client.suburb} />
              </label>
            </div>
            <div class="client-field">
              <label for="state">
                <span>State</span>
                <select id='state' disabled={!props.editable} value={props.client.state}>
                  <option value="" hidden={true} disabled={true}>Please Select a State</option>
                  <option value="QLD">Queensland</option>
                  <option value="NSW">New South Wales</option>
                  <option value="ACT">Australian Capital Territory</option>
                  <option value="VIC">Victoria</option>
                  <option value="TAS">Tasmania</option>
                  <option value="SA">South Australia</option>
                  <option value="WA">Western Australia</option>
                  <option value="NT">Northern Territory</option>
                </select>
              </label>
            </div>
            <div class="client-field">
              <label for="postcode">
                <span>Postcode</span>
                <input type='text' id='postcode' disabled={!props.editable} value={props.client.postcode} />
              </label>
            </div>
            <div class="client-field">
              <label for="comments">
                <span>Comments</span>
                <textarea id='comments' disabled={!props.editable}>{props.client.comments}</textarea>
              </label>
            </div>

            <div class='contact-container'>
              <h3>Client Contact Details</h3>
              <Show when={props.client.client_contacts.length <= 0}>
                <h5 class='none-found'>No Contact Details to Display</h5>
              </Show>
              <Show when={props.client.client_contacts.length > 0}>
                <table>
                  <thead>
                    <tr>
                      <th>Point of Contact</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    <For each={props.client.client_contacts}>
                      {(contact) =>
                        <tr>
                          <td>
                            <input type='text' class='contact-name' placeholder='Name' disabled={!props.editable} value={contact.name} /><br />
                            <input type='text' class='contact-pos' placeholder='Job Position' disabled={!props.editable} value={contact.position} />
                          </td>
                          <td><input type='email' class='contact-email' disabled={!props.editable} value={contact.email} /></td>
                          <td><input type='phone' class='contact-phone' disabled={!props.editable} value={contact.phone_number} /></td>
                          <td><textarea class='contact-comments' disabled={!props.editable}>{contact.comments}</textarea></td>
                        </tr>
                      }
                    </For>
                  </tbody>
                </table>
              </Show>
            </div>
            <Show when={props.editable}>
              <button type='button'>+ Add</button>
            </Show>
          </div>
        </div>
      </form>

      <Show when={props.includeJobs}>
        <div class='client-jobs-container'>
          <div class='heading-button-container'>
            <h2>Jobs</h2>
            <button type='button' class='add-button'>+ Add Job</button>
          </div>
          {/* <hr /> */}
          <JobDisplay jobs={props.client.jobs} />
        </div>
      </Show>

    </>
  );
}