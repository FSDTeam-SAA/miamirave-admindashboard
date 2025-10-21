import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface StatCardProps {
  title: string
  value: string
  icon: string
  iconColor: string
  iconBgColor: string
}

export function StatCard({ title, value, icon, iconColor, iconBgColor }: StatCardProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-2">{title}</p>
            <p className="text-2xl font-bold text-[#131313]">{value}</p>
          </div>
          <div className={`${iconBgColor} p-3 rounded-lg`}>
            <Image src={icon || "/placeholder.svg"} alt={title} width={24} height={24} className={iconColor} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
