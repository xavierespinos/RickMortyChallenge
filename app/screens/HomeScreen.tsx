import { FC } from "react";
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native";

import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { isRTL } from "@/i18n";
import type { ThemedStyle } from "@/theme/types";
import { useAppTheme } from "@/theme/context";
import { $styles } from "@/theme/styles";
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export const HomeScreen: FC = () => {
  const { themed, theme } = useAppTheme();
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"]);

  const { data, isLoading } = useQuery({
    queryKey: ["episodes"],
    queryFn: () => api.getEpisodes(),
  });
  console.log(data);

  return <Screen preset="fixed" contentContainerStyle={$styles.flex1}></Screen>;
};

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
});

const $bottomContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
});

const $welcomeLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
});

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
};

const $welcomeHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
});
