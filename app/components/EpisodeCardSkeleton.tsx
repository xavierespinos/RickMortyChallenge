import { FC } from "react";
import { View } from "react-native";

import { Card } from "./Card";
import SkeletonBox from "./SkeletonBox";

/**
 * Skeleton loading component that mimics the EpisodeCard layout
 */
const EpisodeCardSkeleton: FC = () => {
  return (
    <Card
      ContentComponent={
        <View>
          {/* Episode name skeleton - larger text */}
          <SkeletonBox height={24} width="80%" borderRadius={4} />

          {/* Episode number skeleton */}
          <SkeletonBox
            height={16}
            width="60%"
            borderRadius={3}
            style={{ marginTop: 8 }}
          />

          {/* Air date skeleton */}
          <SkeletonBox
            height={16}
            width="50%"
            borderRadius={3}
            style={{ marginTop: 4 }}
          />
        </View>
      }
    />
  );
};

export default EpisodeCardSkeleton;
