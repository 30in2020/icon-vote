import React from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import { ThemeType } from "../../styles/theme";
import { InnerLoader } from "..";

interface Props {
  name: string;
  openCnt: number;
  closeCnt: number;
  link: string;
  isLoading: boolean;
  isVisible: boolean;
  fetchData: () => void;
}

const PRepItem: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const {
    link,
    openCnt,
    closeCnt,
    name,
    isLoading,
    isVisible,
    fetchData,
  } = props;

  React.useEffect(() => {
    if (isVisible) {
      fetchData();
    }
  }, [fetchData, isVisible]);

  return (
    <Link to={link}>
      <div className={classes.pRep}>
        <p>{name}</p>
        <div className={classes["right-item"]}>
          {isLoading ? (
            <InnerLoader />
          ) : (
            <>
              <p>{openCnt}</p>
              <p>{closeCnt}</p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
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
    alignItems: "center",
    justifyContent: "flex-end",
    "& p": {
      width: 10,
      textAlign: "right",
      "&:first-of-type": {
        marginRight: 114,
        [theme["breakpoint-xs"]]: {
          marginRight: 50,
        },
      },
    },
  },
}));

export default PRepItem;
