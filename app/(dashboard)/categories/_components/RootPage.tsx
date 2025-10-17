"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Bradcrumb from "@/components/shyard/Bradcrumb";
import { useState } from "react";
import { CustomPagination } from "@/components/shyard/CustomPagination";
import Link from "next/link";

export default function RootPage() {


  
  const mockCategories = [
    {
      id: 1,
      name: "CBD Products",
      date: "01 July 2025",
      subCount: 5,
    },
    {
      id: 2,
      name: "Delta 8 THC Products",
      date: "01 July 2025",
      subCount: 4,
    },
    {
      id: 3,
      name: "Delta 9 THC Products",
      date: "01 July 2025",
      subCount: 2,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust based on your needs
  const totalItems = mockCategories.length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex justify-between">
        <Bradcrumb pageName="Category" />
        <Link href="/categories/add-categories" >
        <Button
          className="bg-[#34813C] hover:bg-[#34813C] h-[48px] text-white gap-2"
        >
          <Plus size={20} />
          Add Categories
        </Button>
        </Link>
      </div>

      {/* Main Content */}
      <main className="w-full py-8">
        {/* Categories Table */}
        <div className="overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-[18px] font-semibold text-[#131313]">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-[18px] font-semibold text-[#131313]">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-[18px] font-semibold text-[#131313]">
                  List Of Sub_categories
                </th>
                <th className="px-6 py-3 text-left text-[18px] font-semibold text-[#131313]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {mockCategories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <Link href="/categories/${category.id}" >
                    <Button
                      className="inline-block px-3 py-1 bg-[#F0217A] w-[220px] h-[40px] text-white text-sm font-medium rounded-[2px] hover:bg-pink-600 transition-colors"
                    >
                      {category.name}
                    </Button>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-base text-[#707070]">
                    {category.date}
                  </td>
                  <td className="px-6 py-4 text-base text-[#707070]">
                    {category.subCount}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {/* Edit button */}
                      <button
                        className="p-2 hover:bg-muted rounded transition-colors"
                        title="Edit"
                      >
                        <svg
                          className="w-5 h-5 text-foreground"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>

                      {/* Delete button */}
                      <button
                        className="p-2 hover:bg-muted rounded transition-colors"
                        title="Delete"
                      >
                        <svg
                          className="w-5 h-5 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
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
      </main>
    </div>
  );
}
