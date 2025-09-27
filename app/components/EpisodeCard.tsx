import { EpisodeDTO } from "@/services/api/types";
import { FC } from "react";
import { Card } from "./Card";
import { View } from "react-native";
import { Text } from "@/components/Text";

interface Props {
  episode: EpisodeDTO;
  onPress?: () => VoidFunction;
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
