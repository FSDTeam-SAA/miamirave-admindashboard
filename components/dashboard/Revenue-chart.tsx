"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "JAN", thisYear: 100, lastYear: 100 },
  { month: "FEB", thisYear: 800, lastYear: 300 },
  { month: "MAR", thisYear: 1000, lastYear: 1200 },
  { month: "APR", thisYear: 700, lastYear: 1800 },
  { month: "MAY", thisYear: 300, lastYear: 1500 },
  { month: "JUN", thisYear: 200, lastYear: 500 },
  { month: "JUL", thisYear: 200, lastYear: 300 },
  { month: "AUG", thisYear: 100, lastYear: 200 },
  { month: "SEP", thisYear: 500, lastYear: 400 },
  { month: "OCT", thisYear: 600, lastYear: 1000 },
  { month: "NOV", thisYear: 200, lastYear: 800 },
  { month: "DEC", thisYear: 100, lastYear: 1000 },
]

export function RevenueChart() {
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
            <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
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
