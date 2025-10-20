"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Bradcrumb from "@/components/shyard/Bradcrumb";
import { CustomPagination } from "@/components/shyard/CustomPagination";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";

type BackendOrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

interface Product {
  _id: string;
  title: string;
  subTitle: string;
  thumbnail: string[];
  description: string;
}

interface OrderItem {
  product: Product;
  setPrice: string;
  quantity: number;
  priceAtOrder: number;
  _id: string;
}

interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

interface Order {
  _id: string;
  user: string;
  totalPrice: number;
  discountPrice: number;
  status: BackendOrderStatus;
  items: OrderItem[];
  promoCode: string | null;
  createdAt: string;
  updatedAt: string;
  orderNumber: number;
  address: Address;
}

interface ApiResponse<T = Order[]> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

const STATUS_OPTIONS: Array<{ value: BackendOrderStatus; label: string }> = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Canceled" }, // UI label American spelling
];

function getStatusStyles(status: BackendOrderStatus) {
  switch (status) {
    case "pending":
      return "bg-[#AA1757] text-white hover:bg-[#AA1757]/90 w-[130px]";
    case "processing":
      return "bg-[#E6E6E6] text-gray-700 hover:bg-[#E6E6E6]/90 w-[130px]";
    case "shipped":
      return "bg-[#2563EB] text-white hover:bg-[#2563EB]/90 w-[130px]"; // blue
    case "delivered":
      return "bg-[#255C2B] text-white hover:bg-[#255C2B]/90 w-[130px]";
    case "cancelled":
      return "bg-[#B50000] text-white hover:bg-[#B50000]/90 w-[130px]";
    default:
      return "w-[130px]";
  }
}

export function OrderList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const session = useSession();
  const token = session.data?.accessToken;
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

  const queryClient = useQueryClient();

  // --- Fetch orders
  const fetchOrders = async (): Promise<ApiResponse> => {
    const response = await fetch(`${apiBase}/order/admin-all-order`, {
      headers: {
        Authorization: `Bearer ${token ?? ""}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    return response.json();
  };

  const { data, isLoading, error, isFetching } = useQuery<ApiResponse>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    enabled: !!token && !!apiBase,
  });

  const orders = useMemo(() => data?.data ?? [], [data]);
  const totalItems = orders.length;
  const paginatedOrders = useMemo(
    () => orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [orders, currentPage]
  );

  // --- Update order status
  const updateOrderStatus = async ({
    orderId,
    status,
  }: {
    orderId: string;
    status: BackendOrderStatus;
  }): Promise<ApiResponse<Order>> => {
    const res = await fetch(`${apiBase}/order/update-order/${orderId}`, {
      method: "PATCH", // if your backend is using PUT, change this to "PUT"
      headers: {
        Authorization: `Bearer ${token ?? ""}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    const json = await res.json();
    if (!res.ok) {
      const msg = json?.message || "Failed to update order status";
      throw new Error(msg);
    }
    return json;
  };

  const { mutate: mutateStatus, isPending: isUpdating } = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      // simplest: refetch
      queryClient.invalidateQueries({ queryKey: ["orders"] });

      // Alternatively, optimistic update:
      // queryClient.setQueryData<ApiResponse>(["orders"], (prev) => {
      //   if (!prev) return prev;
      //   const updated = prev.data.map((o) => (o._id === data.data._id ? data.data : o));
      //   return { ...prev, data: updated };
      // });
    },
  });

  const handleStatusChange = (orderId: string, newStatus: BackendOrderStatus) => {
    mutateStatus({ orderId, status: newStatus });
  };

  if (error) {
    return <div>Error loading orders: {(error as Error).message}</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="py-6">
        <div className="flex items-center justify-between">
          <Bradcrumb pageName="Order" subPageName="" />
        </div>
      </div>

      {/* Table */}
      <div className="py-6">
        <div className="overflow-hidden rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-[#2F2F2F] text-[18px] font-medium">Customer</th>
                <th className="px-6 py-4 text-left text-[#2F2F2F] text-[18px] font-medium">Product</th>
                <th className="px-6 py-4 text-left text-[#2F2F2F] text-[18px] font-medium">Order ID</th>
                <th className="px-6 py-4 text-left text-[#2F2F2F] text-[18px] font-medium">Total Price</th>
                <th className="px-6 py-4 text-left text-[#2F2F2F] text-[18px] font-medium">Date</th>
                <th className="px-6 py-4 text-left text-[#2F2F2F] text-[18px] font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: itemsPerPage }).map((_, index) => (
                    <tr key={index} className="border-b border-border">
                      <td className="px-6 py-4">
                        <Skeleton className="h-6 w-24" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-12 w-12 rounded-md" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-64" />
                            <Skeleton className="h-4 w-48" />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Skeleton className="h-6 w-24" />
                      </td>
                      <td className="px-6 py-4">
                        <Skeleton className="h-6 w-20" />
                      </td>
                      <td className="px-6 py-4">
                        <Skeleton className="h-6 w-32" />
                      </td>
                      <td className="px-6 py-4">
                        <Skeleton className="h-10 w-[130px] rounded-md" />
                      </td>
                    </tr>
                  ))
                : paginatedOrders.map((order) => (
                    <tr key={order._id} className="border-b border-border last:border-0">
                      <td className="px-6 py-4 text-base text-[#3E3E3E] font-medium">
                        {(order?.user ?? "").toString().slice(-4)}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                            <Image
                              src={order.items[0]?.product.thumbnail?.[0] || "/placeholder.svg"}
                              alt={order.items[0]?.product.title || "Product image"}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div>
                            <span className="block text-base text-[#3E3E3E] font-medium">
                              {order.items[0]?.product.title}
                            </span>
                            <p className="text-base text-[#3E3E3E] font-medium">
                              {(order.items[0]?.product.description ?? "")
                                .split(" ")
                                .slice(0, 5)
                                .join(" ") +
                                ((order.items[0]?.product.description ?? "").split(" ").length > 5
                                  ? "..."
                                  : "")}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-base text-[#3E3E3E] font-medium">
                        {order.orderNumber}
                      </td>

                      <td className="px-6 py-4 text-base text-[#3E3E3E] font-medium">
                        ${order.totalPrice}
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-base text-[#3E3E3E] font-medium">
                          {new Date(order.createdAt).toLocaleDateString()}
                          <span className="text-muted-foreground">
                            {" "}
                            {new Date(order.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              className={`min-w-[120px] justify-between rounded-md px-4 py-2 text-base font-medium ${getStatusStyles(
                                order.status
                              )}`}
                              disabled={isUpdating}
                            >
                              {/* Map backend value to user-facing label */}
                              {STATUS_OPTIONS.find((o) => o.value === order.status)?.label ??
                                order.status}
                              <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[160px]">
                            {STATUS_OPTIONS.map((opt) => (
                              <DropdownMenuItem
                                key={opt.value}
                                onClick={() => handleStatusChange(order._id, opt.value)}
                              >
                                {opt.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
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
  );
}
