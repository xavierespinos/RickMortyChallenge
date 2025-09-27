import { FC } from "react";
import { ActivityIndicator, FlatList, RefreshControl, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import EpisodeCard from "@/components/EpisodeCard";
import EpisodeCardSkeleton from "@/components/EpisodeCardSkeleton";
import { Screen } from "@/components/Screen";
import useGetEpisodes from "@/hooks/useGetEpisodes";
import type { AppStackScreenProps } from "@/navigators/AppNavigator";
import type { EpisodeDTO } from "@/services/api/types";

export const HomeScreen: FC<AppStackScreenProps<"Home">> = () => {
  const { data, isLoading, refetch, isRefetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetEpisodes();
  const navigation = useNavigation<AppStackScreenProps<"Home">["navigation"]>();

  const allEpisodes = data?.pages.flatMap((page) => page.results) ?? [];

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
          data={allEpisodes}
          renderItem={({ item }: { item: EpisodeDTO }) => (
            <EpisodeCard
              episode={item}
              onPress={() => navigation.navigate("Episode", { episode: item })}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            isFetchingNextPage ? (
              <View style={{ padding: 20, alignItems: "center" }}>
                <ActivityIndicator size="large" />
              </View>
            ) : null
          }
        />
      )}
    </Screen>
  );
};
