import { FC, useEffect } from "react";
import { FlatList, View, Dimensions, ViewStyle, TextStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Screen } from "@/components/atoms/Screen";
import { Text } from "@/components/atoms/Text";
import { CharacterGridItem } from "@/components/molecules/CharacterGridItem";
import { CharacterGridItemSkeleton } from "@/components/molecules/CharacterGridItemSkeleton";
import useGetEpisodeCharacters from "@/hooks/useGetEpisodeCharacters";
import type { AppStackScreenProps } from "@/navigators/AppNavigator";
import type { CharacterDTO } from "@/services/api/types";
import { useAppTheme } from "@/theme/context";
import type { ThemedStyle } from "@/theme/types";

const EpisodeScreen: FC<AppStackScreenProps<"Episode">> = ({ route }) => {
  const { episode } = route.params;
  const { isLoading, data: characters } = useGetEpisodeCharacters(episode.characters);
  const navigation = useNavigation<AppStackScreenProps<"Episode">["navigation"]>();
  const { themed, theme } = useAppTheme();

  const screenWidth = Dimensions.get("window").width;
  const numColumns = 2;
  const itemWidth = (screenWidth - theme.spacing.lg * 2 - theme.spacing.xs) / numColumns;

  useEffect(() => {
    navigation.setOptions({
      title: episode.episode,
    });
  }, [navigation, episode.episode]);

  return (
    <Screen preset="scroll" contentContainerStyle={themed($screenContainer)}>
      <View style={themed($headerContainer)}>
        <Text preset="heading" text={episode.name} />
        <Text tx="episodeScreen:episodeLabel" txOptions={{ episode: episode.episode }} />
        <Text tx="episodeScreen:airDateLabel" txOptions={{ airDate: episode.air_date }} />
        <Text
          tx="episodeScreen:charactersLabel"
          txOptions={{ count: episode.characters.length }}
          style={themed($characterCount)}
        />
      </View>

      {isLoading ? (
        <FlatList
          data={Array(6).fill(null)}
          renderItem={() => <CharacterGridItemSkeleton itemWidth={itemWidth} />}
          numColumns={numColumns}
          columnWrapperStyle={themed($gridColumnWrapper)}
          scrollEnabled={false}
        />
      ) : (
        <FlatList
          data={characters}
          renderItem={({ item }: { item: CharacterDTO }) => (
            <CharacterGridItem character={item} itemWidth={itemWidth} />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          columnWrapperStyle={themed($gridColumnWrapper)}
          scrollEnabled={false}
        />
      )}
    </Screen>
  );
};

const $screenContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.xs,
});

const $headerContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
});

const $characterCount: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
  fontWeight: "bold",
});

const $gridColumnWrapper: ThemedStyle<ViewStyle> = () => ({
  justifyContent: "space-between",
});

export default EpisodeScreen;
