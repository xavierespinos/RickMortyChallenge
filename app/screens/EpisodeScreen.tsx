import { FC, useEffect } from "react";
import { FlatList, Image, View, Dimensions, ViewStyle, ImageStyle, TextStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Screen } from "@/components/atoms/Screen";
import SkeletonBox from "@/components/atoms/SkeletonBox";
import { Text } from "@/components/atoms/Text";
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

  const renderCharacter = ({ item }: { item: CharacterDTO }) => (
    <View style={[themed($characterContainer), { width: itemWidth }]}>
      <Image
        source={{ uri: item.image }}
        style={[themed($characterImage), { width: itemWidth, height: itemWidth }]}
        resizeMode="cover"
      />
      <Text preset="bold" text={item.name} numberOfLines={1} />
      <Text text={item.status} style={themed($statusText(item.status))} />
      <Text text={item.species} style={themed($speciesText)} />
    </View>
  );

  const renderCharacterSkeleton = () => (
    <View style={[themed($characterContainer), { width: itemWidth }]}>
      <SkeletonBox width={itemWidth} height={itemWidth} borderRadius={8} />
      <SkeletonBox width="80%" height={16} style={themed($skeletonSpacing)} />
      <SkeletonBox width="60%" height={14} style={themed($skeletonSpacingSmall)} />
      <SkeletonBox width="70%" height={12} style={themed($skeletonSpacingSmall)} />
    </View>
  );

  return (
    <Screen preset="scroll" contentContainerStyle={themed($screenContainer)}>
      <View style={themed($headerContainer)}>
        <Text preset="heading" text={episode.name} />
        <Text text={`Episode: ${episode.episode}`} />
        <Text text={`Air Date: ${episode.air_date}`} />
        <Text text={`Characters: ${episode.characters.length}`} style={themed($characterCount)} />
      </View>

      {isLoading ? (
        <FlatList
          data={Array(6).fill(null)}
          renderItem={renderCharacterSkeleton}
          numColumns={numColumns}
          columnWrapperStyle={themed($gridColumnWrapper)}
          scrollEnabled={false}
        />
      ) : (
        <FlatList
          data={characters}
          renderItem={renderCharacter}
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

const $characterCount: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
  fontWeight: "bold",
});

const $gridColumnWrapper: ThemedStyle<ViewStyle> = () => ({
  justifyContent: "space-between",
});

const $skeletonSpacing: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
});

const $skeletonSpacingSmall: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xxxs,
});

export default EpisodeScreen;
