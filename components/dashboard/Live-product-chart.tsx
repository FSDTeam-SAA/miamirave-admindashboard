"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { day: "1 D", value: 55 },
  { day: "2 D", value: 68 },
  { day: "3 D", value: 55 },
  { day: "4 D", value: 78 },
  { day: "5 D", value: 68 },
  { day: "6 D", value: 85 },
  { day: "7 D", value: 75 },
]

export function LiveProductChart() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-[32px] font-bold text-[#131313]">Live Product report</CardTitle>
          <div className="flex gap-2">
            <Button size="sm" className="bg-[#E91E8C] hover:bg-[#D01A7D] text-white rounded-full px-4">
              Day
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
              Week
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
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
            <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
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
