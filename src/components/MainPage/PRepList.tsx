import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import SearchIcon from "../../assets/search@2x.png";
import { SubTitle, PRepItemContainer } from "../";
import { PRepListItem } from "../../types";

interface Props {
  data: {
    [key: string]: PRepListItem[];
  };
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

const PRepList: React.SFC<Props> = (props) => {
  let _i = 0;
  const classes = useStyles(props);
  const { data, keyword, setKeyword } = props;

  const handleKeywordChange = React.useCallback(
    (e) => {
      setKeyword(e.target.value);
    },
    [setKeyword]
  );
  return (
    <div className={classes.wrap}>
      <div className={classes.searchBar}>
        <input
          type="text"
          placeholder="Search P-Reps"
          value={keyword}
          onChange={handleKeywordChange}
        />
      </div>
      {Object.entries(data).map(([key, arr]) => {
        _i++;
        return (
          <div key={key} className={classes.letterSection}>
            {_i === 1 && (
              <div className={classes.cntLabel}>
                <p>Open</p>
                <p>Close</p>
              </div>
            )}
            <SubTitle text={key} />
            {arr.map((item) => (
              <PRepItemContainer
                key={item.pRepName}
                pRepName={item.pRepName}
                username={item.username}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    marginTop: 35,
    marginBottom: 60,
  },
  searchBar: {
    width: "100%",
    backgroundColor: theme.secondary3,
    background: `url(${SearchIcon}) ${theme.gap}px center no-repeat`,
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
      [theme["breakpoint-xs"]]: {
        width: 70,
        fontSize: "1.8rem",
      },
    },
  },
}));

export default PRepList;
