import { FC } from "react";
import { View, ViewStyle } from "react-native";

import SkeletonBox from "@/components/atoms/SkeletonBox";
import { useAppTheme } from "@/theme/context";
import type { ThemedStyle } from "@/theme/types";

interface CharacterGridItemSkeletonProps {
  itemWidth: number;
}

export const CharacterGridItemSkeleton: FC<CharacterGridItemSkeletonProps> = ({ itemWidth }) => {
  const { themed } = useAppTheme();

  return (
    <View style={[themed($characterContainer), { width: itemWidth }]}>
      <SkeletonBox width={itemWidth} height={itemWidth} borderRadius={8} />
      <SkeletonBox width="80%" height={16} style={themed($skeletonSpacing)} />
      <SkeletonBox width="60%" height={14} style={themed($skeletonSpacingSmall)} />
      <SkeletonBox width="70%" height={12} style={themed($skeletonSpacingSmall)} />
    </View>
  );
};

const $characterContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
});

const $skeletonSpacing: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
});

const $skeletonSpacingSmall: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xxxs,
});

export default CharacterGridItemSkeleton;
