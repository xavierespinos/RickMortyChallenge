import { FC } from "react";
import { FlatList, RefreshControl, View, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Screen } from "@/components/atoms/Screen";
import EpisodeCard from "@/components/molecules/EpisodeCard";
import EpisodeCardSkeleton from "@/components/molecules/EpisodeCardSkeleton";
import MortySpinner from "@/components/molecules/MortySpinner";
import useGetEpisodes from "@/hooks/useGetEpisodes";
import type { AppStackScreenProps } from "@/navigators/AppNavigator";
import type { EpisodeDTO } from "@/services/api/types";
import { useAppTheme } from "@/theme/context";
import type { ThemedStyle } from "@/theme/types";

export const HomeScreen: FC<AppStackScreenProps<"Home">> = () => {
  const { data, isLoading, refetch, isRefetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetEpisodes();
  const navigation = useNavigation<AppStackScreenProps<"Home">["navigation"]>();
  const { themed } = useAppTheme();

  const allEpisodes = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <Screen preset="fixed" contentContainerStyle={themed($containerStyle)}>
      {isLoading ? (
        <View style={themed($skeletonContainer)}>
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
          ItemSeparatorComponent={() => <View style={themed($separator)} />}
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
              <View style={themed($footerContainer)}>
                <MortySpinner spinning={isFetchingNextPage} />
              </View>
            ) : null
          }
        />
      )}
    </Screen>
  );
};

const $containerStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.xs,
});

const $skeletonContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.xs,
});

const $separator: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  height: spacing.xs,
});

const $footerContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.lg,
  alignItems: "center",
});
