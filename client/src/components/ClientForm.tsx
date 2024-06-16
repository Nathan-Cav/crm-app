import { createEffect, For, Show } from 'solid-js';

import "./componentStyles/ClientForm.css"

export default function ClientForm(props: {
  editable: boolean; client: {
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
                  <input required={true} type='text' id='trading_as' name='trading_as' disabled={!props.editable} value={props.client.trading_as} />
                </label>
              </div>
              <div class="client-field">
                <label for="company_name">
                  <span>Company Name</span>
                  <input required={true} type='text' id='company_name' name='company_name' disabled={!props.editable} value={props.client.company_name} />
                </label>
              </div>
            </Show>

            <div class="client-field">
              <label for="active">
                <span>Client Status</span>
                <select required={true} id='active' name='active' disabled={!props.editable} value={(props.client.active) ? "true" : "false"}>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </label>
            </div>
            <Show when={!props.editable}>
              <div class="client-field">
                <label for="total_outstanding">
                  <span>Total Outstanding</span>
                  <input required={true} type='text' id='total_outstanding' name='total_outstanding' disabled={true} value={`$${props.client.total_outstanding.toFixed(2)}`} />
                </label>
              </div>
            </Show>
            <div class="client-field">
              <label for="abn">
                <span>ABN</span>
                <input required={true} type='text' id="abn" name='abn' disabled={!props.editable} value={props.client.abn} />
              </label>
            </div>
            <div class="client-field">
              <label for="address">
                <span>Address</span>
                <input required={true} type='text' id='address' name='address' disabled={!props.editable} value={props.client.address} />
              </label>
            </div>
            <div class="client-field">
              <label for="suburb">
                <span>Suburb</span>
                <input required={true} type='text' id='suburb' name='suburb' disabled={!props.editable} value={props.client.suburb} />
              </label>
            </div>
            <div class="client-field">
              <label for="state">
                <span>State</span>
                <select required={true} id='state' name='state' disabled={!props.editable} value={props.client.state}>
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
                <input required={true} type='text' id='postcode' name='postcode' disabled={!props.editable} value={props.client.postcode} />
              </label>
            </div>
            <div class="client-field">
              <label for="comments">
                <span>Comments</span>
                <textarea required={true} id='comments' name='comments' disabled={!props.editable}>{props.client.comments}</textarea>
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
                      <Show when={props.editable}>
                        <th></th>
                      </Show>
                    </tr>
                  </thead>
                  <tbody>
                    <For each={props.client.client_contacts}>
                      {(contact, i) =>
                        <tr>
                          <td>
                            <input required={true} name={`contact_name_${i()}`} type='text' class='contact-name' placeholder='Name' disabled={!props.editable} value={contact.name} /><br />
                            <input name={`contact_position_${i()}`} type='text' class='contact-pos' placeholder='Job Position' disabled={!props.editable} value={contact.position} />
                          </td>
                          <td><input required={true} name={`contact_email_${i()}`} type='email' class='contact-email' disabled={!props.editable} value={contact.email} /></td>
                          <td><input required={true} name={`contact_phone_${i()}`} type='phone' class='contact-phone' disabled={!props.editable} value={contact.phone_number} /></td>
                          <td><textarea name={`contact_comments_${i()}`} required={true} class='contact-comments' disabled={!props.editable}>{contact.comments}</textarea></td>
                          <Show when={props.editable}>
                            <td>
                              <div class='delete-container'>
                                <button type='button'>Delete</button>
                              </div>
                            </td>
                          </Show>
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
    </>
  );
}