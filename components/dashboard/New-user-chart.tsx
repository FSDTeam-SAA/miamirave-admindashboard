"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { date: "3 Oct", users: 500 },
  { date: "10 Oct", users: 1200 },
  { date: "15 Oct", users: 1000 },
  { date: "20 Oct", users: 2800 },
  { date: "25 Oct", users: 3500 },
  { date: "27 Oct", users: 2900 },
  { date: "30 Oct", users: 2000 },
]

export function NewUserChart() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-[32px] font-bold text-[#131313]">New User</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
              Day
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
              Week
            </Button>
            <Button size="sm" className="bg-[#E91E8C] hover:bg-[#D01A7D] text-white rounded-full px-4">
              Month
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            users: {
              label: "Users",
              color: "#9333EA",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <XAxis dataKey="date" tick={{ fill: "#999", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: "#999", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#C893FD"
                strokeWidth={2}
                dot={{ fill: "#FFFFFF", stroke: "#9333EA", strokeWidth: 2, r: 5 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
