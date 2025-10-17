import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import Image from "next/image"

interface StatCardProps {
  title: string
  value: string
  icon: string
  iconColor: string
  iconBgColor: string
}

export function StatCard({ title, value, icon,  iconBgColor }: StatCardProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[24px] font-semibold text-[#131313]">{title}</p>
            <p className="text-[18px] font-midium text-[#424242] mt-2">●{value}</p>
          </div>
          <div className={`p-3 rounded-lg ${iconBgColor}`}>
           <Image src={icon} width={1000} height={1000} alt="icon" className="w-[54px] h-[54px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
