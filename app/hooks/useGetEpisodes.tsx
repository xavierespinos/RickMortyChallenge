import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const useGetEpisodes = () => {
  return useQuery({
    queryKey: ["episodes"],
    queryFn: () => api.getEpisodes(),
  });
};
export default useGetEpisodes;
