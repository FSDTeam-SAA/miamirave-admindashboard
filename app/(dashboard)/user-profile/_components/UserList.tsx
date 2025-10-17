"use client";

import Bradcrumb from "@/components/shyard/Bradcrumb";
import { CustomPagination } from "@/components/shyard/CustomPagination";
import Link from "next/link";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  avatar: string;
  totalOrder: number;
  deliveredOrder: number;
  pendingOrder: number;
  cancelOrder: number;
}

const mockUsers: User[] = [
  {
    id: 1140,
    name: "John Smith",
    avatar: "👤",
    totalOrder: 200,
    deliveredOrder: 170,
    pendingOrder: 20,
    cancelOrder: 10,
  },
  {
    id: 1140,
    name: "John Smith",
    avatar: "👤",
    totalOrder: 200,
    deliveredOrder: 170,
    pendingOrder: 20,
    cancelOrder: 10,
  },
  {
    id: 1140,
    name: "John Smith",
    avatar: "👤",
    totalOrder: 200,
    deliveredOrder: 170,
    pendingOrder: 20,
    cancelOrder: 10,
  },
  {
    id: 1140,
    name: "John Smith",
    avatar: "👤",
    totalOrder: 200,
    deliveredOrder: 170,
    pendingOrder: 20,
    cancelOrder: 10,
  },
  {
    id: 1140,
    name: "John Smith",
    avatar: "👤",
    totalOrder: 200,
    deliveredOrder: 170,
    pendingOrder: 20,
    cancelOrder: 10,
  },
  {
    id: 1140,
    name: "John Smith",
    avatar: "👤",
    totalOrder: 200,
    deliveredOrder: 170,
    pendingOrder: 20,
    cancelOrder: 10,
  },
  {
    id: 1140,
    name: "John Smith",
    avatar: "👤",
    totalOrder: 200,
    deliveredOrder: 170,
    pendingOrder: 20,
    cancelOrder: 10,
  },
  {
    id: 1140,
    name: "John Smith",
    avatar: "👤",
    totalOrder: 200,
    deliveredOrder: 170,
    pendingOrder: 20,
    cancelOrder: 10,
  },
  {
    id: 1140,
    name: "John Smith",
    avatar: "👤",
    totalOrder: 200,
    deliveredOrder: 170,
    pendingOrder: 20,
    cancelOrder: 10,
  },
];

export default function UserList() {
      const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5 // Adjust based on your needs
    const totalItems = mockUsers.length


  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="">
        <div className="flex items-center justify-between px-8 py-4">
          <Bradcrumb pageName="User List" />
          <div className="bg-[#F0217A] text-white rounded-lg w-[214px] pl-6 py-3">
            <p className="text-xl font-medium">Total User</p>
            <p className="text-base font-bold">41,200.00</p>
          </div>
        </div>
      </header>

      {/* Table */}
      <main className="">
        <div className="overflow-x-auto ">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                <th className="px-6 py-4 text-left text-[18px] font-semibold text-[#2F2F2F]">
                  User ID
                </th>
                <th className="px-6 py-4 text-left text-[18px] font-semibold text-[#2F2F2F]">
                  User Name
                </th>
                <th className="px-6 py-4 text-left text-[18px] font-semibold text-[#2F2F2F]">
                  Total Order
                </th>
                <th className="px-6 py-4 text-left text-[18px] font-semibold text-[#2F2F2F]">
                  Delivered Order
                </th>
                <th className="px-6 py-4 text-left text-[18px] font-semibold text-[#2F2F2F]">
                  Pending Order
                </th>
                <th className="px-6 py-4 text-left text-[18px] font-semibold text-[#2F2F2F]">
                  Cancel Order
                </th>
                <th className="px-6 py-4 text-left text-[18px] font-semibold text-[#2F2F2F]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user, idx) => (
                <tr
                  key={idx}
                  className="border-b border-border hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-[18px] text-[#3E3E3E]">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 text-[18px] text-[#3E3E3E]">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-[18px]">
                        {user.avatar}
                      </div>
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[18px] text-[#3E3E3E]">
                    {user.totalOrder}
                  </td>
                  <td className="px-6 py-4 text-[18px] text-[#3E3E3E]">
                    {user.deliveredOrder}
                  </td>
                  <td className="px-6 py-4 text-[18px] text-[#3E3E3E]">
                    {user.pendingOrder}
                  </td>
                  <td className="px-6 py-4 text-[18px] text-[#3E3E3E]">
                    {user.cancelOrder}
                  </td>
                  <td className="px-6 py-4 text-[18px]">
                    <Link
                      href={`/users/${user.id}`}
                      className="text-[#F0217A] hover:underline font-medium"
                    >
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
  );
}
