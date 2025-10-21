import { useQuery } from "@tanstack/react-query"
import { fetchGraphsData } from "@/lib/api-client"

export function useGraphsData(period: "day" | "week" | "month" = "month") {
  return useQuery({
    queryKey: ["graphs", period],
    queryFn: async () => {
      const response = await fetchGraphsData(period)

      // Extract the data from the API response
      const graphsData = response.data

      return {
        newUsers: transformNewUsersData(graphsData.newUsers),
        liveProducts: transformLiveProductsData(graphsData.liveProducts),
        revenue: transformRevenueData(graphsData.revenue),
      }
    },
  })
}

// Transform newUsers data: combine labels and data arrays into objects
function transformNewUsersData(newUsers: { labels: string[]; data: number[] }) {
  return newUsers.labels.map((label, index) => ({
    date: label,
    users: newUsers.data[index],
  }))
}

// Transform liveProducts data: combine labels and data arrays into objects
function transformLiveProductsData(liveProducts: { labels: string[]; data: number[] }) {
  return liveProducts.labels.map((label, index) => ({
    day: label,
    value: liveProducts.data[index],
  }))
}

// Transform revenue data: combine thisYear and lastYear with labels
function transformRevenueData(revenue: {
  thisYear: { labels: string[]; data: number[] }
  lastYear: { labels: string[]; data: number[] }
}) {
  return revenue.thisYear.labels.map((label, index) => ({
    month: label,
    thisYear: revenue.thisYear.data[index],
    lastYear: revenue.lastYear.data[index],
  }))
}
