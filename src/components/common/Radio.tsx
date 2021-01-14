import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import VotedIcon from "../../assets/voted-icon@2x.png";

interface Props {
  isSelected: boolean;
}

const Radio: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const { isSelected } = props;

  return (
    <>
      <input
        type="radio"
        className={classes.radio}
        checked={isSelected}
        readOnly
      />
      <span className={classes.radio__control}></span>
    </>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  radio: (props: Props) => ({
    opacity: 0,
    position: "absolute",
    "&:checked + span:after": {
      content: '""',
      display: "block",
      position: "absolute",
      top: -1,
      left: 0,
      width: 23.27,
      height: 25,
      background: `url(${VotedIcon}) center center no-repeat`,
      backgroundSize: "23.27px 25px",

      borderRadius: 12,
    },
    "&:checked + span": {
      borderColor: theme.primary1,
      border: "none",
    },
  }),
  radio__control: {
    position: "relative",
    display: "inline-block",
    width: 23.27,
    height: 23.27,
    marginRight: 12,
    verticalAlign: "middle",
    backgroundColor: "inherit",
    color: theme.primary1,
    border: `3px solid ${theme.primary1}`,
    borderRadius: 24,
  },
}));

export default Radio;
