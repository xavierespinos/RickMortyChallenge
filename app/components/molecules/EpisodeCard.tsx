import { FC } from "react";
import { View } from "react-native";

import { Card } from "@/components/atoms/Card";
import { Text } from "@/components/atoms/Text";
import { EpisodeDTO } from "@/services/api/types";

interface Props {
  episode: EpisodeDTO;
  onPress?: VoidFunction;
}

const EpisodeCard: FC<Props> = ({ episode, onPress }) => {
  return (
    <Card
      onPress={onPress}
      ContentComponent={
        <View>
          <Text preset="subheading" text={episode.name} />
          <Text text={`Episode: ${episode.episode}`} />
          <Text text={`Air Date: ${episode.air_date}`} />
        </View>
      }
    />
  );
};

export default EpisodeCard;
