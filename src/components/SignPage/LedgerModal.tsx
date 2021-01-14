import React, { SetStateAction } from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import { truncateHash } from "../../utils";
import Config from "../../constants/config";
import { convertICXValueToString } from "../../utils/convert";
import { LedgerWallet } from "../../types";
import Pagination from "../common/Pagination";
import Loader from "../common/Loader";

interface Props {
  wallets: LedgerWallet[];
  pageIndex: number;
  setPageIndex: React.Dispatch<SetStateAction<number>>;
  selectWallet: (wallet: LedgerWallet) => void;
  loading: boolean;
}

const LedgerModal: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const { loading, wallets, pageIndex, setPageIndex, selectWallet } = props;

  if (loading) {
    return (
      <div className={classes.wrap}>
        <Loader height="278px" />
        <p className={classes.text}>
          Please connect the Ledger wallet and wait a few seconds...
        </p>
      </div>
    );
  }
  return (
    <div className={classes.wrap}>
      <header>
        <h3>Ledger Wallets</h3>
      </header>
      <div className={classes.content}>
        <table className={classes.table}>
          <thead className={classes.thead}>
            <tr className={classes.thead__tr}>
              <th className={classes.thead__th}>Path</th>
              <th className={classes.thead__th}>Address</th>
              <th className={classes.thead__th}>Balance</th>
              <th className={classes.thead__th}></th>
            </tr>
          </thead>
          <tbody className={classes.tbody}>
            {wallets.map((wallet: LedgerWallet) => {
              return (
                <tr key={wallet.path} className={classes.tbody__tr}>
                  <td className={classes.tbody__td}>{wallet.path}</td>
                  <td className={classes.tbody__td}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`${Config.TRACKER_URL}address/${wallet.address}`}
                    >
                      {truncateHash(wallet.address)}
                    </a>
                  </td>
                  <td className={classes.tbody__td}>{`${convertICXValueToString(
                    wallet.balance
                  )} ICX`}</td>
                  <td
                    onClick={() => selectWallet(wallet)}
                    className={classes.tbody__td}
                  >
                    Select
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination pageIndex={pageIndex} changePage={setPageIndex} />
      </div>
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    width: 900,
    [theme["breakpoint-md"]]: {
      width: 760,
    },
    "& h3": {
      fontSize: "2.6rem!important",
    },
  },
  text: {
    marginBottom: 40,
    fontWeight: theme.bold,
    color: theme.secondary1,
    fontSize: "2.2rem",
    textAlign: "center",
  },
  content: {},
  table: {
    display: "block",
    textAlign: "left",
    width: "100%",
    borderCollapse: "collapse",
  },
  thead: {
    display: "block",
  },
  thead__tr: {
    fontWeight: theme.bold,
    fontSize: "2.4rem",
    color: theme.secondary1,
    borderBottom: `1px solid ${theme.dim}`,
    width: "100%",
    display: "flex",
  },
  thead__th: {
    paddingBottom: 16,
    "&:nth-of-type(1)": {
      width: "22%",
    },
    "&:nth-of-type(2)": {
      width: "38%",
    },
    "&:nth-of-type(3)": {
      width: "30%",
    },
    "&:nth-of-type(4)": {
      width: "10%",
    },
    [theme["breakpoint-md"]]: {
      fontSize: "1.8rem",
    },
    [theme["breakpoint-sm"]]: {
      fontSize: "1.6rem",
    },
  },
  tbody: {
    display: "block",
    height: 210,
    overflowY: "auto",
    overflowX: "hidden",
    paddingTop: 25,
  },
  tbody__tr: {
    height: 36,
    width: "100%",
    display: "flex",
  },
  tbody__td: {
    color: theme.primary1,
    fontSize: "1.8rem",
    fontWeight: theme.semiBold,
    letterSpacing: "-0.01rem",
    "&:nth-of-type(1)": {
      width: "22%",
    },
    "&:nth-of-type(2)": {
      width: "38%",
    },
    "&:nth-of-type(3)": {
      width: "30%",
    },
    "&:nth-of-type(4)": {
      width: "10%",
      cursor: "pointer",
    },
    [theme["breakpoint-md"]]: {
      fontSize: "1.4rem",
    },
    [theme["breakpoint-sm"]]: {
      fontSize: "1.2rem",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
  },
}));

export default LedgerModal;
