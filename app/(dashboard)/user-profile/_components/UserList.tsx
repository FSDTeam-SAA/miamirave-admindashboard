"use client";

import { useEffect, useState } from "react";
import Bradcrumb from "@/components/shyard/Bradcrumb";
import { CustomPagination } from "@/components/shyard/CustomPagination";
import { useSession } from "next-auth/react";

interface User {
  _id: string;
  fullName?: string;
  username?: string;
  email: string;
  profileImage?: string;
  phone?: string;
  address?: string;
  role?: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: session } = useSession();

  const token = session?.accessToken;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/all-user`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();

        if (data.success) {
          setUsers(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch users");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Pagination logic
  const totalItems = users.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return <p className="text-center py-10 text-lg">Loading users...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header>
        <div className="flex items-center justify-between px-8 py-4">
          <Bradcrumb pageName="User List" />
          <div className="bg-[#F0217A] text-white rounded-lg w-[214px] pl-6 py-3">
            <p className="text-xl font-medium">Total Users</p>
            <p className="text-base font-bold">{users.length}</p>
          </div>
        </div>
      </header>

      {/* Table */}
      <main>
        <div className="overflow-x-auto">
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
                  Email
                </th>
                <th className="px-6 py-4 text-left text-[18px] font-semibold text-[#2F2F2F]">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-[18px] font-semibold text-[#2F2F2F]">
                  Role
                </th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-border hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-[18px] text-[#3E3E3E]">
                    {user._id.slice(-6)} {/* Shortened ID */}
                  </td>

                  <td className="px-6 py-4 text-[18px] text-[#3E3E3E]">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-[18px]">
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={user.fullName || "avatar"}
                            className="rounded-full h-8 w-8 object-cover"
                          />
                        ) : (
                          "👤"
                        )}
                      </div>
                      {user.fullName || user.username || "N/A"}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-[18px] text-[#3E3E3E]">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-[18px] text-[#3E3E3E]">
                    {user.phone || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-[18px] text-[#3E3E3E]">
                    {user.role || "N/A"}
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
