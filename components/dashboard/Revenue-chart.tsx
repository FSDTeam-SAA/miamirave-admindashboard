"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useGraphsData } from "@/hooks/use-graphs-data"
import { Skeleton } from "@/components/ui/skeleton"

export function RevenueChart() {
  const { data, isLoading, error } = useGraphsData()

  const chartData = data?.revenue || []

  if (isLoading) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <Skeleton className="h-8 w-40" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-[32px] font-bold text-[#131313]">Revenue report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">Error loading chart data</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <CardTitle className="text-[32px] font-bold text-[#131313]">Revenue report</CardTitle>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#9333EA]"></div>
                <span className="text-gray-600">This Year</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#EF4444]"></div>
                <span className="text-gray-600">Last Year</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
              Day
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
              Week
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
              Month
            </Button>
            <Button size="sm" className="bg-[#E91E8C] hover:bg-[#D01A7D] text-white rounded-full px-4">
              Year
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            thisYear: {
              label: "This Year",
              color: "#9333EA",
            },
            lastYear: {
              label: "Last Year",
              color: "#EF4444",
            },
          }}
          className="h-[400px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <XAxis dataKey="month" tick={{ fill: "#999", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: "#999", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value}k`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="natural"
                dataKey="thisYear"
                stroke="#9333EA"
                strokeWidth={2}
                strokeDasharray="8 4"
                dot={false}
                name="This Year"
              />
              <Line
                type="natural"
                dataKey="lastYear"
                stroke="#EF4444"
                strokeWidth={2}
                strokeDasharray="8 4"
                dot={false}
                name="Last Year"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
