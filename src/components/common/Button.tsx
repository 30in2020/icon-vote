import React from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { ThemeType } from "../../styles/theme";
import { InnerLoader } from "..";

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
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const {
    text,
    onClick,
    style = {},
    loading = false,
    disabled = false,
  } = props;

  return (
    <div
      onClick={onClick}
      className={clsx(classes.wrap, disabled && "disabled")}
      style={style}
    >
      {loading ? (
        <InnerLoader height={24} />
      ) : (
        <p className={classes.label}>{text}</p>
      )}
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: (props: Props) => ({
    background: isPrimaryButton(props) ? theme.primary1 : "none",
    width: isPrimaryButton(props) ? 116 : "inherit",
    fontSize: "1.6rem",
    padding: "5px 0px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    "&.disabled": {
      background: "#898989",
    },
  }),
  label: (props: Props) => ({
    color: isPrimaryButton(props) ? theme.mono1 : theme.primary1,
    fontWeight: theme.bold,
    textAlign: "center",
  }),
}));

Button.defaultProps = {
  buttonType: ButtonType.PRIMARY,
};

export default Button;
