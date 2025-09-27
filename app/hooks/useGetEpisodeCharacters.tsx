import { useQuery } from "@tanstack/react-query";

import { api } from "@/services/api";

const useGetEpisodeCharacters = (characterUrls: string[], enabled: boolean = true) => {
  return useQuery({
    queryKey: ["episode-characters", characterUrls.sort()],
    queryFn: () => api.getCharactersByUrls(characterUrls),
    enabled: enabled && characterUrls.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export default useGetEpisodeCharacters;
