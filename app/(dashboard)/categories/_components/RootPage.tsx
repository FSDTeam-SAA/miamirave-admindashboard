

"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Bradcrumb from "@/components/shyard/Bradcrumb";
import { useState } from "react";
import { CustomPagination } from "@/components/shyard/CustomPagination";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

// Define the Category type based on API response
interface Category {
  _id: string;
  name: string;
  description: string;
  __v: number;
  subcategoryCount: number;
}

// Define the API response type
interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Category[];
}

// Fetch categories function
const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category/all-category`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data: ApiResponse = await response.json();
  return data.data;
};

// Skeleton Loader Component
const SkeletonRow = () => (
  <tr className="border-b border-border">
    <td className="px-6 py-4">
      <div className="w-[220px] h-[40px] bg-gray-200 animate-pulse rounded-[2px]" />
    </td>
    <td className="px-6 py-4">
      <div className="w-[100px] h-4 bg-gray-200 animate-pulse rounded" />
    </td>
    <td className="px-6 py-4">
      <div className="w-[50px] h-4 bg-gray-200 animate-pulse rounded" />
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gray-200 animate-pulse rounded" />
        <div className="w-10 h-10 bg-gray-200 animate-pulse rounded" />
      </div>
    </td>
  </tr>
);

export default function RootPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Use TanStack Query to fetch categories
  const { data: categories = [], isLoading, error } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Calculate paginated data
  const totalItems = categories.length;
  const paginatedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex justify-between">
        <Bradcrumb pageName="Category" />
        <Link href="/categories/add-categories">
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
              {isLoading ? (
                // Display skeleton rows while loading
                Array.from({ length: itemsPerPage }).map((_, index) => (
                  <SkeletonRow key={index} />
                ))
              ) : error ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-red-500">
                    Error: {(error as Error).message}
                  </td>
                </tr>
              ) : paginatedCategories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-[#707070]">
                    No categories found
                  </td>
                </tr>
              ) : (
                paginatedCategories.map((category) => (
                  <tr
                    key={category._id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Link href={`/categories/${category._id}`}>
                        <Button
                          className="inline-block px-3 py-1 bg-[#F0217A] w-[220px] h-[40px] text-white text-sm font-medium rounded-[2px] hover:bg-pink-600 transition-colors"
                        >
                          {category.name}
                        </Button>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-base text-[#707070]">
                      {/* Date not provided in API, using placeholder */}
                      N/A
                    </td>
                    <td className="px-6 py-4 text-base text-[#707070]">
                      {category.subcategoryCount}
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
                ))
              )}
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