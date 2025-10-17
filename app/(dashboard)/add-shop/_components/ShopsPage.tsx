"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import Bradcrumb from "@/components/shyard/Bradcrumb"
import { CustomPagination } from "@/components/shyard/CustomPagination"
import Image from "next/image"

interface Shop {
  id: number
  name: string
  location: string
  image: string
}

const mockShops: Shop[] = [
  { id: 1, name: "Mary Jane's Bakery Co.", location: "6120 NW 27th Ave, Miami, FL 33142, United States" ,image: "/assets/shop22.jpg"},
  { id: 2, name: "Mary Jane's Bakery Co.", location: "6120 NW 27th Ave, Miami, FL 33142, United States" ,image: "/assets/shop22.jpg"},
  { id: 3, name: "Mary Jane's Bakery Co.", location: "6120 NW 27th Ave, Miami, FL 33142, United States" ,image: "/assets/shop22.jpg"},
  { id: 4, name: "Mary Jane's Bakery Co.", location: "6120 NW 27th Ave, Miami, FL 33142, United States" ,image: "/assets/shop22.jpg"},
  { id: 5, name: "Mary Jane's Bakery Co.", location: "6120 NW 27th Ave, Miami, FL 33142, United States" ,image: "/assets/shop22.jpg"},
  { id: 6, name: "Mary Jane's Bakery Co.", location: "6120 NW 27th Ave, Miami, FL 33142, United States" ,image: "/assets/shop22.jpg"},
]

export default function ShopsPage() {
   const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5 // Adjust based on your needs
    const totalItems = mockShops.length

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="flex items-center justify-between py-6">
       <Bradcrumb pageName="Shop List" />
       <Link href="/add-shop/shop-add" className="text-[#E91E8C]">
       <Button  className="bg-[#34813C] hover:bg-[#34813C]/90 text-white rounded-[8px] px-4 h-[50px]">
        <Plus className="mr-2 h-4 w-4" /> Add Shop
      </Button>
      </Link>
      </div>

      {/* Table */}
      <main className="">
        <div className="overflow-x-auto ">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border ">
                <th className="px-6 py-4 text-left text-[18px] font-semibold text-[#2F2F2F]">Shop Name</th>
                <th className="px-6 py-4 text-left text-[18px] font-semibold text-[#2F2F2F]">Shop Location</th>
                <th className="px-6 py-4 text-left text-[18px] font-semibold text-[#2F2F2F]">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockShops.map((shop) => (
                <tr key={shop.id} className="border-b border-border hover:bg-gray-50">
                  <td className="px-6 py-4 text-base text-[#131313] ">
                    <div className="flex items-center gap-3 ">
                      <div className="h-[50px] w-[80px] rounded-[4px] " >
                        <Image src={shop.image} alt="product" width={1000} height={1000} className="w-full h-full rounded-[4px]" />
                      </div>
                      {shop.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-base text-[#131313] ">{shop.location}</td>
                  <td className="px-6 py-4 text-base">
                    <Link href={`/add-shop/${shop.id}`} className="text-[#F0217A] hover:underline font-medium">
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
      </main>
    </div>
  )
}
