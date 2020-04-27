import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";

export enum ButtonType {
  PRIMARY,
  FLAT,
}

const isPrimaryButton = (props: Props) =>
  props.buttonType === ButtonType.PRIMARY;

interface Props {
  text: string;
  style?: React.CSSProperties;
  buttonType?: ButtonType;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: (props: Props) => ({
    background: isPrimaryButton(props) ? theme.primary1 : "none",
    width: isPrimaryButton(props) ? 120 : "inherit",
    fontSize: "1.8rem",
    padding: "5px 0px",
    borderRadius: "8px",
    cursor: "pointer",
  }),
  label: (props: Props) => ({
    color: isPrimaryButton(props) ? theme.mono1 : theme.primary1,
    fontWeight: theme.bold,
    textAlign: "center",
  }),
}));

const Button: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const { text, onClick, style = {} } = props;

  return (
    <div onClick={onClick} className={classes.wrap} style={style}>
      <p className={classes.label}>{text}</p>
    </div>
  );
};

Button.defaultProps = {
  buttonType: ButtonType.PRIMARY,
};

export default Button;
