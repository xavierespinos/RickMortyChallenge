import { FC } from "react";
import { FlatList, Image, View, Dimensions } from "react-native";

import { Screen } from "@/components/Screen";
import SkeletonBox from "@/components/SkeletonBox";
import { Text } from "@/components/Text";
import useGetEpisodeCharacters from "@/hooks/useGetEpisodeCharacters";
import type { AppStackScreenProps } from "@/navigators/AppNavigator";
import type { CharacterDTO } from "@/services/api/types";

const EpisodeScreen: FC<AppStackScreenProps<"Episode">> = ({ route }) => {
  const { episode } = route.params;
  const { isLoading, data: characters } = useGetEpisodeCharacters(episode.characters);

  const screenWidth = Dimensions.get("window").width;
  const padding = 20;
  const numColumns = 2;
  const itemWidth = (screenWidth - padding * 2 - 10) / numColumns; // 10 for gap

  const renderCharacter = ({ item }: { item: CharacterDTO }) => (
    <View style={{ width: itemWidth, marginBottom: 15 }}>
      <Image
        source={{ uri: item.image }}
        style={{
          width: itemWidth,
          height: itemWidth,
          borderRadius: 8,
          marginBottom: 8,
        }}
        resizeMode="cover"
      />
      <Text preset="bold" text={item.name} numberOfLines={1} />
      <Text
        text={item.status}
        style={{
          color:
            item.status === "Alive" ? "#22c55e" : item.status === "Dead" ? "#ef4444" : "#6b7280",
        }}
      />
      <Text text={item.species} style={{ fontSize: 12, opacity: 0.7 }} />
    </View>
  );

  const renderCharacterSkeleton = () => (
    <View style={{ width: itemWidth, marginBottom: 15 }}>
      <SkeletonBox width={itemWidth} height={itemWidth} borderRadius={8} />
      <SkeletonBox width="80%" height={16} style={{ marginTop: 8 }} />
      <SkeletonBox width="60%" height={14} style={{ marginTop: 4 }} />
      <SkeletonBox width="70%" height={12} style={{ marginTop: 4 }} />
    </View>
  );

  return (
    <Screen preset="scroll" contentContainerStyle={{ padding: 10 }}>
      {/* Episode Info Header */}
      <View style={{ marginBottom: 20 }}>
        <Text preset="heading" text={episode.name} />
        <Text text={`Episode: ${episode.episode}`} />
        <Text text={`Air Date: ${episode.air_date}`} />
        <Text
          text={`Characters: ${episode.characters.length}`}
          style={{ marginTop: 8, fontWeight: "bold" }}
        />
      </View>

      {/* Characters Grid */}
      {isLoading ? (
        <FlatList
          data={Array(6).fill(null)} // Show 6 skeleton items
          renderItem={renderCharacterSkeleton}
          numColumns={numColumns}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          scrollEnabled={false}
        />
      ) : (
        <FlatList
          data={characters}
          renderItem={renderCharacter}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          scrollEnabled={false}
        />
      )}
    </Screen>
  );
};

export default EpisodeScreen;
