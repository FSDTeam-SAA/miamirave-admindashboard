"use client"

import { useSession } from "next-auth/react"
import { useStatsData } from "@/hooks/use-stats-data"
import { Skeleton } from "@/components/ui/skeleton"
import { StatCard } from "./Stat-card"
import { NewUserChart } from "./New-user-chart"
import { LiveProductChart } from "./Live-product-chart"
import { RevenueChart } from "./Revenue-chart"

export default function DashboardPage() {
  const { data: session } = useSession()
  const { data: statsData, isLoading: statsLoading } = useStatsData()

  // If statsData is loaded, map it to cards
  const stats = [
    {
      title: "Total Revenue",
      value: statsData?.totalRevenue ?? 0,
      icon: "/assets/icon3.png",
      iconColor: "text-green-600",
      iconBgColor: "bg-green-50",
    },
    {
      title: "Live Product",
      value: statsData?.totalProducts ?? 0,
      icon: "/assets/icon2.png",
      iconColor: "text-pink-600",
      iconBgColor: "bg-pink-50",
    },
    {
      title: "Total User",
      value: statsData?.totalUsers ?? 0,
      icon: "/assets/icon1.png",
      iconColor: "text-red-400",
      iconBgColor: "bg-red-50",
    },
    {
      title: "Total Orders",
      value: statsData?.totalOrders ?? 0,
      icon: "/assets/icon2.png",
      iconColor: "text-blue-500",
      iconBgColor: "bg-blue-50",
    },
    {
      title: "Total Payments",
      value: statsData?.totalPayments ?? 0,
      icon: "/assets/icon3.png",
      iconColor: "text-indigo-500",
      iconBgColor: "bg-indigo-50",
    },
  ]

  return (
    <div className="flex min-h-screen">
      <main className="w-full">
        <div className="w-full">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {statsLoading ? (
              <>
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
              </>
            ) : (
              stats.map((stat, index) => (
                <StatCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  iconColor={stat.iconColor}
                  iconBgColor={stat.iconBgColor}
                />
              ))
            )}
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <NewUserChart />
            <LiveProductChart />
          </div>

          {/* Charts Row 2 */}
          <div className="mb-8">
            <RevenueChart />
          </div>
        </div>
      </main>
    </div>
  )
}
