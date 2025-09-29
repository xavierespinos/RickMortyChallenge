import { FC } from "react";
import { Image, View, ViewStyle, ImageStyle, TextStyle } from "react-native";

import { Text } from "@/components/atoms/Text";
import type { CharacterDTO } from "@/services/api/types";
import { useAppTheme } from "@/theme/context";
import type { ThemedStyle } from "@/theme/types";

interface CharacterGridItemProps {
  character: CharacterDTO;
  itemWidth: number;
}

export const CharacterGridItem: FC<CharacterGridItemProps> = ({ character, itemWidth }) => {
  const { themed } = useAppTheme();

  return (
    <View style={[themed($characterContainer), { width: itemWidth }]}>
      <Image
        source={{ uri: character.image }}
        style={[themed($characterImage), { width: itemWidth, height: itemWidth }]}
        resizeMode="cover"
      />
      <Text preset="bold" text={character.name} numberOfLines={1} />
      <Text text={character.status} style={themed($statusText(character.status))} />
      <Text text={character.species} style={themed($speciesText)} />
    </View>
  );
};

const $characterContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
});

const $characterImage: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  borderRadius: spacing.xs,
  marginBottom: spacing.xs,
});

const $statusText =
  (status: string): ThemedStyle<TextStyle> =>
  ({ colors }) => ({
    color:
      status === "Alive"
        ? colors.palette.primary300
        : status === "Dead"
          ? colors.error
          : colors.textDim,
  });

const $speciesText: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 12,
  color: colors.textDim,
});

export default CharacterGridItem;
