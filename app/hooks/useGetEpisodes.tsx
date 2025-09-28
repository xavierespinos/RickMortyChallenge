import { useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/services/api";

const useGetEpisodes = () => {
  return useInfiniteQuery({
    queryKey: ["episodes"],
    queryFn: ({ pageParam = 1 }) => api.getEpisodes(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.info.next) {
        const url = new URL(lastPage.info.next);
        const nextPage = url.searchParams.get("page");
        return nextPage ? parseInt(nextPage, 10) : undefined;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};
export default useGetEpisodes;
