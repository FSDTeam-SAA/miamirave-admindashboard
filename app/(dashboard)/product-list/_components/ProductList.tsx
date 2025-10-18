"use client";

import Link from "next/link";
import { Plus,  Trash2,  Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Bradcrumb from "@/components/shyard/Bradcrumb";
import { CustomPagination } from "@/components/shyard/CustomPagination";
import { useState } from "react";
import Image from "next/image";

export default function ProductList() {
  const products = [
    {
      id: 1,
      name: "10,000MG Maximum Strength Full Spectrum CBD Topical Cream",
      productId: "1140",
      price: "$8.00",
      quantity: 100,
      image: "/assets/product.png",
      date: "01 July 2025 03:18 AM",
    },
    {
      id: 2,
      name: "10,000MG Maximum Strength Full Spectrum CBD Topical Cream",
      productId: "1140",
      price: "$8.00",
      quantity: 100,
      date: "01 July 2025 03:18 AM",
    },
    {
      id: 3,
      name: "10,000MG Maximum Strength Full Spectrum CBD Topical Cream",
      productId: "1140",
      price: "$8.00",
      quantity: 100,
      date: "01 July 2025 03:18 AM",
    },
    {
      id: 4,
      name: "10,000MG Maximum Strength Full Spectrum CBD Topical Cream",
      productId: "1140",
      price: "$8.00",
      quantity: 100,
      date: "01 July 2025 03:18 AM",
    },
    {
      id: 5,
      name: "10,000MG Maximum Strength Full Spectrum CBD Topical Cream",
      productId: "1140",
      price: "$8.00",
      quantity: 100,
      date: "01 July 2025 03:18 AM",
    },
    {
      id: 6,
      name: "10,000MG Maximum Strength Full Spectrum CBD Topical Cream",
      productId: "1140",
      price: "$8.00",
      quantity: 100,
      date: "01 July 2025 03:18 AM",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = products.length;
  return (
    <main className="min-h-screen">
      <div className="">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Bradcrumb pageName="Product List" />
          <Link href="/add-product">
            <Button className="bg-[#34813C] hover:bg-[#34813C] h-[50px] text-white gap-2">
              <Plus size={20} />
              Add product
            </Button>
          </Link>
        </div>

        {/* Table */}
        <div className=" overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-[18px] font-semibold text-[#2F2F2F]">
                  Product Name
                </th>
                <th className="px-6 py-4 text-left text-[18px] font-semibold text-[#2F2F2F]">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-[18px] font-semibold text-[#2F2F2F]">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-[18px] font-semibold text-[#2F2F2F]">
                  Quantity
                </th>
                <th className="px-6 py-4 text-left text-[18px] font-semibold text-[#2F2F2F]">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-[18px] font-semibold text-[#2F2F2F]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-200 "
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-[100px] h-[80px] " >
                        <Image src={product.image as string} alt="" width={100} height={100} />
                      </div>
                      <span className="text-base text-[#424242]">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-base text-[#424242]">
                    {product.productId}
                  </td>
                  <td className="px-6 py-4 text-base text-[#424242]">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 text-base text-[#424242]">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 text-base text-[#424242]">
                    {product.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded">
                        <Edit size={18} className="text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded">
                        <Trash2 size={18} className="text-gray-600" />
                      </button>
                    </div>
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
    </main>
  );
}
