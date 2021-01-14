import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { Range } from "react-range";
import { ThemeType } from "../../styles/theme";
import { SubTitle } from "../";

export enum SliderType {
  MINIMUM_APPROVAL_RATE,
  REQUIRED_PARTICIPATION,
}

const sliderData = {
  [SliderType.MINIMUM_APPROVAL_RATE]: {
    title: "Miminum approval rate",
    desc: (pct: number) => `An option needs ${pct}% for it to be approved`,
  },
  [SliderType.REQUIRED_PARTICIPATION]: {
    title: "Required participation",
    desc: (pct: number) =>
      `${pct}% of voters need to participate for the proposal to pass`,
  },
};

interface Props {
  sliderType: SliderType;
  pct: number;
  setPct: (pct: number) => void;
}

const MIN = 0,
  MAX = 100;

const SliderSelector: React.SFC<Props> = (props) => {
  const theme = useTheme();
  const classes = useStyles(props);
  const { sliderType, pct, setPct } = props;

  return (
    <div className={classes.wrap}>
      <SubTitle text={sliderData[sliderType].title} />
      <div className={classes.range}>
        <Range
          step={1}
          min={MIN}
          max={MAX}
          values={[pct]}
          onChange={(values) => setPct(values[0])}
          renderTrack={({ props, children }: any) => (
            <div
              {...props}
              style={{
                height: 10,
                width: "100%",
                borderRadius: 10,
                alignSelf: "center",
                background: `linear-gradient(to right, ${
                  (theme as ThemeType).primary1
                } 0%, ${(theme as ThemeType).primary1} ${pct}%, ${
                  (theme as ThemeType).dim
                } ${pct}%, ${(theme as ThemeType).dim} 100%)`,
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: 25,
                width: 25,
                borderRadius: 25,
                top: 50,
                backgroundColor: (theme as ThemeType).primary1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-38px",
                  color: (theme as ThemeType).secondary1,
                  fontWeight: (theme as ThemeType).bold,
                  fontSize: "1.8rem",
                  padding: "4px",
                  borderRadius: "4px",
                }}
              >
                {pct}%
              </div>
            </div>
          )}
        />
      </div>
      <p className={classes.desc}>{sliderData[sliderType].desc(pct)}</p>
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    width: "46%",
    "&:first-of-type": {
      marginRight: "8%",
    },
    marginBottom: 70,
    [theme["breakpoint-sm"]]: {
      width: "100%",
      marginBottom: 50,
    },
  },
  range: {
    position: "relative",
    paddingTop: 50,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 34,
  },
  desc: {
    color: theme.secondary1,
    fontWeight: theme.semiBold,
    fontSize: "1.8rem",
    [theme["breakpoint-xs"]]: {
      fontSize: "1.4rem",
    },
  },
}));

export default SliderSelector;
