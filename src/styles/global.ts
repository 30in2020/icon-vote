import { ThemeType } from "./theme";

export default function global(theme: ThemeType) {
  return {
    "@global": {
      html: {
        fontSize: "62.5%",
        fontFamily: theme.font,
        letterSpacing: "-0.05rem",
        [theme["breakpoint-sm"]]: {
          "overflow-x": "hidden",
        },
      },
      body: {
        position: "relative",
        fontSize: "1.6rem",
        margin: 0,
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        [theme["breakpoint-sm"]]: {
          "overflow-x": "hidden",
        },
      },
      a: {
        color: "inherit",
        "&:hover": {
          color: theme.secondary2,
        },
      },
      ".container": {
        width: theme["container-width-lg"],
        marginLeft: "auto",
        marginRight: "auto",
      },
      [theme["breakpoint-md"]]: {
        ".container": {
          width: `100%`,
          paddingLeft: `${theme.gap}px`,
          paddingRight: `${theme.gap}px`,
        },
      },
      [theme["breakpoint-sm-only"]]: {
        ".container": {
          width: "90%",
        },
      },
    },
  };
}
