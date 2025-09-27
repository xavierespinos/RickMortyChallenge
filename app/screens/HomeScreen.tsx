import { FC } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { Screen } from "@/components/Screen";
import { $styles } from "@/theme/styles";
import type { EpisodeDTO } from "@/services/api/types";
import useGetEpisodes from "@/hooks/useGetEpisodes";
import EpisodeCard from "@/components/EpisodeCard";
import EpisodeCardSkeleton from "@/components/EpisodeCardSkeleton";

export const HomeScreen: FC = () => {
  const { data, isLoading, refetch, isRefetching } = useGetEpisodes();

  return (
    <Screen preset="fixed" contentContainerStyle={{ padding: 10 }}>
      {isLoading ? (
        <View style={{ gap: 10 }}>
          <EpisodeCardSkeleton />
          <EpisodeCardSkeleton />
          <EpisodeCardSkeleton />
        </View>
      ) : (
        <FlatList
          data={data?.results}
          renderItem={({ item }: { item: EpisodeDTO }) => <EpisodeCard episode={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        />
      )}
    </Screen>
  );
};
