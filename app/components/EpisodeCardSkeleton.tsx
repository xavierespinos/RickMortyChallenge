import { FC } from "react";
import { View, ViewStyle } from "react-native";

import { useAppTheme } from "@/theme/context";
import type { ThemedStyle } from "@/theme/types";

import { Card } from "./Card";
import SkeletonBox from "./SkeletonBox";

const EpisodeCardSkeleton: FC = () => {
  const { themed } = useAppTheme();

  return (
    <Card
      ContentComponent={
        <View>
          <SkeletonBox height={24} width="80%" borderRadius={4} />
          <SkeletonBox height={16} width="60%" borderRadius={3} style={themed($skeletonSpacing)} />
          <SkeletonBox
            height={16}
            width="50%"
            borderRadius={3}
            style={themed($skeletonSpacingSmall)}
          />
        </View>
      }
    />
  );
};

const $skeletonSpacing: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
});

const $skeletonSpacingSmall: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xxxs,
});

export default EpisodeCardSkeleton;
