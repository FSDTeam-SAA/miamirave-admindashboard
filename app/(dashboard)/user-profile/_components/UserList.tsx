"use client"

import Link from "next/link"
import { useState } from "react"

interface User {
  id: number
  name: string
  avatar: string
  totalOrder: number
  deliveredOrder: number
  pendingOrder: number
  cancelOrder: number
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
]

export default function UserList() {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="flex items-center justify-between px-8 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">User Profile</h1>
            <p className="text-sm text-muted-foreground">
              <Link href="/" className="hover:underline">
                Dashboard
              </Link>{" "}
              &gt; <span>User Profile</span>
            </p>
          </div>
          <div className="bg-pink-500 text-white rounded-lg px-6 py-3">
            <p className="text-sm font-medium">Total User</p>
            <p className="text-2xl font-bold">41,200.00</p>
          </div>
        </div>
      </header>

      {/* Table */}
      <main className="p-8">
        <div className="overflow-x-auto rounded-lg border border-border bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">User ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">User Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Total Order</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Delivered Order</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Pending Order</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Cancel Order</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-foreground">{user.id}</td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-sm">
                        {user.avatar}
                      </div>
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{user.totalOrder}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{user.deliveredOrder}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{user.pendingOrder}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{user.cancelOrder}</td>
                  <td className="px-6 py-4 text-sm">
                    <Link href={`/users/${user.id}`} className="text-pink-500 hover:underline font-medium">
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing 1 to 5 of 12 results</p>
          <div className="flex gap-2">
            <button className="px-3 py-2 rounded border border-border text-foreground hover:bg-gray-50">←</button>
            {[1, 2, 3, 8].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded ${
                  currentPage === page
                    ? "bg-green-600 text-white"
                    : "border border-border text-foreground hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-3 py-2 rounded border border-border text-foreground hover:bg-gray-50">→</button>
          </div>
        </div>
      </main>
    </div>
  )
}
