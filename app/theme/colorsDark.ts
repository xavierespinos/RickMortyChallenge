const palette = {
  neutral900: "#F0EBE3",
  neutral800: "#E0D5C7",
  neutral700: "#C8B99C",
  neutral600: "#A0926B",
  neutral500: "#6B5D42",
  neutral400: "#4A3F2A",
  neutral300: "#2E251A",
  neutral200: "#1A140E",
  neutral100: "#0F0B08",

  primary600: "#d9fe83",
  primary500: "#c0ed2d",
  primary400: "#8eb01f",
  primary300: "#809f1b",
  primary200: "#596f10",
  primary100: "#435509",

  secondary500: "#B8C7A6",
  secondary400: "#95A373",
  secondary300: "#6F7A52",
  secondary200: "#4A5238",
  secondary100: "#2E3322",

  accent500: "#D4B088",
  accent400: "#C29060",
  accent300: "#A67C52",
  accent200: "#8B5E3C",
  accent100: "#5D3E28",

  angry100: "#8B4513",
  angry500: "#D2691E",

  overlay20: "rgba(15, 11, 8, 0.2)",
  overlay50: "rgba(15, 11, 8, 0.5)",
} as const

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  text: palette.neutral800,
  textDim: palette.neutral600,
  background: palette.neutral200,
  border: palette.neutral400,
  tint: palette.primary500,
  tintInactive: palette.neutral300,
  separator: palette.neutral300,
  error: palette.angry500,
  errorBackground: palette.angry100,
} as const
