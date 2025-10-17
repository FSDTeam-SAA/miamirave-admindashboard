
import { TrendingUp, Package, Users } from "lucide-react"
import { StatCard } from "./Stat-card"
import { NewUserChart } from "./New-user-chart"
import { LiveProductChart } from "./Live-product-chart"
import { RevenueChart } from "./Revenue-chart"
import Bradcrumb from "../shyard/Bradcrumb"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
    
      <main className="w-full">
        <div className="w-full">
            <Bradcrumb pageName="Dashboard" subPageName=""/>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Revenue"
              value="132,570"
              icon={"/assets/icon3.png"}
              iconColor="text-green-600"
              iconBgColor="bg-green-50"
            />
            <StatCard
              title="Live Product"
              value="132,570"
              icon={"/assets/icon2.png"}
              iconColor="text-pink-600"
              iconBgColor="bg-pink-50"
            />
            <StatCard
              title="Total User"
              value="132,570"
             icon={"/assets/icon1.png"}
              iconColor="text-red-400"
              iconBgColor="bg-red-50"
            />
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <NewUserChart />
            <LiveProductChart />
          </div>

          {/* Charts Row 2 */}
          <div className="mb-8 ">
            <RevenueChart />
          </div>
        </div>
      </main>
    </div>
  )
}
