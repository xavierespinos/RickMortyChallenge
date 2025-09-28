const palette = {
  neutral100: "#FAF8F5",
  neutral200: "#F0EBE3",
  neutral300: "#E0D5C7",
  neutral400: "#C8B99C",
  neutral500: "#A0926B",
  neutral600: "#6B5D42",
  neutral700: "#4A3F2A",
  neutral800: "#2E251A",
  neutral900: "#1A140E",

  primary100: "#d9fe83",
  primary200: "#c0ed2d",
  primary300: "#8eb01f",
  primary400: "#809f1b",
  primary500: "#596f10",
  primary600: "#435509",

  secondary100: "#E8EDE6",
  secondary200: "#D2DCC8",
  secondary300: "#B8C7A6",
  secondary400: "#95A373",
  secondary500: "#6F7A52",

  accent100: "#F2E6D8",
  accent200: "#E6CDB1",
  accent300: "#D4B088",
  accent400: "#C29060",
  accent500: "#A67C52",

  angry100: "#F4E5D3",
  angry500: "#B8652F",

  overlay20: "rgba(26, 20, 14, 0.2)",
  overlay50: "rgba(26, 20, 14, 0.5)",
} as const;

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral200,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * The inactive tinting color.
   */
  tintInactive: palette.neutral300,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   */
  errorBackground: palette.angry100,
} as const;
