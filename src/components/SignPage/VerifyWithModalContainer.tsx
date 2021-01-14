import React, { useContext, useEffect, useCallback } from "react";
import {
  VerifyWithModal,
  VerifyLoadingAlertContainer,
  LedgerModalContainer,
} from "../";
import { UserContext } from "../../contexts/UserContext";
import IconSDK from "../../apis/modules/iconSdk";
import IconexConnect, {
  RES_ADDRESS_EVENT,
  RES_JSON_RPC_EVENT,
} from "../../apis/modules/iconexConnect";
import { ModalContext } from "../../contexts/ModalContext";
import { AlertContext } from "../../contexts/AlertContext";
import { wait } from "../../utils";

interface Props {
  history: any;
}

const VerifyWithModalContainer: React.SFC<Props> = (props) => {
  const { history } = props;
  const {
    user: { username },
  } = useContext(UserContext);
  const { handleModal } = useContext(ModalContext);
  const { handleAlert } = useContext(AlertContext);

  // Common function for building raw transaction object
  const getRawTx = async (fromAddress: string, username: string) => {
    await wait(700);
    const rawTx = await IconSDK.buildVerifyRawTx(fromAddress, username);
    return JSON.stringify({
      jsonrpc: "2.0",
      method: "icx_sendTransaction",
      params: rawTx,
      id: 0,
    });
  };

  // Async callback For ICONex-connect
  const _requestAddressCallback = useCallback(
    async (address: string) => {
      const rawTx = await getRawTx(address, username);
      IconexConnect.requestTx(rawTx);
    },
    [username]
  );

  useEffect(() => {
    const handler = (res: any) => {
      try {
        const { type, payload } = res.detail;
        switch (type) {
          case RES_ADDRESS_EVENT: {
            _requestAddressCallback(payload);
            break;
          }
          case RES_JSON_RPC_EVENT: {
            if (payload.result) {
              handleModal();
              handleAlert(<VerifyLoadingAlertContainer history={history} />);
            } else {
              throw Error("Error occurred during the transaction.");
            }
            break;
          }
        }
      } catch (e) {
        console.error(e);
        alert(e.message);
      }
    };
    IconexConnect.startListen(handler);
    return () => {
      IconexConnect.stopListen(handler);
    };
  }, [_requestAddressCallback, handleAlert, handleModal, history, username]);

  const handleLedger = async () => {
    handleModal(<LedgerModalContainer history={history} />);
  };

  return (
    <VerifyWithModal
      handleIconex={() => IconexConnect.requestAddress()}
      handleLedger={handleLedger}
    />
  );
};

export default VerifyWithModalContainer;
