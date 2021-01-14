import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";

const useStyles = createUseStyles((theme: ThemeType) => ({
  pagination: {
    padding: "0.5rem",
    display: "flex",
    width: 90,
    justifyContent: "space-between",
    marginTop: 10,
    fontSize: "1.2rem",
    "& span": {
      display: "block",
      width: 54,
      textAlign: "center",
    },
  },
}));

interface Props {
  pageIndex: number;
  changePage: (num: number) => void;
}

const Pagination: React.FC<Props> = (props) => {
  const { changePage, pageIndex } = props;
  const classes = useStyles();
  const canPreviousPage = pageIndex > 0;
  const goToPreviousPage = () => {
    if (canPreviousPage) {
      changePage(pageIndex - 1);
    }
  };
  const goToNextPage = () => {
    changePage(pageIndex + 1);
  };
  return (
    <div className={classes.pagination}>
      <button onClick={() => goToPreviousPage()} disabled={!canPreviousPage}>
        {"<"}
      </button>{" "}
      <span>
        <strong>{pageIndex + 1}</strong>{" "}
      </span>
      <button onClick={() => goToNextPage()}>{">"}</button>{" "}
    </div>
  );
};

export default Pagination;
