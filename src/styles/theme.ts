const theme = {
  // Color
  primary1: "#00B8CC",
  primary2: "#67CBD9",
  primary3: "#BFEDF2",
  secondary1: "#006B83",
  secondary2: "#6798A7",
  secondary3: "#D9E9EC",
  dim: "#d9e9ec",
  mono0: "#000",
  mono1: "#FFF",
  fail: "#f24860",

  // Font
  font: "'Montserrat', sans-serif",
  medium: 500,
  semiBold: 600,
  bold: 700,

  // Layout
  "breakpoint-xs": "@media (max-width: 600px)",
  "breakpoint-sm-only": "@media (max-width: 1050px) and (min-width: 600px)",
  "breakpoint-sm": "@media (max-width: 1050px)",
  "breakpoint-md-only": "@media (max-width: 1200px) and (min-width: 1050px)",
  "breakpoint-md": "@media (max-width: 1200px)",
  "container-width-lg": "1116px",
  gap: 28,
};

export default theme;
export type ThemeType = typeof theme;
