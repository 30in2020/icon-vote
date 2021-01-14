import React, { useCallback, useState, useContext, useEffect } from "react";
import LedgerAPI from "../../apis/modules/iconLedger";

import { LedgerSignAlert } from "..";
import { AlertContext } from "../../contexts/AlertContext";
import { LedgerWallet } from "../../types";
import { UserContext } from "../../contexts/UserContext";
import IconSdk from "../../apis/modules/iconSdk";
import VerifyLoadingAlertContainer from "./VerifyLoadingAlertContainer";

interface Props {
  wallet: LedgerWallet;
  history: any;
}

const LedgerSignAlertContainer: React.SFC<Props> = (props) => {
  const {
    user: { username },
  } = useContext(UserContext);
  const { handleAlert } = useContext(AlertContext);
  const [isSigned, setIsSigned] = useState<boolean>(false);
  const [signedTx, setSignedTx] = useState<any>(null);
  const { wallet, history } = props;

  const requestSigning = useCallback(async () => {
    try {
      const rawTx = await IconSdk.buildVerifyRawTx(wallet.address, username);
      const signedTx = await LedgerAPI.signTransaction(wallet.path, rawTx);
      setSignedTx(signedTx);
      setIsSigned(true);
    } catch (e) {
      console.error(e);
      alert("Error occurred during signing. Please try again.");
      handleAlert();
    }
  }, [handleAlert, username, wallet.address, wallet.path]);

  const handleConfirm = useCallback(async () => {
    try {
      const tx = await IconSdk.sendTransaction(signedTx);
      if (!!tx) {
        handleAlert(<VerifyLoadingAlertContainer history={history} />);
      } else {
        throw Error();
      }
    } catch (e) {
      console.error(e);
      alert("Error occurred during the transaction. Please try again.");
      handleAlert();
    }
  }, [handleAlert, history, signedTx]);

  useEffect(() => {
    requestSigning();
  }, [requestSigning]);

  return <LedgerSignAlert isSigned={isSigned} handleConfirm={handleConfirm} />;
};

export default LedgerSignAlertContainer;
