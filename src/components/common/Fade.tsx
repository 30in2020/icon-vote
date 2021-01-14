// https://codesandbox.io/s/react-easy-animation-b658i?file=/src/Fade.js

import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";

interface Props {
  isShown: boolean;
  children: React.ReactNode;
}

const Fade: React.FC<Props> = (props) => {
  const classes = useStyles(props);
  const { isShown, children } = props;
  const [render, setRender] = useState(isShown);

  useEffect(() => {
    if (isShown) setRender(true);
  }, [isShown]);

  const onAnimationEnd = () => {
    if (!isShown) setRender(false);
  };

  return render ? (
    <div className={classes.wrap} onAnimationEnd={onAnimationEnd}>
      {children}
    </div>
  ) : null;
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  "@keyframes fadeOut": {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  wrap: {
    animation: (props: Props) =>
      `${props.isShown ? "$fadeIn" : "$fadeOut"} 0.25s`,
  },
}));

export default Fade;
