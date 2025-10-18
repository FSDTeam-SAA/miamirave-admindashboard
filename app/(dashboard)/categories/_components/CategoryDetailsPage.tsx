"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CategoryDetailsPage() {
  const params = useParams();
  const categoryId = params.id;

  // Mock data - in a real app, this would come from an API
  const [category] = useState({
    id: categoryId,
    name: "CBD Products",
    description: "High-quality CBD products for wellness and health",
    date: "01 July 2025",
    subCategories: [
      { id: 1, name: "CBD Oils", date: "01 July 2025" },
      { id: 2, name: "CBD Edibles", date: "02 July 2025" },
      { id: 3, name: "CBD Topicals", date: "03 July 2025" },
      { id: 4, name: "CBD Capsules", date: "04 July 2025" },
      { id: 5, name: "CBD Flowers", date: "05 July 2025" },
    ],
  });

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-[32px] text-[#2F2F2F] font-semibold">
            {category.name}
          </h1>
          <div className="flex items-center gap-2">
            <Link href="/categories">
              <p className="text-base text-[#9F9F9F]  cursor-pointer hover:underline">
                Dashboard
              </p>
            </Link>
            <span>
              <ChevronRight className="w-4 h-4 text-[#9F9F9F]" />
            </span>
            <span className="text-base text-[#9F9F9F]">sub_category</span>
          </div>
        </div>
        <Link href="/categories/add-subcategories">
          <Button className="bg-[#34813C] hover:bg-[#34813C]/90 h-[50px] text-white gap-2">
            <Plus size={20} />
            Add Sub Category
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <main className="w-full py-8">
        {/* Sub Categories Section */}
        <div>
          {/* Sub Categories Table */}
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
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {category.subCategories.map((subCategory) => (
                  <tr
                    key={subCategory.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="inline-block px-3 py-1  text-base  text-[#2F2F2F] font-medium ">
                        {subCategory.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-base text-[#2F2F2F]">
                      {subCategory.date}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
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
        </div>
      </main>
    </div>
  );
}
