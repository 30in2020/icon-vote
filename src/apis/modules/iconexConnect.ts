const _REQ_EVENT = "ICONEX_RELAY_REQUEST";
const _RES_EVENT = "ICONEX_RELAY_RESPONSE";

const _REQ_ADDRESS_EVENT = "REQUEST_ADDRESS";
export const RES_ADDRESS_EVENT = "RESPONSE_ADDRESS";
const _REQ_JSON_RPC_EVENT = "REQUEST_JSON-RPC";
export const RES_JSON_RPC_EVENT = "RESPONSE_JSON-RPC";

const startListen = (handler: (payload: any) => void) => {
  window.addEventListener(_RES_EVENT, handler);
};

const stopListen = (handler: (payload: any) => void) => {
  window.removeEventListener(_RES_EVENT, handler);
};

const requestAddress = () => {
  const customEvent = new CustomEvent(_REQ_EVENT, {
    detail: {
      type: _REQ_ADDRESS_EVENT,
    },
  });
  window.dispatchEvent(customEvent);
};

const requestTx = (rawTx: string) => {
  const customEvent = new CustomEvent(_REQ_EVENT, {
    detail: {
      type: _REQ_JSON_RPC_EVENT,
      payload: JSON.parse(rawTx),
    },
  });
  window.dispatchEvent(customEvent);
};

export default {
  startListen,
  stopListen,
  requestAddress,
  requestTx,
};
