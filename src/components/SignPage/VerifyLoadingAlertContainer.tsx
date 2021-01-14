import React, { useCallback, useState, useContext, useEffect } from "react";
import VerifyLoadingAlert from "./VerifyLoadingAlert";
import { UserContext } from "../../contexts/UserContext";
import { AlertContext } from "../../contexts/AlertContext";
import Query from "../../apis/query";
import iconSDK from "../../apis/modules/iconSdk";
import Mutation from "../../apis/mutation";

interface Props {
  history: any;
}

const VerifyLoadingAlertContainer: React.SFC<Props> = (props) => {
  const { history } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const {
    user: { username },
  } = useContext(UserContext);
  const { handleAlert } = useContext(AlertContext);

  const handleConfirm = useCallback(
    (e) => {
      e.preventDefault();
      handleAlert();
      if (!error) {
        history.push("/");
      }
    },
    [error, handleAlert, history]
  );

  const requestVerify = useCallback(async () => {
    try {
      setLoading(true);
      const { preps } = await iconSDK.governanceCall("getPReps", {});
      const result = await new Promise((resolve) => {
        let count = 0;
        const interval = setInterval(() => {
          Query.getVerifyInfoById({
            _id: username,
          }).then(async (res) => {
            console.log(res.address);
            if (!!res.address) {
              for (const { address } of preps) {
                if (res.address === address) {
                  console.log(res.address, address);
                  await Mutation.setPRep({ iconAddress: res.address });
                  resolve(true);
                  clearInterval(interval);
                }
              }
              await Mutation.addIconAddress({ IconAddress: res.address });
              resolve(true);
              clearInterval(interval);
            }
          });
          count++;
          if (count === 10) {
            resolve(false);
            clearInterval(interval);
          }
        }, 1000);
      });

      if (!result) {
        throw Error("NO_RESULT");
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
      setError(e.message);
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    requestVerify();
  }, [requestVerify]);

  return (
    <VerifyLoadingAlert
      loading={loading}
      error={error}
      handleConfirm={handleConfirm}
    />
  );
};

export default VerifyLoadingAlertContainer;
