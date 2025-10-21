import { useQuery } from "@tanstack/react-query"
import { fetchStatsData } from "@/lib/api-client"

export function useStatsData() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await fetchStatsData()
      return response.data // Extract the data object from the API response
    },
  })
}
