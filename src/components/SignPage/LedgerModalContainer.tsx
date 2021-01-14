import React, { useState, useCallback, useEffect, useContext } from "react";
import { LedgerModal } from "../";
import LedgerAPI from "../../apis/modules/iconLedger";
import { LedgerWallet } from "../../types";
import { ModalContext } from "../../contexts/ModalContext";
import { AlertContext } from "../../contexts/AlertContext";
import { LedgerSignAlertContainer } from "../";

interface Props {
  history: any;
}

const LedgerModalContainer: React.SFC<Props> = ({ history }) => {
  const { handleModal } = useContext(ModalContext);
  const { handleAlert } = useContext(AlertContext);
  const [wallets, setWallets] = useState<LedgerWallet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const getWallets = useCallback(
    async (pageIndex: number) => {
      try {
        setLoading(true);
        const _wallets = await LedgerAPI.getWallets(pageIndex);
        setWallets(_wallets);
      } catch (e) {
        console.error(e);
        alert(e.message);
        handleModal();
      } finally {
        setLoading(false);
      }
    },
    [handleModal]
  );

  const selectWallet = useCallback(
    (wallet: LedgerWallet) => {
      if (wallet.balance.eq(0)) {
        alert("This account has no balance.");
      } else {
        handleAlert(
          <LedgerSignAlertContainer wallet={wallet} history={history} />
        );
      }
    },
    [handleAlert, history]
  );

  useEffect(() => {
    getWallets(pageIndex);
  }, [getWallets, pageIndex]);

  return (
    <LedgerModal
      pageIndex={pageIndex}
      setPageIndex={setPageIndex}
      selectWallet={selectWallet}
      wallets={wallets}
      loading={loading}
    />
  );
};

export default LedgerModalContainer;
