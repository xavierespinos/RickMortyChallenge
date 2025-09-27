import { FC } from "react";
import { View } from "react-native";

import { Card } from "./Card";
import SkeletonBox from "./SkeletonBox";

const EpisodeCardSkeleton: FC = () => {
  return (
    <Card
      ContentComponent={
        <View>
          <SkeletonBox height={24} width="80%" borderRadius={4} />
          <SkeletonBox height={16} width="60%" borderRadius={3} style={{ marginTop: 8 }} />
          <SkeletonBox height={16} width="50%" borderRadius={3} style={{ marginTop: 4 }} />
        </View>
      }
    />
  );
};

export default EpisodeCardSkeleton;
