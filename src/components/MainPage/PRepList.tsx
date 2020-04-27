import React from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import { ThemeType } from "../../styles/theme";
import search2x from "../../assets/search@2x.png";
import { SubTitle } from "../";

const usePRepItemStyles = createUseStyles((theme: ThemeType) => ({
  pRep: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: `10px ${theme.gap}px`,
    color: theme.secondary1,
    borderRadius: 10,
    "&:hover": {
      background: theme.primary1,
      color: theme.mono1,
    },
  },
  "right-item": {
    display: "flex",
    fontWeight: theme.bold,
    "& p": {
      width: 124,
      textAlign: "right",
    },
  },
}));

interface PRepItemProps {
  name: string;
  openCnt: number;
  closeCnt: number;
  link: string;
}

const PRepItem: React.SFC<PRepItemProps> = (props) => {
  const classes = usePRepItemStyles(props);
  const { link, openCnt, closeCnt, name } = props;
  return (
    <Link to={link}>
      <div className={classes.pRep}>
        <p>{name}</p>
        <div className={classes["right-item"]}>
          <p>{openCnt}</p>
          <p>{closeCnt}</p>
        </div>
      </div>
    </Link>
  );
};

interface PRepListProps {}

const usePRepListStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    marginTop: 42,
    marginBottom: 60,
  },
  searchBar: {
    width: "100%",
    backgroundColor: theme.secondary3,
    background: `url(${search2x}) ${theme.gap}px center no-repeat`,
    backgroundSize: "18px 18px",
    fontFamily: theme.font,
    fontWeight: theme.bold,
    padding: `10px ${theme.gap}px`,
    borderRadius: 20,
    marginBottom: 40,
    "& input": {
      width: "98%",
      marginLeft: theme.gap,
      color: theme.secondary2,
    },
    "& input::placeholder": {
      color: theme.secondary2,
    },
  },
  letterSection: {
    width: "100%",
    position: "relative",
  },
  cntLabel: {
    position: "absolute",
    fontSize: "2.4rem",
    fontWeight: theme.bold,
    color: theme.secondary1,
    marginBottom: 30,
    display: "flex",
    right: 0,
    background: theme.mono1,
    "& p": {
      width: 124,
      textAlign: "right",
    },
  },
}));

const PRepList: React.SFC<PRepListProps> = (props) => {
  const classes = usePRepListStyles(props);
  return (
    <div className={classes.wrap}>
      <div className={classes.searchBar}>
        <input type="text" placeholder="Search P-Reps" />
      </div>
      <div className={classes.letterSection}>
        <div className={classes.cntLabel}>
          <p>Open</p>
          <p>Close</p>
        </div>
        <SubTitle text={"B"} />
        <PRepItem name="Block42" openCnt={0} closeCnt={1} link={""} />
        <PRepItem name="Blockmove" openCnt={2} closeCnt={1} link={""} />
      </div>
      <div className={classes.letterSection}>
        <SubTitle text={"D"} />
        <PRepItem
          name="Deblock with STAYGE"
          openCnt={0}
          closeCnt={1}
          link={""}
        />
        <PRepItem name="DNSC" openCnt={2} closeCnt={1} link={""} />
      </div>
      <div className={classes.letterSection}>
        <SubTitle text={"I"} />
        <PRepItem
          name="ICX Station"
          openCnt={1}
          closeCnt={5}
          link={"/proposals/icx-station"}
        />
      </div>
    </div>
  );
};

export default PRepList;
