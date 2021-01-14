import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import { Divider } from "../../components";
import IconexIcon from "../../assets/iconex-icon@2x.png";
import LedgerIcon from "../../assets/ledger-icon@2x.png";

interface Props {
  handleIconex: () => void;
  handleLedger: () => void;
}

const VerifyWithModal: React.SFC<Props> = (props) => {
  const classes = useStyles();
  const { handleIconex, handleLedger } = props;

  const components = [
    <VerifyTypeCard
      title={"ICONex extension"}
      icon={IconexIcon}
      onClick={() => handleIconex()}
    />,
    <VerifyTypeCard
      title={"Ledger wallet"}
      icon={LedgerIcon}
      onClick={() => handleLedger()}
    />,
  ];

  return (
    <div className={classes.wrap}>
      <header>
        <h3>Verify with:</h3>
      </header>
      <div className={classes.content}>
        <Divider width={"100%"} components={components} />
        <p className={classes.text}>
          You’ll need to sign a transaction to verify your address.
          <br />
          It will cost a small fee.
        </p>
      </div>
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    width: 666,
    [theme["breakpoint-sm"]]: {
      width: 500,
    },
    [theme["breakpoint-xs"]]: {
      width: "100%",
      "& h3": {
        fontSize: "2.6rem!important",
      },
    },
  },
  content: {},
  text: {
    color: theme.secondary1,
    textAlign: "center",
    paddingTop: 30,
  },
}));

interface VerifyTypeCardProps {
  title: string;
  icon: string;
  onClick: () => void;
}

const VerifyTypeCard: React.SFC<VerifyTypeCardProps> = (props) => {
  const classes = useVerifyTypeCardStyles(props);
  const { title, onClick } = props;

  return (
    <div onClick={() => onClick()} className={classes.wrap}>
      <p className={classes.title}>{title}</p>
    </div>
  );
};

const useVerifyTypeCardStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    width: 285,
    height: 148,
    padding: 24,
    textAlign: "center",
    color: theme.secondary1,
    backgroundColor: theme.mono1,
    backgroundImage: (props: VerifyTypeCardProps) => `url(${props.icon})`,
    backgroundSize: "53px 53px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 27px",
    border: `1px solid ${theme.dim}`,
    borderRadius: 10,
    "&:hover": {
      opacity: 0.8,
    },
    [theme["breakpoint-sm"]]: {
      width: 220,
    },
    [theme["breakpoint-xs"]]: {
      height: 110,
      padding: 12,
      backgroundSize: "40px 40px",
      backgroundPosition: "center 20px",
      "&:first-of-type": {
        marginBottom: -20,
      },
      "&:last-of-type": {
        marginTop: -10,
      },
    },
  },
  title: {
    fontWeight: theme.bold,
    fontSize: "2.4rem",
    [theme["breakpoint-sm"]]: {
      fontSize: "1.8rem",
    },
  },
}));

export default VerifyWithModal;
