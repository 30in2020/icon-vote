import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";

interface Props {
  isSelected: boolean;
}

const useStyles = createUseStyles((theme: ThemeType) => ({
  radio: (props: Props) => ({
    opacity: 0,
    position: "absolute",
    "&:checked + span:after": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 3,
      left: 3,
      width: 10,
      height: 10,
      backgroundColor: theme.primary1,
      borderRadius: 12,
    },
    "&:checked + span": {
      borderColor: theme.primary1,
    },
  }),
  radio__control: {
    position: "relative",
    display: "inline-block",
    width: 22,
    height: 22,
    marginRight: 12,
    verticalAlign: "middle",
    backgroundColor: "inherit",
    color: theme.primary1,
    border: `3px solid ${theme.primary1}`,
    borderRadius: 24,
  },
}));

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

export default Radio;
