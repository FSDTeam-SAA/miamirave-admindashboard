"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useGraphsData } from "@/hooks/use-graphs-data"
import { Skeleton } from "@/components/ui/skeleton"

export function LiveProductChart() {
  const [period, setPeriod] = useState<"day" | "week" | "month">("day")
  const { data, isLoading, error } = useGraphsData(period)

  const chartData = data?.liveProducts || []

  if (isLoading) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <Skeleton className="h-8 w-40" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-[32px] font-bold text-[#131313]">Live Product report</CardTitle>
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
          <CardTitle className="text-[32px] font-bold text-[#131313]">Live Product report</CardTitle>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => setPeriod("day")}
              className={
                period === "day"
                  ? "bg-[#E91E8C] hover:bg-[#D01A7D] text-white rounded-full px-4"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full px-4"
              }
            >
              Day
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPeriod("week")}
              className={
                period === "week" ? "bg-[#E91E8C] text-white hover:bg-[#D01A7D]" : "text-gray-600 hover:bg-gray-100"
              }
            >
              Week
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPeriod("month")}
              className={
                period === "month" ? "bg-[#E91E8C] text-white hover:bg-[#D01A7D]" : "text-gray-600 hover:bg-gray-100"
              }
            >
              Month
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "Products",
              color: "#E91E8C",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <XAxis dataKey="day" tick={{ fill: "#999", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#999", fontSize: 11 }} axisLine={false} tickLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="#F34D95" radius={[8, 8, 0, 0]} maxBarSize={26} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
