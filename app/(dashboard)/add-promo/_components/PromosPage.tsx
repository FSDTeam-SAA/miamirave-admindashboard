"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import Bradcrumb from "@/components/shyard/Bradcrumb"
import { CustomPagination } from "@/components/shyard/CustomPagination"

interface Promo {
  id: number
  name: string
  thumbnail: string
  productCount: number
}

const mockPromos: Promo[] = [
  { id: 1, name: "SUPER SAVING - 18%", thumbnail: "🎉", productCount: 12 },
  { id: 2, name: "SUPER SAVING - 18%", thumbnail: "🎉", productCount: 12 },
  { id: 3, name: "SUPER SAVING - 18%", thumbnail: "🎉", productCount: 12 },
  { id: 4, name: "SUPER SAVING - 18%", thumbnail: "🎉", productCount: 120 },
  { id: 5, name: "SUPER SAVING - 18%", thumbnail: "🎉", productCount: 120 },
  { id: 6, name: "SUPER SAVING - 18%", thumbnail: "🎉", productCount: 120 },
]

export default function PromosPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalItems = mockPromos.length

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="py-6">
        <div className="flex items-center justify-between">
          <Bradcrumb pageName="Promos List" subPageName="" />
          <Link href="/add-promo/add">
            <Button className="bg-[#34813C] hover:bg-[#34813C]/90 w-[200px] h-[50px] text-white">
              <Plus className="mr-2 h-5 w-5" />
              Add Promo
            </Button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="py-6">
        <div className="overflow-hidden rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-[#2F2F2F] text-[18px] font-medium text-foreground">
                  Promo Name
                </th>
                <th className="px-6 py-4 text-left text-[#2F2F2F] text-[18px] font-medium text-foreground">
                  Under of products
                </th>
                <th className="px-6 py-4 text-left text-[#2F2F2F] text-[18px] font-medium text-foreground">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {mockPromos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((promo) => (
                <tr key={promo.id} className="border-b border-border last:border-0">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-[50px] w-[137px] flex-shrink-0 overflow-hidden rounded-md bg-green-600 flex items-center justify-center text-lg">
                        {promo.thumbnail}
                      </div>
                      <span className="text-base text-[#3E3E3E] font-medium text-foreground">
                        {promo.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-base text-[#3E3E3E] font-medium text-foreground">
                    {promo.productCount}
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/add-promo/${promo.id}`} className="text-base text-[#F0217A] font-medium hover:underline">
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="w-full">
          <CustomPagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}