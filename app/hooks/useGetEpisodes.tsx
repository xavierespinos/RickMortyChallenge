import { useQuery } from "@tanstack/react-query";

import { api } from "@/services/api";

const useGetEpisodes = () => {
  return useQuery({
    queryKey: ["episodes"],
    queryFn: () => api.getEpisodes(),
  });
};
export default useGetEpisodes;
