import { createEffect, createSignal, Show } from "solid-js";

import "./componentStyles/ResourceHandler.css"

export default function ResourceHandler(props: {
  children: any; loading: boolean; error: TypeError
}) {
  const [errMsg, setErrMsg] = createSignal("");

  createEffect(() => {
    if (!props.error) {
      return;
    }

    const errorMsg = props.error.message;
    console.error(errorMsg);
    if (props.error instanceof TypeError && (errorMsg.indexOf("NetworkError") !== -1 || errorMsg.indexOf("Failed to fetch") !== -1)) {
      setErrMsg("The CRM API Server does not appear to be running or is improperly configured.");
    }
    else {
      setErrMsg("An error with the request has occurred. Try refreshing the page and see if this solves the issue.");
    }
  });

  return (
    <>
      <Show when={props.loading}>
        <div class="res-container load-msg">
          <div class="loader"></div>
          <div>Loading...</div>
        </div>
      </Show>
      <Show when={props.error}>
        <div class="res-container error-msg">{errMsg()}</div>
      </Show>
      <Show when={!props.loading && !props.error}>
        {props.children}
      </Show>
    </>
  );
}